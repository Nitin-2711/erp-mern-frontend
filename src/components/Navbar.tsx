"use client";

import { Bell, Search, User, Settings, LogOut, Moon, Sun, Monitor, Command } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useRole } from "@/context/RoleContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CommandPalette from "./CommandPalette";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { role, setRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <header className="h-28 px-12 flex items-center justify-between sticky top-0 z-40 backdrop-blur-3xl bg-background/20 border-b border-white/5">
        {/* Smart Search / Command Palette Trigger */}
        <div 
          onClick={() => setIsCommandOpen(true)}
          className="hidden md:flex items-center gap-5 bg-white/5 border border-white/10 px-8 py-4 rounded-[1.8rem] w-[500px] group hover:border-indigo-500/40 hover:bg-white/10 transition-all cursor-pointer shadow-xl shadow-black/20"
        >
          <Search className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          <span className="text-[13px] font-bold text-slate-500 group-hover:text-slate-300 flex-1">Launch Quantum Console...</span>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <Command className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-black text-slate-400 uppercase">K</span>
          </div>
        </div>

      {/* Action Center */}
      <div className="flex items-center gap-8">
        {/* Role Quick Switch (Demo Elite) */}
        <div className="hidden xl:flex items-center bg-white/5 p-1 rounded-2xl border border-white/5">
          {["admin", "faculty", "student"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as any)}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-tighter rounded-xl transition-all ${
                role === r 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 hover:bg-white/10 rounded-2xl transition-all relative group border border-transparent hover:border-white/10">
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-white glow-primary" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full border-[3px] border-background animate-pulse shadow-[0_0_10px_#6366f1]"></span>
          </button>
        </div>

        <div className="h-10 w-[1px] bg-white/10 mx-2"></div>

        {/* Global Identity Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 group"
          >
            <div className="text-right hidden lg:block">
              <p className="text-[13px] font-black leading-none bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-all">NITIN KUMAR</p>
              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-2 opacity-80">{role} NODE ACTIVE</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-sm text-white">
                NK
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-5 w-72 cmd-palette p-3 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
              >
                <div className="p-4 mb-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Quantum ID</p>
                  <p className="text-sm font-bold text-white mt-1 truncate">nitin.nexus@core.com</p>
                </div>
                <div className="space-y-1">
                  {[
                    { label: "Neural Profile", icon: User },
                    { label: "Core Settings", icon: Settings },
                    { label: "Disconnect Hub", icon: LogOut, danger: true },
                  ].map((item, idx) => (
                    <button 
                      key={idx}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all text-[13px] font-bold ${
                        item.danger 
                        ? "text-rose-500 hover:bg-rose-500/10" 
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4" /> {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;
