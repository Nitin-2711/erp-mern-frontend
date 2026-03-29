"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Mail, Phone, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import ImageUploadWithMask from "./ImageUploadWithMask";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (updatedUser: any) => void;
}

export default function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[1000] pointer-events-none"
          >
            <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto no-scrollbar relative">
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </button>

              <div className="mb-12">
                 <h2 className="text-4xl font-black tracking-tighter mb-2">Edit <span className="gradient-text-master">Profile</span></h2>
                 <p className="text-slate-500 font-medium opacity-80 uppercase text-[10px] tracking-[0.5em]">Synchronizing user identity nodes</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Image Upload & Mask */}
                <div className="flex flex-col items-center">
                  <ImageUploadWithMask currentImage={user.image} />
                  <div className="mt-10 p-6 glass-panel rounded-3xl w-full text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Security Hash</p>
                    <p className="text-xs font-mono text-primary-start truncate">SHA-256: 0x82f...e4a2</p>
                  </div>
                </div>

                {/* Right Column: Form Fields */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Group */}
                    <div className="space-y-6">
                      <InputField icon={<User />} label="Full Name" defaultValue={user.name} />
                      <InputField icon={<ShieldCheck />} label="Roll Number" defaultValue={user.rollNo} />
                      <InputField icon={<ShieldCheck />} label="Enrollment No" defaultValue={user.enrollmentNo} />
                      <InputField icon={<ShieldCheck />} label="Student ID" defaultValue={user.studentId} />
                    </div>
                    
                    <div className="space-y-6">
                      <InputField icon={<Mail />} label="Email Address" defaultValue={user.email} />
                      <InputField icon={<Phone />} label="Phone Number" defaultValue={user.phone} />
                      <InputField icon={<GraduationCap />} label="Course / Branch" defaultValue={user.courseBranch} />
                      <InputField icon={<BookOpen />} label="Year / Semester" defaultValue={user.yearSemester} />
                    </div>
                  </div>

                  <div className="pt-10 flex gap-4 border-t border-white/5">
                    <button 
                      onClick={() => onSave(user)}
                      className="flex-1 py-4 bg-primary-start text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:shadow-xl shadow-primary-start/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Save className="w-5 h-5" /> Save Changes
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-10 py-4 bg-white/5 border border-white/10 text-slate-400 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InputField({ icon, label, defaultValue }: { icon: React.ReactNode, label: string, defaultValue: string }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative group">
       <div className={`absolute left-0 -top-2.5 px-2 bg-card text-[10px] font-black uppercase tracking-widest z-10 transition-all ${isFocused ? 'text-primary-start' : 'text-slate-500 opacity-60'}`}>
         {label}
       </div>
       <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'ring-2 ring-primary-start/50 bg-white/5' : 'bg-primary-start/5'} rounded-2xl group-hover:bg-white/5`}>
         <div className={`pl-5 text-slate-500 transition-colors ${isFocused ? 'text-primary-start' : ''}`}>
           {icon}
         </div>
         <input 
           type="text" 
           defaultValue={defaultValue}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           className="w-full bg-transparent px-5 py-4 focus:outline-none text-foreground font-semibold placeholder:opacity-0"
           placeholder={label}
         />
       </div>
    </div>
  );
}
