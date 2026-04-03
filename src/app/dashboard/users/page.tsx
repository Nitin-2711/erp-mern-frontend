"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  CheckCircle2,
  XCircle,
  Mail,
  MoreVertical,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import StudentForm from "@/components/StudentForm";

const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const initialUsers = [
  { id: "U001", name: "Anish Kumar", email: "anish.nexus@core.com", role: "Admin", status: "Verified", dept: "System Ops", color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: "U002", name: "Preeti Singh", email: "preeti.faculty@cse.com", role: "Faculty", status: "Active", dept: "Computer Science", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: "U003", name: "Rohan Das", email: "rohan.std@mech.com", role: "Student", status: "Pending", dept: "Mechanical Eng", color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "U004", name: "Sarah Khan", email: "sarah.hod@civil.com", role: "HOD", status: "Verified", dept: "Civil Engineering", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "U005", name: "Vikram Malhotra", email: "vikram.std@cse.com", role: "Student", status: "Active", dept: "Computer Science", color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

export default function UserManagement() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [usersList, setUsersList] = useState(initialUsers);

  const handleProvision = (data: any) => {
    showToast("Finalizing Identity Shard Deployment...", "info");
    
    setTimeout(() => {
        showToast("New Identity Node Successfully Synchronized!", "success");
        setIsModalOpen(false);
    }, 1500);
  };

  const confirmDelete = () => {
    if(!deleteTarget) return;
    showToast("Purging identity shard from global ledger...", "info");
    setTimeout(() => {
        setUsersList(prev => prev.filter(u => u.id !== deleteTarget));
        showToast("Identity Node successfully purged.", "success");
        setDeleteTarget(null);
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-20">
      <AnimatePresence>
        {/* Delete Confirmation Modal */}
        {deleteTarget && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-card border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                 <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
                    <Trash2 className="w-10 h-10 text-rose-500" />
                 </div>
                 <h3 className="text-2xl font-black tracking-tighter">Purge Node?</h3>
                 <p className="text-slate-500 text-sm font-medium mt-4 leading-relaxed uppercase tracking-widest opacity-60">This action will permanently decohere the identity shard <span className="text-foreground">{deleteTarget}</span> from the Nexus lattice.</p>
                 <div className="mt-10 flex gap-4">
                    <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all text-slate-500">Cancel</button>
                    <button onClick={confirmDelete} className="flex-1 py-4 bg-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all text-white shadow-xl shadow-rose-500/30">Confirm Purge</button>
                 </div>
              </motion.div>
           </div>
        )}

        {/* Provisioning Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
             />
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className="w-full max-w-6xl bg-card rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 p-2"
             >
                <div className="max-h-[85vh] overflow-y-auto no-scrollbar">
                   <StudentForm onSubmit={handleProvision} />
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors z-20 group"
                >
                  <XCircle className="w-6 h-6 text-slate-500 group-hover:text-red-500 transition-colors" />
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-4">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-primary-start transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Core Interface Hub</span>
          </Link>
          <h2 className="text-5xl font-black tracking-tighter leading-tight">Identity <span className="gradient-text-master">Center</span></h2>
          <p className="text-slate-500 mt-2 font-medium opacity-80">Managing 12,450 Global Nexus Identity Nodes.</p>
        </motion.div>

        <div className="flex gap-4">
           <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-primary-start text-white rounded-[1.8rem] flex items-center gap-3 hover:shadow-2xl shadow-blue-500/30 transition-all font-black text-xs uppercase tracking-widest">
             <UserPlus className="w-5 h-5" /> Provision New Entry
           </button>
        </div>
      </header>

      {/* Advanced Filter Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-4 flex items-center gap-5">
           <Search className="w-6 h-6 text-slate-600 ml-6" />
           <input placeholder="Search identity index..." className="bg-transparent border-none outline-none text-foreground w-full text-lg font-bold placeholder:text-slate-600" />
        </div>
        <button className="glass-panel p-6 rounded-3xl flex items-center justify-between hover:bg-primary-start/5 hover:border-primary-start/20 transition-all group">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-primary-start transition-colors">
              <Filter className="w-4 h-4" /> Filter Role
           </div>
           <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
        <button className="glass-panel p-6 rounded-3xl flex items-center justify-between hover:bg-primary-start/5 hover:border-primary-start/20 transition-all group">
           <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-primary-start transition-colors">
              <Layers className="w-4 h-4" /> Filter Dept
           </div>
           <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Global Ledger Tablet */}
      <motion.div variants={item} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="px-4">
        <div className="glass-panel rounded-[3.5rem] overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Users className="w-40 h-40 text-primary-start" />
           </div>
           <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-xl font-black tracking-tight uppercase">Identity Ledger v4.2</h3>
              <div className="flex gap-3">
                 <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><Monitor className="w-5 h-5 text-slate-500" /></button>
                 <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><MoreVertical className="w-5 h-5 text-slate-500" /></button>
              </div>
           </div>
           <div className="overflow-x-auto no-scrollbar">
              <table className="w-full">
                 <thead>
                    <tr className="bg-white/5">
                       <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Node ID</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Identity</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Access Level</th>
                       <th className="px-10 py-6 text-left text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Status</th>
                       <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-slate-500 tracking-[.4em]">Control Matrix</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {usersList.map((user: any) => (
                       <tr key={user.id} className="group hover:bg-primary-start/5 transition-all">
                          <td className="px-10 py-8">
                             <span className="text-xs font-black text-slate-500 tracking-[.2em]">{user.id}</span>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 group-hover:scale-110 transition-transform group-hover:bg-primary-start/10 group-hover:text-primary-start`}>
                                   {user.name[0]}
                                </div>
                                <div>
                                   <p className="font-black text-sm uppercase tracking-tight group-hover:text-primary-start transition-colors ">{user.name}</p>
                                   <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary-start/20`}>
                                <Shield className={`w-3.5 h-3.5 ${user.color}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${user.color}`}>{user.role}</span>
                             </div>
                             <p className="text-[9px] font-bold text-slate-500 mt-2 ml-1 uppercase">{user.dept}</p>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-2">
                                {user.status === "Verified" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-amber-500" />}
                                <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === "Verified" ? "text-emerald-500" : "text-amber-500"}`}>{user.status}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-white/5 hover:bg-blue-500/20 hover:text-blue-500 rounded-xl transition-all border border-white/5"><Edit className="w-4 h-4" /></button>
                                <button 
                                  onClick={() => setDeleteTarget(user.id)}
                                  className="p-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 rounded-xl transition-all border border-white/5"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Showing {usersList.length} nodes from Global Cache</span>
              <div className="flex gap-4">
                 <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
                 <button className="p-3 bg-white/5 rounded-xl border border-white/10 transition-all text-[10px] font-black uppercase tracking-widest px-6">Page 1</button>
                 <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Quick Ops Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
         <div className="glass-panel p-10 rounded-[2.5rem] bg-blue-500/5 border-blue-500/10 hover:border-blue-500/20 flex flex-col justify-between transition-all group">
            <Mail className="w-8 h-8 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black tracking-tight">Broadcast Shard</h4>
            <p className="text-[10px] font-bold text-slate-500 opacity-60 uppercase mt-2 tracking-widest leading-relaxed">Dispatch encrypted network alerts to all active identity nodes.</p>
            <button className="mt-8 w-full py-4 bg-primary-start/10 text-primary-start hover:bg-primary-start hover:text-white rounded-xl border border-primary-start/20 text-[10px] font-black uppercase tracking-widest transition-all">Launch Comm Node</button>
         </div>
         <div className="glass-panel p-10 rounded-[2.5rem] bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/20 flex flex-col justify-between transition-all group">
            <Shield className="w-8 h-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black tracking-tight">Policy Matrix</h4>
            <p className="text-[10px] font-bold text-slate-500 opacity-60 uppercase mt-2 tracking-widest leading-relaxed">Adjust global access shards for department-level permissions.</p>
            <button className="mt-8 w-full py-4 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest transition-all">Modify Protocols</button>
         </div>
         <div className="glass-panel p-10 rounded-[2.5rem] bg-rose-500/5 border-rose-500/10 hover:border-rose-500/20 flex flex-col justify-between transition-all group">
            <Layers className="w-8 h-8 text-rose-500 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-black tracking-tight">Dept Structure</h4>
            <p className="text-[10px] font-bold text-slate-500 opacity-60 uppercase mt-2 tracking-widest leading-relaxed">Configure new academic clusters and hierarchy nodes.</p>
            <button className="mt-8 w-full py-4 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl border border-rose-500/20 text-[10px] font-black uppercase tracking-widest transition-all">Edit Hierarchy</button>
         </div>
      </div>
    </div>
  );
}
