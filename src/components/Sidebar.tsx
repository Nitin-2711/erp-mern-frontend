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
  User,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useRole } from "@/context/RoleContext";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navigation = {
    admin: [
      { name: "Global Hub", icon: LayoutDashboard, path: "/" },
      { name: "User Identities", icon: Users, path: "/users" },
      { name: "Analytic Matrix", icon: BarChart3, path: "/reports" },
      { name: "System Nodes", icon: Layers, path: "/system" },
      { name: "Core Settings", icon: Settings, path: "/settings" },
      { name: "Profile Node", icon: User, path: "/profile" },
    ],
    hod: [
      { name: "Dept Overview", icon: LayoutDashboard, path: "/" },
      { name: "Faculty Network", icon: Building, path: "/faculty" },
      { name: "Strategic Hub", icon: BarChart3, path: "/reports" },
      { name: "Approvals Grid", icon: ClipboardCheck, path: "/approvals" },
      { name: "Analytic Node", icon: Activity, path: "/analytics" },
    ],
    faculty: [
      { name: "Class Matrix", icon: LayoutDashboard, path: "/" },
      { name: "Student Lattice", icon: Users, path: "/students" },
      { name: "Attendance Log", icon: ClipboardCheck, path: "/faculty/attendance" },
      { name: "Marks Depot", icon: Edit, path: "/marks" },
      { name: "Notice Board", icon: Bell, path: "/notices" },
    ],
    student: [
      { name: "Quantum Hub", icon: LayoutDashboard, path: "/" },
      { name: "Profile Node", icon: User, path: "/profile" },
      { name: "Subject Index", icon: BookOpen, path: "/subjects" },
      { name: "Presence Ratio", icon: Activity, path: "/attendance" },
      { name: "Impact Ledger", icon: Award, path: "/results" },
      { name: "Finance Vault", icon: CreditCard, path: "/fees" },
      { name: "Notice Shards", icon: Zap, path: "/notices" },
    ]
  };

  const menuItems = navigation[role as keyof typeof navigation] || navigation.admin;

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? "110px" : "320px",
      }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed left-6 top-6 bottom-6 z-50 glass-panel !rounded-[28px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden perspective-1200"
    >
      <div className="glow-sidebar-ambient" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="particle w-1 h-1" 
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      {/* Logo Block */}
      <div className={`p-8 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} relative z-10`}>
        <div className="relative w-12 h-12 flex-shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-start to-primary-end rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
          <div className="w-full h-full rounded-xl rotate-border-container p-[2px]">
            <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center relative z-10 transition-transform group-hover:scale-95">
              <span className="font-black text-xl text-white">N</span>
            </div>
          </div>
        </div>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-xl font-black tracking-tight gradient-text-animated">NEXUSCORE</h1>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mt-1">Quantum ERP System</p>
          </motion.div>
        )}
      </div>

      {/* Navigation Cluster */}
      <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto no-scrollbar relative z-10">
        {!isCollapsed && (
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4 ml-6 opacity-40">Main Matrix</p>
        )}
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.path}>
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden mb-1 ${
                  isActive
                    ? "sidebar-item-glass shadow-[0_0_20px_rgba(59,130,246,0.1)] border border-white/10"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-primary-start/20 via-primary-middle/10 to-transparent animate-liquid -z-10"
                  />
                )}
                <div className="relative">
                   <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-primary-start glow-primary scale-110" : "group-hover:text-white group-hover:scale-110"}`} />
                   {isActive && (
                     <motion.div 
                       layoutId="icon-glow"
                       className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-start blur-sm"
                     />
                   )}
                </div>
                {!isCollapsed && (
                  <span className={`font-bold text-[13px] tracking-tight transition-all ${isActive ? "text-white" : "group-hover:text-white"}`}>
                    {item.name}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-start shadow-[0_0_10px_#3b82f6] animate-pulse" 
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Control Panel */}
      <div className="p-4 mt-auto space-y-4 relative z-10 border-t border-white/5 bg-white/[0.01]">
        {/* Profile Mini Card */}
        {!isCollapsed ? (
          <motion.div 
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
            className="sidebar-item-glass p-4 rounded-[22px] border border-white/5 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
               <div className="relative w-10 h-10 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-primary-start to-primary-end">
                  <div className="w-full h-full bg-[#0A0F1F] rounded-xl flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=10&w=64" className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" alt="Avatar" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 border-2 border-[#0A0F1F] rounded-full">
                    <div className="status-pulse-dot" />
                  </div>
               </div>
               <div className="overflow-hidden">
                  <p className="text-xs font-black text-white truncate">Nitin Kumar</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Admin Node</p>
               </div>
               <MoreVertical className="w-4 h-4 ml-auto text-slate-600 group-hover:text-white" />
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center">
             <div className="w-10 h-10 rounded-xl bg-primary-start/10 border border-primary-start/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-start" />
             </div>
          </div>
        )}

        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-4' : 'justify-between px-2'} gap-2`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-white/5 transition-colors relative"
          >
            {theme === "light" ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Settings className="w-5 h-5 text-slate-500 hover:text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-3 rounded-xl border border-white/10 ${isCollapsed ? 'bg-primary-start/20' : 'bg-white/5'} transition-all`}
          >
            {isCollapsed ? <Zap className="w-5 h-5 text-primary-start animate-pulse" /> : <Command className="w-5 h-5 text-slate-500" />}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
