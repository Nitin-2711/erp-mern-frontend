"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Wallet, 
  Search, 
  Calendar, 
  Mail, 
  Bell,
  MoreHorizontal,
  Plus
} from "lucide-react";

export default function Home() {
  const stats = [
    { title: "Total Students", value: "4,500+", change: "+12.5%", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Active Staff", value: "180+", change: "+5.1%", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { title: "Course Revenue", value: "$4.1M", change: "+18.2%", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Graduation Rate", value: "98.2%", change: "+2.4%", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10 animate-in pl-8 pr-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Dashboard <span className="gradient-text tracking-tighter ml-1">Overview</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Welcome back, Administrator. Here's your university's real-time snapshot.</p>
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-11 pr-6 py-2.5 rounded-2xl glass-panel border-none outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all"
            />
          </div>
          <button className="p-3 rounded-2xl glass-panel hover:bg-indigo-500 hover:text-white transition-all group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            variants={item}
            className="p-6 rounded-[2rem] glass-panel group relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            
            <div className={`p-4 rounded-2xl w-fit mb-6 ${stat.bg} group-hover:rotate-6 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            
            <div className="relative">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-xs font-black text-emerald-500 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-400">Monthly Target</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 rounded-[2.5rem] glass-panel p-8 relative overflow-hidden min-h-[480px]"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black tracking-tight underline decoration-indigo-500 decoration-4 underline-offset-8">Growth Analytics</h3>
              <p className="text-sm text-slate-400 mt-3 font-medium">Historical enrollment and revenue trends</p>
            </div>
            <div className="flex gap-2">
              {['1W', '1M', '1Y'].map((t) => (
                <button key={t} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${t === '1M' ? 'bg-indigo-600 text-white' : 'glass-panel hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative h-80 flex items-end justify-between px-4 pb-4">
            {/* Visual placeholder for chart */}
            {[60, 85, 45, 90, 65, 75, 55, 95, 80, 70, 40, 85].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 100 }}
                className="w-8 bg-indigo-500/10 hover:bg-indigo-500/40 rounded-t-xl transition-colors relative group cursor-pointer"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">
                  Value: {h}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="space-y-8">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-[2.5rem] glass-panel p-8 h-full shadow-2xl shadow-indigo-500/5 group"
          >
            <div className="flex items-center justify-between mb-8 group-hover:rotate-1 transition-transform">
              <h3 className="text-lg font-black tracking-tight">Recent Activity</h3>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              {[
                { type: "Registration", name: "Sarah Mithchell", time: "12m ago", color: "bg-emerald-500" },
                { type: "Payment", name: "Academic Year Fees", time: "45m ago", color: "bg-indigo-500" },
                { type: "Update", name: "Course Curriculum", time: "2h ago", color: "bg-amber-500" },
                { type: "Alert", name: "Server Maintenance", time: "5h ago", color: "bg-rose-500" },
                { type: "Message", name: "Faculty Board Meeting", time: "1d ago", color: "bg-blue-500" },
              ].map((activity, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex gap-4 group/item cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full ${activity.color} mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform`}></div>
                  <div className="flex-1 border-b border-slate-100 dark:border-slate-800/50 pb-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-500 transition-colors uppercase tracking-tight">{activity.type}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{activity.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
