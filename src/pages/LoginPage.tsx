import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle2, Shield, Users, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const testimonials = [
  {
    quote: "RWENET transformed how I teach. My students are more engaged than ever before.",
    name: "Marie Claire Uwimana",
    role: "Physics Teacher, Lycée de Kigali",
  },
  {
    quote: "I can access all my courses and assignments from anywhere. It makes studying so much easier!",
    name: "Eric Niyonzima",
    role: "S5 Student, GS Kigali",
  },
  {
    quote: "The analytics dashboard gives us real insight into student performance across provinces.",
    name: "Jean Claude Kagabo",
    role: "District Education Officer",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loginError, setLoginError] = useState("");

  const passwordStrength = useMemo(() => {
    if (!password) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = [
      { level: 1, label: "Weak", color: "bg-destructive" },
      { level: 2, label: "Fair", color: "bg-accent" },
      { level: 3, label: "Good", color: "bg-primary" },
      { level: 4, label: "Strong", color: "bg-secondary" },
    ];
    return levels[score - 1] || { level: 0, label: "", color: "" };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    // Simulate login
    await new Promise((r) => setTimeout(r, 1500));
    // Demo: route based on email keyword
    if (email.includes("teacher")) {
      navigate("/dashboard/teacher");
    } else if (email.includes("admin")) {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/student");
    }
    setIsLoading(false);
  };

  // Auto-rotate testimonials
  useState(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex min-h-screen font-body">
      {/* Left Panel - Enhanced */}
      <div className="hidden w-1/2 bg-hero-gradient p-12 lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-foreground/5" />
        <div className="absolute top-1/2 right-10 h-40 w-40 rounded-full bg-primary-foreground/3" />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-primary-foreground">RWENET</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="mb-4 font-display text-4xl font-bold text-primary-foreground">
              Welcome back to Rwanda's Education Network
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Access your courses, track progress, and connect with educators across Rwanda.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Users, value: "1.2M+", label: "Active Learners" },
              { icon: BookOpen, value: "15K+", label: "Courses" },
              { icon: Shield, value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-3 text-center">
                <stat.icon className="mx-auto mb-1 h-5 w-5 text-primary-foreground/80" />
                <p className="font-display text-lg font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial carousel */}
          <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mb-4 text-base italic text-primary-foreground/90">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-xs text-primary-foreground/60">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeTestimonial ? "w-8 bg-primary-foreground" : "w-3 bg-primary-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-primary-foreground/60">© 2026 RWENET — Ministry of Education, Rwanda</p>
      </div>

      {/* Right Panel - Enhanced */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link to="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hero-gradient">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">RWENET</span>
            </Link>
          </div>

          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Sign In</h1>
          <p className="mb-8 text-muted-foreground">Enter your credentials to access your account</p>

          {/* Login error */}
          <AnimatePresence>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
              >
                {loginError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Login */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06.02-.17.04-.36.04-.55 0-1.12.535-2.22 1.235-3.02.75-.86 2.03-1.56 2.93-1.56.17.01.35.05.49.07v.45zm3.24 5.93c-.19.1-3.17 1.87-3.14 5.58.03 4.42 3.89 5.89 3.92 5.9-.03.1-.61 2.12-2.03 4.19-1.22 1.78-2.49 3.56-4.49 3.6-1.96.04-2.59-1.17-4.83-1.17-2.24 0-2.95 1.13-4.79 1.21-1.93.08-3.4-1.93-4.63-3.7C-1.06 18.57-2.3 12.22.97 7.88c1.63-2.17 4.05-3.44 6.34-3.48 1.89-.04 3.68 1.28 4.83 1.28 1.16 0 3.33-1.58 5.62-1.35.96.04 3.64.39 5.36 2.9l-.47.13z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">OR CONTINUE WITH EMAIL</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Tip: Use "teacher@" or "admin@" to demo different dashboards
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-background pl-11 pr-12 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Password strength */}
              {password && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= passwordStrength.level ? passwordStrength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{passwordStrength.label}</p>
                </motion.div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                Remember me
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full rounded-xl bg-hero-gradient py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mx-auto h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-muted/50 p-3">
            <Shield className="mt-0.5 h-4 w-4 text-secondary" />
            <p className="text-xs text-muted-foreground">
              Your connection is encrypted with SSL. RWENET uses enterprise-grade security to protect your data.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create Account
            </Link>
          </p>

          {/* Quick access */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-center text-xs font-medium text-muted-foreground">QUICK DEMO ACCESS</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Student", email: "student@rwenet.rw" },
                { label: "Teacher", email: "teacher@rwenet.rw" },
                { label: "Admin", email: "admin@rwenet.rw" },
              ].map((demo) => (
                <button
                  key={demo.label}
                  type="button"
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword("demo1234");
                  }}
                  className="rounded-lg border border-border bg-card p-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <CheckCircle2 className="mx-auto mb-1 h-4 w-4" />
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
