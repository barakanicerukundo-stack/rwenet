import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthProvider";
import { useAllUsers, useAllSchools, useAdminStats, useCreateSchool } from "@/hooks/useData";
import { Users, School, BookOpen, Shield, TrendingUp, AlertTriangle, Search, ChevronUp, ChevronDown, Filter, CheckCircle2, Info, Globe, Activity, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Chart data
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
  { province: "Kigali City", schools: 580, students: 320000 },
  { province: "Eastern", schools: 620, students: 280000 },
  { province: "Western", schools: 540, students: 245000 },
  { province: "Northern", schools: 510, students: 198000 },
  { province: "Southern", schools: 597, students: 205000 },
];

const roleDistribution = [
  { name: "Students", value: 1248000, color: "hsl(199, 89%, 40%)" },
  { name: "Teachers", value: 40100, color: "hsl(145, 63%, 35%)" },
  { name: "Admins", value: 292, color: "hsl(45, 93%, 52%)" },
];

const systemMetrics = [
  { time: "00:00", cpu: 22, memory: 45 },
  { time: "04:00", cpu: 15, memory: 42 },
  { time: "08:00", cpu: 65, memory: 68 },
  { time: "12:00", cpu: 78, memory: 72 },
  { time: "16:00", cpu: 55, memory: 60 },
  { time: "20:00", cpu: 42, memory: 55 },
  { time: "Now", cpu: 38, memory: 52 },
];

const fallbackUsers = [
  { id: "1", full_name: "Alice Mukamana", role: "student", school: "GS Kigali", province: "Kigali City", created_at: "2026-02-24", status: "active" },
  { id: "2", full_name: "Eric Niyonzima", role: "teacher", school: "Lycée de Kigali", province: "Kigali City", created_at: "2026-02-23", status: "active" },
  { id: "3", full_name: "Grace Uwase", role: "student", school: "FAWE Girls", province: "Eastern", created_at: "2026-02-23", status: "active" },
  { id: "4", full_name: "David Habimana", role: "admin", school: "MINEDUC", province: "Kigali City", created_at: "2026-02-22", status: "active" },
  { id: "5", full_name: "Marie Ingabire", role: "teacher", school: "GS Nyanza", province: "Southern", created_at: "2026-02-21", status: "pending" },
];

type SortField = "name" | "role" | "school" | "province" | "date" | "status";
type SortDir = "asc" | "desc";

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const { data: dbUsers } = useAllUsers();
  const { data: dbSchools } = useAllSchools();
  const { data: stats } = useAdminStats();
  const createSchool = useCreateSchool();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showNewSchool, setShowNewSchool] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: "", province: "Kigali City", district: "", school_type: "secondary" });

  // Map DB users or use fallback
  const allUsers = dbUsers && dbUsers.length > 0
    ? dbUsers.map((u: any) => ({
        id: u.id,
        full_name: u.full_name || "Unnamed",
        role: u.user_roles?.[0]?.role || "student",
        school: u.school || "—",
        province: u.province || "—",
        created_at: u.created_at,
        status: "active",
      }))
    : fallbackUsers;

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filteredUsers = useMemo(() => {
    let result = [...allUsers];
    if (searchQuery) result = result.filter((u: any) => u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || u.school.toLowerCase().includes(searchQuery.toLowerCase()));
    if (roleFilter !== "all") result = result.filter((u: any) => u.role === roleFilter);
    if (statusFilter !== "all") result = result.filter((u: any) => u.status === statusFilter);
    result.sort((a: any, b: any) => {
      const fieldMap: Record<string, string> = { name: "full_name", date: "created_at" };
      const key = fieldMap[sortField] || sortField;
      const valA = a[key]; const valB = b[key];
      const cmp = typeof valA === "string" && typeof valB === "string" ? valA.localeCompare(valB) : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [allUsers, searchQuery, roleFilter, statusFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => (
    sortField === field ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronUp className="h-3 w-3 opacity-30" />
  );

  const formatNum = (n: number) => n >= 1000000 ? (n / 1000000).toFixed(2) + "M" : n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);

  const handleCreateSchool = async () => {
    if (!newSchool.name || !newSchool.province) {
      toast.error("School name and province are required");
      return;
    }
    try {
      await createSchool.mutateAsync(newSchool);
      toast.success("School added!");
      setShowNewSchool(false);
      setNewSchool({ name: "", province: "Kigali City", district: "", school_type: "secondary" });
    } catch {
      toast.error("Failed to add school");
    }
  };

  return (
    <DashboardLayout role="admin" userName={profile?.full_name || user?.email || "Admin"}>
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Users", value: stats ? formatNum(stats.totalUsers) : "—", change: "+2.3%", color: "bg-primary/10 text-primary" },
          { icon: School, label: "Schools", value: stats ? String(stats.totalSchools) : "—", change: "+12", color: "bg-secondary/10 text-secondary" },
          { icon: BookOpen, label: "Active Courses", value: stats ? String(stats.totalCourses) : "—", change: "+340", color: "bg-accent/20 text-accent-foreground" },
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

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Schools by Province</h2>
            <button onClick={() => setShowNewSchool(!showNewSchool)} className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-3 w-3" /> Add School
            </button>
          </div>

          {showNewSchool && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4 rounded-xl border border-border bg-muted/30 p-3 space-y-2">
              <input type="text" placeholder="School name" value={newSchool.name} onChange={e => setNewSchool({ ...newSchool, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary" />
              <select value={newSchool.province} onChange={e => setNewSchool({ ...newSchool, province: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary">
                {["Kigali City", "Eastern Province", "Western Province", "Northern Province", "Southern Province"].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <button onClick={handleCreateSchool} disabled={createSchool.isPending} className="w-full rounded-lg bg-primary py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {createSchool.isPending ? "Adding..." : "Add School"}
              </button>
            </motion.div>
          )}

          <ResponsiveContainer width="100%" height={showNewSchool ? 140 : 220}>
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

      {/* Users Table */}
      <div>
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {([["name", "Name"], ["role", "Role"], ["school", "School"], ["province", "Province"], ["date", "Joined"]] as [SortField, string][]).map(([field, label]) => (
                    <th key={field} className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort(field)}>
                      <span className="flex items-center gap-1">{label} <SortIcon field={field} /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((u: any) => (
                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{u.full_name}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          u.role === "admin" ? "bg-accent/20 text-accent-foreground" : u.role === "teacher" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                        }`}>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{u.school}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{u.province}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredUsers.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No users found</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
