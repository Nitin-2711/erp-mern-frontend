"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Plus, 
  Users, 
  Map as MapIcon, 
  TrendingUp, 
  MoreVertical, 
  ShieldCheck, 
  Zap, 
  ArrowLeft,
  Building,
  Target,
  FlaskConical,
  GraduationCap,
  Activity,
  Trash2,
  Edit
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const initialDepts = [
  { id: "D01", name: "Computer Science", code: "CSE", hod: "Dr. Arvind Gupta", faculty: 24, students: 850, color: "text-indigo-400" },
  { id: "D02", name: "Mechanical Eng", code: "ME", hod: "Prof. Sarah Khan", faculty: 18, students: 620, color: "text-emerald-400" },
  { id: "D03", name: "Electrical Eng", code: "EE", hod: "Dr. Nitin Verma", faculty: 15, students: 540, color: "text-amber-400" },
];

export default function DepartmentsPage() {
  const { showToast } = useToast();
  const [depts, setDepts] = useState(initialDepts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDept = (e: any) => {
    e.preventDefault();
    showToast("Initializing Departmental Cluster...", "info");
    setTimeout(() => {
        showToast("Department successfully mapped to Nexus Lattice.", "success");
        setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20">
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="relative bg-[#0F172A] border border-white/10 p-10 rounded-[3rem] max-w-xl w-full shadow-2xl overflow-hidden">
               <div className="mb-10 p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 inline-block">
                  <Building className="w-10 h-10 text-indigo-500" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter">Register <span className="text-indigo-500">Unit</span></h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 mb-10 opacity-60">Expanding academic territory nodes.</p>
               
               <form onSubmit={handleAddDept} className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Dept Name</label>
                    <input required placeholder="e.g. Civil Engineering" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white uppercase tracking-tighter" />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Unique Code</label>
                    <input required placeholder="e.g. CIV" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white uppercase" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-white shadow-2xl shadow-indigo-600/30">Provision Cluster</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Core Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter shrink-0">Academic <span className="gradient-text-master">Lattice</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring {depts.length} Territorial Org Units.</p>
        </motion.div>

        <div className="flex gap-4">
          <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-primary-start text-white rounded-[1.8rem] flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter">
            <Plus className="w-4 h-4" /> Expand Org Unit
          </button>
        </div>
      </header>

      {/* Stats Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Total Students", val: "2,450", icon: Users, color: "text-indigo-400" },
          { label: "Active Faculty", val: "142", icon: GraduationCap, color: "text-emerald-400" },
          { label: "Dept Efficiency", val: "94.2%", icon: Activity, color: "text-cyan-400" },
          { label: "New Enrolments", val: "+14%", icon: TrendingUp, color: "text-amber-400" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:bg-white/[0.03] transition-all cursor-default">
             <div className="flex items-center gap-6 mb-4">
                <div className={`p-4 rounded-xl bg-white/5 border border-white/5 ${s.color}`}>
                   <s.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                   <h4 className="text-3xl font-black tracking-tighter">{s.val}</h4>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Departments Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {depts.map((dept) => (
          <motion.div key={dept.id} variants={item} className="glass-panel rounded-[3.5rem] p-10 group hover:bg-white/[0.04] border-white/5 transition-all relative overflow-hidden">
             <div className="flex justify-between items-start mb-10">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                   <Target className={`w-10 h-10 ${dept.color}`} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-3 bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-400 rounded-xl transition-all border border-white/5"><Edit className="w-4 h-4" /></button>
                   <button className="p-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 rounded-xl transition-all border border-white/5"><Trash2 className="w-4 h-4" /></button>
                </div>
             </div>

             <div className="mb-8">
                <h4 className="text-3xl font-black tracking-tighter leading-none group-hover:text-primary-end transition-colors">{dept.name}</h4>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Node Key: {dept.code}</p>
             </div>

             <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Supervisor Node</span>
                   <span className="text-xs font-black text-white uppercase tracking-tight">{dept.hod}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Faculty Shards</span>
                   <span className="text-xs font-black text-white">{dept.faculty} Nodes</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Identity Load</span>
                   <span className="text-xs font-black text-white">{dept.students} Units</span>
                </div>
             </div>

             <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-3 overflow-hidden">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-[#0F172A] bg-slate-800 border border-white/10 flex items-center justify-center font-black text-[10px] text-slate-500">
                        {String.fromCharCode(64 + i)}
                     </div>
                   ))}
                </div>
                <button className="p-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all font-black text-[9px] uppercase tracking-widest border border-indigo-500/20 group/btn flex items-center gap-2">
                   Audit Node <Zap className="w-3 h-3 group-hover/btn:animate-pulse" />
                </button>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
          </motion.div>
        ))}

        <motion.div variants={item} onClick={() => setIsModalOpen(true)} className="p-10 rounded-[3.5rem] border-4 border-dashed border-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all opacity-40 hover:opacity-100">
           <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="w-10 h-10 text-slate-500" />
           </div>
           <h4 className="text-xl font-black tracking-tighter uppercase text-slate-500">New Acad Cluster</h4>
           <p className="text-[9px] font-black text-slate-600 uppercase mt-2 tracking-widest leading-none">Expand Territorial Lattice</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
