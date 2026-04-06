'use client';

import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  XSquare, 
  Clock, 
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { useState } from 'react';

const FacultyDashboard = () => {
  const { user } = useAuthStore();
  const [selectedSubject, setSelectedSubject] = useState('Computer Science 101');

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Computer Science 101', room: 'LHC-101', students: 45 },
    { time: '11:30 AM', subject: 'Data Structures', room: 'LHC-204', students: 38 },
    { time: '02:00 PM', subject: 'Algorithms Lab', room: 'LAB-02', students: 22 },
  ];

  const students = [
    { id: 'STU001', name: 'Alice Cooper', roll: '2024CS001', attendance: 'PRESENT' },
    { id: 'STU002', name: 'Bob Dylan', roll: '2024CS002', attendance: 'ABSENT' },
    { id: 'STU003', name: 'Charlie Puth', roll: '2024CS003', attendance: 'PRESENT' },
    { id: 'STU004', name: 'Dave Grohl', roll: '2024CS004', attendance: 'PRESENT' },
    { id: 'STU005', name: 'Eddie Vedder', roll: '2024CS005', attendance: 'PENDING' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Faculty Terminal</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Class management and attendance marking records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            <Calendar size={16} className="mr-2" /> View Schedule
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20">
            Push Marks
          </Button>
        </div>
      </div>

      {/* Main Grid: Upcoming Classes & Attendance Marking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upcoming Classes Sidebar (Desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="h-full border-none bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20">
            <CardHeader className="p-8">
              <CardTitle className="text-white">In Session</CardTitle>
              <CardDescription className="text-indigo-200">Current active academic schedule.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              {upcomingClasses.map((cls, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 opacity-60 group-hover:opacity-100 transition-opacity">{cls.time}</span>
                    <div className="w-[2px] h-12 bg-white/20" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-lg leading-none">{cls.subject}</h4>
                    <p className="text-sm text-indigo-100 flex items-center gap-2">
                        <Clock size={12} /> {cls.room} • <Users size={12} /> {cls.students} Students
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-6">
              <div className="space-y-1">
                <CardTitle>Attendance Marking</CardTitle>
                <CardDescription>CS101 - Lecture Room 302</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400"><Search size={20} /></Button>
                <Button variant="ghost" size="icon" className="text-slate-400"><Filter size={20} /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 text-xs font-bold uppercase tracking-widest">
                       <th className="py-4 px-8">Student</th>
                       <th className="py-4 px-4 text-center">Status</th>
                       <th className="py-4 px-8 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                     {students.map((stu) => (
                       <tr key={stu.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors group">
                         <td className="py-5 px-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    {stu.name[0]}
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-700 dark:text-slate-300">{stu.name}</h5>
                                    <p className="text-xs text-slate-400 font-medium">{stu.roll}</p>
                                </div>
                            </div>
                         </td>
                         <td className="py-5 px-4 text-center">
                            {stu.attendance === 'PRESENT' ? (
                                <Badge variant="success" className="text-[10px]"><CheckCircle2 size={12} className="mr-1" /> Present</Badge>
                            ) : stu.attendance === 'ABSENT' ? (
                                <Badge variant="destructive" className="text-[10px]"><XSquare size={12} className="mr-1" /> Absent</Badge>
                            ) : (
                                <Badge variant="secondary" className="text-[10px] border-slate-300 text-slate-400 border-dashed">Awaiting</Badge>
                            )}
                         </td>
                         <td className="py-5 px-8 text-right space-x-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"><CheckCircle2 size={18} /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"><XSquare size={18} /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400"><MoreVertical size={18} /></Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="p-6 border-t border-slate-100 dark:border-slate-900 flex justify-end">
                    <Button className="rounded-2xl px-12 bg-slate-900 dark:bg-indigo-600 shadow-xl shadow-indigo-500/10">Submit Attendance List</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
