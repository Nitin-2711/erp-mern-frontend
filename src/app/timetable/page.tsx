"use client";

import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Zap, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Filter,
  Monitor,
  Cpu,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const timetable = [
  { time: "09:00 AM", mon: "Quantum Computing", tue: "Neural Networks", wed: "Quantum Computing", thu: "Database Sys", fri: "Technical Comm", color: "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" },
  { time: "11:00 AM", mon: "Discrete Maths", tue: "Database Sys", wed: "Discrete Maths", thu: "Open Lab", fri: "Data Structures", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" },
  { time: "01:00 PM", mon: "LUNCH BREAK", tue: "LUNCH BREAK", wed: "LUNCH BREAK", thu: "LUNCH BREAK", fri: "LUNCH BREAK", color: "bg-white/5 border-transparent text-slate-500" },
  { time: "02:00 PM", mon: "Advanced Algorithms", tue: "Cyber security", wed: "Advanced Algorithms", thu: "Neural Networks", fri: "Workshop", color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400" },
  { time: "04:00 PM", mon: "Soft Skills", tue: "Embedded Sys", wed: "Soft Skills", thu: "Cyber security", fri: "PROJECTS", color: "bg-amber-500/20 border-amber-500/30 text-amber-400" },
];

export default function TimetablePage() {
  const { role } = useRole();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Temporal <span className="gradient-text-master">Grid</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Navigating the academic time-warp for {role} node.</p>
        </motion.div>

        <div className="flex gap-4 p-2 bg-white/5 border border-white/10 rounded-3xl">
          <button className="p-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all font-black text-xs uppercase tracking-tighter">
             <Filter className="w-4 h-4 text-indigo-400" />
          </button>
          <div className="flex items-center gap-4 px-6 border-l border-white/5">
             <ChevronLeft className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white" />
             <span className="text-[10px] font-black uppercase tracking-widest">March 27 - April 02</span>
             <ChevronRight className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white" />
          </div>
        </div>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="glass-panel rounded-[3.5rem] p-12 overflow-x-auto no-scrollbar relative">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <Clock className="w-40 h-40" />
         </div>
         <div className="grid grid-cols-6 gap-8 min-w-[1200px]">
            {/* Header Labels */}
            <div className="p-4" />
            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(day => (
                <div key={day} className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 text-center group cursor-pointer hover:bg-white/10 transition-all">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest transition-colors group-hover:text-primary-end">{day}</p>
                  <p className="text-[9px] font-black text-slate-600 mt-1 uppercase tracking-widest opacity-60">Nexus Cycle 0{day.length % 5}</p>
                </div>
            ))}

            {/* Timetable Rows */}
            {timetable.map((row, i) => (
               <>
                  <div key={`time-${i}`} className="p-6 flex items-center justify-center">
                     <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{row.time}</span>
                  </div>
                  {['mon', 'tue', 'wed', 'thu', 'fri'].map(day => (
                      <motion.div 
                        key={`${day}-${i}`}
                        variants={item}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`p-8 rounded-[2rem] border ${row.color} group relative cursor-pointer overflow-hidden transition-all shadow-xl shadow-black/20`}
                      >
                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Zap className="w-4 h-4 text-white animate-pulse" />
                         </div>
                         <h5 className="font-black text-sm uppercase tracking-tight leading-tight mb-4 ">{row[day as keyof typeof row]}</h5>
                         <div className="space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2">
                               <MapPin className="w-3 h-3" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Lab {Math.floor(Math.random() * 50) + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <User className="w-3 h-3" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Dr. Neural</span>
                            </div>
                         </div>
                      </motion.div>
                  ))}
               </>
            ))}
         </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-10 rounded-[2.5rem] flex items-center gap-8 group hover:bg-white/5 transition-all border-white/5 border border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
               <Monitor className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-xl font-black tracking-tight">Virtual Sync</h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Mirroring physical nodes to cloud</p>
            </div>
         </motion.div>
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-10 rounded-[2.5rem] flex items-center gap-8 group hover:bg-white/5 transition-all border-white/5 border border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
               <Cpu className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-xl font-black tracking-tight">AI Optimisation</h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Dynamic time shard management</p>
            </div>
         </motion.div>
         <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-10 rounded-[2.5rem] flex items-center gap-8 group hover:bg-white/5 transition-all border-white/5 border border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
               <Layers className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-xl font-black tracking-tight">Resource Map</h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Managing cluster dependencies</p>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
