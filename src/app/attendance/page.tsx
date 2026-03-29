"use client";

import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  ArrowLeft,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const subjects = [
  { name: "Object Oriented Programming", total: 42, present: 38, percentage: 90, status: "Good" },
  { name: "Database Management Systems", total: 38, present: 32, percentage: 84, status: "Stable" },
  { name: "Digital Logic Design", total: 45, present: 30, percentage: 66, status: "Low" },
  { name: "Applied Mathematics", total: 40, present: 37, percentage: 92, status: "Excellent" },
  { name: "Technical Communication", total: 20, present: 19, percentage: 95, status: "Excellent" },
];

export default function AttendancePage() {
  const { role } = useRole();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Presence <span className="gradient-text-master">Matrix</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring academic engagement across {role} nodes.</p>
        </motion.div>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
            <Filter className="w-4 h-4" /> Filter Range
          </button>
          <button className="px-6 py-3 bg-primary-start text-white rounded-2xl flex items-center gap-2 hover:shadow-lg shadow-primary-start/20 transition-all text-xs font-bold uppercase tracking-widest">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </div>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Trend Graph Placeholder Card */}
        <motion.div variants={item} className="lg:col-span-2 glass-panel rounded-[3rem] p-10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-500" /> Monthly Evolution
            </h3>
            <div className="flex gap-3">
                {['JAN', 'FEB', 'MAR'].map(m => (
                    <span key={m} className={`text-[10px] font-black px-3 py-1 rounded-lg ${m === 'MAR' ? 'bg-primary-start/20 text-primary-start' : 'text-slate-500'}`}>{m}</span>
                ))}
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[70, 85, 90, 65, 80, 95, 88, 75, 92, 80, 85, 90].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/40 rounded-t-xl hover:to-emerald-500 transition-all group relative"
              >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}%</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Day of the cycle Tracker</p>
        </motion.div>

        {/* Status Breakdown */}
        <div className="space-y-8">
           {[
             { label: "Overall Score", value: "88%", icon: ClipboardCheck, color: "text-indigo-400", bg: "bg-indigo-500/10" },
             { label: "Active Subs", value: "06", icon: CalendarIcon, color: "text-emerald-400", bg: "bg-emerald-500/10" },
             { label: "Alert Shields", value: "02", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
           ].map((stat, i) => (
             <motion.div key={i} variants={item} className="glass-panel rounded-[2.5rem] p-8 group hover:bg-white/5 cursor-pointer transition-all border-white/5">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black mt-1">{stat.value}</p>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Advanced Ledger Table */}
      <motion.div variants={item} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[3rem] overflow-hidden">
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-black tracking-tight uppercase">Subject Ledger</h3>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">All nodes operational</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-widest">Quantum Focus</th>
                <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-widest">Drift / Flow</th>
                <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-widest">Core Impact</th>
                <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-widest">Stability Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subjects.map((sub, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-all">
                  <td className="px-10 py-8">
                    <p className="font-black uppercase tracking-tight text-white group-hover:text-primary-end transition-colors">{sub.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Node Stream Active</p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${sub.percentage > 80 ? 'bg-emerald-500' : sub.percentage > 70 ? 'bg-indigo-500' : 'bg-rose-500'}`} style={{ width: `${sub.percentage}%` }} />
                      </div>
                      <span className="text-sm font-black">{sub.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold text-slate-400">{sub.present} <span className="opacity-40">/ {sub.total}</span></span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                       {sub.status === "Excellent" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : sub.status === "Low" ? <XCircle className="w-4 h-4 text-rose-500" /> : <TrendingUp className="w-4 h-4 text-indigo-500" />}
                       <span className={`text-[10px] font-black uppercase tracking-widest ${sub.status === "Excellent" ? "text-emerald-500" : sub.status === "Low" ? "text-rose-500" : "text-indigo-500"}`}>{sub.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
