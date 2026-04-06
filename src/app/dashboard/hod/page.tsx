'use client';

import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  BarChart3, 
  Search, 
  MoreHorizontal,
  Mail,
  UserCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Dr. Smith', performance: 95, load: 12 },
  { name: 'Prof. Miller', performance: 88, load: 14 },
  { name: 'Dr. Wilson', performance: 72, load: 10 },
  { name: 'Dr. Lee', performance: 98, load: 16 },
  { name: 'Prof. Taylor', performance: 82, load: 12 },
];

const HODDashboard = () => {
  const { user } = useAuthStore();

  const faculties = [
    { id: 'FAC001', name: 'Dr. James Smith', role: 'Professor', load: '12hr/wk', status: 'ACTIVE' },
    { id: 'FAC002', name: 'Dr. Sarah Wilson', role: 'Asst. Professor', load: '10hr/wk', status: 'ON LEAVE' },
    { id: 'FAC003', name: 'Prof. Mark Taylor', role: 'Senior Lecturer', load: '15hr/wk', status: 'ACTIVE' },
    { id: 'FAC004', name: 'Dr. Emily Brown', role: 'Professor', load: '12hr/wk', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Department Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Department of Computer Science</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Head of Department oversight and faculty analytics node.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl h-10 px-6">
            <BarChart3 size={16} className="mr-2" /> Report Generator
          </Button>
          <Button size="sm" className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-2xl h-10 px-8 shadow-xl shadow-indigo-500/10">
             Faculty Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Stats Column */}
        <div className="lg:col-span-8 space-y-8">
            <Card className="border-slate-200/60 shadow-sm overflow-hidden min-h-[450px]">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 p-8 pb-6">
                    <div className="space-y-1">
                        <CardTitle className="text-xl">Faculty Performance Insights</CardTitle>
                        <CardDescription>Aggregate teaching performance metrics vs class load.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-8 h-[350px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="performance" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="border-slate-200/60 shadow-md">
                <CardHeader className="p-8 pb-0">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Faculty Roster</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600"><Search size={22} /></Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="py-4 px-8">Member</th>
                                    <th className="py-4 px-4">Load (L/T/P)</th>
                                    <th className="py-4 px-4 text-center">Status</th>
                                    <th className="py-4 px-8 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {faculties.map((f) => (
                                    <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-5 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-400">{f.name[4]}</div>
                                                <div>
                                                    <h6 className="font-bold text-slate-700">{f.name}</h6>
                                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{f.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 text-sm font-medium text-slate-600">{f.load}</td>
                                        <td className="py-5 px-4 text-center">
                                            {f.status === 'ACTIVE' ? (
                                                <Badge variant="success" className="text-[10px] px-3 font-bold rounded-lg border-emerald-100">ON DUTY</Badge>
                                            ) : (
                                                <Badge variant="destructive" className="text-[10px] px-3 font-bold rounded-lg border-rose-100">LEAVE</Badge>
                                            )}
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-indigo-600"><MoreHorizontal size={18} /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="bg-slate-900 border-none text-white shadow-2xl shadow-slate-950/40 p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-400"><TrendingUp size={28} /></div>
                    <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight">System Health</h4>
                        <p className="text-xs text-slate-400 font-bold tracking-widest">REAL-TIME TELEMETRY</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                            <span className="text-slate-400">Class Execution</span>
                            <span className="text-white">92%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[92%]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                            <span className="text-slate-400">Faculty Engagement</span>
                            <span className="text-white">78%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[78%]" />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-slate-200 shadow-sm space-y-6">
                <h5 className="font-bold flex items-center gap-2 text-slate-900"><UserCheck size={18} className="text-indigo-600" /> Pending Approvals</h5>
                <div className="space-y-4">
                    {[1, 2].map((n) => (
                        <div key={n} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Leave Request</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">2H AGO</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-700 leading-tight">Prof. Sarah Wilson requested 2 days of medical leave.</p>
                            <div className="flex gap-2">
                                <Button className="flex-1 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-white">Approve</Button>
                                <Button variant="ghost" className="flex-1 h-9 rounded-xl text-xs text-slate-400 border border-slate-200">Decline</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;
