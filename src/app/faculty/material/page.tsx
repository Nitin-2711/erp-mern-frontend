"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Share2, 
  Download, 
  Trash2, 
  FolderPlus, 
  Search,
  Filter,
  ArrowLeft,
  BookOpen,
  PieChart,
  Layers,
  FileCode,
  Video,
  Eye,
  Zap,
  ShieldCheck,
  Package
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const initialMaterials = [
  { id: "M1", name: "Quantum-Core-Notes.pdf", type: "PDF", size: "4.2 MB", date: "Mar 24", downloads: 142, icon: FileText, color: "text-rose-500" },
  { id: "M2", name: "Neural-Network-Lab.zip", type: "ZIP", size: "128 MB", date: "Mar 22", downloads: 85, icon: Package, color: "text-amber-500" },
  { id: "M3", name: "Advanced-Lectures-v1.mp4", type: "MP4", size: "1.2 GB", date: "Mar 20", downloads: 210, icon: Video, color: "text-indigo-500" },
  { id: "M4", name: "Compiler-Design-Src.go", type: "SRC", size: "12 KB", date: "Mar 18", downloads: 42, icon: FileCode, color: "text-emerald-500" },
];

export default function StudyMaterialPage() {
  const [materials, setMaterials] = useState(initialMaterials);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Knowledge <span className="gradient-text-master">Shards</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Distributing intellectual assets across {materials.length} nodes.</p>
        </motion.div>

        <div className="flex gap-4">
          <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.8rem] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all font-black text-xs uppercase tracking-tighter shadow-2xl shadow-indigo-600/30">
            <Upload className="w-4 h-4" /> Inject New Shard
          </button>
        </div>
      </header>

      {/* Global Filter Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 glass-panel rounded-[2.5rem] p-4 flex items-center gap-6 border-white/5 bg-white/5">
            <Search className="w-6 h-6 text-slate-600 ml-6" />
            <input placeholder="Locate specific knowledge index..." className="bg-transparent border-none outline-none text-white w-full text-lg font-bold placeholder:text-slate-600" />
            <div className="h-10 w-[2px] bg-white/5 mx-2" />
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest">
               <Filter className="w-4 h-4 text-slate-500" /> Options
            </button>
         </div>
         <button className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-center gap-4 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-slate-400 group">
            <FolderPlus className="w-6 h-6 group-hover:text-indigo-500 transition-colors" /> New Category
         </button>
      </div>

      {/* Stats Quick Scan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Storage Used", val: "4.2 / 50 GB", icon: PieChart, color: "text-indigo-400" },
          { label: "Batches Synced", val: "12", icon: Users, color: "text-emerald-400" },
          { label: "Global Access Status", val: "E2E Encrypted", icon: ShieldCheck, color: "text-cyan-400" },
        ].map((s, i) => (
          <div key={i} className="glass-panel rounded-[2rem] p-8 border-white/5 border border-dashed hover:bg-white/5 transition-all group cursor-default">
             <div className="flex items-center gap-6">
                <div className={`p-4 rounded-xl bg-white/5 ${s.color}`}>
                   <s.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                   <p className="text-xl font-black mt-1 uppercase tracking-tight">{s.val}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Material Grid Matrix */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {materials.map((m) => (
          <motion.div key={m.id} variants={item} className="glass-panel rounded-[3rem] p-10 group hover:bg-white/5 transition-all border-white/5 relative overflow-hidden group">
            <div className="flex flex-col h-full">
               <div className="flex justify-between items-start mb-10">
                  <div className={`p-5 rounded-2xl bg-white/5 ${m.color} group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                     <m.icon className="w-8 h-8" />
                  </div>
                  <button className="p-3 hover:bg-white/10 rounded-xl transition-all"><MoreVertical className="w-4 h-4 text-slate-500" /></button>
               </div>
               
               <div className="flex-1">
                  <h4 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary-end transition-colors ">{m.name}</h4>
                  <div className="mt-4 flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <span>{m.type}</span>
                     <span>•</span>
                     <span>{m.size}</span>
                     <span>•</span>
                     <span>{m.date}</span>
                  </div>
               </div>

               <div className="mt-10 h-[1.5px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-indigo-500/20" />
               </div>

               <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Eye className="w-4 h-4 text-slate-500" />
                     <span className="text-[10px] font-black text-slate-500">{m.downloads}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-xl transition-all border border-white/5">
                       <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-500 rounded-xl transition-all border border-white/5">
                       <Download className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 rounded-xl transition-all border border-white/5">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}

        {/* Dynamic Action Placeholder */}
        <motion.div variants={item} className="p-10 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-primary-end animate-pulse" />
           </div>
           <h4 className="text-xl font-black tracking-tight uppercase">Quick Sync</h4>
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2 leading-none">Distribute to Batches A, B, C</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
