import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, School, BookOpen, Shield, TrendingUp, AlertTriangle, Search, ChevronUp, ChevronDown, Filter, CheckCircle2, Info, Globe, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const userGrowth = [
  { month: "Jul", students: 980000, teachers: 32000 },
  { month: "Aug", students: 1020000, teachers: 33500 },
  { month: "Sep", students: 1080000, teachers: 35000 },
  { month: "Oct", students: 1120000, teachers: 36200 },
  { month: "Nov", students: 1170000, teachers: 37800 },
  { month: "Dec", students: 1190000, teachers: 38200 },
  { month: "Jan", students: 1220000, teachers: 39500 },
  { month: "Feb", students: 1248000, teachers: 40100 },
];

const provinceData = [
  { province: "Kigali City", schools: 580, students: 320000, teachers: 12000, completion: 92 },
  { province: "Eastern", schools: 620, students: 280000, teachers: 8500, completion: 78 },
  { province: "Western", schools: 540, students: 245000, teachers: 7800, completion: 72 },
  { province: "Northern", schools: 510, students: 198000, teachers: 6200, completion: 68 },
  { province: "Southern", schools: 597, students: 205000, teachers: 5600, completion: 75 },
];

const roleDistribution = [
  { name: "Students", value: 1248000, color: "hsl(199, 89%, 40%)" },
  { name: "Teachers", value: 40100, color: "hsl(145, 63%, 35%)" },
  { name: "Admins", value: 292, color: "hsl(45, 93%, 52%)" },
];

const systemMetrics = [
  { time: "00:00", cpu: 22, memory: 45, requests: 120 },
  { time: "04:00", cpu: 15, memory: 42, requests: 45 },
  { time: "08:00", cpu: 65, memory: 68, requests: 890 },
  { time: "12:00", cpu: 78, memory: 72, requests: 1200 },
  { time: "16:00", cpu: 55, memory: 60, requests: 750 },
  { time: "20:00", cpu: 42, memory: 55, requests: 420 },
  { time: "Now", cpu: 38, memory: 52, requests: 380 },
];

const allUsers = [
  { id: 1, name: "Alice Mukamana", role: "Student", school: "GS Kigali", province: "Kigali City", date: "Feb 24, 2026", status: "Active" },
  { id: 2, name: "Eric Niyonzima", role: "Teacher", school: "Lycée de Kigali", province: "Kigali City", date: "Feb 23, 2026", status: "Active" },
  { id: 3, name: "Grace Uwase", role: "Student", school: "FAWE Girls", province: "Eastern", date: "Feb 23, 2026", status: "Active" },
  { id: 4, name: "David Habimana", role: "Admin", school: "MINEDUC", province: "Kigali City", date: "Feb 22, 2026", status: "Active" },
  { id: 5, name: "Marie Ingabire", role: "Teacher", school: "GS Nyanza", province: "Southern", date: "Feb 21, 2026", status: "Pending" },
  { id: 6, name: "Patrick Mugisha", role: "Student", school: "Collège Christ-Roi", province: "Western", date: "Feb 20, 2026", status: "Active" },
  { id: 7, name: "Diane Uwera", role: "Student", school: "GS Musanze", province: "Northern", date: "Feb 19, 2026", status: "Suspended" },
  { id: 8, name: "Jean Bosco", role: "Teacher", school: "ES Rwamagana", province: "Eastern", date: "Feb 18, 2026", status: "Active" },
  { id: 9, name: "Aline Kamali", role: "Student", school: "APACE Rubavu", province: "Western", date: "Feb 17, 2026", status: "Active" },
  { id: 10, name: "Claude Bizimana", role: "Admin", school: "REB", province: "Kigali City", date: "Feb 16, 2026", status: "Active" },
];

const alerts = [
  { id: 1, message: "3 schools pending approval in Northern Province", type: "warning", time: "10 min ago" },
  { id: 2, message: "Database backup completed successfully", type: "success", time: "1h ago" },
  { id: 3, message: "Server load exceeded 80% threshold at 12:00", type: "warning", time: "4h ago" },
  { id: 4, message: "15 new teacher registrations awaiting verification", type: "info", time: "6h ago" },
  { id: 5, message: "Monthly analytics report generated", type: "success", time: "1d ago" },
  { id: 6, message: "Scheduled maintenance window: Mar 8, 02:00-04:00", type: "info", time: "2d ago" },
];

