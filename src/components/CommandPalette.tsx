"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, User, FileText, Settings, CreditCard, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
          <div className="flex items-center gap-4 p-6 border-b border-white/5">
            <Search className="w-6 h-6 text-indigo-400" />
            <input 
              autoFocus
              placeholder="What node do you want to access? (e.g. Attendance, Fees)" 
              className="bg-transparent border-none outline-none text-xl font-bold w-full text-white placeholder:text-slate-600"
            />
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl"><X className="w-5 h-5 text-slate-500" /></button>
          </div>

          <div className="p-4 space-y-6 max-h-[450px] overflow-y-auto no-scrollbar">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4 ml-3">Suggested Frequency</p>
              <div className="space-y-1">
                {[
                  { label: "My Profile Node", icon: User, shortcut: "P" },
                  { label: "System Sync Logs", icon: FileText, shortcut: "L" },
                  { label: "Faculty Directory", icon: Mail, shortcut: "M" },
                  { label: "Fee Ledger Status", icon: CreditCard, shortcut: "F" },
                  { label: "Core Preferences", icon: Settings, shortcut: "S" },
                ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                      <span className="text-[10px] font-black text-slate-500">⌘</span>
                      <span className="text-[10px] font-black text-slate-500">{item.shortcut}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Enter to select</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Esc to close</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-indigo-400/50 uppercase tracking-[0.2em]">Nexus Hybrid Search v1.0</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
