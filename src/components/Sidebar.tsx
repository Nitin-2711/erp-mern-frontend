"use client";

import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  ClipboardCheck, 
  Settings, 
  GraduationCap, 
  LogOut, 
  ChevronRight, 
  Home, 
  Calendar, 
  MessageSquare,
  Search,
  Moon,
  Sun,
  Bell,
  Zap,
  Command,
  HelpCircle,
  FileText,
  Activity,
  Award,
  Layers,
  Building,
  Edit,
  BarChart3,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useRole } from "@/context/RoleContext";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = {
    admin: [
      { name: "Core Hub", icon: LayoutDashboard, path: "/" },
      { name: "Academic Lattice", icon: Building, path: "/departments" },
      { name: "Knowledge Index", icon: BookOpen, path: "/subjects" },
      { name: "Identity Center", icon: Users, path: "/users" },
      { name: "Profile Node", icon: User, path: "/profile" },
      { name: "Strategic Hub", icon: BarChart3, path: "/reports" },
      { name: "Global Finance", icon: CreditCard, path: "/revenue" },
    ],
    hod: [
      { name: "Dept Hub", icon: LayoutDashboard, path: "/" },
      { name: "Lattice Struct", icon: Building, path: "/departments" },
      { name: "Strategic Hub", icon: BarChart3, path: "/reports" },
      { name: "Faculty Registry", icon: GraduationCap, path: "/faculty" },
      { name: "Student Grid", icon: Users, path: "/students" },
      { name: "Profile Node", icon: User, path: "/profile" },
    ],
    faculty: [
      { name: "Mission Hub", icon: LayoutDashboard, path: "/" },
      { name: "Presence Registry", icon: ClipboardCheck, path: "/faculty/attendance" },
      { name: "Marks Ledger", icon: Edit, path: "/marks" },
      { name: "Knowledge Shards", icon: FileText, path: "/faculty/material" },
      { name: "Profile Node", icon: User, path: "/profile" },
      { name: "Neural Message", icon: MessageSquare, path: "/messages" },
    ],
    student: [
      { name: "Quantum Hub", icon: LayoutDashboard, path: "/" },
      { name: "Temporal Grid", icon: Calendar, path: "/timetable" },
      { name: "Presence Matrix", icon: ClipboardCheck, path: "/attendance" },
      { name: "Profile Node", icon: User, path: "/profile" },
      { name: "Finance Vault", icon: CreditCard, path: "/fees" },
      { name: "Impact Log", icon: Award, path: "/results" },
    ]
  };

  const menuItems = navigation[role as keyof typeof navigation] || navigation.admin;

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? "120px" : "340px",
        x: 0 
      }}
      className="fixed left-8 top-8 bottom-8 z-50 glass-panel !rounded-[3rem] border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
    >
      {/* Branding Node */}
      <div className="p-10 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-start via-primary-middle to-primary-end p-[2px] shadow-2xl shadow-primary-start/40 flex-shrink-0 relative group overflow-hidden">
           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-full h-full bg-[#0A0F1F] rounded-[14px] flex items-center justify-center font-black text-xl text-white">
            N
          </div>
        </div>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-2xl font-black tracking-tighter text-white">NEXUS<span className="text-primary-middle">CORE</span></h1>
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5 leading-none">Quantum ERP v2.0</p>
          </motion.div>
        )}
      </div>

      {/* Navigation Cluster */}
      <nav className="flex-1 px-5 space-y-3 mt-4 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 ml-5 opacity-40">System Overlays</p>
        )}
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all duration-500 group relative overflow-hidden mb-1 ${
                isActive
                  ? "bg-white/5 text-white shadow-2xl shadow-black/20 border border-white/5"
                  : "text-slate-500 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-glow"
                  className="absolute left-0 w-1.5 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_15px_#6366f1]"
                />
              )}
              <Icon className={`w-6 h-6 min-w-[24px] transition-all duration-500 ${isActive ? "text-indigo-400 translate-x-1 glow-primary" : "group-hover:scale-110 group-hover:text-slate-300"}`} />
              {!isCollapsed && (
                <span className={`font-black text-[13px] tracking-tighter uppercase transition-all ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                  {item.name}
                </span>
              )}
              {isActive && !isCollapsed && (
                 <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Core Footer */}
      <div className="p-8 mt-auto border-t border-white/5 space-y-4 bg-white/[0.01]">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center lg:justify-start gap-4 px-6 py-5 rounded-3xl text-slate-500 hover:bg-white/5 hover:text-white transition-all group border border-transparent hover:border-white/5"
        >
          <div className="p-1 rounded-lg group-hover:rotate-12 transition-transform">
            {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-amber-500" />}
          </div>
          {!isCollapsed && <span className="font-black text-[11px] uppercase tracking-widest">{theme === "light" ? "Night Core" : "Light Aura"}</span>}
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-5 flex items-center justify-center gap-4 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white group"
        >
          {isCollapsed ? (
            <Zap className="w-5 h-5 text-indigo-500 animate-pulse" />
          ) : (
            <>
              <Command className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
              <span>Toggle Interface</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
