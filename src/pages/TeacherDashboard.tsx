import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Users, FileText, Upload } from "lucide-react";

const courses = [
  { title: "Mathematics S4", students: 42, assignments: 8, pending: 12 },
  { title: "Mathematics S5", students: 38, assignments: 6, pending: 5 },
  { title: "Mathematics S6", students: 35, assignments: 10, pending: 18 },
];

const recentSubmissions = [
  { student: "Alice Mukamana", assignment: "Trigonometry Quiz", date: "Feb 23, 2026", status: "Pending" },
  { student: "Eric Niyonzima", assignment: "Trigonometry Quiz", date: "Feb 23, 2026", status: "Graded" },
  { student: "Grace Uwase", assignment: "Algebra Homework", date: "Feb 22, 2026", status: "Pending" },
  { student: "David Habimana", assignment: "Algebra Homework", date: "Feb 22, 2026", status: "Graded" },
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" userName="Ms. Nkurunziza">
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Active Courses", value: "3", color: "bg-primary/10 text-primary" },
          { icon: Users, label: "Total Students", value: "115", color: "bg-secondary/10 text-secondary" },
          { icon: FileText, label: "Pending Grades", value: "35", color: "bg-accent/20 text-accent-foreground" },
          { icon: Upload, label: "Resources", value: "47", color: "bg-destructive/10 text-destructive" },
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">My Courses</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">{course.title}</h3>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-2">
                    <p className="font-display text-lg font-bold text-foreground">{course.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <p className="font-display text-lg font-bold text-foreground">{course.assignments}</p>
                    <p className="text-xs text-muted-foreground">Assignments</p>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <p className="font-display text-lg font-bold text-primary">{course.pending}</p>
                    <p className="text-xs text-muted-foreground">To Grade</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Recent Submissions</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Assignment</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((sub, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{sub.student}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.assignment}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          sub.status === "Graded"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-accent/20 text-accent-foreground"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
