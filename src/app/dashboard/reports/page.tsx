"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Download, 
  FileText, 
  PieChart, 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowLeft,
  Calendar,
  Filter,
  Layers,
  Zap,
  CheckCircle2,
  Table as TableIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function ReportsPage() {
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: string) => {
    setIsExporting(true);
    showToast(`Initializing ${type} Shard Generation...`, "info");
    
    setTimeout(() => {
        setIsExporting(false);
        showToast(`${type} Report successfully exported to Local Node.`, "success");
    }, 2500);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Strategic <span className="gradient-text-master">Intelligence</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Aggregating academic data shards into actionable insights.</p>
        </motion.div>

        <div className="flex gap-4">
           <button onClick={() => handleExport("PDF")} disabled={isExporting} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-tighter text-slate-400 group relative overflow-hidden">
             {isExporting && <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />}
             <FileText className="w-4 h-4 text-rose-500" /> Export PDF Shard
           </button>
           <button onClick={() => handleExport("EXCEL")} disabled={isExporting} className="px-8 py-4 bg-primary-start text-white rounded-2xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter">
             <TableIcon className="w-4 h-4" /> Export Data Matrix
           </button>
        </div>
      </header>

      {/* Global Efficiency Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Overall Attendance", val: "88.4%", icon: Activity, color: "text-emerald-500" },
          { label: "Faculty Engagement", val: "94.2%", icon: Users, color: "text-indigo-400" },
          { label: "Exam Readiness", val: "72.0%", icon: Zap, color: "text-amber-400" },
          { label: "Financial Sync", val: "Verified", icon: CheckCircle2, color: "text-cyan-400" },
        ].map((s, i) => (
          <motion.div key={i} variants={item} className="glass-panel p-10 rounded-[2.5rem] border-white/5 hover:bg-white/[0.04] transition-all group cursor-default relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl bg-white/5 ${s.color} group-hover:scale-110 transition-transform`}>
                   <s.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">+2.4%</div>
             </div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{s.label}</p>
             <h4 className="text-4xl font-black mt-2 tracking-tighter">{s.val}</h4>
             <div className="absolute bottom-[-20%] right-[-10%] w-24 h-24 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Performance Heatmap */}
         <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 glass-panel rounded-[3.5rem] p-12 overflow-hidden relative">
            <h3 className="text-xl font-black tracking-tight mb-12 flex items-center gap-3 uppercase">
               <TrendingUp className="w-6 h-6 text-primary-end" /> Periodic Efficiency Heatmap
            </h3>
            <div className="h-64 flex items-end gap-3 px-2 pb-6 relative">
               {/* 12 Months Projection */}
               {[65, 42, 88, 55, 95, 75, 40, 85, 65, 50, 90, 70].map((h, i) => (
                 <div key={i} className="flex-1 group/bar relative h-full flex items-end">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }} 
                      transition={{ duration: 1.5, delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-indigo-500/10 to-indigo-500/40 rounded-t-xl group-hover/bar:from-indigo-500/40 group-hover/bar:to-indigo-500 transition-all cursor-crosshair"
                    />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all p-2 bg-indigo-500 rounded-xl text-[9px] font-black text-white shadow-2xl">
                       {h}.4% Node Efficiency
                    </div>
                 </div>
               ))}
               <div className="absolute inset-x-10 bottom-4 h-[1px] bg-white/[0.05]" />
            </div>
            <div className="mt-8 flex justify-between px-2 text-[10px] font-black uppercase text-slate-500 opacity-60">
               <span>March '26 Cluster</span>
               <span>September '26 Cluster</span>
            </div>
         </motion.div>

         {/* Distribution Radar */}
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-[3.5rem] p-12 flex flex-col justify-between">
            <div>
               <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3 uppercase">
                  <PieChart className="w-6 h-6 text-cyan-400" /> Resource Matrix
               </h3>
               <div className="space-y-6">
                  {[
                    { l: "Faculty Shards", p: "15%", c: "bg-indigo-500" },
                    { l: "Identity Overlays", p: "65%", c: "bg-cyan-500" },
                    { l: "Infrastructure Shards", p: "20%", c: "bg-amber-500" },
                  ].map((it, idx) => (
                    <div key={idx} className="group cursor-default">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{it.l}</span>
                          <span className="text-[10px] font-black text-white">{it.p}</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: it.p }} 
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className={`h-full ${it.c} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-12 p-8 rounded-[2rem] bg-indigo-500 shadow-2xl shadow-indigo-500/20 text-center group cursor-pointer hover:scale-105 active:scale-95 transition-all">
               <h4 className="text-xl font-black uppercase tracking-tighter">Sync Core Hub</h4>
               <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mt-1">Force Real-time Auditing</p>
            </div>
         </motion.div>
      </div>

      {/* Territory Shards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-10 rounded-[3.5rem] bg-white/[0.02] border-white/5 flex items-center gap-10 group hover:bg-white/[0.04] transition-all">
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
               <BarChart3 className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
               <h4 className="text-2xl font-black tracking-tighter">Daily Attendance Shard</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase mt-4 tracking-widest leading-relaxed">Generated automatically every 23:59 Nexus Mean Time. Audits entire identity Lattice for potential coherence loss.</p>
               <button className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" /> Download Latest Audit
               </button>
            </div>
         </motion.div>
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-10 rounded-[3.5rem] bg-white/[0.02] border-white/5 flex items-center gap-10 group hover:bg-white/[0.04] transition-all">
            <div className="w-24 h-24 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
               <Calendar className="w-10 h-10 text-indigo-500" />
            </div>
            <div>
               <h4 className="text-2xl font-black tracking-tighter">Semester Index Report</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase mt-4 tracking-widest leading-relaxed">Consolidated performance matrix of all 8 semesters. Includes neural grading trends and territorial rank shards.</p>
               <button className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" /> Export Ledger Cluster
               </button>
            </div>
         </motion.div>
      </div>

      {/* Advanced Filter Shard */}
      <div className="glass-panel p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10 opacity-60 hover:opacity-100 transition-opacity italic">
         <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-500" />
            <p className="text-sm font-medium text-slate-400 tracking-tight">Filtering insights based on Cluster 4-A and CSE Territorial Nodes.</p>
         </div>
         <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Reset Matrix Filter</button>
      </div>
    </div>
  );
}
