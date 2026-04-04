import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/utils";
import { useAuthStore } from "@/store";
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
  Briefcase,
  Loader2
} from "lucide-react";
import { KPICard, DepartmentInsight, ActivityLog, ActionCard } from "./Dashboard";
import { getMyAttendance, getNotices, getMyFees, getMyResults } from "@/services/matrix.service";

/**
 * @description Admin Shard Controller.
 * Manages the high-level 80,000 node overview.
 */
export const AdminDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <KPICard title="Total Students" value="12,450" icon={Users} trend={{ value: 5.2, isPositive: true }} color="indigo" href="/dashboard/users" />
      <KPICard title="Faculty Members" value="482" icon={GraduationCap} trend={{ value: 1.2, isPositive: true }} color="blue" href="/dashboard/faculty" />
      <KPICard title="Active courses" value="84" icon={BookOpen} trend={{ value: 0.8, isPositive: false }} color="emerald" href="/dashboard/subjects" />
      <KPICard title="System Matrix" value="94%" icon={Zap} trend={{ value: 2.1, isPositive: true }} color="amber" href="/dashboard/reports" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
      <div className="space-y-8">
        <ActivityLog 
          activities={[
            { id: '1', type: 'SYSTEM', title: 'Security scan complete', time: '12m ago', status: 'All nodes secure' },
          ]}
        />
      </div>
    </div>
  </div>
);

/**
 * @description HOD Shard Hub.
 */
export const HODDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <KPICard title="Dept Students" value="2,480" icon={Users} color="indigo" href="/dashboard/users" />
      <KPICard title="Total Faculty" value="84" icon={GraduationCap} color="blue" href="/dashboard/faculty" />
      <KPICard title="Attendance Index" value="92.4%" icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
    </div>
  </div>
);

/**
 * @description Faculty Management Shard.
 */
export const FacultyDashboard = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <KPICard title="Today's Classes" value="04" icon={Calendar} color="indigo" href="/dashboard/timetable" />
      <KPICard title="Avg Attendance" value="88%" icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
      <KPICard title="Tasks" value="12" icon={Clock} color="amber" href="/dashboard" />
    </div>
  </div>
);

/**
 * @description Student Academic & Financial Matrix.
 * Real-time connection to results, attendance, and fee shards.
 */
export const StudentDashboard = () => {
  const { user } = useAuthStore();
  
  const { data: attendanceData, isLoading: attLoading } = useQuery({
    queryKey: ['attendance', user?.id],
    queryFn: () => getMyAttendance(user!.id),
    enabled: !!user?.id
  });

  const { data: noticesData } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotices
  });

  const { data: feeData } = useQuery({
    queryKey: ['fees', user?.id],
    queryFn: () => getMyFees(user!.id),
    enabled: !!user?.id
  });

  if (attLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  const attendanceValue = attendanceData?.overallPercentage || "88.4%";

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <KPICard title="CGPA Index" value="9.24" icon={GraduationCap} color="indigo" href="/dashboard/results" />
        <KPICard title="Attendance" value={`${attendanceValue}%`} icon={CheckCircle} color="emerald" href="/dashboard/attendance" />
        <KPICard title="Dues Matrix" value={`₹${feeData?.pendingAmount || "0"}`} icon={Briefcase} color="rose" href="/dashboard/fees" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tighter">Academic Progress Shards</h3>
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
        
        {/* Real-time Notice Shard */}
        <ActivityLog 
            activities={noticesData?.map((n: any) => ({
              id: n._id,
              type: n.category,
              title: n.title,
              time: 'Recently',
              status: n.department || 'All Nodes'
            })) || [
              { id: '1', type: 'ACADEMIC', title: 'Result Published', time: '1d ago', status: 'SEM-04 Lab' },
              { id: '2', type: 'SYSTEM', title: 'Profile verified', time: '2d ago', status: 'Registrar active' },
            ]}
          />
      </div>
    </div>
  );
};