type SortField = "name" | "role" | "school" | "province" | "date" | "status";
type SortDir = "asc" | "desc";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [readAlerts, setReadAlerts] = useState<number[]>([]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filteredUsers = useMemo(() => {
    let result = [...allUsers];
    if (searchQuery) result = result.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.school.toLowerCase().includes(searchQuery.toLowerCase()));
    if (roleFilter !== "all") result = result.filter(u => u.role.toLowerCase() === roleFilter);
    if (statusFilter !== "all") result = result.filter(u => u.status.toLowerCase() === statusFilter);
    result.sort((a, b) => {
      const valA = a[sortField]; const valB = b[sortField];
      const cmp = typeof valA === "string" && typeof valB === "string" ? valA.localeCompare(valB) : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [searchQuery, roleFilter, statusFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => (
    sortField === field ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronUp className="h-3 w-3 opacity-30" />
  );

  const alertIcon = (type: string) => {
    if (type === "success") return <CheckCircle2 className="h-4 w-4 text-secondary" />;
    if (type === "warning") return <AlertTriangle className="h-4 w-4 text-accent-foreground" />;
    return <Info className="h-4 w-4 text-primary" />;
  };

  const formatNum = (n: number) => n >= 1000000 ? (n / 1000000).toFixed(2) + "M" : n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);

  return (
    <DashboardLayout role="admin" userName="Admin Kagabo">
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Users", value: "1,248,392", change: "+2.3%", color: "bg-primary/10 text-primary" },
          { icon: School, label: "Schools", value: "2,847", change: "+12", color: "bg-secondary/10 text-secondary" },
          { icon: BookOpen, label: "Active Courses", value: "15,420", change: "+340", color: "bg-accent/20 text-accent-foreground" },
          { icon: Shield, label: "System Health", value: "99.9%", change: "Stable", color: "bg-secondary/10 text-secondary" },
        ].map(stat => (
          <motion.div key={stat.label} whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
              <span className="flex items-center gap-1 text-xs font-medium text-secondary"><TrendingUp className="h-3 w-3" />{stat.change}</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* User Growth */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> User Growth</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 40%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTeachers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 63%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 63%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis tickFormatter={v => formatNum(v as number)} tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip formatter={(v: number) => formatNum(v)} contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
              <Area type="monotone" dataKey="students" stroke="hsl(199, 89%, 40%)" fill="url(#gradStudents)" strokeWidth={2} name="Students" />
              <Area type="monotone" dataKey="teachers" stroke="hsl(145, 63%, 35%)" fill="url(#gradTeachers)" strokeWidth={2} name="Teachers" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Role Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {roleDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => formatNum(v)} contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {roleDistribution.map(r => (
              <div key={r.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />{r.name}</span>
                <span className="font-medium text-foreground">{formatNum(r.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics + Province */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* System Metrics */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> System Metrics</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="hsl(199, 89%, 40%)" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="hsl(145, 63%, 35%)" strokeWidth={2} name="Memory %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Province Overview */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Province Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={provinceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis dataKey="province" type="category" width={75} tick={{ fontSize: 11, fill: "hsl(215, 12%, 50%)" }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
              <Bar dataKey="schools" fill="hsl(199, 89%, 40%)" radius={[0, 4, 4, 0]} name="Schools" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Users Table */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">User Management</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search users..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {["all", "student", "teacher", "admin"].map(f => (
                  <button key={f} onClick={() => setRoleFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${roleFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-primary">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {([["name", "Name"], ["role", "Role"], ["school", "Institution"], ["province", "Province"], ["date", "Joined"], ["status", "Status"]] as [SortField, string][]).map(([field, label]) => (
                      <th key={field} className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort(field)}>
                        <span className="flex items-center gap-1">{label} <SortIcon field={field} /></span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredUsers.map(user => (
                      <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.role === "Admin" ? "bg-accent/20 text-accent-foreground" : user.role === "Teacher" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                          }`}>{user.role}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.school}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.province}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.date}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.status === "Active" ? "bg-secondary/10 text-secondary" : user.status === "Pending" ? "bg-accent/20 text-accent-foreground" : "bg-destructive/10 text-destructive"
                          }`}>{user.status}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredUsers.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No users found</p>}
            </div>
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display text-lg font-semibold text-foreground">System Alerts</h2>
              <button onClick={() => setReadAlerts(alerts.map(a => a.id))} className="text-xs font-medium text-primary hover:underline">Dismiss all</button>
            </div>
            {alerts.map(a => (
              <div key={a.id} onClick={() => setReadAlerts(prev => [...prev, a.id])} className={`flex items-start gap-3 border-b border-border px-4 py-3 last:border-0 cursor-pointer transition-colors hover:bg-muted/30 ${!readAlerts.includes(a.id) ? "bg-primary/5" : ""}`}>
                {alertIcon(a.type)}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!readAlerts.includes(a.id) ? "font-medium text-foreground" : "text-muted-foreground"}`}>{a.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Province Stats Cards */}
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Province Stats</h2>
            <div className="space-y-3">
              {provinceData.map(p => (
                <motion.div key={p.province} whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{p.province}</p>
                    <span className="text-xs font-medium text-secondary">{p.completion}%</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div><p className="font-display font-bold text-foreground">{p.schools}</p><p className="text-muted-foreground">Schools</p></div>
                    <div><p className="font-display font-bold text-foreground">{formatNum(p.students)}</p><p className="text-muted-foreground">Students</p></div>
                    <div><p className="font-display font-bold text-foreground">{formatNum(p.teachers)}</p><p className="text-muted-foreground">Teachers</p></div>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-hero-gradient" style={{ width: `${p.completion}%` }} />
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

export default AdminDashboard;
