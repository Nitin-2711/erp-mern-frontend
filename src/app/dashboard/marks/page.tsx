"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Save, 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Edit,
  GraduationCap,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useToast } from "@/context/ToastContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

const initialStudents = [
  { id: "S101", name: "Rahul Sharma", roll: "22BCS101", marks: 85 },
  { id: "S102", name: "Priya Singh", roll: "22BCS102", marks: 92 },
  { id: "S103", name: "Amit Kumar", roll: "22BCS103", marks: 45 },
  { id: "S104", name: "Sneha Reddy", roll: "22BCS104", marks: 78 },
  { id: "S105", name: "Vikram Malhotra", roll: "22BCS105", marks: 64 },
];

const getGrade = (marks: number) => {
  if (marks >= 90) return { grade: "A+", color: "text-emerald-500", bg: "bg-emerald-500/10" };
  if (marks >= 80) return { grade: "A", color: "text-emerald-400", bg: "bg-emerald-400/10" };
  if (marks >= 70) return { grade: "B", color: "text-indigo-400", bg: "bg-indigo-400/10" };
  if (marks >= 60) return { grade: "C", color: "text-amber-400", bg: "bg-amber-400/10" };
  if (marks >= 40) return { grade: "D", color: "text-slate-400", bg: "bg-slate-400/10" };
  return { grade: "F", color: "text-rose-500", bg: "bg-rose-500/10" };
};

export default function MarksEntryPage() {
  const { showToast } = useToast();
  const [students, setStudents] = useState(initialStudents);
  const [examType, setExamType] = useState("Midterm Cluster");

  const handleMarksChange = (id: string, value: string) => {
    const numericValue = value === "" ? 0 : parseInt(value);
    if (numericValue > 100) return;
    setStudents(prev => prev.map(s => s.id === id ? { ...s, marks: numericValue } : s));
  };

  const handleSave = () => {
    showToast("Encrypting performance index...", "info");
    setTimeout(() => {
        showToast("Marks Ledger Successfully Synced with Nexus Hub.", "success");
    }, 1500);
  };

  const classAvg = useMemo(() => {
    return (students.reduce((acc, current) => acc + current.marks, 0) / students.length).toFixed(1);
  }, [students]);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Quantum hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter shrink-0">Performance <span className="gradient-text-master">Ledger</span></h2>
          <p className="text-slate-500 mt-2 font-medium uppercase tracking-[0.2em] text-[9px] opacity-60">Faculty Mode: Internal Assessments v2.1</p>
        </motion.div>

        <div className="flex gap-4">
          <div className="hidden lg:flex items-center gap-6 px-10 py-4 glass-panel rounded-3xl border-indigo-500/20">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Class Potential</p>
                <p className="text-2xl font-black text-indigo-400 tracking-tighter">{classAvg}% Avg</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
             </div>
          </div>
          <button onClick={handleSave} className="px-10 py-5 bg-primary-start text-white rounded-3xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter active:scale-95">
            <Save className="w-4 h-4" /> Finalize Marks
          </button>
        </div>
      </header>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-4 flex items-center gap-4 border-white/5 bg-white/5">
           <Search className="w-5 h-5 text-slate-600 ml-4" />
           <input placeholder="Search identity in cluster..." className="bg-transparent border-none outline-none text-white w-full text-sm font-bold placeholder:text-slate-600 uppercase" />
        </div>
        <div className="glass-panel rounded-3xl p-4 flex items-center justify-between border-white/5 bg-white/5 gap-4">
           <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{examType}</span>
           </div>
           <Edit className="w-4 h-4 text-slate-600 cursor-pointer hover:text-white" />
        </div>
        <div className="glass-panel rounded-3xl p-4 flex items-center gap-4 border-white/5 bg-white/5">
           <Layers className="w-5 h-5 text-slate-600 ml-4" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section CSE-Alpha Core</p>
        </div>
      </div>

      {/* Marks Registry Tablet */}
      <motion.div variants={container} initial="hidden" animate="show" className="glass-panel rounded-[3.5rem] overflow-hidden relative border-white/5">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Target className="w-40 h-40" />
         </div>
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
               <thead>
                  <tr className="bg-white/5">
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Node Identity</th>
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Index (Roll)</th>
                     <th className="px-10 py-8 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Data Entry (0-100)</th>
                     <th className="px-10 py-8 text-center text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Neural Grade</th>
                     <th className="px-10 py-8 text-right text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Status node</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {students.map((student) => {
                    const gradeData = getGrade(student.marks);
                    return (
                      <tr key={student.id} className="group hover:bg-white/[0.03] transition-all">
                        <td className="px-10 py-10">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-slate-400 group-hover:scale-110 transition-transform">
                                 {student.name[0]}
                              </div>
                              <h5 className="font-black text-sm uppercase tracking-tight group-hover:text-primary-end transition-colors ">{student.name}</h5>
                           </div>
                        </td>
                        <td className="px-10 py-10">
                           <span className="text-[10px] font-black text-slate-600 tracking-[.2em]">{student.roll}</span>
                        </td>
                        <td className="px-10 py-10">
                           <div className="relative w-32 group/input">
                              <input 
                                type="number"
                                value={student.marks}
                                onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-black text-xl text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <div className="absolute inset-0 rounded-2xl border border-transparent group-focus-within/input:border-indigo-500/20 group-focus-within/input:shadow-[0_0_20px_rgba(79,70,229,0.1)] transition-all pointer-events-none" />
                           </div>
                        </td>
                        <td className="px-10 py-10 text-center">
                           <AnimatePresence mode="wait">
                              <motion.div 
                                key={gradeData.grade}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl font-black text-xl shadow-2xl ${gradeData.bg} ${gradeData.color} border border-white/5`}
                              >
                                {gradeData.grade}
                              </motion.div>
                           </AnimatePresence>
                        </td>
                        <td className="px-10 py-10 text-right">
                           <div className="flex items-center justify-end gap-3">
                              {student.marks >= 40 ? (
                                <div className="flex items-center gap-2 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                   <CheckCircle2 className="w-4 h-4" />
                                   <span className="text-[9px] font-black uppercase tracking-widest">Sufficient</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[9px] font-black uppercase tracking-widest">Deficient</span>
                                </div>
                              )}
                           </div>
                        </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
         <div className="p-10 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-4 text-slate-500">
               <AlertCircle className="w-5 h-5" />
               <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">System calculating active grades based on Tier-1 logic shards. Final ledger sync required for academic updates.</p>
            </div>
         </div>
      </motion.div>

      {/* Global Results Matrix Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass-panel p-10 rounded-[2.5rem] bg-indigo-600/10 border-indigo-600/20 flex flex-col items-center justify-center text-center cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
               <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-black text-indigo-400 uppercase tracking-tighter">View Bell Curve</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Class Distribution Analysis</p>
         </div>
         <div className="glass-panel p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer">
            <Edit className="w-8 h-8 text-slate-500 mb-6" />
            <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Edit Thresholds</h4>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">Modify Passing Criteria</p>
         </div>
         <div className="glass-panel p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer">
            <Target className="w-8 h-8 text-slate-500 mb-6" />
            <h4 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Export Ledger</h4>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">Generate PDF Reports</p>
         </div>
      </div>
    </div>
  );
}
