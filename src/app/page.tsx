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
  Plus,
  ClipboardCheck
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
    <div className="space-y-10 animate-in">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Institutional <span className="gradient-text tracking-tighter">Command</span> Hub
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium max-w-2xl leading-relaxed">
            Welcome back, Nitin Kumar. You have <span className="text-indigo-600 font-bold">12 new notifications</span> and 4 pending approvals today.
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search faculty, students, or reports..." 
              className="pl-12 pr-6 py-4 rounded-[1.5rem] glass-panel border-none outline-none focus:ring-2 focus:ring-indigo-500/50 w-80 transition-all text-sm font-bold shadow-xl shadow-slate-200/20 dark:shadow-none"
            />
          </div>
          <button className="px-6 py-4 rounded-[1.5rem] bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            variants={item}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="p-8 rounded-[2.5rem] glass-panel group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/5 rounded-full group-hover:scale-110 transition-transform duration-700 ease-out" />
            
            <div className={`p-4 rounded-2xl w-fit mb-8 shadow-sm ${stat.bg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            
            <div className="relative z-10">
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.title}</p>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-xs font-black text-emerald-500 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + idx}`} alt="User" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  +12
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Growth Analytics */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="xl:col-span-2 rounded-[3rem] glass-panel p-10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-indigo-500" />
                Growth Analytics
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Real-time comparison between enrollment and revenue streams</p>
            </div>
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit">
              {['1W', '1M', '1Y'].map((t) => (
                <button key={t} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${t === '1M' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full flex items-end gap-3 justify-between px-2 pt-10">
            {[40, 65, 45, 80, 55, 95, 75, 60, 85, 40, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer h-full justify-end">
                <div className="relative w-full max-w-[40px] flex items-end justify-center h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 60, damping: 12 }}
                    className="w-full bg-gradient-to-t from-indigo-500/20 to-indigo-500 rounded-[1rem] relative overflow-hidden group-hover:from-indigo-600 group-hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/5"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                    <div className="bg-slate-900 text-white text-[10px] font-black py-2 px-3 rounded-xl shadow-2xl">
                      ${(h * 12.5).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recent Events & Quick Actions */}
        <div className="space-y-10">
          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="rounded-[3rem] glass-panel p-8 group border-indigo-500/10 dark:border-indigo-500/5 hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black tracking-tight">System Events</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { type: "Approval", name: "Budget Review Q2", time: "12m ago", color: "bg-emerald-500", icon: Wallet },
                { type: "Enrollment", name: "Engineering Batch B", time: "45m ago", color: "bg-indigo-500", icon: Users },
                { type: "Security", name: "New Login Detected", time: "2h ago", color: "bg-rose-500", icon: Bell },
                { type: "Update", name: "Exam Portal Patch", time: "5h ago", color: "bg-amber-500", icon: ClipboardCheck },
              ].map((activity, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-5 group/item cursor-pointer"
                >
                  <div className={`p-3 rounded-[1.2rem] ${activity.color}/10 group-hover/item:scale-110 transition-transform`}>
                    {<activity.icon className={`w-5 h-5 ${activity.color.replace('bg-', 'text-')}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{activity.type}</p>
                      <span className="text-[10px] font-bold text-slate-400">{activity.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover/item:text-indigo-600 transition-colors uppercase tracking-tight leading-none">{activity.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-bold hover:border-indigo-500/40 hover:text-indigo-500 transition-all">
              View Audit Logs
            </button>
          </motion.section>

          {/* Productivity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white shadow-2xl shadow-indigo-500/40 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-all duration-700">
              <GraduationCap className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Academic Year 2026</p>
              <h4 className="text-2xl font-black tracking-tight mb-6">Course Optimization<br/>Report is Ready!</h4>
              <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:shadow-xl transition-shadow">
                Download Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
