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
      className="fixed left-4 top-4 bottom-4 w-64 glass-panel z-50 flex flex-col p-6 rounded-[2rem]"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40 rotate-3">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter text-slate-800 dark:text-white leading-none">ERP PRO</h1>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">University OS</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1.5">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 ml-2">General</p>
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
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-white" : "group-hover:scale-110 group-hover:rotate-6"}`} />
              <span className="font-semibold text-sm">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-full ml-1"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
