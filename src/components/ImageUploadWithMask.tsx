"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Circle, Square, Hexagon, Ghost, Check, X } from "lucide-react";

type MaskType = "circle" | "rounded-square" | "hexagon" | "blob";

const masks: Record<MaskType, string> = {
  circle: "rounded-full",
  "rounded-square": "rounded-[2rem]",
  hexagon: "clip-path-hexagon", // We'll need to define this in CSS or use inline style
  blob: "clip-path-blob",
};

export default function ImageUploadWithMask({ onImageSelect, currentImage }: { onImageSelect?: (file: File, mask: MaskType) => void, currentImage?: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null);
  const [selectedMask, setSelectedMask] = useState<MaskType>("circle");
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        if (onImageSelect) onImageSelect(file, selectedMask);
      };
      reader.readAsDataURL(file);
    }
  };

  const maskStyles: Record<MaskType, React.CSSProperties> = {
    circle: { borderRadius: "9999px" },
    "rounded-square": { borderRadius: "2rem" },
    hexagon: { clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
    blob: { clipPath: "path('M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,89.5,-0.6C88.5,14.5,81.4,29,72.4,41.9C63.4,54.8,52.5,66.1,39.2,73.5C25.9,80.9,10.2,84.4,-5,83.4C-20.2,82.4,-35,76.9,-48.4,68.7C61.8,60.5,-73.8,49.6,-81.4,36.1C-89,22.6,-92.2,6.5,-89.9,-8.8C-87.6,-24.1,-80,-38.6,-69.5,-50C-59,-61.4,-45.6,-69.7,-31.8,-76.7C-18,-83.7,-3.8,-89.4,10.2,-89.4C24.2,-89.4,44.7,-76.4,44.7,-76.4Z')" },
  };

  // Simplified blob for SVG-less clip-path if needed, but path is better for pure CSS
  const blobClipPath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  return (
    <div className="space-y-6">
      <div 
        className="relative mx-auto w-48 h-48 group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <AnimatePresence>
          {selectedImage ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full relative"
              style={{
                ...maskStyles[selectedMask],
                overflow: "hidden"
              }}
            >
              <img 
                src={selectedImage} 
                alt="Profile Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity"
              >
                <Upload className="text-white w-8 h-8" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className={`w-full h-full border-2 border-dashed border-primary-start/30 flex flex-col items-center justify-center bg-primary-start/5 ${selectedMask === 'circle' ? 'rounded-full' : 'rounded-3xl'} hover:bg-primary-start/10 transition-colors`}
              style={selectedMask === 'hexagon' || selectedMask === 'blob' ? maskStyles[selectedMask] : {}}
            >
              <Upload className="w-8 h-8 text-primary-start/60 mb-2" />
              <span className="text-[10px] font-bold text-primary-start/60 uppercase tracking-widest">Upload Photo</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
      </div>

      <div className="flex justify-center gap-3">
        {(Object.keys(masks) as MaskType[]).map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMask(m)}
            className={`p-2 rounded-xl transition-all ${selectedMask === m ? 'bg-primary-start text-white shadow-lg shadow-primary-start/20' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
            title={`Use ${m} mask`}
          >
            {m === "circle" && <Circle className="w-4 h-4" />}
            {m === "rounded-square" && <Square className="w-4 h-4" />}
            {m === "hexagon" && <Hexagon className="w-4 h-4" />}
            {m === "blob" && <Ghost className="w-4 h-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}
