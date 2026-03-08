import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, School, Users, BarChart3, Globe, Shield, Zap, ChevronRight, Star, ArrowRight, CheckCircle2, MessageSquare, Award, Heart, MapPin, Phone, Mail } from "lucide-react";
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
  { icon: BookOpen, title: "Digital Curriculum", description: "Every subject from P1 through S6, mapped to the national competence-based curriculum. Teachers upload materials, students download them — even on 2G." },
  { icon: BarChart3, title: "Live Analytics", description: "School principals see pass rates by term. District officers compare sectors. Parents check grades on Saturday morning. Everyone stays informed." },
  { icon: Globe, title: "Kinyarwanda & English", description: "Switch between languages mid-session. All system labels, notifications, and help articles are available in both." },
  { icon: Shield, title: "Built for Privacy", description: "Student records are encrypted at rest. Only authorized staff can access personally identifiable information. We follow Rwanda's Data Protection Law." },
  { icon: Zap, title: "Low-Bandwidth Friendly", description: "Pages load under 3 seconds on a 3G connection. Offline mode lets students review downloaded lessons without any internet." },
  { icon: Users, title: "Cross-District Collaboration", description: "A chemistry teacher in Huye can share lab simulations with colleagues in Musanze. Best practices spread faster." },
];

const howItWorks = [
  { step: "01", title: "Create Your Account", description: "Pick your role — student, teacher, or school admin. Enter your school code if you have one." },
  { step: "02", title: "Join Your School", description: "Your school's coordinator approves your request. You get access to your class schedule and materials the same day." },
  { step: "03", title: "Start Learning", description: "Open a course, read the notes, attempt the quiz. Your teacher sees your score instantly and can leave feedback." },
  { step: "04", title: "Track Progress", description: "Watch your grades improve over the term. Set personal goals. Celebrate when you hit them." },
];

const testimonials = [
  {
    quote: "Before RWENET, I spent half my prep time photocopying worksheets. Now I upload them once and every student has a copy on their phone by morning.",
    name: "Claudine Uwimana",
    role: "Physics Teacher, GS Remera",
    rating: 5,
  },
  {
    quote: "My daughter is in S3 in Rwamagana. I work in Kigali. With RWENET, I check her grades every Friday evening. When she scored 92 in math last term, I called her immediately.",
    name: "Emmanuel Nsengimana",
    role: "Parent, Kigali",
    rating: 5,
  },
  {
    quote: "We used to collect term results on paper from 47 schools. Now everything is in the system by the end of exam week. Our annual report takes days instead of months.",
    name: "Théogène Habimana",
    role: "Education Officer, Nyagatare District",
    rating: 5,
  },
];

const partners = [
  "Rwanda Education Board", "MINEDUC", "UNICEF Rwanda", "World Bank", "African Development Bank", "British Council"
];

const faqs = [
  {
    q: "Does it cost anything?",
    a: "No. RWENET is free for every student and teacher in Rwanda. The Ministry of Education funds the platform as part of the national digital transformation strategy.",
  },
  {
    q: "What if my school doesn't have reliable internet?",
    a: "RWENET has an offline mode. Students can download lessons and assignments when connected, then work on them later without internet. Everything syncs automatically next time they're online.",
  },
  {
    q: "How does a new school get on the platform?",
    a: "The school head teacher registers through the website. The district education office receives a notification and verifies the school within 48 hours. After that, teachers and students can start joining.",
  },
  {
    q: "Can parents see their child's grades?",
    a: "Yes. When a student account is linked to a parent's phone number, the parent gets SMS notifications for new grades and can view a summary report in the app anytime.",
  },
  {
    q: "Is my child's data safe?",
    a: "We take this seriously. All personal data is encrypted, stored on servers in compliance with Rwanda's data protection regulations, and never shared with third parties. Only school staff and the student can view individual records.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Stories</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="hidden sm:inline-block rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">Sign In</Link>
            <Link to="/register" className="rounded-xl bg-hero-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Announcement */}
      <div className="mt-[72px] bg-hero-gradient px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
        Term 2, 2026 is underway — {" "}
        <Link to="/register" className="underline underline-offset-2">new students can still register →</Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:pt-24">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              🇷🇼 Rwanda's National Education Platform
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              One Platform for <span className="text-gradient">Every Classroom</span> in Rwanda
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              RWENET gives students their courses, teachers their tools, and school leaders the data they need — all in one place. No paperwork. No guesswork.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="flex items-center gap-2 rounded-xl bg-hero-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="rounded-xl border-2 border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                I Already Have One
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-secondary" /> Free for students & teachers</div>
              <div className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-secondary" /> Data stays in Rwanda</div>
              <div className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-secondary" /> Works on 2G</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={heroImage} alt="Students in a Rwandan classroom using tablets and laptops" className="h-auto w-full object-cover" loading="eager" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary"><BarChart3 className="h-6 w-6 text-secondary-foreground" /></div>
                <div><p className="text-sm font-medium text-muted-foreground">National Pass Rate</p><p className="font-display text-xl font-bold text-foreground">94.7%</p></div>
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
      <section className="bg-hero-gradient px-6 py-20">
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
              What Makes RWENET <span className="text-gradient">Different</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We didn't build a generic LMS and slap a Rwandan flag on it. Every feature was designed for the realities of teaching and learning here.
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
              From Sign-Up to <span className="text-gradient">First Lesson</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">It takes about five minutes. Here's how it goes.</p>
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
              Real People, <span className="text-gradient">Real Stories</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">These are actual experiences from teachers, parents, and education officers using RWENET across Rwanda.</p>
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
          <p className="mb-8 text-sm font-medium text-muted-foreground uppercase tracking-wider">Supported by</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
              Common <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground">If you don't find your answer here, email us at <span className="font-medium text-foreground">support@rwenet.rw</span></p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronRight className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
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
              Your Students Are Waiting
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              Over 1.2 million learners and 48,000 teachers are already here. Whether you're a student picking up where you left off or a school joining for the first time — there's a seat for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-transform hover:scale-105">
                Join RWENET <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="rounded-xl border-2 border-primary-foreground/30 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border bg-muted/50 px-6 py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">About RWENET</h2>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            RWENET — the Rwanda Education Network — is an initiative of the Ministry of Education to bring every school onto a single digital platform. Our goal is straightforward: make sure no student misses a lesson because of geography, no teacher grades in isolation, and no education officer makes decisions without data.
          </p>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
            The platform is built and maintained by a team of Rwandan and international engineers, in close partnership with the Rwanda Education Board and district education offices across all five provinces.
          </p>
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
            <p className="mb-4 text-sm text-muted-foreground">Rwanda Education Network — connecting every classroom in Rwanda.</p>
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
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-primary">User Guide</a></li>
              <li><a href="#" className="hover:text-primary">Report a Problem</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> support@rwenet.rw</li>
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +250 788 000 000</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Kigali, Rwanda</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <p>© 2026 RWENET — Ministry of Education, Republic of Rwanda</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
