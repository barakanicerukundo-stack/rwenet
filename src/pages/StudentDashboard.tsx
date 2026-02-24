import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, FileText, BarChart3, Bell, Clock } from "lucide-react";

const courses = [
  { title: "Mathematics S4", teacher: "Mr. Nkurunziza", progress: 72 },
  { title: "Physics S4", teacher: "Ms. Uwimana", progress: 58 },
  { title: "English Language", teacher: "Mr. Mugabo", progress: 85 },
  { title: "ICT & Computer Science", teacher: "Ms. Kamali", progress: 45 },
];

const upcoming = [
  { title: "Math Quiz - Trigonometry", date: "Feb 28, 2026", type: "Exam" },
  { title: "Physics Lab Report", date: "Mar 2, 2026", type: "Assignment" },
  { title: "English Essay", date: "Mar 5, 2026", type: "Assignment" },
];

const notifications = [
  "New grades posted for Mathematics S4",
  "Physics Lab Report deadline extended to Mar 5",
  "School assembly scheduled for Monday",
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" userName="Jean Pierre">
      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Enrolled Courses", value: "4", color: "bg-primary/10 text-primary" },
          { icon: FileText, label: "Pending Tasks", value: "3", color: "bg-secondary/10 text-secondary" },
          { icon: BarChart3, label: "Average Grade", value: "78%", color: "bg-accent/20 text-accent-foreground" },
          { icon: Bell, label: "Notifications", value: "3", color: "bg-destructive/10 text-destructive" },
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
        {/* Courses */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Courses</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.title} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.teacher}</p>
                  </div>
                  <span className="font-display text-lg font-bold text-primary">{course.progress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-hero-gradient transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Upcoming</h2>
            <div className="space-y-3">
              {upcoming.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.date}
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Notifications</h2>
            <div className="space-y-2">
              {notifications.map((note, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
                  {note}
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
