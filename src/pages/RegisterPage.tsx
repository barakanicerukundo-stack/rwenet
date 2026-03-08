import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, School, CheckCircle2, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const roles = [
  { value: "student", label: "Student", icon: GraduationCap, description: "Access courses and learning materials" },
  { value: "teacher", label: "Teacher", icon: User, description: "Manage classes and grade students" },
  { value: "admin", label: "Administrator", icon: Shield, description: "Manage schools and platform" },
];

const provinces = ["Kigali City", "Eastern Province", "Western Province", "Northern Province", "Southern Province"];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    province: "",
    school: "",
  });

  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { level: 0, label: "", color: "", checks: [] };
    const checks = [
      { pass: p.length >= 8, label: "8+ characters" },
      { pass: /[A-Z]/.test(p), label: "Uppercase letter" },
      { pass: /[0-9]/.test(p), label: "Number" },
      { pass: /[^A-Za-z0-9]/.test(p), label: "Special character" },
    ];
    const score = checks.filter((c) => c.pass).length;
    const levels = [
      { level: 1, label: "Weak", color: "bg-destructive" },
      { level: 2, label: "Fair", color: "bg-accent" },
      { level: 3, label: "Good", color: "bg-primary" },
      { level: 4, label: "Strong", color: "bg-secondary" },
    ];
    return { ...(levels[score - 1] || { level: 0, label: "", color: "" }), checks };
  }, [formData.password]);

  const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    if (selectedRole === "teacher") navigate("/dashboard/teacher");
    else if (selectedRole === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/student");
    setIsLoading(false);
  };

  const update = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  return (
    <div className="flex min-h-screen font-body">
      {/* Left Panel */}
      <div className="hidden w-1/2 bg-hero-gradient p-12 lg:flex lg:flex-col lg:justify-between relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-foreground/5" />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-primary-foreground">RWENET</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="mb-4 font-display text-4xl font-bold text-primary-foreground">
              Join Rwanda's Digital Education Revolution
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Create your account and start your journey with over 1.2 million learners across Rwanda.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary-foreground/60">REGISTRATION PROGRESS</p>
            {[
              { step: 1, label: "Choose Your Role" },
              { step: 2, label: "Personal Information" },
              { step: 3, label: "Security & Location" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    step >= s.step
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary-foreground/20 text-primary-foreground/50"
                  }`}
                >
                  {step > s.step ? <CheckCircle2 className="h-4 w-4" /> : s.step}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= s.step ? "text-primary-foreground" : "text-primary-foreground/50"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-sm text-primary-foreground/60">© 2026 RWENET — Ministry of Education, Rwanda</p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <Link to="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hero-gradient">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">RWENET</span>
            </Link>
          </div>

          {/* Mobile step indicator */}
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-hero-gradient" : "bg-muted"}`} />
            ))}
          </div>

          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Create Account</h1>
          <p className="mb-8 text-muted-foreground">Step {step} of 3 — {["Choose your role", "Personal details", "Security & location"][step - 1]}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        selectedRole === role.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        selectedRole === role.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <role.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className={`font-semibold ${selectedRole === role.value ? "text-primary" : "text-foreground"}`}>
                          {role.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      {selectedRole === role.value && (
                        <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                      )}
                    </button>
                  ))}

                  {/* Social signup */}
                  <div className="pt-4">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs font-medium text-muted-foreground">OR SIGN UP WITH</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Google
                      </button>
                      <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06.02-.17.04-.36.04-.55 0-1.12.535-2.22 1.235-3.02.75-.86 2.03-1.56 2.93-1.56.17.01.35.05.49.07v.45zm3.24 5.93c-.19.1-3.17 1.87-3.14 5.58.03 4.42 3.89 5.89 3.92 5.9-.03.1-.61 2.12-2.03 4.19-1.22 1.78-2.49 3.56-4.49 3.6-1.96.04-2.59-1.17-4.83-1.17-2.24 0-2.95 1.13-4.79 1.21-1.93.08-3.4-1.93-4.63-3.7C-1.06 18.57-2.3 12.22.97 7.88c1.63-2.17 4.05-3.44 6.34-3.48 1.89-.04 3.68 1.28 4.83 1.28 1.16 0 3.33-1.58 5.62-1.35.96.04 3.64.39 5.36 2.9l-.47.13z"/></svg>
                        Apple
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Jean" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
                      <input type="text" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Habimana" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+250 788 000 000" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-input bg-background pl-10 pr-12 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength.level ? passwordStrength.color : "bg-muted"}`} />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {passwordStrength.checks?.map((c) => (
                            <p key={c.label} className={`text-xs flex items-center gap-1 ${c.pass ? "text-secondary" : "text-muted-foreground"}`}>
                              <CheckCircle2 className="h-3 w-3" /> {c.label}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="password" value={formData.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="••••••••" className={`w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 ${formData.confirmPassword ? (passwordsMatch ? "border-secondary" : "border-destructive") : "border-input"}`} required />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Province</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select value={formData.province} onChange={(e) => update("province", e.target.value)} className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none" required>
                        <option value="">Select province</option>
                        {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">School / Institution</label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="text" value={formData.school} onChange={(e) => update("school", e.target.value)} placeholder="e.g. Lycée de Kigali" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-primary" required />
                    <span className="text-sm text-muted-foreground">
                      I agree to the <a href="#" className="font-medium text-primary hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-primary hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading || (step === 3 && !agreedTerms)}
                className="relative flex-1 rounded-xl bg-hero-gradient py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mx-auto h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {step < 3 ? "Continue" : "Create Account"} <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
