"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ArrowLeft,
  GraduationCap,
  Users,
  Layers,
  Code2,
  Zap,
  CheckCircle2,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

const initialSubjects = [
  { id: "SUB-101", name: "Quantum Computing", code: "QC-2026", faculty: "Dr. Arvind Gupta", dept: "CSE", sem: "06", credits: 4, type: "Core" },
  { id: "SUB-102", name: "Neural Networks", code: "NN-405", faculty: "Prof. Sarah Khan", dept: "CSE", sem: "04", credits: 3, type: "Elective" },
  { id: "SUB-103", name: "Database Systems", code: "DB-301", faculty: "Mr. Nitin Verma", dept: "IT", sem: "04", credits: 4, type: "Core" },
  { id: "SUB-104", name: "Machine Learning", code: "ML-502", faculty: "Dr. Priya Singh", dept: "CSE", sem: "06", credits: 4, type: "Lab" },
];

export default function SubjectSetupPage() {
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSubject = (e: any) => {
    e.preventDefault();
    showToast("Provisioning new course shard in global index...", "info");
    setTimeout(() => {
        showToast("Subject successfully assigned and synced.", "success");
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
                  <BookOpen className="w-10 h-10 text-indigo-500" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter text-white">Subject <span className="text-indigo-500">Node</span></h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 mb-10 opacity-60">Mapping new knowledge clusters to the Nexus.</p>
               
               <form onSubmit={handleAddSubject} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Subject Name</label>
                        <input required placeholder="e.g. Advanced AI" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white uppercase" />
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Course Code</label>
                        <input required placeholder="e.g. AI-401" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white uppercase" />
                     </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white transition-colors">Assign Faculty Shard</label>
                    <select className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white appearance-none">
                       <option className="bg-[#0F172A]">Dr. Arvind Gupta</option>
                       <option className="bg-[#0F172A]">Prof. Sarah Khan</option>
                       <option className="bg-[#0F172A]">Dr. Nitin Verma</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Semester Index</label>
                        <input type="number" required placeholder="01-08" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white" />
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1 group-focus-within:text-white">Credit Weight</label>
                        <input type="number" required placeholder="1-5" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-bold text-white" />
                     </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-white shadow-2xl shadow-indigo-600/30 group">
                    Assign Subject Node <Zap className="w-4 h-4 inline-block ml-2 group-hover:animate-pulse" />
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Core hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Academic <span className="gradient-text-master">Shards</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Configuring knowledge clusters for all territorial nodes.</p>
        </motion.div>

        <div className="flex gap-4">
          <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-primary-start text-white rounded-3xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter">
            <Plus className="w-4 h-4" /> Provision New Shard
          </button>
        </div>
      </header>

      {/* Advanced Control Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-4 flex items-center gap-5 border-white/5 bg-white/5">
           <Search className="w-6 h-6 text-slate-600 ml-6" />
           <input placeholder="Locate specific subject node..." className="bg-transparent border-none outline-none text-white w-full text-lg font-bold placeholder:text-slate-600 uppercase" />
        </div>
        <button className="glass-panel p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
              <Layers className="w-4 h-4" /> Category Cluster
           </div>
        </button>
        <button className="glass-panel p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
              <Filter className="w-4 h-4" /> Deployment Sem
           </div>
        </button>
      </div>

      {/* Subject Registry Tablet */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[3.5rem] overflow-hidden relative border-white/5">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Code2 className="w-40 h-40" />
         </div>
         <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-xl font-black tracking-tight uppercase tracking-[0.2em] text-slate-400">Knowledge Index v4.0</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Global Sync Active</span>
               </div>
            </div>
         </div>
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
               <thead>
                  <tr className="bg-white/5">
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Node ID</th>
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Course Name</th>
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Faculty Node</th>
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Unit Access</th>
                     <th className="px-10 py-8 text-right text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Control Matrix</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {subjects.map((sub) => (
                     <tr key={sub.id} className="group hover:bg-white/[0.03] transition-all">
                        <td className="px-10 py-10">
                           <span className="text-xs font-black text-slate-500 tracking-[.2em]">{sub.code}</span>
                        </td>
                        <td className="px-10 py-10">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-indigo-400 group-hover:scale-110 transition-transform">
                                 {sub.name[0]}
                              </div>
                              <div>
                                 <p className="font-black text-sm uppercase tracking-tight group-hover:text-primary-end transition-colors ">{sub.name}</p>
                                 <p className="text-[9px] font-bold text-slate-600 mt-1 uppercase tracking-widest">{sub.type} • {sub.credits} Credits</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-10">
                           <div className="flex items-center gap-3">
                              <GraduationCap className="w-4 h-4 text-slate-600" />
                              <span className="text-xs font-semibold text-slate-300">{sub.faculty}</span>
                           </div>
                        </td>
                        <td className="px-10 py-10">
                           <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">DEPT: {sub.dept}</span>
                              <span className="text-[9px] font-bold uppercase text-slate-600">SEM NODE: 0{sub.sem}</span>
                           </div>
                        </td>
                        <td className="px-10 py-10 text-right">
                           <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"><Edit className="w-4 h-4" /></button>
                              <button className="p-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 rounded-xl transition-all border border-white/5"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </motion.div>

      {/* Strategic Hub Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass-panel p-10 rounded-[3rem] bg-indigo-600/10 border-indigo-600/20 flex flex-col items-center justify-center text-center cursor-pointer group">
            <Monitor className="w-8 h-8 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">Global Curriculum Shard</h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Manage Universal Syllabus Nodes</p>
         </div>
         <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer group">
            <Users className="w-8 h-8 text-slate-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Capacity Matrix</h4>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">Configure Student Cap Per Shard</p>
         </div>
         <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer group">
            <Layers className="w-8 h-8 text-slate-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Dependency Hub</h4>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">Map Pre-requisite Knowledge Nodes</p>
         </div>
      </div>
    </div>
  );
}
