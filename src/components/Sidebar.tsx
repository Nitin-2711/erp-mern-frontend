"use client";

import { Home, Users, BookOpen, CreditCard, ClipboardCheck, Settings, GraduationCap, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Faculty", icon: GraduationCap, path: "/faculty" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Finances", icon: CreditCard, path: "/finances" },
    { name: "Exams", icon: ClipboardCheck, path: "/exams" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed left-6 top-6 bottom-6 w-64 glass-panel z-50 flex flex-col p-6 rounded-[2.5rem] border-white/20 dark:border-white/5"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2 py-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <GraduationCap className="text-white w-7 h-7 relative z-10" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">ERP <span className="text-indigo-600">PRO</span></h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Enterprise OS</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">CORE MODULES</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                isActive
                  ? "nav-active text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:rotate-12"}`} />
              <span className="font-bold text-sm tracking-tight">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* System & Support */}
      <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">System</p>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isLogout = item.path === "/logout";
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isLogout 
                ? "text-rose-500 hover:bg-rose-500/10" 
                : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-indigo-600"
              }`}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
