'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/shared/config/nav-config';
import { useAuthStore, useUIStore } from '@/store';
import { LogOut, ChevronLeft, ChevronRight, Search, Command } from 'lucide-react';
import { cn } from '@/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const filteredNav = navItems.filter((item) => item.roles.includes(user?.role || 'STUDENT'));

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className={cn(
        "fixed left-0 top-0 h-screen z-50 glass-panel border-r border-white/5 transition-all duration-300 ease-in-out shadow-2xl flex flex-col",
        "bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl saturate-150 shadow-blue-500/10"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl animate-liquid glow-primary flex items-center justify-center p-2 shadow-lg shadow-indigo-500/20">
            <Command className="text-white" size={24} />
          </div>
          {sidebarOpen && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl tracking-tight gradient-text-master"
            >
              Aura ERP
            </motion.span>
          )}
        </div>
      </div>

      {/* Main Nav Section */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30" 
                    : "text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/60"
                )}
              >
                <Icon size={22} className={cn("flex-shrink-0 transition-colors", isActive ? "text-white" : "group-hover:text-indigo-500")} />
                
                {sidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 items-center justify-between overflow-hidden"
                  >
                    <span className="font-medium whitespace-nowrap">{item.title}</span>
                    {item.badge && (
                      <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg shadow-rose-500/20">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Active Indicator Tooltip Style */}
                {!sidebarOpen && isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-l-full shadow-glow shadow-white/50" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className={cn("flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors hover:bg-rose-500/10 text-rose-500 cursor-pointer")} onClick={logout}>
          <LogOut size={22} />
          {sidebarOpen && <span className="font-medium translate-x-1">Logout</span>}
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-20 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-500 shadow-xl shadow-black/5 hover:scale-110 transition-transform"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
