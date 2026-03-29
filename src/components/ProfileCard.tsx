"use client";

import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, Phone, BookOpen, GraduationCap } from "lucide-react";

interface ProfileCardProps {
  user: {
    name: string;
    role: string;
    status: "Active" | "Verified" | "Pending";
    email: string;
    phone: string;
    enrollmentNo: string;
    rollNo: string;
    studentId: string;
    courseBranch: string;
    yearSemester: string;
    image?: string;
    mask?: string;
  };
  onEdit?: () => void;
}

const statusColors = {
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Verified: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default function ProfileCard({ user, onEdit }: ProfileCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden group"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-start/10 blur-[80px] -z-10 transition-all duration-500 group-hover:bg-primary-start/20" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-end/10 blur-[60px] -z-10 transition-all duration-500 group-hover:bg-primary-end/20" />

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-40 h-40">
           <div className="w-full h-full rounded-full border-2 border-primary-start/20 p-2 group-hover:border-primary-start transition-colors duration-500">
             {user.image ? (
               <img 
                 src={user.image} 
                 alt={user.name} 
                 className={`w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105`} 
               />
             ) : (
               <div className="w-full h-full bg-primary-start/5 rounded-full flex items-center justify-center">
                 <User className="text-primary-start w-16 h-16 opacity-40" />
               </div>
             )}
           </div>
           
           <div className={`absolute -bottom-2 right-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusColors[user.status]} shadow-lg backdrop-blur-md`}>
             {user.status}
           </div>
        </div>

        <div className="flex-1 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
             <h2 className="text-3xl font-black tracking-tight text-foreground">{user.name}</h2>
             <ShieldCheck className="w-6 h-6 text-blue-500" />
           </div>
           
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[.4em] mb-6">
             {user.role} — Academic Node Ident: {user.studentId}
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-all">
                <Mail className="w-4 h-4 text-primary-start" />
                <span className="text-sm font-medium text-slate-400">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-all">
                <Phone className="w-4 h-4 text-primary-start" />
                <span className="text-sm font-medium text-slate-400">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-all">
                <GraduationCap className="w-4 h-4 text-primary-start" />
                <span className="text-sm font-medium text-slate-400">{user.courseBranch}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-all">
                <BookOpen className="w-4 h-4 text-primary-start" />
                <span className="text-sm font-medium text-slate-400">{user.yearSemester}</span>
              </div>
           </div>
        </div>

        <div className="md:border-l md:border-white/5 md:pl-10 flex flex-col items-center justify-center gap-4">
           <div className="text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Roll Number</p>
             <p className="text-xl font-black tracking-tighter">{user.rollNo}</p>
           </div>
           <div className="text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Enrollment</p>
             <p className="text-xl font-black tracking-tighter">{user.enrollmentNo}</p>
           </div>
           <button 
             onClick={onEdit}
             className="mt-4 px-8 py-3 bg-primary-start text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg shadow-primary-start/20 transition-all active:scale-95"
           >
             Edit Profile
           </button>
        </div>
      </div>
    </motion.div>
  );
}
