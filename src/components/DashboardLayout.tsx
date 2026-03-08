import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, LayoutDashboard, BookOpen, FileText, BarChart3,
  Bell, Settings, LogOut, Users, School, Menu, X
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "teacher" | "admin";
  userName: string;
}

const navItems: Record<string, NavItem[]> = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/student" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/student/courses" },
    { icon: FileText, label: "Assignments", href: "/dashboard/student/assignments" },
    { icon: BarChart3, label: "Grades", href: "/dashboard/student/grades" },
    { icon: Bell, label: "Notifications", href: "/dashboard/student/notifications" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/teacher" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/teacher/courses" },
    { icon: FileText, label: "Assignments", href: "/dashboard/teacher/assignments" },
    { icon: Users, label: "Students", href: "/dashboard/teacher/students" },
    { icon: Bell, label: "Messages", href: "/dashboard/teacher/messages" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: School, label: "Schools", href: "/dashboard/admin/schools" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
};

const roleLabels = { student: "Student", teacher: "Teacher", admin: "Administrator" };

const DashboardLayout = ({ children, role, userName }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = navItems[role];

  return (
    <div className="flex min-h-screen bg-background font-body">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">RWENET</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 mb-4 rounded-xl bg-sidebar-accent px-4 py-3">
          <p className="text-sm font-semibold">{userName}</p>
          <p className="text-xs text-sidebar-foreground/60">{roleLabels[role]}</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {items.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-border bg-card px-6 py-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">
            {items.find((i) => i.href === location.pathname)?.label || "Dashboard"}
          </h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
