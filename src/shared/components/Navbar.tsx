'use client';

import { useAuthStore } from '@/store/authStore';
import { Badge } from '@/shared/ui/badge';
import { Bell, Search, Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/utils';

const Navbar = () => {
  const { user } = useAuthStore();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
  }, [theme]);

  const toggleTheme = () => {
    const modes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const next = modes[(modes.indexOf(theme) + 1) % 3];
    setTheme(next);
  };

  return (
    <header className="h-20 bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6 max-w-xl w-full">
        {/* Quick Search */}
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search students, faculty, or courses..."
            className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-transparent focus:border-indigo-500/30 focus:bg-white dark:focus:bg-slate-950 rounded-xl py-2 px-10 text-sm transition-all focus:ring-0 outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-500">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-500">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400"
        >
          {theme === 'light' ? <Sun size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Monitor size={20} />}
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400 relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-950" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none mb-1">
              {user?.name || 'Academic User'}
            </p>
            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider py-0 px-1.5 border-slate-200 dark:border-slate-700">
              {user?.role || 'STUDENT'}
            </Badge>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            {user?.name?.[0] || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
