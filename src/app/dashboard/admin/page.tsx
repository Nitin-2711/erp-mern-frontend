'use client';

import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { 
  Users, 
  Building2, 
  GraduationCap, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Jan', students: 4000, faculty: 2400 },
  { name: 'Feb', students: 3000, faculty: 1398 },
  { name: 'Mar', students: 2000, faculty: 9800 },
  { name: 'Apr', students: 2780, faculty: 3908 },
  { name: 'May', students: 1890, faculty: 4800 },
  { name: 'Jun', students: 2390, faculty: 3800 },
];

const AdminDashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Total Students', value: '42,892', change: '+12.5%', icon: GraduationCap, trend: 'up' },
    { label: 'Total Faculty', value: '1,420', change: '+3.2%', icon: Users, trend: 'up' },
    { label: 'Departments', value: '24', change: '0%', icon: Building2, trend: 'neutral' },
    { label: 'System Uptime', value: '99.9%', change: '-0.1%', icon: Activity, trend: 'down' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">System-wide overview and infrastructure analytics.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-sm">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 py-1 flex items-center gap-1.5">
            <ShieldCheck size={14} /> System Secure
          </Badge>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <stat.icon size={24} />
                </div>
                {stat.trend === 'up' ? (
                  <span className="flex items-center text-emerald-600 text-xs font-bold">
                    <ArrowUpRight size={14} className="mr-0.5" /> {stat.change}
                  </span>
                ) : stat.trend === 'down' ? (
                  <span className="flex items-center text-rose-600 text-xs font-bold">
                    <ArrowDownRight size={14} className="mr-0.5" /> {stat.change}
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs font-bold">{stat.change}</span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Monthly student and faculty registration growth.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Load</CardTitle>
            <CardDescription>Resources allocated per department.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="students" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="faculty" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table (Placeholder UI) */}
      <Card>
        <CardHeader>
          <CardTitle>Security Logs</CardTitle>
          <CardDescription>Real-time system access and security events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                  <th className="py-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  <th className="py-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                  <th className="py-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">System Admin</span>
                        </div>
                    </td>
                    <td className="py-4 px-2 text-sm text-slate-600 dark:text-slate-400 font-medium">API Key Rotation</td>
                    <td className="py-4 px-2 text-sm text-slate-500 dark:text-slate-500">2 mins ago</td>
                    <td className="py-4 px-2">
                        <Badge variant="success" className="text-[10px]">Success</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
