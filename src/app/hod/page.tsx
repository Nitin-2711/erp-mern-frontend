"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  TrendingUp, 
  Activity, 
  Map as MapIcon, 
  ArrowLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Target,
  MoreVertical,
  FlaskConical,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const facultyStats = [
  { name: "Dr. Arvind Gupta", role: "Professor", status: "Active", classes: 142, rating: 4.8, color: "text-emerald-500" },
  { name: "Prof. Sarah Khan", role: "Sr. Faculty", status: "In Hub", classes: 120, rating: 4.9, color: "text-indigo-400" },
  { name: "Mr. Nitin Verma", role: "Asst. Prof", status: "Leave", classes: 98, rating: 4.5, color: "text-rose-500" },
];

export default function HODDashboard() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Command <span className="gradient-text-master">Center</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring CSE Department Node Efficiency v4.0</p>
        </motion.div>

        <div className="flex gap-4">
           <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-tighter">
             <MapIcon className="w-4 h-4 text-indigo-400" /> Dept Heatmap
           </button>
           <button className="px-8 py-4 bg-primary-start text-white rounded-2xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter">
             <Zap className="w-4 h-4" /> Global Action
           </button>
        </div>
      </header>

      {/* Main Efficiency Core */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Faculty Presence", val: "92%", icon: UserCheck, color: "text-emerald-500" },
          { label: "Student Engagement", val: "88.4%", icon: Activity, color: "text-indigo-400" },
          { label: "Research Yield", val: "24 Shards", icon: FlaskConical, color: "text-cyan-400" },
          { label: "Active Nodes", val: "42 Batches", icon: Users, color: "text-amber-500" },
        ].map((s, i) => (
          <motion.div key={i} variants={item} className="glass-panel p-8 rounded-[2.5rem] hover:bg-white/5 transition-all border-white/5 group cursor-pointer relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
               <div className={`p-4 rounded-xl bg-white/5 ${s.color} group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6" />
               </div>
               <TrendingUp className="w-4 h-4 text-emerald-500" />
             </div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{s.label}</p>
             <h4 className="text-3xl font-black mt-2 tracking-tighter">{s.val}</h4>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-[3rem] p-12 overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <BarChart3 className="w-64 h-64" />
           </div>
           <h3 className="text-xl font-black tracking-tight mb-12 flex items-center gap-3 uppercase">
              <BarChart3 className="w-6 h-6 text-primary-end" /> Department Performance Shard
           </h3>
           <div className="h-64 flex items-end gap-3 px-2 pb-6 overflow-visible">
              {[60, 45, 80, 55, 95, 75, 40, 85, 65, 50, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 group/bar relative h-full flex items-end">
                   <motion.div 
                     initial={{ height: 0 }} 
                     animate={{ height: `${h}%` }} 
                     className="w-full bg-gradient-to-t from-primary-start/10 to-primary-start/40 rounded-t-xl hover:to-primary-start transition-all"
                   />
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-black">
                      Index {h}.2
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 flex justify-between px-2 text-[10px] font-black uppercase text-slate-500 opacity-60">
              <span>Semester Q1</span>
              <span>Semester Q2</span>
              <span>Semester Q3</span>
           </div>
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel rounded-[3rem] p-10 overflow-hidden relative">
            <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3 uppercase">
               <GraduationCap className="w-6 h-6 text-indigo-400" /> Faculty Elite Matrix
            </h3>
            <div className="space-y-6">
               {facultyStats.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 group-hover:text-white transition-colors border border-white/5">
                           {f.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                           <h5 className="font-black text-sm uppercase tracking-tight">{f.name}</h5>
                           <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">{f.role} • {f.classes} Classes</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 text-amber-500" />
                              <span className="text-sm font-black text-white">{f.rating}</span>
                           </div>
                           <p className={`text-[9px] font-black uppercase mt-1 tracking-widest ${f.color}`}>{f.status}</p>
                        </div>
                        <button className="p-3 hover:bg-white/10 rounded-xl transition-all"><MoreVertical className="w-4 h-4 text-slate-500" /></button>
                     </div>
                     {f.status === "In Hub" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>}
                  </div>
               ))}
            </div>
            <button className="w-full mt-10 py-4 rounded-2xl border border-dashed border-white/20 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-white/40 hover:text-white transition-all">Manage Hub Identity</button>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-10 rounded-[2.5rem] bg-indigo-600/10 border-indigo-600/20 col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-12 text-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
            <div className="w-24 h-24 rounded-3xl bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-indigo-500/40 animate-float translate-y-[-10px]">
               <ShieldCheck className="w-12 h-12" />
            </div>
            <div>
               <h4 className="text-3xl font-black tracking-tighter">Department Protocols Verified</h4>
               <p className="text-sm font-bold opacity-70 mt-4 leading-relaxed uppercase tracking-widest max-w-xl">Nexus Quant-Core has verified all faculty IDs and student attendance shards for this cycle. Audit successful.</p>
            </div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-10 rounded-[2.5rem] bg-emerald-600/10 border-emerald-600/20 text-center flex flex-col items-center justify-center cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
               <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-black text-emerald-400 uppercase tracking-tighter">Sync Cluster</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 leading-none">Force Department Refresh</p>
         </motion.div>
      </div>
    </div>
  );
}
