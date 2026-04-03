'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/shared/config/nav-config';
import { useAuthStore, useUIStore } from '@/store';
import { LogOut, Command, User, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

const Tooltip = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -10, scale: 0.95 }}
    className="absolute left-[calc(100%+0.5rem)] px-3 py-1.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl z-[100] whitespace-nowrap pointer-events-none border border-white/10 dark:border-slate-200"
  >
    {text}
    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-950 dark:bg-white rotate-45" />
  </motion.div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredNav = navItems.filter((item) => item.roles.includes(user?.role || 'STUDENT'));

  return (
    <motion.aside
      className={cn(
        "h-screen z-50 flex flex-col overflow-visible relative transition-all duration-500",
        "bg-[var(--background)] border-r border-[var(--border)]"
      )}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-[#080c1d] dark:via-[#020617] dark:to-[#020617] -z-10" />
      
      {/* Sidebar Header - Clickable Toggle */}
      <button 
        onClick={toggleSidebar}
        className="flex items-center gap-4 p-8 overflow-hidden group hover:opacity-80 transition-opacity w-full text-left"
      >
        <div className="flex-shrink-0 w-11 h-11 bg-[var(--accent-gradient)] rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:rotate-[-10deg] group-hover:scale-110 transition-all duration-500">
          <Command size={22} strokeWidth={3} className="text-white" />
        </div>
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div 
              key="header-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white leading-none uppercase">Aura</span>
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] leading-none mt-1">Systems</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar overflow-x-visible">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                onHoverStart={() => !sidebarOpen && setHoveredItem(item.href)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ x: 4 }}
                className={cn(
                  "group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer overflow-visible leading-none",
                  isActive 
                    ? "bg-white dark:bg-white/5 text-indigo-600 dark:text-white border border-indigo-500/20 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/5" 
                    : "text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5"
                )}
              >
                <AnimatePresence>
                  {hoveredItem === item.href && <Tooltip text={item.title} />}
                </AnimatePresence>

                {isActive && (
                  <motion.div 
                    layoutId="active-bar"
                    className="absolute left-0 top-2 bottom-2 w-1.5 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(79,70,229,0.8)] z-50" 
                  />
                )}
                
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-500 relative",
                  isActive ? "bg-[var(--accent-gradient)] text-white shadow-xl shadow-indigo-600/40" : "group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10"
                )}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {item.badge && !sidebarOpen && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-[#020617]" />
                  )}
                </div>
                
                <AnimatePresence mode="popLayout">
                  {sidebarOpen && (
                    <motion.div 
                      key="label"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-1 items-center justify-between whitespace-nowrap"
                    >
                      <span className={cn("text-[13px] font-black uppercase tracking-tight", isActive ? "text-slate-900 dark:text-white" : "group-hover:text-slate-900 dark:group-hover:text-white")}>
                        {item.title}
                      </span>
                      {item.badge ? (
                        <span className="bg-rose-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight size={10} className={cn("transition-all duration-300 opacity-0 group-hover:opacity-100", isActive ? "text-indigo-400" : "text-slate-400")} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-[var(--border)] bg-slate-50/50 dark:bg-white/5 overflow-hidden">
        <div className={cn("flex items-center gap-3 p-3 rounded-[1.5rem] bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-indigo-500/10 transition-colors border border-[var(--border)] cursor-pointer group mb-4 shadow-sm")}>
          <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-[1px]">
             <div className="w-full h-full rounded-[11px] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <User size={20} className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors" />
             </div>
          </div>
          <AnimatePresence mode="popLayout">
            {sidebarOpen && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col truncate whitespace-nowrap"
              >
                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none mb-1.5">
                  {user?.name || 'Nitin Kumar'}
                </span>
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest truncate leading-none opacity-80">
                  {user?.role || 'Root Admin'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={logout}
          className={cn(
            "flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-300",
            "text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 font-black uppercase text-[10px] tracking-[0.25em]"
          )}
        >
          <LogOut size={18} />
          {sidebarOpen && <span className="whitespace-nowrap uppercase">Terminate</span>}
        </button>
      </div>
    </motion.aside>
  );
}
