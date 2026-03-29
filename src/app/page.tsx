"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Wallet, 
  Search, 
  Calendar, 
  Mail, 
  Bell,
  MoreHorizontal,
  Plus,
  ClipboardCheck,
  BookOpen,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Layers,
  BarChart3
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

// --- Framer Motion Variants ---

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
} as const;

const item: any = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100 } 
  }
};

// --- Elite Components ---

const Sparkline = ({ color }: { color: string }) => (
  <div className="h-12 w-full mt-4">
    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0 35 Q 20 5, 40 25 T 80 15 T 100 30"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        d="M0 35 Q 20 5, 40 25 T 80 15 T 100 30 L 100 40 L 0 40 Z"
        fill={color}
      />
    </svg>
  </div>
);

const StatCard = ({ title, value, change, icon: Icon, color, glow }: any) => (
  <motion.div
    variants={item}
    whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
    className="relative p-8 rounded-[2.5rem] glass-panel border-white/5 group perspective-1000 cursor-pointer overflow-hidden"
  >
    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 blur-3xl transition-all group-hover:opacity-20 ${glow}`} />
    
    <div className="flex justify-between items-start">
      <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div className="text-right">
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">{change}</span>
      </div>
    </div>

    <div className="mt-8">
      <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{title}</p>
      <h3 className="text-4xl font-black tracking-tighter mt-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        {value}
      </h3>
    </div>

    <Sparkline color={color.includes("indigo") ? "#6366f1" : color.includes("emerald") ? "#10b981" : "#f59e0b"} />
  </motion.div>
);

// --- Dashboard Sub-Views ---

const AdminDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard title="System Revenue" value="$2.8M" change="+14.2%" icon={Wallet} color="text-indigo-400" glow="bg-indigo-500" />
      <StatCard title="Active Nodes" value="12.4k" change="+5.8%" icon={Zap} color="text-amber-400" glow="bg-amber-500" />
      <StatCard title="Security Score" value="98/100" change="Stable" icon={Shield} color="text-emerald-400" glow="bg-emerald-500" />
      <StatCard title="Data Flow" value="4.2TB" change="+22.1%" icon={Layers} color="text-cyan-400" glow="bg-cyan-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <motion.div variants={item} className="lg:col-span-2 rounded-[3rem] glass-panel p-10 relative overflow-hidden">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-indigo-400" /> Network Expansion
            </h3>
            <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-widest opacity-60">Global enrollment & resource metrics</p>
          </div>
          <div className="flex gap-2">
            {['24H', '7D', '30D'].map(t => (
              <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${t === '7D' ? 'bg-indigo-600' : 'bg-white/5 hover:bg-white/10'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="h-80 flex items-end gap-4 px-4 overflow-visible">
          {[60, 45, 80, 55, 95, 75, 40, 85, 65, 50, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 group relative flex flex-col items-center gap-4 justify-end h-full">
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: `${h}%` }} 
                transition={{ delay: i * 0.05, type: "spring" }}
                className="w-full bg-gradient-to-t from-indigo-500/10 via-indigo-500/30 to-indigo-500 rounded-2xl relative group-hover:glow-primary transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </motion.div>
              <span className="text-[10px] font-black text-slate-600 group-hover:text-indigo-400 transition-colors">
                {['M','T','W','T','F','S','S','M','T','W','T','F'][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="rounded-[3rem] glass-panel p-10">
        <h3 className="text-xl font-black tracking-tight mb-10">Recent Pulse</h3>
        <div className="space-y-8">
          {[
            { label: "Kernel Update", time: "2m ago", color: "bg-indigo-500" },
            { label: "New Node Auth", time: "15m ago", color: "bg-emerald-500" },
            { label: "System Sync", time: "1h ago", color: "bg-cyan-500" },
            { label: "Security Audit", time: "3h ago", color: "bg-amber-500" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-pointer">
              <div className={`w-3 h-3 rounded-full ${activity.color} shadow-[0_0_10px_currentColor] group-hover:scale-150 transition-transform`}></div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{activity.label}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase mt-1 opacity-60 tracking-widest">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-12 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-[11px] font-black uppercase tracking-widest text-slate-400 transition-all">Full System Log</button>
      </motion.div>
    </div>
  </motion.div>
);

const StudentDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <motion.div variants={item} className="lg:col-span-2 rounded-[3rem] bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[.4em]">Academic Year Sync</span>
            <h3 className="text-5xl font-black tracking-tighter mt-4 leading-tight">Quantum Physics<br/>Midterms in <span className="text-indigo-500">4 Days</span></h3>
          </div>
          <div className="mt-20 flex gap-4">
            <button className="px-8 py-4 bg-indigo-600 rounded-[1.5rem] font-black text-sm uppercase tracking-tighter hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30">View Study Plan</button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] font-black text-sm uppercase tracking-tighter hover:bg-white/10 transition-all">Course Vault</button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="rounded-[3rem] glass-panel p-10 flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="96" cy="96" r="80" className="stroke-white/5 fill-none" strokeWidth="12" />
            <motion.circle 
              cx="96" cy="96" r="80" 
              className="stroke-indigo-500 fill-none" 
              strokeWidth="12" 
              strokeDasharray="502" 
              initial={{ strokeDashoffset: 502 }}
              animate={{ strokeDashoffset: 502 - (502 * 0.85) }}
              transition={{ duration: 2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black tracking-tighter">85%</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Attendance</span>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">System status: All credits active.<br/>Next class: Physics Lab @ 2PM</p>
      </motion.div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Course Credits", value: "24/30", icon: BookOpen, color: "text-indigo-400" },
        { title: "Global Rank", value: "#12", icon: TrendingUp, color: "text-emerald-400" },
        { title: "Tasks Due", value: "04", icon: Clock, color: "text-amber-400" },
      ].map((card, i) => (
        <motion.div key={i} variants={item} className="p-8 rounded-[2rem] glass-panel group hover:bg-white/5 transition-all cursor-pointer border-white/5">
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-white/5 ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.title}</p>
              <p className="text-2xl font-black text-white mt-1 uppercase tracking-tight">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// --- Main Page Component ---

export default function Home() {
  const { role } = useRole();

  return (
    <div className="space-y-16 pb-24">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-pulse"></div>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Nexus Core Synchronized</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-tight">
            Quantum <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">Operations</span>
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl leading-relaxed italic opacity-80">
            Welcome to the zero-lag enterprise grid. Managing your {role} assets with ultimate precision.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4">
          <div className="p-6 rounded-[2rem] glass-panel flex flex-col items-center justify-center border-white/10 group hover:border-indigo-500/50 transition-all cursor-pointer">
            <Calendar className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest">Schedule</span>
          </div>
          <div className="p-6 rounded-[2rem] bg-indigo-600 shadow-2xl shadow-indigo-500/40 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer">
            <Plus className="w-6 h-6 text-white" />
            <span className="text-[10px] font-black text-white mt-2 uppercase tracking-widest">Action</span>
          </div>
        </motion.div>
      </header>

      {/* View Matrix */}
      <AnimatePresence mode="wait">
        <motion.div key={role} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }}>
          {role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
