'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/shared/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store';
import { Bell, Search, Command, Moon, Sun, Navigation } from 'lucide-react';
import { cn } from '@/utils';
import { useRole } from '@/context/RoleContext';

import { useRouter } from 'next/navigation';

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-xl bg-slate-950/60"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 overflow-hidden"
        >
          <div className="flex items-center gap-4 p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
            <Search size={22} className="text-indigo-500" />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or module name..."
              className="bg-transparent border-none outline-none text-lg font-black uppercase tracking-tight text-slate-800 dark:text-white w-full placeholder:text-slate-400 placeholder:normal-case placeholder:font-bold"
            />
          </div>

          <div className="p-4 max-h-[50vh] overflow-y-auto no-scrollbar">
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 mb-3 block opacity-60">Operations Matrix</span>
              {[
                { title: 'System Dashboard', icon: Command, shortcut: 'G D', color: 'indigo', href: '/dashboard' },
                { title: 'User Directory', icon: Command, shortcut: 'G U', color: 'emerald', href: '/dashboard/users' },
                { title: 'Department Nodes', icon: Command, shortcut: 'G S', color: 'rose', href: '/dashboard/departments' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => handleNavigate(item.href)}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110",
                      item.color === 'indigo' ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" :
                      item.color === 'emerald' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" :
                      "bg-rose-50 dark:bg-rose-500/10 text-rose-600"
                    )}>
                      <item.icon size={18} />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar, theme, setTheme } = useUIStore();
  const { role } = useRole();
  const [mounted, setMounted] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] animate-pulse" />
  );

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden font-display selection:bg-indigo-500/30">
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      
      {/* Visual Identity Layer - Subtle Ambient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.03),transparent)] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Sidebar Navigation */}
      <motion.div 
        animate={{ width: sidebarOpen ? 280 : 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-screen md:relative md:translate-x-0 border-r border-[var(--border)]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content Area */}
      <motion.main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar - Enhanced Glassmorphism */}
        <header className="h-[80px] bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--border)] flex items-center px-12 justify-between z-40 transition-colors duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-8 flex-1">
             <button 
               onClick={toggleSidebar} 
               className="p-3 text-slate-500 hover:bg-white dark:hover:bg-white/5 rounded-2xl transition-all active:scale-95 border border-[var(--border)] group overflow-hidden relative shadow-sm"
             >
                <Command size={22} className="text-indigo-500 group-hover:rotate-[30deg] transition-transform duration-500" />
             </button>
             
             {/* Command Palette Trigger */}
             <div 
               onClick={() => setIsCommandPaletteOpen(true)}
               className="hidden lg:flex items-center gap-4 px-6 py-3.5 bg-white/50 dark:bg-white/5 border border-[var(--border)] hover:border-indigo-500/30 rounded-2xl transition-all duration-500 group max-w-xl w-full cursor-pointer shadow-sm"
             >
                <Search size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors duration-300" />
                <span className="text-[13px] w-full text-slate-400 font-black uppercase tracking-[0.1em] group-hover:text-slate-600 transition-colors">Search Matrix...</span>
             </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Theme Toggle System - High Fidelity */}
            <div className="flex items-center bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl border border-[var(--border)] shadow-inner">
              <button 
                onClick={() => setTheme('light')}
                className={cn("p-2.5 rounded-xl transition-all duration-500", theme === 'light' ? "bg-white text-indigo-600 shadow-md scale-110" : "text-slate-400 hover:text-slate-600")}
              >
                <Sun size={18} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={cn("p-2.5 rounded-xl transition-all duration-500", theme === 'system' ? "bg-white dark:bg-slate-800 text-indigo-500 shadow-md scale-110" : "text-slate-400 hover:text-slate-600")}
              >
                <Navigation size={18} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn("p-2.5 rounded-xl transition-all duration-300", theme === 'dark' ? "bg-slate-800 text-amber-400 shadow-md scale-110" : "text-slate-400 hover:text-slate-600")}
              >
                <Moon size={18} strokeWidth={2.5} />
              </button>
            </div>

            <button className="p-3.5 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-white/5 rounded-2xl transition-all relative group border border-transparent hover:border-[var(--border)] shadow-sm hover:shadow-md">
              <Bell size={20} strokeWidth={2} />
              <div className="absolute top-[14px] right-[14px] w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--background)] animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
            </button>
            
            <div className="h-10 w-px bg-[var(--border)]" />
            
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none mb-1 px-2 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100/50">{role}</span>
                <span className="text-sm font-black text-[var(--foreground)] uppercase tracking-tight group-hover:text-indigo-600 transition-colors">Nitin Kumar</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-gradient)] p-[2px] shadow-xl shadow-indigo-500/10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-slate-900 flex items-center justify-center text-[13px] text-white font-black">NK</div>
              </div>
            </div>
          </div>
        </header>

        {/* content Area */}
        <div className="flex-1 overflow-y-auto px-12 py-12 no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={toggleSidebar} 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-40 md:hidden" 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
