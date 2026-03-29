"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, FileText, Settings, CreditCard, Mail, X, Activity, Building, BookOpen, BarChart3, LayoutDashboard } from "lucide-react";

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const navigationNodes = [
    { label: "Mission Hub (Dashboard)", path: "/", icon: LayoutDashboard, type: "Core" },
    { label: "Identity Center (Users)", path: "/users", icon: User, type: "Admin" },
    { label: "Academic Lattice (Depts)", path: "/departments", icon: Building, type: "Admin" },
    { label: "Knowledge Index (Subjects)", path: "/subjects", icon: BookOpen, type: "Admin" },
    { label: "Strategic Intelligence", path: "/reports", icon: BarChart3, type: "HOD" },
    { label: "Presence Matrix", path: "/attendance", icon: Activity, type: "Faculty" },
    { label: "Finance Vault (Fees)", path: "/fees", icon: CreditCard, type: "Student" },
    { label: "Neural Profile", path: "/profile", icon: User, type: "Profile" },
    { label: "Core Preferences", path: "/settings", icon: Settings, type: "System" },
  ];

  const filteredNodes = navigationNodes.filter(node => 
    node.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden relative z-10"
        >
          <div className="flex items-center gap-4 p-8 border-b border-white/5 bg-white/[0.01]">
            <Search className="w-6 h-6 text-indigo-500" />
            <input 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Deploy mission or search shard node..." 
              className="bg-transparent border-none outline-none text-xl font-bold w-full text-white placeholder:text-slate-700"
            />
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl"><X className="w-5 h-5 text-slate-500" /></button>
          </div>

          <div className="p-6 space-y-2 max-h-[450px] overflow-y-auto no-scrollbar">
            {filteredNodes.length > 0 ? (
               filteredNodes.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-500 group transition-all border border-transparent hover:border-indigo-400/20"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/20 group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-tight text-slate-400 group-hover:text-white">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest px-3 py-1 bg-white/5 rounded-lg group-hover:bg-black/20 group-hover:text-white">{item.type}</span>
                  </button>
               ))
            ) : (
               <div className="p-20 text-center">
                  <p className="text-xs font-black text-slate-700 uppercase tracking-widest italic">No matching shards in global lattice.</p>
               </div>
            )}
          </div>

          <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="p-1 px-2 bg-white/5 rounded text-[9px] font-black text-slate-500">↑↓</div>
                 <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Navigate Shards</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 px-2 bg-white/5 rounded text-[9px] font-black text-slate-500">↵</div>
                 <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Deploy Operation</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-indigo-500/50 uppercase tracking-[0.2em]">Nexus Neural Search v2.1</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
