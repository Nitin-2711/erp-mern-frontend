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
  CheckSquare,
  BarChart3,
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
    title: 'Nexus Hub',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Users Matrix',
    href: '/dashboard/users',
    icon: Users,
    roles: ['ADMIN'],
  },
  {
    title: 'Departments',
    href: '/dashboard/departments',
    icon: Command,
    roles: ['ADMIN', 'HOD'],
  },
  {
    title: 'Faculty Node',
    href: '/dashboard/faculty',
    icon: GraduationCap,
    roles: ['ADMIN', 'HOD'],
  },
  {
    title: 'Quantum Shards',
    href: '/dashboard/subjects',
    icon: BookOpen,
    roles: ['ADMIN', 'HOD', 'FACULTY'],
  },
  {
    title: 'Presence Matrix',
    href: '/dashboard/attendance',
    icon: CheckSquare,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Flow Ledger',
    href: '/dashboard/fees',
    icon: Wallet,
    roles: ['ADMIN', 'STUDENT'],
    badge: 'Due',
  },
  {
    title: 'Result Matrix',
    href: '/dashboard/results',
    icon: Calendar,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Chronos Stream',
    href: '/dashboard/timetable',
    icon: BarChart3,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
  {
    title: 'Sync Protocols',
    href: '/dashboard/profile',
    icon: Settings,
    roles: ['ADMIN', 'HOD', 'FACULTY', 'STUDENT'],
  },
];
