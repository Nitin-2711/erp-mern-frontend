"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  Target, 
  BarChart3, 
  Award, 
  FileCheck,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const semesters = [
  { id: 1, cgpa: "9.42", credits: "24/24", status: "Completed", color: "text-emerald-500" },
  { id: 2, cgpa: "9.18", credits: "22/22", status: "Completed", color: "text-indigo-500" },
  { id: 3, cgpa: "9.24", credits: "24/24", status: "Active", color: "text-cyan-500" },
];

const PerformanceBar = ({ label, val, color }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter opacity-60">
       <span>{label}</span>
       <span>{val}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
       <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} className={`h-full rounded-full ${color}`} />
    </div>
  </div>
);

export default function ResultsPage() {
  const { role } = useRole();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Academic <span className="gradient-text-master">Impact</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Measuring intellectual growth nodes for {role} 0xFA.</p>
        </motion.div>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-tighter">
            <Star className="w-4 h-4 text-amber-500" /> Dean's List Verified
          </button>
        </div>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {semesters.map((sem, i) => (
          <motion.div key={i} variants={item} className="glass-panel rounded-[2.5rem] p-10 group hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
               <div>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Quantum Cycle</p>
                  <h3 className="text-3xl font-black tracking-tighter mt-1">Semester 0{sem.id}</h3>
               </div>
               <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 ${sem.color}`}>
                 <Trophy className="w-7 h-7" />
               </div>
             </div>
             <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Score</span>
                  <span className={`text-4xl font-black tracking-tighter ${sem.color}`}>{sem.cgpa}</span>
                </div>
                <div className="h-[1px] w-full bg-white/5" />
                <div className="flex justify-between text-[11px] font-black uppercase text-slate-500">
                   <span>Credits Cleared</span>
                   <span className="text-white">{sem.credits}</span>
                </div>
             </div>
             <div className="mt-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Detailed Transcript</span>
                <ChevronRight className="w-4 h-4 text-indigo-400" />
             </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass-panel rounded-[3rem] p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <Award className="w-40 h-40" />
          </div>
          <h3 className="text-xl font-black tracking-tight mb-12 flex items-center gap-3 uppercase">
             <BarChart3 className="w-6 h-6 text-primary-end" /> Skill Frequency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
             <PerformanceBar label="Software Architecture" val={92} color="bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
             <PerformanceBar label="Neural Networks" val={85} color="bg-emerald-500 shadow-[0_0_10px_#10b981]" />
             <PerformanceBar label="Quantum Physics" val={78} color="bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
             <PerformanceBar label="Cyber Security" val={95} color="bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
             <PerformanceBar label="Data Structures" val={88} color="bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
             <PerformanceBar label="Embedded Systems" val={82} color="bg-purple-500 shadow-[0_0_10px_#a855f7]" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel rounded-[3rem] p-12 bg-gradient-to-br from-indigo-600 to-purple-800 text-white relative overflow-hidden group">
           <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all" />
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                 <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                 </div>
                 <h4 className="text-4xl font-black tracking-tighter leading-tight">Quantum Academic Certificate</h4>
                 <p className="text-sm font-bold mt-4 opacity-70 leading-relaxed uppercase tracking-widest">Verified by Nexus University Certification Node v4.2</p>
              </div>
              <button className="w-full mt-12 py-5 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-xl hover:scale-105 transition-all">Download Shard Transcript</button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
