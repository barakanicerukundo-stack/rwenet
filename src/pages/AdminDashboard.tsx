import DashboardLayout from "@/components/DashboardLayout";
import { Users, School, BookOpen, Shield, TrendingUp, AlertTriangle } from "lucide-react";

const recentUsers = [
  { name: "Alice Mukamana", role: "Student", school: "GS Kigali", date: "Feb 24" },
  { name: "Eric Niyonzima", role: "Teacher", school: "Lycée de Kigali", date: "Feb 23" },
  { name: "Grace Uwase", role: "Student", school: "FAWE Girls", date: "Feb 23" },
  { name: "David Habimana", role: "Admin", school: "MINEDUC", date: "Feb 22" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Admin Kagabo">
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Users", value: "1,248,392", color: "bg-primary/10 text-primary" },
          { icon: School, label: "Schools", value: "2,847", color: "bg-secondary/10 text-secondary" },
          { icon: BookOpen, label: "Active Courses", value: "15,420", color: "bg-accent/20 text-accent-foreground" },
          { icon: Shield, label: "System Health", value: "99.9%", color: "bg-secondary/10 text-secondary" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Chart Placeholder */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Platform Activity</h2>
          <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card">
            <div className="text-center">
              <TrendingUp className="mx-auto mb-2 h-10 w-10 text-primary" />
              <p className="text-sm text-muted-foreground">
                Analytics charts will appear here once connected to Lovable Cloud
              </p>
            </div>
          </div>

          {/* Province Overview */}
          <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-foreground">Province Overview</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Kigali City", "Eastern", "Western", "Northern", "Southern"].map((province) => (
              <div key={province} className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold text-foreground">{province}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {Math.floor(Math.random() * 400 + 200)} schools
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-hero-gradient"
                    style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users & Alerts */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Recent Registrations</h2>
            <div className="space-y-2">
              {recentUsers.map((user, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.school}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">System Alerts</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-accent-foreground" />
                <p className="text-sm text-muted-foreground">3 schools pending approval in Northern Province</p>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-accent-foreground" />
                <p className="text-sm text-muted-foreground">Database backup completed successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
