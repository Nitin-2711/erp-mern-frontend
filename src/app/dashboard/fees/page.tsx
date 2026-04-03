"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  Wallet, 
  History, 
  AlertCircle, 
  Download,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/context/RoleContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
} as const;

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const balanceCards = [
  { name: "Academic Tuition", amount: "4,500.00", status: "Paid", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Residency & Mess", amount: "1,240.00", status: "Pending", color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Digital Library", amount: "350.00", status: "Paid", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const transactions = [
  { id: "TXN10294", date: "Mar 24, 2026", method: "Nexus Pay (Visa)", amount: "4,500.00", status: "Verified" },
  { id: "TXN10185", date: "Jan 12, 2026", method: "Bank Transfer", amount: "350.00", status: "Verified" },
  { id: "TXN09842", date: "Dec 05, 2025", method: "Nexus Wallet", amount: "1,200.00", status: "Verified" },
];

export default function FeesPage() {
  const { role } = useRole();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Nexus hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Finance <span className="gradient-text-master">Vault</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Verifying economic transaction nodes for {role} node.</p>
        </motion.div>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-primary-start text-white rounded-2xl flex items-center gap-3 hover:shadow-2xl shadow-primary-start/40 transition-all font-black text-xs uppercase tracking-tighter">
            <CreditCard className="w-4 h-4" /> Initialize Settlement
          </button>
        </div>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {balanceCards.map((card, i) => (
          <motion.div key={i} variants={item} className={`glass-panel rounded-[2.5rem] p-10 group cursor-pointer hover:bg-white/5 transition-all border-white/5 relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
               <Wallet className="w-24 h-24" />
            </div>
            <div className="flex justify-between items-start mb-10 relative z-10">
               <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                 <CreditCard className="w-6 h-6" />
               </div>
               <span className={`px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest ${card.color}`}>{card.status}</span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest relative z-10">{card.name}</p>
            <h3 className="text-4xl font-black mt-2 tracking-tighter relative z-10">${card.amount}</h3>
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ledger Code: 0x{i}F9</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass-panel rounded-[3rem] p-10 overflow-hidden">
           <div className="flex justify-between items-center mb-12 px-2">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3 lowercase uppercase">
                <History className="w-6 h-6 text-indigo-400" /> Transaction Cycle
              </h3>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">E2E Quantified</span>
              </div>
           </div>
           <div className="space-y-6">
             {transactions.map((txn, i) => (
               <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-white/5 rounded-xl">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h5 className="font-black text-sm uppercase tracking-tight">{txn.method}</h5>
                      <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest leading-none">ID: {txn.id} • {txn.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                       <p className="font-black text-lg tracking-tighter">${txn.amount}</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{txn.status}</p>
                    </div>
                    <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
                      <Download className="w-5 h-5 text-slate-500 hover:text-white" />
                    </button>
                  </div>
               </div>
             ))}
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel rounded-[3rem] p-10 bg-indigo-600/10 border-indigo-600/20">
           <div className="flex flex-col h-full justify-between items-center text-center">
             <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40 animate-float translate-y-[-10px]">
                <ShieldCheck className="w-10 h-10 text-white" />
             </div>
             <div className="mt-8">
                <h4 className="text-2xl font-black tracking-tight">Financial Protocol Active</h4>
                <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed uppercase tracking-widest opacity-60">All your financial snapshots are encrypted with Nexus Quantum 2048-bit standards.</p>
             </div>
             <button className="w-full mt-12 py-4 rounded-2xl border border-white/20 text-[11px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/5 transition-all">Security Dashboard</button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
