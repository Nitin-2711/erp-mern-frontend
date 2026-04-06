'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/shared/ui/button';

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const role = user?.role || 'STUDENT';

  const menuItems = {
    ADMIN: [
      { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/admin' },
      { name: 'User Management', icon: Users, href: '/dashboard/admin/users' },
      { name: 'Departments', icon: Building2, href: '/dashboard/admin/departments' },
      { name: 'System Logs', icon: ShieldCheck, href: '/dashboard/admin/logs' },
    ],
    HOD: [
      { name: 'Department Info', icon: Building2, href: '/dashboard/hod' },
      { name: 'Faculty Load', icon: Users, href: '/dashboard/hod/faculty' },
      { name: 'Course Progress', icon: BookOpen, href: '/dashboard/hod/courses' },
      { name: 'Analytics', icon: BarChart3, href: '/dashboard/hod/analytics' },
    ],
    FACULTY: [
      { name: 'My Dashboard', icon: LayoutDashboard, href: '/dashboard/faculty' },
      { name: 'Attendance', icon: ClipboardCheck, href: '/dashboard/faculty/attendance' },
      { name: 'Marks Upload', icon: GraduationCap, href: '/dashboard/faculty/marks' },
      { name: 'Schedule', icon: Calendar, href: '/dashboard/faculty/schedule' },
    ],
    STUDENT: [
      { name: 'My Profile', icon: LayoutDashboard, href: '/dashboard/student' },
      { name: 'Attendance', icon: ClipboardCheck, href: '/dashboard/student/attendance' },
      { name: 'Results', icon: GraduationCap, href: '/dashboard/student/results' },
      { name: 'Course Content', icon: BookOpen, href: '/dashboard/student/courses' },
    ]
  }[role];

  return (
    <aside className={cn(
      "h-screen flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 relative z-50",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
          A
        </div>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight dark:text-slate-100">
            Aura<span className="text-indigo-600">ERP</span>
          </span>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-12 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-4 pt-10">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all group",
                active 
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" 
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
              )}
            >
              <item.icon size={22} className={cn(
                "shrink-0",
                active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100"
              )} />
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
        <Link 
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 transition-all",
            pathname === '/dashboard/settings' && "bg-slate-100 dark:bg-slate-800"
          )}
        >
          <Settings size={22} className="shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
        >
          <LogOut size={22} className="shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
