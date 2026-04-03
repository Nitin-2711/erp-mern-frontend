'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/utils';
import Link from 'next/link';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  href?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'blue';
}

const colorMap = {
  indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20',
  emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
  rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20',
  amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
  blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
};

export const KPICard = ({ title, value, icon: Icon, trend, href = '#', color = 'indigo' }: KPICardProps) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
      >
        {/* Subtle Gradient Glow */}
        <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className={cn("p-3.5 rounded-2xl border transition-all duration-500 group-hover:rotate-12", colorMap[color])}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {trend && (
                <div className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
                  trend.isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {trend.value}%
                </div>
              )}
              <ArrowUpRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-none opacity-80">{title}</p>
            <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white tabular-nums leading-none pt-1">
              {value}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const DepartmentInsight = ({ departments }: { departments: { name: string, students: number, total: number, color: string }[] }) => {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-white/5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none mb-2">Departmental Matrix</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] leading-none">Global Shard Distribution</p>
        </div>
        <button className="px-6 py-3 bg-slate-50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-slate-100 dark:border-white/5">
          Expand Analytics
        </button>
      </div>
      
      <div className="space-y-8">
        {departments.map((dept) => (
          <div key={dept.name} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight group-hover:text-indigo-500 transition-colors">{dept.name}</span>
              <span className="text-[10px] font-black tabular-nums text-slate-400 uppercase tracking-widest">{dept.students} <span className="opacity-30">/</span> {dept.total}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-[1px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(dept.students / dept.total) * 100}%` }}
                className={cn("h-full rounded-full shadow-[0_0_10px_rgba(79,70,229,0.2)]", dept.color)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActivityLog = ({ activities }: { activities: any[] }) => {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-white/5 h-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase flex items-center gap-3">
          Live Stream
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-pulse" />
            <span className="h-1.5 w-1.5 bg-rose-500/50 rounded-full animate-pulse delay-75" />
          </div>
        </h3>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Chronos Logs</span>
      </div>
      
      <div className="space-y-10 relative pl-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500/50 before:via-slate-100 dark:before:via-slate-800 before:to-transparent">
        {activities.map((activity) => (
          <motion.div 
            key={activity.id} 
            whileHover={{ x: 8 }}
            className="relative pl-10 group cursor-pointer"
          >
            <div className={cn(
               "absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-4 border-white dark:border-slate-900 z-10 transition-all duration-500 group-hover:scale-125",
               activity.type === 'SYSTEM' ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : 
               activity.type === 'ATTENDANCE' ? "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]" : 
               "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            )} />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black tracking-[0.15em] text-indigo-500 dark:text-indigo-400 uppercase leading-none">{activity.type}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tabular-nums">{activity.time}</span>
              </div>
              <p className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight leading-tight uppercase group-hover:text-indigo-500 transition-colors">{activity.title}</p>
              <p className="text-[10px] font-bold text-slate-500 opacity-60 lowercase leading-relaxed border-l-2 border-slate-100 dark:border-white/5 pl-3 mt-1 italic">{activity.status}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ActionCard = ({ title, icon: Icon, href = '#', color = 'indigo', onClick }: { title: string, icon: any, href?: string, color?: string, onClick?: () => void }) => {
  const cMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
  };

  return (
    <Link href={href}>
      <motion.button
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className="group relative flex flex-col items-start justify-between p-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 w-full text-left overflow-hidden pt-10"
      >
        <div className="absolute -inset-px bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className={cn("relative z-10 p-4 rounded-[1.5rem] border mb-10 transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110", cMap[color] || cMap.indigo)}>
          <Icon size={28} strokeWidth={2.5} />
        </div>
        
        <div className="relative z-10 flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none group-hover:text-indigo-400 transition-colors">Invoke Module</span>
          <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">{title}</span>
        </div>
      </motion.button>
    </Link>
  );
};
