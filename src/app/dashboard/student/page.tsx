'use client';

import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { 
  GraduationCap, 
  MapPin, 
  TrendingUp, 
  BookOpen, 
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer,
  PolarAngleAxis,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Attendance', value: 87, fill: '#6366f1' },
];

const StudentDashboard = () => {
  const { user } = useAuthStore();

  const subjects = [
    { name: 'Computer Networks', progress: 85, attendance: '92%', grade: 'A' },
    { name: 'Software Engineering', progress: 60, attendance: '78%', grade: 'B+' },
    { name: 'Discrete Mathematics', progress: 95, attendance: '88%', grade: 'A' },
    { name: 'Machine Learning', progress: 40, attendance: '95%', grade: 'TBD' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-indigo-500/30">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 shrink-0" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-20 -mb-20 shrink-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-4xl font-bold shadow-xl">
             {user?.name?.[0] || 'S'}
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tight leading-none">{user?.name || 'Academic Pioneer'}</h1>
            <p className="text-indigo-100 flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
               <GraduationCap size={16} /> B.Tech Computer Science • Year 3 • Semester 6
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <Badge variant="outline" className="border-indigo-400 text-indigo-50 text-[10px] py-1 px-3 bg-indigo-400/20 backdrop-blur-sm">ID: 2024CS012</Badge>
                <Badge variant="outline" className="border-emerald-400 text-emerald-50 text-[10px] py-1 px-3 bg-emerald-400/20 backdrop-blur-sm">Scholarship: ACTIVE</Badge>
            </div>
          </div>
          <div className="hidden lg:flex flex-1 justify-end ml-auto gap-4">
               <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/10 rounded-2xl px-6 h-12">Download ID Card</Button>
               <Button variant="ghost" className="text-white bg-indigo-500/40 hover:bg-white/20 rounded-2xl px-8 h-12">Profile Settings</Button>
          </div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Attendance Circle */}
        <div className="lg:col-span-4 lg:row-span-2">
            <Card className="h-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle>Attendance Stats</CardTitle>
                    <CardDescription>Aggregate presence across semester.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8 pt-0 h-[300px]">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={data} startAngle={90} endAngle={450}>
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar background dataKey="value" cornerRadius={30} fill="#6366f1" />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-5xl font-black text-slate-900 dark:text-white">87%</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-2">
                                <CheckCircle size={14} /> Good standing
                            </span>
                        </div>
                    </div>
                    <div className="w-full mt-6 space-y-4">
                        <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-900">
                            <span className="text-slate-500 font-medium">Attended Lectures</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">142/164</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span className="text-slate-500 font-medium">Missed (Safe)</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">22</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Academic Progress */}
        <div className="lg:col-span-8 flex flex-col gap-8">
            <Card className="border-slate-200/60 dark:border-slate-800/60 flex-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Academic Progress</CardTitle>
                        <CardDescription>Current semester subject tracking.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Sem 6 <TrendingUp size={12} className="ml-1" /></Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {subjects.map((sub, i) => (
                        <div key={i} className="space-y-2 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40 p-4 rounded-3xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-10 rounded-full bg-indigo-500" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{sub.name}</h4>
                                        <p className="text-xs text-slate-400">Attendance: {sub.attendance} • {sub.grade} grade avg</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-tighter">{sub.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${sub.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900 text-white border-none shadow-xl">
                    <CardHeader className="p-6 pb-2">
                        <CardTitle className="text-lg text-white flex items-center justify-between">
                            Results <AlertCircle size={18} className="text-amber-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        <p className="text-slate-400 text-sm">Preliminary results for Unit Test 1 are now available for review.</p>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl h-12 font-bold uppercase tracking-widest text-xs">View Result Matrix</Button>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="p-6 pb-2">
                         <CardTitle className="text-lg flex items-center justify-between text-slate-900 dark:text-white">
                            Deadlines <Clock size={18} className="text-rose-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                            <FileText size={16} className="text-rose-600" />
                            <div className="flex-1">
                                <h6 className="text-xs font-bold text-rose-700 dark:text-rose-400">ML Assignment 2</h6>
                                <p className="text-[10px] text-rose-500 font-medium">Due in 4 hours • Critical</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
