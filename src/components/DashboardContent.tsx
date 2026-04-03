import { motion } from "framer-motion";
import { cn } from "@/utils";
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Shield, 
  Zap, 
  GraduationCap, 
  Command,
  LayoutDashboard,
  Database,
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { KPICard, DepartmentInsight, ActivityLog, ActionCard } from "./Dashboard";

export const AdminDashboard = () => (
  <div className="space-y-12">
    {/* KPI Row - Fully Interactive */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <KPICard title="Total Students" value="12,450" icon={Users} trend={{ value: 5.2, isPositive: true }} color="indigo" href="/dashboard/users" />
      <KPICard title="Faculty Members" value="482" icon={GraduationCap} trend={{ value: 1.2, isPositive: true }} color="blue" href="/dashboard/faculty" />
      <KPICard title="Active courses" value="84" icon={BookOpen} trend={{ value: 0.8, isPositive: false }} color="emerald" href="/dashboard/subjects" />
      <KPICard title="System Matrix" value="94%" icon={Zap} trend={{ value: 2.1, isPositive: true }} color="amber" href="/dashboard/reports" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Analytics Main */}
      <div className="lg:col-span-2 space-y-10">
        <DepartmentInsight 
          departments={[
            { name: "Computer Science", students: 4500, total: 5000, color: "bg-indigo-500" },
            { name: "Mechanical Engineering", students: 2800, total: 4000, color: "bg-blue-500" },
            { name: "Information Technology", students: 3200, total: 3500, color: "bg-emerald-500" },
            { name: "Business Admin", students: 1500, total: 2000, color: "bg-amber-500" },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ActionCard title="User Access" icon={Users} color="indigo" href="/dashboard/users" />
          <ActionCard title="Grant Clearance" icon={Shield} color="rose" href="/dashboard/profile" />
          <ActionCard title="Audit Matrix" icon={Database} color="emerald" href="/dashboard/reports" />
        </div>
      </div>

      {/* Sidebar Analytics */}
      <div className="space-y-8">
        <ActivityLog 
          activities={[
            { id: '1', type: 'SYSTEM', title: 'Security scan complete', time: '12m ago', status: 'All nodes secure' },
            { id: '2', type: 'ATTENDANCE', title: 'CS-DEPT Batch-A updated', time: '45m ago', status: 'Marked by Dr. Smith' },
            { id: '3', type: 'ACADEMIC', title: 'New course: AI Ethics', time: '2h ago', status: 'Pending HOD approval' },
          ]}
        />
      </div>
    </div>
  </div>
);

export const HODDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <KPICard title="Dept Students" value="2,480" icon={Users} color="indigo" href="/dashboard/users" />
      <KPICard title="Total Faculty" value="84" icon={GraduationCap} color="blue" href="/dashboard/faculty" />
      <KPICard title="Attendance Index" value="92.4%" icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
       <div className="lg:col-span-2 space-y-10">
          <DepartmentInsight 
            departments={[
              { name: "First Year B.Tech", students: 800, total: 850, color: "bg-indigo-500" },
              { name: "Second Year B.Tech", students: 720, total: 800, color: "bg-blue-500" },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ActionCard title="Course Allocation" icon={BookOpen} color="indigo" href="/dashboard/subjects" />
            <ActionCard title="Approve Leaves" icon={FileText} color="rose" href="/dashboard/profile" />
          </div>
       </div>
        <ActivityLog 
          activities={[
            { id: '1', type: 'ACADEMIC', title: 'Syllabus revised: PHY-102', time: '1h ago', status: 'Approved' },
            { id: '2', type: 'ATTENDANCE', title: 'Low attendance alert', time: '3h ago', status: 'Batch B-04' },
          ]}
        />
    </div>
  </div>
);

export const FacultyDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <KPICard title="Today's Classes" value="04" icon={Calendar} color="indigo" href="/dashboard/timetable" />
      <KPICard title="Avg Attendance" value="88%" icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
      <KPICard title="Tasks" value="12" icon={Clock} color="amber" href="/dashboard" />
      <KPICard title="Students" value="480" icon={Users} color="blue" href="/dashboard/users" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 border border-slate-100 dark:border-white/5 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tighter">Timeline Strategy</h3>
          <div className="space-y-6">
             {[
               { time: "09:00 AM", class: "Quantum Physics Lab", room: "L-204", status: "Completed" },
               { time: "11:30 AM", class: "Solid State Devices", room: "A-102", status: "Ongoing" },
               { time: "02:00 PM", class: "Faculty Sync Meeting", room: "Conf Hall", status: "Upcoming" },
             ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-white/5 group cursor-pointer">
                    <div className="flex items-center gap-6">
                       <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all group-hover:scale-110">
                         <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">{c.time}</span>
                       </div>
                       <div>
                          <p className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{c.class}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60 leading-none mt-1">{c.room}</p>
                       </div>
                    </div>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border transition-all duration-500",
                      c.status === 'Completed' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : c.status === 'Ongoing' ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" : "bg-slate-100 text-slate-400 border-transparent"
                    )}>{c.status}</span>
                </div>
             ))}
          </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
          <ActionCard title="Mark Roll Call" icon={CheckCircle} color="indigo" href="/dashboard/attendance" />
          <ActionCard title="Broadcast Notice" icon={MessageSquare} color="amber" href="/dashboard" />
          <ActionCard title="Upload Grades" icon={TrendingUp} color="emerald" href="/dashboard/results" />
      </div>
    </div>
  </div>
);

export const StudentDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <KPICard title="CGPA Index" value="9.24" icon={GraduationCap} color="indigo" href="/dashboard/results" />
      <KPICard title="Attendance" value="88.4%" icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
      <KPICard title="Dues Matrix" value="$1,240" icon={Briefcase} color="rose" href="/dashboard/fees" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-sm">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tighter">Academic Shards</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { name: "Mechanics of Solid", score: "A+", progress: 95 },
                  { name: "Thermodynamics", score: "A", progress: 88 },
                  { name: "Mathematics IV", score: "B+", progress: 78 },
                  { name: "Logic Architecture", score: "A-", progress: 84 },
                ].map((s, i) => (
                  <div key={i} className="space-y-4 group cursor-pointer">
                     <div className="flex justify-between items-end">
                        <span className="text-[11px] font-black text-slate-500 group-hover:text-indigo-500 transition-colors uppercase">{s.name}</span>
                        <span className="text-base font-black text-indigo-600">{s.score}</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-[1px]">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${s.progress}%` }} 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]" 
                        />
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ActionCard title="Timetable" icon={Calendar} color="indigo" href="/dashboard/timetable" />
              <ActionCard title="Quick Messages" icon={MessageSquare} color="blue" href="/dashboard" />
              <ActionCard title="Exam Portal" icon={TrendingUp} color="emerald" href="/dashboard/results" />
          </div>
      </div>
      <ActivityLog 
          activities={[
            { id: '1', type: 'ACADEMIC', title: 'Result Published', time: '1d ago', status: 'SEM-04 Lab' },
            { id: '2', type: 'SYSTEM', title: 'Profile verified', time: '2d ago', status: 'Registrar active' },
          ]}
        />
    </div>
  </div>
);
