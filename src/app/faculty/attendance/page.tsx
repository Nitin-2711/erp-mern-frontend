"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  CheckCircle2, 
  XSphere, 
  Clock, 
  Save, 
  Search,
  ArrowLeft,
  XCircle,
  MoreVertical,
  MinusCircle,
  Zap,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } };

const initialStudents = [
  { id: "S101", name: "Rahul Sharma", roll: "22BCS101", status: "present" },
  { id: "S102", name: "Priya Singh", roll: "22BCS102", status: "present" },
  { id: "S103", name: "Amit Kumar", roll: "22BCS103", status: "absent" },
  { id: "S104", name: "Sneha Reddy", roll: "22BCS104", status: "present" },
  { id: "S105", name: "Vikram Malhotra", roll: "22BCS105", status: "present" },
  { id: "S106", name: "Ananya Iyer", roll: "22BCS106", status: "present" },
];

export default function FacultyAttendance() {
  const [students, setStudents] = useState(initialStudents);

  const toggleStatus = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ));
  };

  const presentCount = students.filter(s => s.status === 'present').length;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Quantum Hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter shrink-0">Registry <span className="gradient-text-master">Core</span></h2>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-widest text-xs opacity-60 italic">Session: Advanced Neural Networks • Cluster 4</p>
        </motion.div>

        <div className="flex gap-4">
          <div className="hidden lg:flex items-center gap-6 px-10 py-4 glass-panel rounded-3xl border-emerald-500/20">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Headcount</p>
                <p className="text-2xl font-black text-emerald-500 tracking-tighter">{presentCount} / {students.length}</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
             </div>
          </div>
          <button className="px-10 py-4 bg-primary-start text-white rounded-3xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter animate-pulse hover:animate-none">
            <Save className="w-4 h-4" /> Finalize Registry
          </button>
        </div>
      </header>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 glass-panel rounded-3xl p-4 flex items-center gap-4 border-white/5 bg-white/5">
           <Search className="w-5 h-5 text-slate-500 ml-4" />
           <input placeholder="Search ID or Name in Shard..." className="bg-transparent border-none outline-none text-white w-full text-sm font-bold placeholder:text-slate-600" />
        </div>
        <div className="flex gap-4">
           {['All', 'Present', 'Absent'].map(f => (
              <button key={f} className={`px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${f === 'All' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                {f}
              </button>
           ))}
        </div>
      </div>

      {/* Student Registry Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {students.map((student) => (
          <motion.div 
            key={student.id} 
            variants={item}
            onClick={() => toggleStatus(student.id)}
            className={`p-8 rounded-[2.5rem] glass-panel border-white/5 group cursor-pointer transition-all relative overflow-hidden ${student.status === 'absent' ? 'opacity-50 ring-2 ring-rose-500/20' : 'hover:bg-white/5 active:scale-95'}`}
          >
            {student.status === 'present' ? (
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity">
                 <ShieldCheck className="w-24 h-24 text-emerald-500" />
              </div>
            ) : (
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity">
                 <XCircle className="w-24 h-24 text-rose-500" />
              </div>
            )}
            
            <div className="flex justify-between items-start relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-black text-xl border border-white/10 text-slate-300">
                  {student.name.split(' ').map(n => n[0]).join('')}
               </div>
               <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${student.status === 'present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'}`}>
                 {student.status}
               </div>
            </div>

            <div className="mt-8 relative z-10">
               <h4 className="text-xl font-black tracking-tight">{student.name}</h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-60 leading-none">{student.roll}</p>
            </div>

            <div className="mt-8 flex items-center gap-3 relative z-10">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${student.status === 'present' ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-0'}`} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified</span>
            </div>
          </motion.div>
        ))}
        
        {/* Rapid Deployment Button */}
        <motion.div 
           variants={item}
           className="p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all cursor-pointer"
        >
           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-indigo-500" />
           </div>
           <h4 className="text-xl font-black tracking-tight uppercase">Rapid Scan</h4>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 leading-none">Sync class via Bio-Node</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
