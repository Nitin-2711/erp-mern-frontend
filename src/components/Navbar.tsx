"use client";

import { Bell, Search, User, Settings, LogOut, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useRole } from "@/context/RoleContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-2xl border border-border w-96 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Jump to student, course or report (⌘K)" 
          className="bg-transparent border-none outline-none text-sm font-medium w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-muted rounded-xl transition-all relative group">
            <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-background animate-pulse"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-muted rounded-xl transition-all group"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-slate-500 group-hover:text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-slate-500 group-hover:text-primary" />
            )}
          </button>
        </div>

        <div className="h-6 w-[1px] bg-border mx-2"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-1.5 py-1.5 pr-4 rounded-2xl hover:bg-muted transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/20">
              NK
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-black leading-none uppercase tracking-tighter">Nitin Kumar</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{role} Access</p>
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 glass-panel p-2 rounded-2xl shadow-2xl z-50 border border-border"
              >
                <div className="p-3 mb-2 border-b border-border/50">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Account</p>
                  <p className="text-sm font-bold truncate">nitin.kumar@university.edu</p>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-all text-sm font-bold">
                  <User className="w-4 h-4" /> Profile Details
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-all text-sm font-bold">
                  <Settings className="w-4 h-4" /> System Preferences
                </button>
                <div className="h-[1px] bg-border/50 my-2 mx-2"></div>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all text-sm font-bold">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
