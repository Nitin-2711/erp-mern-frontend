"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import EditProfileModal from "@/components/EditProfileModal";
import { useRole } from "@/context/RoleContext";
import { BookOpen, Shield, Award, Calendar, Activity, Zap } from "lucide-react";

export default function ProfilePage() {
  const { role } = useRole();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Mock User Data - In a real app, this would come from an API or Auth Context
  const [userData, setUserData] = useState({
    name: "Alex Rivera",
    role: role.charAt(0).toUpperCase() + role.slice(1),
    status: "Verified" as const,
    email: "alex.rivera@nexus.edu",
    phone: "+91 98765 43210",
    enrollmentNo: "EN2024-X992",
    rollNo: "20CS1042",
    studentId: "SID-88241",
    courseBranch: "B.Tech Computer Science",
    yearSemester: "3rd Year / 6th Semester",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256",
  });

  const handleSaveProfile = (updatedUser: any) => {
    setUserData(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Identity Sync Active</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-tight">
            User <span className="gradient-text-master">Profile</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl opacity-80">
            Securely manage your academic identity and personal credentials within the Nexus Core grid.
          </p>
        </motion.div>
      </header>

      <section className="px-4">
        <ProfileCard 
          user={userData} 
          onEdit={() => setIsEditModalOpen(true)} 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
         {/* Academic Section */}
         <div className="lg:col-span-2 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-10 rounded-[2.5rem]"
            >
              <h3 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-primary-start" /> Academic Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-primary-start/5 border border-primary-start/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Primary Course</p>
                  <p className="text-lg font-black">{userData.courseBranch}</p>
                  <p className="text-xs text-slate-400 mt-2">Faculty of Engineering & Tech</p>
                </div>
                <div className="p-6 rounded-3xl bg-primary-middle/5 border border-primary-middle/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Current Standing</p>
                  <p className="text-lg font-black">{userData.yearSemester}</p>
                  <p className="text-xs text-slate-400 mt-2">Academic Session 2024-25</p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase">GPA Node Consistency</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Calculated across 5 semesters</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-emerald-500">9.24</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Distinction</p>
                   </div>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase">Presence Ratio</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active participation metric</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-blue-500">88.4%</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Optimal</p>
                   </div>
                </div>
              </div>
            </motion.div>
         </div>

         {/* Identification Card Style */}
         <motion.div 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3 }}
           className="space-y-10"
         >
           <div className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-primary-start/20 to-primary-middle/20 border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Shield className="w-10 h-10 text-white/20" />
              </div>
              <div className="mb-10">
                <h4 className="text-white text-xl font-black tracking-tighter italic">NEXUS CORE</h4>
                <p className="text-white/40 text-[8px] font-black uppercase tracking-[.4em]">Integrated ID System</p>
              </div>
              <div className="flex gap-6 items-center mb-8">
                <div className="w-20 h-20 rounded-2xl border-2 border-white/20 p-1 overflow-hidden">
                  <img src={userData.image} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg tracking-tight">{userData.name}</h5>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{userData.role}</p>
                </div>
              </div>
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between">
                  <span className="text-white/40 text-[9px] font-black uppercase">Identity Node</span>
                  <span className="text-white text-[11px] font-mono">{userData.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 text-[9px] font-black uppercase">Valid Until</span>
                  <span className="text-white text-[11px] font-mono">JUNE 2026</span>
                </div>
              </div>
              <div className="mt-10 py-3 bg-white text-[#0A0F1F] text-center rounded-xl font-black text-[10px] uppercase tracking-[.3em] group-hover:bg-primary-end group-hover:text-white transition-all cursor-pointer">
                Generate Digital Token
              </div>
           </div>

           <div className="glass-panel p-8 rounded-[2.5rem]">
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" /> Recent Activity
              </h4>
              <div className="space-y-6">
                 {[
                   { action: "Profile Updated", time: "2h ago", icon: Activity },
                   { action: "Security Hash Synced", time: "1d ago", icon: Shield },
                   { action: "Semester 5 Results Released", time: "3d ago", icon: Award },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-center group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary-start/10 transition-colors">
                        <item.icon className="w-4 h-4 text-slate-500 group-hover:text-primary-start" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{item.action}</p>
                        <p className="text-[9px] text-slate-600 uppercase font-black">{item.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
         </motion.div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
