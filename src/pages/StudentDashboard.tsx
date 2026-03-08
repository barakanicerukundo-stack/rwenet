import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthProvider";
import { useStudentCourses, useStudentAssignments, useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/useData";
import { BookOpen, FileText, BarChart3, Bell, Clock, ChevronUp, ChevronDown, Search, Filter, CheckCircle2, AlertCircle, Info, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Fallback data for when DB is empty
const fallbackCourses = [
  { title: "Mathematics S4", teacher: "Mr. Nkurunziza", progress: 72, grade: "B+", lastAccessed: "2h ago" },
  { title: "Physics S4", teacher: "Ms. Uwimana", progress: 58, grade: "B", lastAccessed: "1d ago" },
  { title: "English Language", teacher: "Mr. Mugabo", progress: 85, grade: "A-", lastAccessed: "5h ago" },
  { title: "ICT & Computer Science", teacher: "Ms. Kamali", progress: 45, grade: "B-", lastAccessed: "3d ago" },
];

const weeklyProgress = [
  { day: "Mon", hours: 2.5, tasks: 3 },
  { day: "Tue", hours: 3.2, tasks: 5 },
  { day: "Wed", hours: 1.8, tasks: 2 },
  { day: "Thu", hours: 4.1, tasks: 6 },
  { day: "Fri", hours: 3.0, tasks: 4 },
  { day: "Sat", hours: 1.5, tasks: 1 },
  { day: "Sun", hours: 0.5, tasks: 0 },
];

const gradesTrend = [
  { month: "Sep", math: 65, physics: 70, english: 78, ict: 60 },
  { month: "Oct", math: 68, physics: 65, english: 80, ict: 55 },
  { month: "Nov", math: 72, physics: 68, english: 82, ict: 58 },
  { month: "Dec", math: 70, physics: 72, english: 79, ict: 62 },
  { month: "Jan", math: 75, physics: 74, english: 85, ict: 65 },
  { month: "Feb", math: 78, physics: 76, english: 88, ict: 70 },
];

const skillsData = [
  { subject: "Algebra", score: 82 },
  { subject: "Geometry", score: 68 },
  { subject: "Mechanics", score: 75 },
  { subject: "Grammar", score: 90 },
  { subject: "Programming", score: 72 },
  { subject: "Analysis", score: 78 },
];

const fallbackAssignments = [
  { id: "1", title: "Trigonometry Quiz", course: "Mathematics S4", dueDate: "Feb 28, 2026", status: "pending", type: "Exam", grade: null as string | null },
  { id: "2", title: "Physics Lab Report", course: "Physics S4", dueDate: "Mar 2, 2026", status: "pending", type: "Assignment", grade: null as string | null },
  { id: "3", title: "English Essay", course: "English Language", dueDate: "Mar 5, 2026", status: "pending", type: "Assignment", grade: null as string | null },
  { id: "4", title: "Algebra Homework", course: "Mathematics S4", dueDate: "Feb 20, 2026", status: "graded", type: "Homework", grade: "85%" },
  { id: "5", title: "Circuit Diagram", course: "Physics S4", dueDate: "Feb 18, 2026", status: "graded", type: "Lab", grade: "72%" },
  { id: "6", title: "HTML/CSS Project", course: "ICT & Computer Science", dueDate: "Feb 15, 2026", status: "graded", type: "Project", grade: "90%" },
];

const fallbackNotifications = [
  { id: "1", title: "Grade Posted", message: "New grades posted for Mathematics S4", type: "success" as const, created_at: new Date(Date.now() - 600000).toISOString(), is_read: false },
  { id: "2", title: "Deadline Extended", message: "Physics Lab Report deadline extended to Mar 5", type: "info" as const, created_at: new Date(Date.now() - 3600000).toISOString(), is_read: false },
  { id: "3", title: "Assembly", message: "School assembly scheduled for Monday 9 AM", type: "info" as const, created_at: new Date(Date.now() - 7200000).toISOString(), is_read: false },
  { id: "4", title: "Grade", message: "Your English Essay received an A-", type: "success" as const, created_at: new Date(Date.now() - 18000000).toISOString(), is_read: true },
  { id: "5", title: "Reminder", message: "ICT assignment due in 2 days", type: "warning" as const, created_at: new Date(Date.now() - 86400000).toISOString(), is_read: true },
];

type SortField = "title" | "course" | "dueDate" | "status";
type SortDir = "asc" | "desc";

const StudentDashboard = () => {
  const { user, profile } = useAuth();
  const { data: dbCourses } = useStudentCourses();
  const { data: dbAssignments } = useStudentAssignments();
  const { data: dbNotifications } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Use DB data if available, otherwise fallback
  const courses = dbCourses && dbCourses.length > 0
    ? dbCourses.map((e: any) => ({
        title: e.courses?.title || "Untitled",
        teacher: e.courses?.profiles?.full_name || "Unknown",
        progress: Math.floor(Math.random() * 60 + 30),
        grade: "—",
        lastAccessed: "Recently",
      }))
    : fallbackCourses;

  const assignments = dbAssignments && dbAssignments.length > 0
    ? dbAssignments.map((s: any) => ({
        id: s.id,
        title: s.assignments?.title || "Untitled",
        course: s.assignments?.courses?.title || "—",
        dueDate: s.assignments?.due_date ? new Date(s.assignments.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
        status: s.status,
        type: s.assignments?.assignment_type || "homework",
        grade: s.score != null ? `${s.score}%` : null,
      }))
    : fallbackAssignments;

  const notifications = dbNotifications && dbNotifications.length > 0 ? dbNotifications : fallbackNotifications;

  const unreadCount = notifications.filter((n: any) => !n.is_read).length;

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filteredAssignments = useMemo(() => {
    let result = [...assignments];
    if (searchQuery) result = result.filter((a: any) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.course.toLowerCase().includes(searchQuery.toLowerCase()));
    if (statusFilter !== "all") result = result.filter((a: any) => a.status === statusFilter);
    result.sort((a: any, b: any) => {
      const valA = a[sortField]; const valB = b[sortField];
      const cmp = typeof valA === "string" && typeof valB === "string" ? valA.localeCompare(valB) : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [assignments, searchQuery, statusFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => (
    sortField === field ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronUp className="h-3 w-3 opacity-30" />
  );

  const notifIcon = (type: string) => {
    if (type === "success" || type === "grade") return <CheckCircle2 className="h-4 w-4 text-secondary" />;
    if (type === "warning") return <AlertCircle className="h-4 w-4 text-accent-foreground" />;
    return <Info className="h-4 w-4 text-primary" />;
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <DashboardLayout role="student" userName={profile?.full_name || user?.email || "Student"}>
      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Enrolled Courses", value: String(courses.length), color: "bg-primary/10 text-primary" },
          { icon: FileText, label: "Pending Tasks", value: String(assignments.filter((a: any) => a.status === "pending").length), color: "bg-secondary/10 text-secondary" },
          { icon: BarChart3, label: "Average Grade", value: "78%", color: "bg-accent/20 text-accent-foreground" },
          { icon: Bell, label: "Unread", value: String(unreadCount), color: "bg-destructive/10 text-destructive" },
        ].map((stat) => (
          <motion.div key={stat.label} whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Grade Trends</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={gradesTrend}>
              <defs>
                <linearGradient id="gradMath" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 40%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPhysics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 63%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 63%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)", background: "hsl(0, 0%, 100%)" }} />
              <Area type="monotone" dataKey="math" stroke="hsl(199, 89%, 40%)" fill="url(#gradMath)" strokeWidth={2} name="Math" />
              <Area type="monotone" dataKey="physics" stroke="hsl(145, 63%, 35%)" fill="url(#gradPhysics)" strokeWidth={2} name="Physics" />
              <Area type="monotone" dataKey="english" stroke="hsl(45, 93%, 52%)" fill="none" strokeWidth={2} name="English" />
              <Area type="monotone" dataKey="ict" stroke="hsl(0, 72%, 51%)" fill="none" strokeWidth={2} strokeDasharray="5 5" name="ICT" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-4 text-xs">
            {[{ label: "Math", color: "bg-primary" }, { label: "Physics", color: "bg-secondary" }, { label: "English", color: "bg-accent" }, { label: "ICT", color: "bg-destructive" }].map(l => (
              <span key={l.label} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />{l.label}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Weekly Study Activity</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)", background: "hsl(0, 0%, 100%)" }} />
              <Bar dataKey="hours" fill="hsl(199, 89%, 40%)" radius={[6, 6, 0, 0]} name="Hours" />
              <Bar dataKey="tasks" fill="hsl(145, 63%, 35%)" radius={[6, 6, 0, 0]} name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Courses */}
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Courses</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((course: any) => (
                <motion.div key={course.title} whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.teacher}</p>
                    </div>
                    <span className="rounded-lg bg-primary/10 px-2 py-0.5 font-display text-sm font-bold text-primary">{course.grade}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-hero-gradient transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.progress}% complete</span>
                    <span>{course.lastAccessed}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Radar */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Skills Overview</h2>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="hsl(214, 20%, 88%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} />
                <Radar name="Skills" dataKey="score" stroke="hsl(199, 89%, 40%)" fill="hsl(199, 89%, 40%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Assignments Table */}
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Assignments</h2>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search assignments..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  {["all", "pending", "graded", "submitted"].map(f => (
                    <button key={f} onClick={() => setStatusFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {([["title", "Assignment"], ["course", "Course"], ["dueDate", "Due Date"], ["status", "Status"]] as [SortField, string][]).map(([field, label]) => (
                        <th key={field} className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort(field)}>
                          <span className="flex items-center gap-1">{label} <SortIcon field={field} /></span>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredAssignments.map((a: any) => (
                        <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
                          <td className="px-4 py-3 text-muted-foreground">{a.course}</td>
                          <td className="px-4 py-3 text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.dueDate}</span></td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              a.status === "graded" ? "bg-secondary/10 text-secondary" : a.status === "submitted" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                            }`}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span>
                          </td>
                          <td className="px-4 py-3 font-display font-semibold text-foreground">{a.grade || "—"}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredAssignments.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No assignments found</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                Notifications
                {unreadCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>}
              </h2>
              <button onClick={() => markAllRead.mutate()} className="text-xs font-medium text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((n: any) => (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && markRead.mutate(n.id)}
                  className={`flex items-start gap-3 border-b border-border px-4 py-3 last:border-0 cursor-pointer transition-colors hover:bg-muted/30 ${!n.is_read ? "bg-primary/5" : ""}`}
                >
                  {notifIcon(n.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.is_read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(n.created_at)}</p>
                  </div>
                  {!n.is_read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
