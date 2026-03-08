import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

// ─── Student Hooks ───

export const useStudentCourses = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student-courses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          id, status, enrolled_at,
          courses:course_id (
            id, title, subject, level, description,
            profiles:teacher_id (full_name)
          )
        `)
        .eq("student_id", user!.id)
        .eq("status", "active");
      if (error) throw error;
      return data || [];
    },
  });
};

export const useStudentAssignments = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student-assignments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select(`
          id, status, score, submitted_at, graded_at, feedback,
          assignments:assignment_id (
            id, title, due_date, max_score, assignment_type,
            courses:course_id (title)
          )
        `)
        .eq("student_id", user!.id)
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

export const useNotifications = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["notifications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data || [];
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

export const useMarkAllNotificationsRead = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user!.id)
        .eq("is_read", false);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

// ─── Teacher Hooks ───

export const useTeacherCourses = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["teacher-courses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*, enrollments(count), assignments(count)")
        .eq("teacher_id", user!.id)
        .eq("is_active", true);
      if (error) throw error;
      return data || [];
    },
  });
};

export const useTeacherSubmissions = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["teacher-submissions", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select(`
          id, status, score, submitted_at, graded_at,
          student:student_id (id),
          assignments:assignment_id (
            title, course_id,
            courses:course_id (title, teacher_id)
          )
        `)
        .order("submitted_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      // Filter to only this teacher's courses
      return (data || []).filter((s: any) => s.assignments?.courses?.teacher_id === user!.id);
    },
  });
};

export const useGradeSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, score, feedback }: { id: string; score: number; feedback?: string }) => {
      const { error } = await supabase
        .from("submissions")
        .update({ score, feedback, status: "graded", graded_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacher-submissions"] }),
  });
};

// ─── Admin Hooks ───

export const useAllSchools = () =>
  useQuery({
    queryKey: ["all-schools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("*").order("name");
      if (error) throw error;
      return data || [];
    },
  });

export const useAllUsers = () =>
  useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id, user_id, full_name, phone, province, school, created_at,
          user_roles (role)
        `)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data || [];
    },
  });

export const useAdminStats = () =>
  useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [profiles, schools, courses] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("schools").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
      ]);
      return {
        totalUsers: profiles.count || 0,
        totalSchools: schools.count || 0,
        totalCourses: courses.count || 0,
      };
    },
  });

// ─── Create Course (Teacher) ───

export const useCreateCourse = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: { title: string; subject: string; level: string; description?: string }) => {
      const { error } = await supabase.from("courses").insert({
        ...course,
        teacher_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacher-courses"] }),
  });
};

// ─── Create Assignment (Teacher) ───

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assignment: {
      course_id: string;
      title: string;
      description?: string;
      due_date?: string;
      max_score?: number;
      assignment_type?: string;
      is_published?: boolean;
    }) => {
      const { error } = await supabase.from("assignments").insert(assignment);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacher-courses"] }),
  });
};

// ─── Schools (Admin) ───

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (school: {
      name: string;
      province: string;
      district?: string;
      school_type?: string;
    }) => {
      const { error } = await supabase.from("schools").insert(school);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-schools"] }),
  });
};
