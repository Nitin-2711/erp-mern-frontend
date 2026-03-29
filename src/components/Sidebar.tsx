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
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      className="fixed left-0 top-0 bottom-0 bg-card border-r border-border z-50 flex flex-col transition-colors duration-500 overflow-hidden"
    >
      {/* Brand & Toggle */}
      <div className="flex items-center justify-between p-6">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tighter leading-none">ERP PRO</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">University OS</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-muted rounded-xl transition-colors"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </button>
      </div>

      {/* Role Indicator (Quick Switch for Demo) */}
      {!isCollapsed && (
        <div className="px-6 mb-8">
          <div className="p-1 px-1.5 bg-muted rounded-2xl flex gap-1">
            {(["admin", "faculty", "student"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all ${
                  role === r ? "bg-card shadow-sm text-primary" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
        )}
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
                isActive
                  ? "nav-active"
                  : "text-slate-500 dark:text-slate-400 hover:bg-muted hover:text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 min-w-[20px] transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              {!isCollapsed && (
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_purple]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer System Tools */}
      <div className="p-4 mt-auto border-t border-border space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-muted transition-all"
        >
          {theme === "light" ? <Moon className="w-5 h-5 min-w-[20px]" /> : <Sun className="w-5 h-5 min-w-[20px]" />}
          {!isCollapsed && <span className="font-bold text-sm tracking-tight">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all">
          <LogOut className="w-5 h-5 min-w-[20px]" />
          {!isCollapsed && <span className="font-bold text-sm tracking-tight">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
