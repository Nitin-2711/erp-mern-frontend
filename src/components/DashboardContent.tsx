"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  Edit, 
  BarChart3, 
  Building, 
  Activity, 
  Shield, 
  Zap, 
  Wallet,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const GlassCard = ({ children, className }: any) => (
  <motion.div
    variants={item}
    className={`glass-panel rounded-[2.5rem] p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, color, spark }: any) => (
  <GlassCard>
    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[.3rem] mb-1">{title}</p>
    <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: spark }} className={`h-full ${color.replace('text-', 'bg-')} rounded-full`} />
    </div>
  </GlassCard>
);

export const AdminDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <StatCard title="Total Revenue" value="$4.2M" icon={Wallet} color="text-blue-500" spark="75%" />
    <StatCard title="Active Nodes" value="12,450" icon={Users} color="text-emerald-500" spark="92%" />
    <StatCard title="System Load" value="24%" icon={Activity} color="text-amber-500" spark="24%" />
    <StatCard title="Core Security" value="ELITE" icon={Shield} color="text-purple-500" spark="100%" />
    
    <GlassCard className="lg:col-span-3">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-500" /> Enterprise Analytics
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View Detailed Matrix</button>
        </div>
        <div className="h-64 flex items-end gap-3 pb-4">
            {[40, 70, 45, 90, 65, 80, 50, 95, 85, 60, 75, 55, 90].map((h, i) => (
                <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    animate={{ height: `${h}%` }} 
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/40 rounded-t-xl transition-all"
                />
            ))}
        </div>
    </GlassCard>
    
    <GlassCard className="bg-blue-500/5 border-blue-500/10">
        <Zap className="w-8 h-8 text-blue-500 mb-6" />
        <h4 className="text-lg font-black tracking-tight">Rapid Provisioning</h4>
        <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed uppercase tracking-wider opacity-60">Ready to deploy 500 new identity shards.</p>
        <button className="mt-8 w-full py-3 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Execute</button>
    </GlassCard>
  </motion.div>
);

export const HODDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Faculty Count" value="48" icon={Users} color="text-blue-500" spark="100%" />
        <StatCard title="Dept Load" value="84%" icon={BarChart3} color="text-emerald-500" spark="84%" />
        <StatCard title="Pending Approvals" value="12" icon={ClipboardCheck} color="text-amber-500" spark="40%" />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
            <h3 className="text-xl font-black tracking-tight mb-8">Faculty Matrix</h3>
            <div className="space-y-4">
                {[
                    { name: "Dr. Elena Vance", role: "Sr. Research", status: "Active" },
                    { name: "Prof. Isaac Kleiner", role: "Theoretical Ops", status: "In Hub" },
                ].map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center font-black text-blue-500">{f.name[0]}</div>
                            <div>
                                <p className="font-black text-sm uppercase">{f.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{f.role}</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-lg">{f.status}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
        
        <GlassCard>
            <h3 className="text-xl font-black tracking-tight mb-8">Approval Queue</h3>
            <div className="space-y-4">
                {[
                    { type: "Grant Requisition", from: "Dept Bio-Ops", id: "#772" },
                    { type: "Faculty Leave Node", from: "Quantum Physics", id: "#901" },
                ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 transition-all">
                        <div>
                            <p className="font-black text-sm uppercase">{a.type}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{a.from} • {a.id}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 transition-all"><CheckCircle2 className="w-4 h-4" /></button>
                            <button className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    </div>
  </motion.div>
);

export const FacultyDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
            <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-500" /> Mission Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { time: "09:00 AM", class: "Quantum Physics II", students: "42 Nodes", active: true },
                    { time: "11:30 AM", class: "Neural Networks Lab", students: "28 Nodes", active: false },
                ].map((c, i) => (
                    <div key={i} className={`p-6 rounded-[2rem] border transition-all ${c.active ? "bg-blue-500/10 border-blue-500/30 shadow-xl shadow-blue-500/10" : "bg-white/5 border-white/10 opacity-60"}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg">{c.time}</span>
                            {c.active && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                        </div>
                        <h4 className="font-black text-lg uppercase tracking-tight">{c.class}</h4>
                        <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-[0.2em]">{c.students} Connected</p>
                    </div>
                ))}
            </div>
        </GlassCard>
        
        <GlassCard className="bg-emerald-500/5 border-emerald-500/10">
            <Edit className="w-8 h-8 text-emerald-500 mb-6" />
            <h4 className="text-xl font-black tracking-tight">Ledger Operations</h4>
            <p className="text-xs font-bold text-slate-500 mt-4 leading-relaxed uppercase tracking-widest">Verify and upload internal assessment shards for SEM-04 batch.</p>
            <button className="mt-8 w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20">Launch Ledger Matrix</button>
        </GlassCard>
     </div>
  </motion.div>
);

export const StudentDashboard = () => (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <GlassCard className="lg:col-span-2 bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                    <TrendingUp className="w-7 h-7 text-blue-500" />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global CGPA</p>
                    <h3 className="text-5xl font-black tracking-tighter mt-1">9.24</h3>
                </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div initial={{ width: 0 }} animate={{ width: "92.4%" }} className="h-full bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Performance Alpha Stage Verified</p>
        </GlassCard>
        
        <GlassCard>
            <Clock className="w-8 h-8 text-blue-400 mb-6" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Presence Logic</p>
            <h4 className="text-4xl font-black tracking-tighter">88.4%</h4>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" /> Threshold Met
            </div>
        </GlassCard>
        
        <GlassCard>
            <Wallet className="w-8 h-8 text-amber-500 mb-6" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Financial Shard</p>
            <h4 className="text-3xl font-black tracking-tighter">$1,240</h4>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Due in 48h
            </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <GlassCard className="lg:col-span-2">
            <h3 className="text-xl font-black tracking-tight mb-8">Subject Index</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: "Quantum Mechanics", code: "PH-401", score: "A+" },
                    { name: "Neural Cryptography", code: "CS-402", score: "A" },
                    { name: "Advanced Robotics", code: "ME-405", score: "A-" },
                    { name: "Bio-Synthetic Core", code: "BT-409", score: "B+" },
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center font-black text-[10px] text-blue-500 border border-blue-500/10 group-hover:bg-blue-500 transition-all group-hover:text-white">{s.code[0]}</div>
                            <div>
                                <p className="font-black text-sm uppercase">{s.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.code}</p>
                            </div>
                        </div>
                        <span className="font-black text-blue-500">{s.score}</span>
                    </div>
                ))}
            </div>
         </GlassCard>
         
         <GlassCard>
            <h3 className="text-xl font-black tracking-tight mb-8">Notice Cluster</h3>
            <div className="space-y-6">
                {[
                    { title: "Exam Portal Open", type: "Security", time: "2h ago" },
                    { title: "Event Log Updated", type: "Social", time: "5h ago" },
                    { title: "Library Sync Done", type: "Files", time: "1d ago" },
                ].map((n, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{n.type}</span>
                            <span className="text-[9px] font-black text-slate-600 uppercase transition-all group-hover:text-slate-400">{n.time}</span>
                        </div>
                        <p className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-all uppercase tracking-tight">{n.title}</p>
                        {i < 2 && <div className="mt-4 h-[1px] w-full bg-white/5" />}
                    </div>
                ))}
            </div>
            <button className="w-full mt-10 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Clear Stream</button>
         </GlassCard>
      </div>
    </motion.div>
);
