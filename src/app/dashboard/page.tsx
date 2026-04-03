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


import DashboardLayout from "@/shared/components/DashboardLayout";

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
    <DashboardLayout>
      <div className="space-y-10 pb-12">
        {/* Welcome Header */}
        <header className="flex flex-col gap-2">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg uppercase tracking-[0.2em]">
              {role} Console
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Lattice-01 Synchronized
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase"
          >
            Welcome, <span className="text-indigo-600">Nitin Kumar</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm font-medium tracking-wide"
          >
            Your daily academic matrix overview and system protocols are ready.
          </motion.p>
        </header>

        {/* Dynamic Dashboard Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={role} 
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }} 
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {getDashboard()}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}


