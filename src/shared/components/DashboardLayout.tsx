'use client';

import React from 'react';
import Sidebar from '@/shared/components/Sidebar';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store';
import { Bell, Search, Settings, User, Command } from 'lucide-react';
import { cn } from '@/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <motion.main
        initial={false}
        animate={{ 
          marginLeft: sidebarOpen ? 280 : 80,
          width: `calc(100% - ${sidebarOpen ? 280 : 80}px)`
        }}
        className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300"
      >
        {/* Top Navigation Bar */}
        <header className="h-20 glass-panel border-b border-white/5 flex items-center px-8 justify-between z-10">
          <div className="flex items-center gap-4 bg-slate-200/50 dark:bg-slate-800/40 px-4 py-2.5 rounded-2xl border border-white/5 min-w-[320px] transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Anything... (⌘K)" 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500 font-medium" 
            />
            <div className="flex items-center gap-1 bg-slate-300 dark:bg-slate-700 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-500">
               <Command size={10} /> K
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick Stats / Feedback */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
               <div className="status-pulse-dot" />
               <span className="text-xs font-bold uppercase tracking-wider">System Operational</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-2xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#020617]" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-2xl transition-all">
                <Settings size={20} />
              </button>
              
              <div className="h-10 w-px bg-slate-200 dark:border-slate-800 mx-2" />
              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Admin Account</div>
                  <div className="text-sm font-semibold group-hover:text-indigo-500 transition-colors">Dr. Sarah Johnson</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-indigo-500/20">
                  <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center overflow-hidden">
                    <User className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar scroll-smooth">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
