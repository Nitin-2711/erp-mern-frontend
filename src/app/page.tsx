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
  BarChart3,
  CreditCard,
  Target,
  FileCheck
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
    </svg>
  </div>
);

const GlassCard = ({ children, className }: any) => (
  <motion.div
    variants={item}
    whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
    className={`glass-panel rounded-3xl p-8 relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

// --- Module Components ---

const AttendanceRing = ({ percentage }: { percentage: number }) => (
  <div className="relative w-40 h-40 group cursor-pointer">
    <svg className="w-full h-full rotate-[-90deg]">
      <circle cx="80" cy="80" r="70" className="stroke-primary-start/10 fill-none" strokeWidth="8" />
      <motion.circle 
        cx="80" cy="80" r="70" 
        className="stroke-primary-start fill-none" 
        strokeWidth="10" 
        strokeDasharray="440" 
        initial={{ strokeDashoffset: 440 }}
        animate={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
        transition={{ duration: 2, ease: "easeOut" }}
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))" }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-4xl font-black tracking-tighter group-hover:scale-110 transition-transform">{percentage}%</span>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Presence Ratio</span>
    </div>
  </div>
);

const FeeStatusCard = () => (
  <GlassCard className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/10 hover:border-blue-500/20">
    <div className="flex justify-between items-start mb-10">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
        <CreditCard className="w-7 h-7 text-blue-500" />
      </div>
      <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-500/10">Due in 5 Days</span>
    </div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Total Outstanding</p>
    <h3 className="text-4xl font-black tracking-tighter mt-1">$1,240.00</h3>
    <div className="mt-8 flex gap-3">
      <button className="flex-1 py-4 bg-primary-start text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95">Pay Now</button>
      <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
        <MoreHorizontal className="w-5 h-5 text-slate-400" />
      </button>
    </div>
  </GlassCard>
);


// --- Main Dashboards ---

const StudentDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Attendance & Stats Core */}
      <GlassCard className="flex flex-col items-center justify-center text-center">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Neural Presence Shard</h3>
        <AttendanceRing percentage={88.4} />
        <div className="mt-10 grid grid-cols-2 gap-6 w-full px-4 border-t border-white/5 pt-10">
          <div className="text-left">
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full inline-block mb-3">Verified</p>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Identity Cycles</p>
            <p className="text-2xl font-black mt-1 tracking-tighter">142</p>
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full inline-block mb-3">Deficient</p>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Coherence Loss</p>
            <p className="text-2xl font-black mt-1 tracking-tighter text-rose-500 line-through decoration-rose-500/20">04</p>
          </div>
        </div>
      </GlassCard>

      {/* Main Focus Hub */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
        <FeeStatusCard />
        <GlassCard>
          <div className="flex justify-between items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-emerald-500" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[.2em]">Current CGPA</p>
              <h4 className="text-3xl font-black tracking-tighter">9.24</h4>
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Performance Alpha</p>
          <div className="space-y-4 mt-6">
            {[
              { label: "Internal Assessments", val: 94 },
              { label: "Lab Performance", val: 82 },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 opacity-60">
                  <span>{p.label}</span>
                  <span>{p.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.val}%` }} className="h-full bg-indigo-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>

    {/* Secondary Matrix */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 space-y-10">
        <GlassCard>
          <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary-end" /> Weekly Sequence
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => (
              <div key={day} className={`p-4 rounded-3xl text-center transition-all cursor-pointer ${i === 0 ? "bg-primary-start/20 border border-primary-start/30" : "bg-white/5 border border-transparent hover:border-white/10"}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{day}</p>
                <p className="text-sm font-black mt-2">4 Classes</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4">
             {[
               { time: "09:00 - 10:30", subject: "Quantum Computing Hub", room: "Cluster 4", active: true },
               { time: "11:00 - 12:30", subject: "Applied Neural Networks", room: "Lab A2", active: false },
             ].map((cls, i) => (
               <div key={i} className={`flex items-center justify-between p-6 rounded-[1.8rem] transition-all ${cls.active ? "bg-white/10 border border-white/10 scale-[1.02]" : "bg-white/[0.02] opacity-50"}`}>
                 <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-primary-end">{cls.time}</span>
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-sm">{cls.subject}</h5>
                      <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest leading-none">{cls.room}</p>
                    </div>
                 </div>
                 {cls.active && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>}
               </div>
             ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="h-full">
        <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
          <Bell className="w-6 h-6 text-amber-500" /> Notifications
        </h3>
        <div className="space-y-6">
          {[
            { tag: "EXAM", msg: "Mid-semester verification portal is now active.", time: "12m ago", color: "text-amber-500" },
            { tag: "FEE", msg: "Hostel fee payment window closes on April 4th.", time: "2h ago", color: "text-rose-500" },
            { tag: "EVENT", msg: "Annual Tech Symposium registration started.", time: "5h ago", color: "text-cyan-500" },
            { tag: "LIBRARY", msg: "New AI Research journals added to digital shelf.", time: "1d ago", color: "text-emerald-500" },
          ].map((notice, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[9px] font-black uppercase tracking-[.2em] ${notice.color}`}>{notice.tag}</span>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{notice.time}</span>
              </div>
              <p className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                {notice.msg}
              </p>
              <div className="mt-4 h-[1px] w-full bg-white/5" />
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-white/20 hover:text-slate-400 transition-all">Archive Access</button>
      </GlassCard>
    </div>
  </motion.div>
);

const AdminDashboardTeaser = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "System Revenue", value: "$2.8M", icon: Wallet, color: "text-indigo-400" },
        { title: "Global Students", value: "12,450", icon: Users, color: "text-emerald-400" },
        { title: "Network Status", value: "99.9%", icon: Activity, color: "text-cyan-400" },
        { title: "Security Node", value: "ACTIVE", icon: Shield, color: "text-rose-400" },
      ].map((card, i) => (
        <GlassCard key={i} className="hover:bg-white/5">
           <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${card.color}`}>
             <card.icon className="w-6 h-6" />
           </div>
           <p className="text-[11px] font-black text-slate-500 uppercase tracking-[.3em]">{card.title}</p>
           <h4 className="text-3xl font-black tracking-tighter mt-1">{card.value}</h4>
           <Sparkline color={card.color.includes("indigo") ? "#6366f1" : card.color.includes("emerald") ? "#10b981" : "#06b6d4"} />
        </GlassCard>
      ))}
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <GlassCard className="h-96">
        <h3 className="text-xl font-black tracking-tight mb-10 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary-start" /> Enterprise Core
        </h3>
        <div className="h-full flex items-end gap-3 px-2 pb-10">
          {[40, 65, 45, 90, 65, 85, 30, 95, 75, 55, 80, 60].map((h, i) => (
            <motion.div 
               key={i} 
               initial={{ height: 0 }} 
               animate={{ height: `${h}%` }} 
               className="flex-1 bg-primary-start/20 hover:bg-primary-start/40 rounded-t-xl transition-all"
            />
          ))}
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <GlassCard className="bg-indigo-600/10 border-indigo-600/20">
          <Zap className="w-8 h-8 text-indigo-400 mb-6" />
          <h4 className="text-xl font-black tracking-tight">System<br/>Overload Warning</h4>
          <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed lowercase tracking-tight">Registration portal handling 8k req/sec.</p>
        </GlassCard>
        <GlassCard className="bg-emerald-600/10 border-emerald-600/20">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-6" />
          <h4 className="text-xl font-black tracking-tight">Audit Log<br/>Verified</h4>
          <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed lowercase tracking-tight">All transaction nodes are consistent.</p>
        </GlassCard>
      </div>
    </div>
  </motion.div>
);

// --- Main Page Component ---

export default function Home() {
  const { role } = useRole();

  return (
    <div className="space-y-16 pb-24">
      {/* Universal Hub Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-10 px-4">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-2.5 h-2.5 rounded-full ${role === 'admin' ? 'bg-indigo-500 shadow-[0_0_12px_#6366f1]' : 'bg-cyan-500 shadow-[0_0_12px_#06b6d4]'} animate-pulse`}></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">{role} Node Access Synchronized</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-tight">
            Quantum <span className="gradient-text-master">Perspective</span>
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl leading-relaxed italic opacity-80">
            Welcome to India's most advanced university grid. Accessing <span className="font-bold underline decoration-primary-start decoration-2 underline-offset-4">{role}</span> dashboard protocols.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-5">
           <GlassCard className="p-6 !rounded-[2rem] hover:!bg-white/5 cursor-pointer flex items-center justify-center">
              <Calendar className="w-6 h-6 text-slate-400" />
           </GlassCard>
           <button className="px-10 py-5 bg-primary-start rounded-[2rem] font-black text-sm uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 text-white">
              Nexus Action
           </button>
        </motion.div>
      </header>

      {/* Role-Based Matrix Swapper */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={role} 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} 
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          exit={{ opacity: 0, y: -40, filter: "blur(10px)" }} 
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
        >
          {role === "admin" ? <AdminDashboardTeaser /> : <StudentDashboard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

