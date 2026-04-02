import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Wallet, 
  Calendar, 
  Settings, 
  MessageSquare, 
  FileText, 
  Bell, 
  CheckSquare,
  BarChart3,
  Search,
  Command
} from 'lucide-react';
import { UserRole } from '@/store';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: UserRole[];
  badge?: string;
  children?: { title: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Admissions',
    href: '/dashboard/admin/admissions',
    icon: Users,
    roles: ['ADMIN'],
  },
  {
    title: 'Departments',
    href: '/dashboard/admin/departments',
    icon: Command,
    roles: ['ADMIN', 'HOD'],
  },
  {
    title: 'Faculty Hub',
    href: '/dashboard/hod/faculty',
    icon: GraduationCap,
    roles: ['ADMIN', 'HOD'],
  },
  {
    title: 'Course Management',
    href: '/dashboard/faculty/courses',
    icon: BookOpen,
    roles: ['ADMIN', 'HOD', 'FACULTY'],
  },
  {
    title: 'Attendance',
    href: '/dashboard/attendance',
    icon: CheckSquare,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Fees & Payments',
    href: '/dashboard/fees',
    icon: Wallet,
    roles: ['ADMIN', 'STUDENT'],
    badge: 'Due',
  },
  {
    title: 'Examinations',
    href: '/dashboard/exams',
    icon: Calendar,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    roles: ['ADMIN', 'HOD'],
  },
  {
    title: 'Communications',
    href: '/dashboard/communications',
    icon: MessageSquare,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Documents',
    href: '/dashboard/documents',
    icon: FileText,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
];
