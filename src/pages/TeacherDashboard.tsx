import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthProvider";
import { useTeacherCourses, useTeacherSubmissions, useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, useCreateCourse, useCreateAssignment } from "@/hooks/useData";
import { BookOpen, Users, FileText, Upload, Search, ChevronUp, ChevronDown, Filter, Bell, CheckCircle2, AlertCircle, Info, TrendingUp, Clock, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Fallback chart data
const gradeDistribution = [
  { name: "A (80-100)", value: 28, color: "hsl(145, 63%, 35%)" },
  { name: "B (60-79)", value: 45, color: "hsl(199, 89%, 40%)" },
  { name: "C (40-59)", value: 30, color: "hsl(45, 93%, 52%)" },
  { name: "D (<40)", value: 12, color: "hsl(0, 72%, 51%)" },
];

const studentPerformance = [
  { month: "Sep", s4: 62, s5: 58, s6: 70 },
  { month: "Oct", s4: 65, s5: 60, s6: 72 },
  { month: "Nov", s4: 70, s5: 65, s6: 68 },
  { month: "Dec", s4: 68, s5: 62, s6: 75 },
  { month: "Jan", s4: 74, s5: 70, s6: 78 },
  { month: "Feb", s4: 78, s5: 72, s6: 80 },
];

const submissionRate = [
  { week: "W1", onTime: 85, late: 10, missing: 5 },
  { week: "W2", onTime: 78, late: 15, missing: 7 },
  { week: "W3", onTime: 90, late: 8, missing: 2 },
  { week: "W4", onTime: 82, late: 12, missing: 6 },
];

const fallbackSubmissions = [
  { id: "1", student: "Alice Mukamana", assignment: "Trigonometry Quiz", course: "Mathematics S4", date: "Feb 23, 2026", status: "Pending", grade: null as string | null },
  { id: "2", student: "Eric Niyonzima", assignment: "Trigonometry Quiz", course: "Mathematics S4", date: "Feb 23, 2026", status: "Graded", grade: "85%" },
  { id: "3", student: "Grace Uwase", assignment: "Algebra Homework", course: "Mathematics S4", date: "Feb 22, 2026", status: "Pending", grade: null as string | null },
  { id: "4", student: "David Habimana", assignment: "Algebra Homework", course: "Mathematics S4", date: "Feb 22, 2026", status: "Graded", grade: "72%" },
  { id: "5", student: "Marie Ingabire", assignment: "Calculus Test", course: "Mathematics S5", date: "Feb 21, 2026", status: "Graded", grade: "90%" },
  { id: "6", student: "Patrick Mugisha", assignment: "Calculus Test", course: "Mathematics S5", date: "Feb 21, 2026", status: "Late", grade: null as string | null },
];

const fallbackNotifications = [
  { id: "1", title: "Review", message: "12 new submissions awaiting review", type: "warning" as const, created_at: new Date(Date.now() - 300000).toISOString(), is_read: false },
  { id: "2", title: "Submission", message: "Alice Mukamana submitted Trigonometry Quiz", type: "info" as const, created_at: new Date(Date.now() - 1800000).toISOString(), is_read: false },
  { id: "3", title: "Improvement", message: "S4 class average improved by 5%", type: "success" as const, created_at: new Date(Date.now() - 7200000).toISOString(), is_read: false },
  { id: "4", title: "Update", message: "New curriculum updates available", type: "info" as const, created_at: new Date(Date.now() - 86400000).toISOString(), is_read: true },
];

const fallbackCourses = [
  { title: "Mathematics S4", students: 42, assignments: 8, pending: 12 },
  { title: "Mathematics S5", students: 38, assignments: 6, pending: 5 },
  { title: "Mathematics S6", students: 35, assignments: 10, pending: 18 },
];

type SortField = "student" | "assignment" | "course" | "date" | "status";
type SortDir = "asc" | "desc";

const TeacherDashboard = () => {
  const { user, profile } = useAuth();
  const { data: dbCourses } = useTeacherCourses();
  const { data: dbNotifications } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const createCourse = useCreateCourse();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", subject: "", level: "" });

  const courses = dbCourses && dbCourses.length > 0
    ? dbCourses.map((c: any) => ({
        title: c.title,
        students: c.enrollments?.[0]?.count || 0,
        assignments: c.assignments?.[0]?.count || 0,
        pending: 0,
      }))
    : fallbackCourses;

  const notifications = dbNotifications && dbNotifications.length > 0 ? dbNotifications : fallbackNotifications;
  const unreadCount = notifications.filter((n: any) => !n.is_read).length;

  const allSubmissions = fallbackSubmissions;

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filteredSubmissions = useMemo(() => {
    let result = [...allSubmissions];
    if (searchQuery) result = result.filter(s => s.student.toLowerCase().includes(searchQuery.toLowerCase()) || s.assignment.toLowerCase().includes(searchQuery.toLowerCase()));
    if (statusFilter !== "all") result = result.filter(s => s.status.toLowerCase() === statusFilter);
    if (courseFilter !== "all") result = result.filter(s => s.course === courseFilter);
    result.sort((a, b) => {
      const valA = a[sortField as keyof typeof a]; const valB = b[sortField as keyof typeof b];
      const cmp = typeof valA === "string" && typeof valB === "string" ? valA.localeCompare(valB) : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [searchQuery, statusFilter, courseFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => (
    sortField === field ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronUp className="h-3 w-3 opacity-30" />
  );

  const notifIcon = (type: string) => {
    if (type === "success") return <CheckCircle2 className="h-4 w-4 text-secondary" />;
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

  const handleCreateCourse = async () => {
    if (!newCourse.title || !newCourse.subject || !newCourse.level) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await createCourse.mutateAsync(newCourse);
      toast.success("Course created!");
      setShowNewCourse(false);
      setNewCourse({ title: "", subject: "", level: "" });
    } catch {
      toast.error("Failed to create course");
    }
  };

  return (
    <DashboardLayout role="teacher" userName={profile?.full_name || user?.email || "Teacher"}>
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Active Courses", value: String(courses.length), color: "bg-primary/10 text-primary" },
          { icon: Users, label: "Total Students", value: String(courses.reduce((s: number, c: any) => s + c.students, 0)), color: "bg-secondary/10 text-secondary" },
          { icon: FileText, label: "Pending Grades", value: String(courses.reduce((s: number, c: any) => s + c.pending, 0)), color: "bg-accent/20 text-accent-foreground" },
          { icon: Bell, label: "Unread", value: String(unreadCount), color: "bg-destructive/10 text-destructive" },
        ].map(stat => (
          <motion.div key={stat.label} whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Class Performance Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
              <Legend />
              <Line type="monotone" dataKey="s4" stroke="hsl(199, 89%, 40%)" strokeWidth={2} dot={{ r: 4 }} name="S4" />
              <Line type="monotone" dataKey="s5" stroke="hsl(145, 63%, 35%)" strokeWidth={2} dot={{ r: 4 }} name="S5" />
              <Line type="monotone" dataKey="s6" stroke="hsl(45, 93%, 52%)" strokeWidth={2} dot={{ r: 4 }} name="S6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Grade Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {gradeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {gradeDistribution.map(g => (
              <span key={g.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: g.color }} />{g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Rate */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Submission Rate (Last 4 Weeks)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={submissionRate}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
            <Legend />
            <Bar dataKey="onTime" stackId="a" fill="hsl(145, 63%, 35%)" name="On Time" />
            <Bar dataKey="late" stackId="a" fill="hsl(45, 93%, 52%)" name="Late" />
            <Bar dataKey="missing" stackId="a" fill="hsl(0, 72%, 51%)" name="Missing" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Submissions Table */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Recent Submissions</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search students or assignments..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {["all", "pending", "graded", "late"].map(f => (
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
                    {([["student", "Student"], ["assignment", "Assignment"], ["course", "Course"], ["date", "Date"], ["status", "Status"]] as [SortField, string][]).map(([field, label]) => (
                      <th key={field} className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort(field)}>
                        <span className="flex items-center gap-1">{label} <SortIcon field={field} /></span>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredSubmissions.map(sub => (
                      <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{sub.student}</td>
                        <td className="px-4 py-3 text-muted-foreground">{sub.assignment}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{sub.course}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{sub.date}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            sub.status === "Graded" ? "bg-secondary/10 text-secondary" : sub.status === "Late" ? "bg-destructive/10 text-destructive" : "bg-accent/20 text-accent-foreground"
                          }`}>{sub.status}</span>
                        </td>
                        <td className="px-4 py-3 font-display font-semibold text-foreground">{sub.grade || "—"}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredSubmissions.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No submissions found</p>}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                Notifications
                {unreadCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">{unreadCount}</span>}
              </h2>
              <button onClick={() => markAllRead.mutate()} className="text-xs font-medium text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((n: any) => (
                <div key={n.id} onClick={() => !n.is_read && markRead.mutate(n.id)} className={`flex items-start gap-3 border-b border-border px-4 py-3 last:border-0 cursor-pointer transition-colors hover:bg-muted/30 ${!n.is_read ? "bg-primary/5" : ""}`}>
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

          {/* My Courses + Create */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">My Courses</h2>
              <button onClick={() => setShowNewCourse(!showNewCourse)} className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-3 w-3" /> New
              </button>
            </div>

            {showNewCourse && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4 rounded-xl border border-border bg-card p-4 space-y-3">
                <input type="text" placeholder="Course title" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input type="text" placeholder="Subject (e.g. Mathematics)" value={newCourse.subject} onChange={e => setNewCourse({ ...newCourse, subject: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input type="text" placeholder="Level (e.g. S4)" value={newCourse.level} onChange={e => setNewCourse({ ...newCourse, level: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <button onClick={handleCreateCourse} disabled={createCourse.isPending} className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                  {createCourse.isPending ? "Creating..." : "Create Course"}
                </button>
              </motion.div>
            )}

            <div className="space-y-3">
              {courses.map((course: any) => (
                <motion.div key={course.title} whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-muted p-2"><p className="font-display text-lg font-bold text-foreground">{course.students}</p><p className="text-xs text-muted-foreground">Students</p></div>
                    <div className="rounded-lg bg-muted p-2"><p className="font-display text-lg font-bold text-foreground">{course.assignments}</p><p className="text-xs text-muted-foreground">Tasks</p></div>
                    <div className="rounded-lg bg-muted p-2"><p className="font-display text-lg font-bold text-primary">{course.pending}</p><p className="text-xs text-muted-foreground">To Grade</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
