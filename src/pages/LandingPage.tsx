import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, School, Users, BarChart3, Globe, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-education.jpg";

const stats = [
  { icon: School, value: "2,847", label: "Schools Connected", color: "text-primary" },
  { icon: Users, value: "1.2M+", label: "Students Enrolled", color: "text-secondary" },
  { icon: GraduationCap, value: "48,000+", label: "Teachers Active", color: "text-accent-foreground" },
  { icon: BookOpen, value: "15,000+", label: "Courses Available", color: "text-primary" },
];

const features = [
  {
    icon: BookOpen,
    title: "Digital Curriculum",
    description: "Access Rwanda's national curriculum digitally, aligned with REB standards across all levels.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track student progress, school performance, and national education metrics in real-time.",
  },
  {
    icon: Globe,
    title: "Bilingual Platform",
    description: "Full support for English and Kinyarwanda, making education accessible to every Rwandan.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security protecting student data with 99.9% uptime guarantee.",
  },
  {
    icon: Zap,
    title: "Offline Ready",
    description: "Continue learning even without internet. Content syncs automatically when back online.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Connect students and teachers across districts for shared learning experiences.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hero-gradient">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">RWENET</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#stats" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Impact
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-hero-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Announcement Banner */}
      <div className="mt-[72px] bg-hero-gradient px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
        📢 Registration for 2026 Academic Year is now open!{" "}
        <Link to="/register" className="underline underline-offset-2">
          Register today →
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:pt-24">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              🇷🇼 Rwanda's National Education Platform
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering{" "}
              <span className="text-gradient">Every Learner</span>{" "}
              in Rwanda
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              RWENET connects students, teachers, and schools across Rwanda with a unified digital learning ecosystem. Access courses, track progress, and build the future of education — together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-hero-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
              >
                Start Learning Free
              </Link>
              <Link
                to="/login"
                className="rounded-xl border-2 border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Teacher Portal
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={heroImage}
                alt="Rwandan students learning with technology in a modern classroom"
                className="h-auto w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <BarChart3 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                  <p className="font-display text-xl font-bold text-foreground">94.7%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-hero-gradient px-6 py-20">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={fadeUp} className="stat-card">
                <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.color}`} />
                <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built for Rwanda's <span className="text-gradient">Educational Future</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A comprehensive platform designed with Rwanda's unique educational needs at its core.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-border bg-muted/50 px-6 py-24">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            A Vision for Rwanda, A Model for Africa
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            RWENET is an initiative to digitize and unify Rwanda's education system. By connecting every school, teacher, and student, we are building the infrastructure for a knowledge-driven economy — aligned with Rwanda Vision 2050.
          </p>
          <Link
            to="/register"
            className="inline-block rounded-xl bg-hero-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            Join RWENET Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-12">
        <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">RWENET</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Rwanda Education Network — transforming education for every Rwandan.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary">Student Portal</Link></li>
              <li><Link to="/login" className="hover:text-primary">Teacher Portal</Link></li>
              <li><Link to="/login" className="hover:text-primary">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">API Reference</a></li>
              <li><a href="#" className="hover:text-primary">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@rwenet.rw</li>
              <li>Kigali, Rwanda</li>
              <li>+250 788 000 000</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 RWENET — Rwanda Education Network. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
