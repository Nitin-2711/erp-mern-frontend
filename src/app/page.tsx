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
  Clock
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// --- Dashboard Sub-Views ---

const AdminDashboard = () => {
  const stats = [
    { title: "Annual Revenue", value: "$4.2M", change: "+12.5%", icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { title: "Total Students", value: "12,450", change: "+5.1%", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Faculty Members", value: "480", change: "+2.4%", icon: GraduationCap, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
    { title: "System Health", value: "99.9%", change: "Stable", icon: Activity, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item} className="p-8 rounded-[2.5rem] glass-panel group cursor-pointer">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.title}</p>
            <div className="flex items-baseline gap-3 mt-1">
              <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 rounded-[3rem] glass-panel p-10 min-h-[400px]">
          <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Enrollment Trends
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 85, 30, 95, 75, 55, 80, 60].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }} 
                animate={{ height: `${h}%` }} 
                className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 rounded-t-xl hover:to-primary transition-all cursor-crosshair relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">{h}% Growth</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={item} className="rounded-[3rem] glass-panel p-10">
          <h3 className="text-xl font-black tracking-tight mb-8">System Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase leading-none">Security Patch v2.4</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Applied to main node</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FacultyDashboard = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 space-y-8">
          <div className="rounded-[3rem] glass-panel p-10">
            <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" /> Today's Schedule
            </h3>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", subject: "Quantum Physics", room: "Lab 204", students: "42" },
                { time: "11:30 AM", subject: "Applied Mathematics", room: "Room 102", students: "120" },
                { time: "02:00 PM", subject: "Research Seminar", room: "Grand Hall", students: "15" },
              ].map((cls, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-sm font-black text-primary">{cls.time}</div>
                    <div>
                      <h4 className="font-black text-lg tracking-tight leading-none uppercase">{cls.subject}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{cls.room} • {cls.students} Enrolled</p>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-primary text-white text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter shadow-lg shadow-primary/20">Mark Attendance</button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="space-y-8">
          <div className="rounded-[3rem] bg-indigo-600 p-10 text-white shadow-2xl shadow-indigo-500/30">
            <Activity className="w-10 h-10 mb-6 opacity-50" />
            <h3 className="text-2xl font-black tracking-tighter leading-tight mb-4">Faculty<br/>Performance Index</h3>
            <p className="text-sm font-bold opacity-70 mb-8 uppercase tracking-widest text-indigo-50">Top 5% this month</p>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-white rounded-full" />
            </div>
          </div>
          <div className="rounded-[3rem] glass-panel p-10">
            <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500" /> Pending Tasks
            </h3>
            <div className="space-y-4 text-sm font-bold opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" /> Grade Lab Reports
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" /> Upload Assignment 4
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Faculty Meeting @ 4PM
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StudentDashboard = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={item} className="rounded-[2.5rem] glass-panel p-8 text-center">
          <div className="w-32 h-32 rounded-full border-8 border-indigo-600/10 border-t-indigo-600 mx-auto flex items-center justify-center mb-6 relative">
            <span className="text-3xl font-black">82%</span>
            <div className="absolute inset-0 rounded-full animate-spin-slow border-2 border-dashed border-indigo-600/30"></div>
          </div>
          <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">Total Attendance</h4>
        </motion.div>
        
        <motion.div variants={item} className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.3em] opacity-70">Current Fee Status</p>
              <h3 className="text-4xl font-black tracking-tighter mt-2">$1,250.00 Due</h3>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-tighter">Pay Now</button>
          </div>
          <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">Next payment deadline: April 15, 2026</p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 rounded-[3rem] glass-panel p-10">
          <h3 className="text-xl font-black tracking-tight mb-8">Course Progress</h3>
          <div className="space-y-8">
            {[
              { name: "Object Oriented Programming", progress: 75, grade: "A" },
              { name: "Database Management Systems", progress: 40, grade: "B+" },
              { name: "Digital Logic Design", progress: 92, grade: "A+" },
            ].map((course, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-bold uppercase tracking-tight text-sm">{course.name}</h5>
                  <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">Level {course.grade}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} className="h-full bg-primary rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={item} className="rounded-[3rem] glass-panel p-10">
          <h3 className="text-xl font-black tracking-tight mb-8">Recent Notices</h3>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500">
              <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase mb-2">Examination</p>
              <p className="text-sm font-bold leading-relaxed">Mid-term schedule has been uploaded to the portal.</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border-l-4 border-indigo-500">
              <p className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase mb-2">Holiday</p>
              <p className="text-sm font-bold leading-relaxed">Spring Break starts from next Monday.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function Home() {
  const { role } = useRole();

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Analytics Hub</span>
          <h2 className="text-5xl font-black tracking-tighter mt-2">
            Control <span className="gradient-text tracking-tighter">Center</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium leading-relaxed max-w-xl italic">
            "Education is the architecture of the soul." — System greeting for active <span className="font-bold underline decoration-primary decoration-2">{role}</span> session.
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={`Search ${role} vault...`} 
              className="pl-12 pr-6 py-4 rounded-[1.5rem] glass-panel border shadow-2xl shadow-slate-200/20 dark:shadow-none outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-80 transition-all text-sm font-bold"
            />
          </div>
          <button className="p-4 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Dynamic Dashboard View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {role === "admin" && <AdminDashboard />}
          {role === "faculty" && <FacultyDashboard />}
          {role === "student" && <StudentDashboard />}
          {role === "hod" && <AdminDashboard />} {/* HOD inherits Admin view for this demo */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
