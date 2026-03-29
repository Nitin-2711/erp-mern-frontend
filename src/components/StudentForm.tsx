"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, User, Mail, Phone, ShieldCheck, GraduationCap, BookOpen, UserPlus, Save } from "lucide-react";
import ImageUploadWithMask from "./ImageUploadWithMask";

export default function StudentForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    enrollmentNo: "",
    studentId: "",
    email: "",
    phone: "",
    courseBranch: "",
    yearSemester: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-10 rounded-[3rem] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary-start/10 blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-end/10 blur-[80px] -z-10" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12 border-b border-white/5 pb-10">
        <div>
           <h2 className="text-4xl font-black tracking-tighter mb-2">New <span className="gradient-text-master">Student Node</span></h2>
           <p className="text-slate-500 font-medium opacity-80 uppercase text-[10px] tracking-[0.4em]">Registering unique identity in core grid</p>
        </div>
        <div className="flex -space-x-4">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="w-12 h-12 rounded-full bg-white/5 border-2 border-primary-start/20 flex items-center justify-center backdrop-blur-md">
               <User className={`w-5 h-5 ${i === 0 ? 'text-primary-start' : 'text-slate-500 opacity-40'}`} />
             </div>
           ))}
           <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/20">
             <Plus className="w-6 h-6" />
           </div>
        </div>
      </div>

      <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onSubmit?.(formData); }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] font-black text-primary-start uppercase tracking-widest mb-6">Profile Artifact</h3>
            <ImageUploadWithMask onImageSelect={(file) => setFormData({ ...formData, image: file as any })} />
            <div className="mt-8 p-6 glass-panel rounded-3xl w-full text-center border-dashed border-primary-start/20">
               <p className="text-xs font-bold text-slate-500 italic opacity-60">Identity photo will be processed through neural verification.</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                 <InputField 
                   name="name" 
                   icon={<User />} 
                   label="Full Legal Name" 
                   placeholder="Enter student's full name" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="rollNo" 
                   icon={<ShieldCheck />} 
                   label="Roll Number" 
                   placeholder="e.g., 20MCK0241" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="enrollmentNo" 
                   icon={<ShieldCheck />} 
                   label="Enrollment No" 
                   placeholder="University Enrollment ID" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="studentId" 
                   icon={<ShieldCheck />} 
                   label="Student ID" 
                   placeholder="Internal ERP ID" 
                   onChange={handleChange}
                 />
              </div>

              <div className="space-y-8">
                 <InputField 
                   name="email" 
                   icon={<Mail />} 
                   label="Primary Email" 
                   placeholder="University or official email" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="phone" 
                   icon={<Phone />} 
                   label="Contact Number" 
                   placeholder="+91 00000 00000" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="courseBranch" 
                   icon={<GraduationCap />} 
                   label="Course / Branch" 
                   placeholder="e.g., B.Tech CSE" 
                   onChange={handleChange}
                 />
                 <InputField 
                   name="yearSemester" 
                   icon={<BookOpen />} 
                   label="Year / Semester" 
                   placeholder="e.g., 3rd Year / 6th Sem" 
                   onChange={handleChange}
                 />
              </div>
            </div>

            <div className="flex gap-6 pt-10 border-t border-white/5">
               <button 
                 type="submit"
                 className="flex-1 py-5 bg-gradient-to-r from-primary-start to-primary-middle text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-2xl shadow-primary-start/40 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4"
               >
                 <UserPlus className="w-6 h-6" /> Initialize Student Profile
               </button>
               <button 
                 type="reset"
                 className="px-10 py-5 bg-white/5 border border-white/10 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all"
               >
                 Flush Form
               </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

function InputField({ 
  name, 
  icon, 
  label, 
  placeholder, 
  onChange 
}: { 
  name: string, 
  icon: React.ReactNode, 
  label: string, 
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="relative group">
       <div 
         className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 px-4 flex items-center gap-3 ${
           isFocused || value ? '-top-3 text-[9px] font-black text-primary-start' : 'top-4 text-sm font-medium text-slate-500'
         }`}
       >
         <span className={`transition-all ${isFocused || value ? 'scale-75 opacity-0' : 'opacity-60'}`}>{icon}</span>
         <span className="uppercase tracking-[0.2em]">{label}</span>
       </div>
       
       <div className={`relative transition-all duration-300 ${isFocused ? 'bg-primary-start/10 ring-2 ring-primary-start/50' : 'bg-primary-start/5'} rounded-2xl`}>
         <input 
           name={name}
           type="text" 
           value={value}
           onChange={handleInput}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           className="w-full bg-transparent px-6 py-4.5 focus:outline-none text-foreground font-semibold placeholder:opacity-0"
           placeholder={placeholder}
         />
         <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-start to-primary-middle transition-all duration-500 shadow-[0_0_10px_var(--color-primary-start)] ${isFocused ? 'w-full' : 'w-0'}`} />
       </div>
    </div>
  );
}
