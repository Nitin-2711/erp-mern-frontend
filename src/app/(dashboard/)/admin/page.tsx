'use client';

import React from 'react';
import DashboardLayout from '@/shared/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  BookOpen, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  Clock,
  Bell,
  Calendar,
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/utils';

const data = [
  { name: 'Jan', students: 4000, revenue: 2400 },
  { name: 'Feb', students: 3000, revenue: 1398 },
  { name: 'Mar', students: 2000, revenue: 9800 },
  { name: 'Apr', students: 2780, revenue: 3908 },
  { name: 'May', students: 1890, revenue: 4800 },
  { name: 'Jun', students: 2390, revenue: 3800 },
];

const COLORS = ['#6366f1', '#3b82f6', '#8b5cf6', '#ec4899'];

const stats = [
  { title: "Total Students", value: "12,450", change: "+12.5%", isPositive: true, icon: Users, color: "indigo" },
  { title: "Total Faculty", value: "840", change: "+4.2%", isPositive: true, icon: GraduationCap, color: "blue" },
  { title: "Net Revenue", value: "$2.4M", change: "-2.1%", isPositive: false, icon: DollarSign, color: "emerald" },
  { title: "Active Courses", value: "142", change: "+8.4%", isPositive: true, icon: BookOpen, color: "purple" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-[1600px] mx-auto pb-10">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Institutional <span className="gradient-text-master">Performance</span>
            </h1>
            <p className="text-slate-500 max-w-2xl font-medium">
              Real-time analytics and student management overview for Spring Semester 2026.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-sm">
                <Calendar size={18} className="text-indigo-500" />
                <span>Export Report</span>
             </button>
             <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/30">
                <span>Update Stats</span>
             </button>
          </div>
        </header>

        {/* Global Statistics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel p-6 rounded-[2rem] border-white/5 shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl rounded-full transition-transform group-hover:scale-150" />
              
              <div className="flex items-start justify-between">
                <div className={cn("p-4 rounded-2xl text-white shadow-xl shadow-indigo-500/10 animate-liquid", 
                  stat.color === 'indigo' ? "bg-indigo-500" :
                  stat.color === 'blue' ? "bg-blue-500" :
                  stat.color === 'emerald' ? "bg-emerald-500" : "bg-purple-500"
                )}>
                  <stat.icon size={26} />
                </div>
                <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold", 
                  stat.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>

              <div className="mt-8 space-y-1">
                <h3 className="text-slate-500 dark:text-slate-400 font-bold tracking-tight uppercase text-xs">
                  {stat.title}
                </h3>
                <div className="text-3xl font-black tracking-tighter">
                  {stat.value}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Charts & Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-8 shadow-2xl relative overflow-hidden"
          >
             <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black">Revenue vs <span className="text-indigo-500">Student Count</span></h2>
                   <p className="text-slate-400 text-sm font-medium">Monthly performance analytics with standard growth deviation.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl border border-white/5">
                   {['Week', 'Month', 'Year'].map((t) => (
                      <button key={t} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", t === 'Month' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white")}>
                        {t}
                      </button>
                   ))}
                </div>
             </div>

             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dx={-10} />
                    <Tooltip 
                       contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)'}}
                       itemStyle={{fontWeight: 700}}
                    />
                    <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </motion.div>

          {/* Side Module: Recent Activities */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-8 shadow-2xl overflow-hidden relative"
          >
             <h2 className="text-2xl font-black">Nexus <span className="text-emerald-500">Timeline</span></h2>
             
             <div className="flex-1 space-y-8 overflow-y-auto pr-2 no-scrollbar">
                {[
                  { user: "Sarah J.", action: "Posted New Assignment", time: "2 min ago", icon: BookOpen, color: "indigo" },
                  { user: "Michael L.", action: "Fee Payment Received", time: "15 min ago", icon: DollarSign, color: "emerald" },
                  { user: "Robert D.", action: "Requested Leave", time: "1 hour ago", icon: Clock, color: "blue" },
                  { user: "System", action: "Server Maintenance", time: "3 hours ago", icon: Bell, color: "rose" },
                  { user: "Anita P.", action: "Course Enrollment", time: "Yesterday", icon: Users, color: "purple" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-liquid shadow-lg shadow-black/10", 
                      activity.color === 'indigo' ? "bg-indigo-500" :
                      activity.color === 'emerald' ? "bg-emerald-500" :
                      activity.color === 'blue' ? "bg-blue-500" :
                      activity.color === 'rose' ? "bg-rose-500" : "bg-purple-500"
                    )}>
                      <activity.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 border-b border-white/5 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm tracking-tight">{activity.user}</span>
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{activity.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1 group-hover:text-white transition-colors">{activity.action}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             <button className="w-full py-4 mt-4 glass-panel border-white/5 rounded-2xl font-bold bg-slate-100/5 dark:bg-slate-800/40 hover:bg-indigo-600 hover:text-white transition-all shadow-lg active:scale-95 group">
                View All Activity
             </button>
          </motion.div>

        </section>

      </div>
    </DashboardLayout>
  );
}
