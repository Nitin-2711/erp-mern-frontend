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
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useRole, Role } from "@/context/RoleContext";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { role, setRole } = useRole();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = {
    admin: [
      { name: "Overview", icon: LayoutDashboard, path: "/" },
      { name: "Departments", icon: Home, path: "/departments" },
      { name: "Revenue", icon: CreditCard, path: "/revenue" },
      { name: "System Logs", icon: ClipboardCheck, path: "/logs" },
    ],
    hod: [
      { name: "Department", icon: LayoutDashboard, path: "/" },
      { name: "Faculty", icon: GraduationCap, path: "/faculty" },
      { name: "Students", icon: Users, path: "/students" },
      { name: "Analytics", icon: BookOpen, path: "/analytics" },
    ],
    faculty: [
      { name: "My Classes", icon: LayoutDashboard, path: "/" },
      { name: "Attendance", icon: ClipboardCheck, path: "/attendance" },
      { name: "Uploads", icon: BookOpen, path: "/uploads" },
      { name: "Messages", icon: MessageSquare, path: "/messages" },
    ],
    student: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/" },
      { name: "Timetable", icon: Calendar, path: "/timetable" },
      { name: "Fees", icon: CreditCard, path: "/fees" },
      { name: "Notices", icon: Bell, path: "/notices" },
    ]
  };

  const menuItems = navigation[role] || navigation.admin;

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? "100px" : "300px",
        x: 0 
      }}
      className="fixed left-6 top-6 bottom-6 glass-panel z-50 flex flex-col rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Brand Section */}
      <div className="flex items-center justify-between p-8">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-start to-primary-end rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 relative group overflow-hidden">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <GraduationCap className="text-white w-7 h-7 relative z-10" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tighter leading-none bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">NEXUS</h1>
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-1.5 opacity-80">Quantum ERP</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </motion.div>
        </button>
      </div>

      {/* Navigation Matrix */}
      <nav className="flex-1 px-6 space-y-3 mt-4 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 ml-3 opacity-50">Main Frequency</p>
        )}
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-500 group relative overflow-hidden ${
                isActive
                  ? "bg-white/10 text-white shadow-xl"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-bg"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent pointer-events-none"
                />
              )}
              <Icon className={`w-5 h-5 min-w-[20px] transition-all duration-500 ${isActive ? "text-indigo-400 scale-110 glow-primary" : "group-hover:scale-110"}`} />
              {!isCollapsed && (
                <span className={`font-bold text-[13px] tracking-wide transition-all ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                  {item.name}
                </span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-l-full shadow-[0_0_15px_#6366f1]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Core */}
      <div className="p-6 mt-auto border-t border-white/5 space-y-3">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
        >
          <div className="p-1 rounded-lg group-hover:bg-indigo-500/10 transition-colors">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          {!isCollapsed && <span className="font-bold text-[13px] tracking-wide">{theme === "light" ? "Night Core" : "Light Aura"}</span>}
        </button>
        
        {!isCollapsed && (
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">⌘K</div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Menu</p>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
