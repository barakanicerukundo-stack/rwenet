import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, School, Users, BarChart3, Globe, Shield, Zap, ChevronRight, Star, ArrowRight, CheckCircle2, MessageSquare, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import heroImage from "@/assets/hero-education.jpg";
import ThemeToggle from "@/components/ThemeToggle";

const stats = [
  { icon: School, value: "2,847", label: "Schools Connected", color: "text-primary" },
  { icon: Users, value: "1.2M+", label: "Students Enrolled", color: "text-secondary" },
  { icon: GraduationCap, value: "48,000+", label: "Teachers Active", color: "text-accent-foreground" },
  { icon: BookOpen, value: "15,000+", label: "Courses Available", color: "text-primary" },
];

const features = [
  { icon: BookOpen, title: "Digital Curriculum", description: "Access Rwanda's national curriculum digitally, aligned with REB standards across all levels." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track student progress, school performance, and national education metrics in real-time." },
  { icon: Globe, title: "Bilingual Platform", description: "Full support for English and Kinyarwanda, making education accessible to every Rwandan." },
  { icon: Shield, title: "Secure & Reliable", description: "Enterprise-grade security protecting student data with 99.9% uptime guarantee." },
  { icon: Zap, title: "Offline Ready", description: "Continue learning even without internet. Content syncs automatically when back online." },
  { icon: Users, title: "Collaborative Learning", description: "Connect students and teachers across districts for shared learning experiences." },
];

const howItWorks = [
  { step: "01", title: "Create Your Account", description: "Register as a student, teacher, or administrator in under 2 minutes." },
  { step: "02", title: "Join Your School", description: "Connect to your school or institution and access tailored content." },
  { step: "03", title: "Start Learning", description: "Access courses, submit assignments, and track your progress." },
  { step: "04", title: "Grow Together", description: "Collaborate with peers and educators to achieve your goals." },
];

const testimonials = [
  { quote: "RWENET has completely changed how I prepare my lessons. The resource library is incredible.", name: "Marie Claire Uwimana", role: "Physics Teacher, Lycée de Kigali", rating: 5 },
  { quote: "I can now track my children's progress from my phone. It gives me peace of mind.", name: "Jean Baptiste Nkurunziza", role: "Parent, Kigali", rating: 5 },
  { quote: "The analytics help us make data-driven decisions for our entire district.", name: "Diane Mukashema", role: "District Education Officer, Eastern Province", rating: 5 },
];

const partners = [
  "Rwanda Education Board", "MINEDUC", "UNICEF Rwanda", "World Bank", "African Development Bank", "British Council"
];

const faqs = [
  { q: "Is RWENET free for students?", a: "Yes! RWENET is completely free for all students and teachers in Rwanda. The platform is funded by the Ministry of Education." },
  { q: "What devices are supported?", a: "RWENET works on any modern browser — desktop, tablet, or mobile phone. We also have offline capabilities for areas with limited connectivity." },
  { q: "How do schools register?", a: "School administrators can register through the platform. After verification by the district education office, the school is activated within 48 hours." },
  { q: "Is my data secure?", a: "Absolutely. We use enterprise-grade encryption and comply with Rwanda's data protection regulations. Student data is never shared with third parties." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Testimonials</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">Sign In</Link>
            <Link to="/register" className="rounded-xl bg-hero-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Announcement */}
      <div className="mt-[72px] bg-hero-gradient px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
        📢 Registration for 2026 Academic Year is now open!{" "}
        <Link to="/register" className="underline underline-offset-2">Register today →</Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:pt-24">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              🇷🇼 Rwanda's National Education Platform
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering <span className="text-gradient">Every Learner</span> in Rwanda
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              RWENET connects students, teachers, and schools across Rwanda with a unified digital learning ecosystem. Access courses, track progress, and build the future of education — together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="flex items-center gap-2 rounded-xl bg-hero-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">
                Start Learning Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="rounded-xl border-2 border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                Teacher Portal
              </Link>
            </div>
            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-secondary" /> Free for all students</div>
              <div className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-secondary" /> Secure & private</div>
              <div className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-secondary" /> Works offline</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={heroImage} alt="Rwandan students learning with technology in a modern classroom" className="h-auto w-full object-cover" loading="eager" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary"><BarChart3 className="h-6 w-6 text-secondary-foreground" /></div>
                <div><p className="text-sm font-medium text-muted-foreground">Pass Rate</p><p className="font-display text-xl font-bold text-foreground">94.7%</p></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-2xl bg-card p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary"><Users className="h-6 w-6 text-primary-foreground" /></div>
                <div><p className="text-sm font-medium text-muted-foreground">Online Now</p><p className="font-display text-xl font-bold text-foreground">24,391</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-hero-gradient px-6 py-20">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Features */}
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div key={feature.title} custom={i} variants={fadeUp} className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary hover:shadow-xl">
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

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border bg-muted/30 px-6 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Get Started in <span className="text-gradient">4 Simple Steps</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">From registration to learning — it takes less than 5 minutes.</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => (
              <motion.div key={item.step} custom={i} variants={fadeUp} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-hero-gradient font-display text-2xl font-bold text-primary-foreground shadow-lg">
                  {item.step}
                </div>
                {i < 3 && <ChevronRight className="absolute right-0 top-8 hidden h-6 w-6 text-muted-foreground lg:block" />}
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Loved by <span className="text-gradient">Educators & Students</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">See what the RWENET community has to say.</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 text-base leading-relaxed text-foreground">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-border bg-muted/30 px-6 py-16">
        <div className="container mx-auto text-center">
          <p className="mb-8 text-sm font-medium text-muted-foreground">TRUSTED BY LEADING INSTITUTIONS</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p) => (
              <div key={p} className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="container mx-auto">
          <div className="rounded-3xl bg-hero-gradient p-12 text-center lg:p-20">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Transform Education?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              Join over 1.2 million learners and 48,000 teachers already using RWENET to build a brighter future for Rwanda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-transform hover:scale-105">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="rounded-xl border-2 border-primary-foreground/30 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-border bg-muted/50 px-6 py-24">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">A Vision for Rwanda, A Model for Africa</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            RWENET is an initiative to digitize and unify Rwanda's education system. By connecting every school, teacher, and student, we are building the infrastructure for a knowledge-driven economy — aligned with Rwanda Vision 2050.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-hero-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">
              Join RWENET Today <Heart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-12">
        <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient"><GraduationCap className="h-5 w-5 text-primary-foreground" /></div>
              <span className="font-display text-lg font-bold text-foreground">RWENET</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">Rwanda Education Network — transforming education for every Rwandan.</p>
            <div className="flex gap-3">
              {[MessageSquare, Globe, Award].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary">Student Portal</Link></li>
              <li><Link to="/login" className="hover:text-primary">Teacher Portal</Link></li>
              <li><Link to="/login" className="hover:text-primary">Admin Dashboard</Link></li>
              <li><a href="#features" className="hover:text-primary">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">API Reference</a></li>
              <li><a href="#" className="hover:text-primary">Support</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@rwenet.rw</li>
              <li>Kigali, Rwanda</li>
              <li>+250 788 000 000</li>
            </ul>
            <div className="mt-4 rounded-xl bg-muted p-3">
              <p className="text-xs font-medium text-muted-foreground">Newsletter</p>
              <div className="mt-2 flex gap-2">
                <input type="email" placeholder="Enter email" className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary" />
                <button className="rounded-lg bg-hero-gradient px-3 py-1.5 text-xs font-semibold text-primary-foreground">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <p>© 2026 RWENET — Rwanda Education Network. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
