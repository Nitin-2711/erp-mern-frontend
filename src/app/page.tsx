"use client";


import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { 
  AdminDashboard, 
  HODDashboard, 
  FacultyDashboard, 
  StudentDashboard 
} from "@/components/DashboardContent";


export default function Home() {
  const { role } = useRole();

  const getDashboard = () => {
    switch(role) {
      case "admin": return <AdminDashboard />;
      case "hod": return <HODDashboard />;
      case "faculty": return <FacultyDashboard />;
      case "student": return <StudentDashboard />;
      default: return <StudentDashboard />;
    }
  };

  return (
    <div className="space-y-20 pb-24 px-4 overflow-hidden">
      {/* Dynamic Portal Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative">
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 bg-primary-start/10 blur-[120px] rounded-full animate-pulse" />
        
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring" }}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-indigo-500 shadow-[0_0_15px_#6366f1]' : 'bg-blue-500 shadow-[0_0_15px_#3b82f6]'} animate-pulse`}></div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] leading-none">{role} Lattice Synchronized</span>
          </div>
          <h2 className="text-7xl font-black tracking-tight leading-[1.1] text-foreground lowercase">
            Quantum <br/> <span className="gradient-text-master uppercase">Matrix</span>
          </h2>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed italic opacity-70 border-l-2 border-primary-start/20 pl-6">
            Welcome back, <span className="font-bold text-foreground opacity-100">Nitin Kumar</span>. Accessing {role}-level protocols for India's premier academic nexus.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
           <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-center gap-1 hover:bg-white/10 transition-all cursor-crosshair">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Global Server Time</p>
              <p className="text-2xl font-black tracking-tighter tabular-nums">17:52:01</p>
           </div>
           <button className="px-12 py-6 bg-primary-start rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 text-white flex items-center gap-4 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Zap className="w-5 h-5 fill-white" /> Execute Nexus Cmd
           </button>
        </motion.div>
      </header>

      {/* Identity Matrix Swapper */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={role} 
          initial={{ opacity: 0, x: 100, filter: "blur(20px)" }} 
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} 
          exit={{ opacity: 0, x: -100, filter: "blur(20px)" }} 
          transition={{ duration: 0.6, type: "spring", damping: 25, stiffness: 120 }}
          className="relative"
        >
          {getDashboard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


