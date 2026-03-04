import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sector, useSubmitInquiry } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  HeadphonesIcon,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ─── Nav ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md nav-scrolled"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/tsg-logo-mark-transparent.dim_120x120.png"
            alt="TSG"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display font-bold text-white text-lg tracking-tight">
            TSG <span className="text-gradient-gold">Consulting</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-gold transition-colors rounded-md hover:bg-white/5"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="ml-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-gold transition-colors"
              data-ocid="nav.link"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact">
            <Button
              size="sm"
              className="bg-gold hover:bg-gold-dark text-navy-deep font-semibold rounded-full px-5"
              data-ocid="nav.primary_button"
            >
              Get in Touch
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-deep/98 backdrop-blur-md border-t border-white/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-white/80 hover:text-gold font-medium rounded-lg hover:bg-white/5 transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  type="button"
                  className="w-full mt-2 bg-gold hover:bg-gold-dark text-navy-deep font-semibold rounded-full"
                  data-ocid="nav.primary_button"
                  onClick={() => {
                    setMenuOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get in Touch
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden section-navy"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1600x900.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.75 0.15 65 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.75 0.15 65 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 font-medium tracking-wide px-4 py-1.5">
              Manpower Consultancy
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Trusted <span className="text-gradient-gold">Manpower</span>{" "}
            Partner
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Delivering skilled talent to{" "}
            <span className="text-gold font-semibold">NBFC</span>,{" "}
            <span className="text-gold font-semibold">BFSI</span>, and{" "}
            <span className="text-gold font-semibold">BPO</span> organizations
            across India. Connecting the right people with the right
            opportunities — fast, reliable, compliant.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#contact">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-navy-deep font-bold rounded-full px-8 text-base shadow-lg"
                data-ocid="hero.primary_button"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 text-base"
                data-ocid="hero.secondary_button"
              >
                Our Services
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: "500+", label: "Placements Done" },
              { value: "50+", label: "Corporate Clients" },
              { value: "3+", label: "Years of Expertise" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-white/0 to-gold/60"
        />
      </div>
    </section>
  );
}

/* ─── Services ─────────────────────────────────────────────── */
const services = [
  {
    icon: Users,
    title: "Temporary Staffing",
    description:
      "Flexible workforce solutions for short-term demands, seasonal surges, and project-based requirements.",
  },
  {
    icon: UserCheck,
    title: "Permanent Placement",
    description:
      "End-to-end recruitment for permanent roles — from sourcing to onboarding the perfect long-term hire.",
  },
  {
    icon: Briefcase,
    title: "Contract Staffing",
    description:
      "Deploy skilled professionals on a contract basis with full compliance and documentation support.",
  },
  {
    icon: DollarSign,
    title: "Payroll Management",
    description:
      "Complete payroll processing, statutory compliance (PF, ESI, PT), and salary disbursement services.",
  },
  {
    icon: Search,
    title: "Background Verification",
    description:
      "Thorough BGV for employment history, education credentials, criminal records, and reference checks.",
  },
  {
    icon: GraduationCap,
    title: "Training & Onboarding",
    description:
      "Structured induction programs and role-specific training to accelerate productivity from day one.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 font-medium px-4 py-1.5">
            What We Offer
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive manpower solutions tailored to the specific needs of
            financial services and BPO organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group card-hover bg-card rounded-2xl border border-border p-7 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-deep flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-200">
                  <Icon className="h-6 w-6 text-gold group-hover:text-navy-deep transition-colors duration-200" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Industries ───────────────────────────────────────────── */
const industries = [
  {
    icon: Landmark,
    tag: "NBFC",
    title: "Non-Banking Financial Companies",
    description:
      "Staffing solutions for NBFCs across loan officers, credit analysts, collection executives, and branch operations. We understand the regulatory and compliance requirements unique to non-banking financial entities.",
    color: "from-amber-900/20 to-amber-700/10",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    icon: Building2,
    tag: "BFSI",
    title: "Banking, Financial Services & Insurance",
    description:
      "Qualified professionals for banks, insurance firms, mutual funds, and stock brokerages. From front-desk banking staff to back-office operations, KYC, and compliance roles.",
    color: "from-blue-900/20 to-blue-700/10",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    icon: HeadphonesIcon,
    tag: "BPO",
    title: "Business Process Outsourcing",
    description:
      "Reliable workforce for inbound/outbound call centers, data entry, customer care, and back-office processing. Trained candidates with communication skills and process orientation.",
    color: "from-emerald-900/20 to-emerald-700/10",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
];

function IndustriesSection() {
  return (
    <section id="industries" className="py-24 section-navy-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gold/20 text-gold border-gold/30 font-medium px-4 py-1.5">
            Sectors We Serve
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Deep sector knowledge and an established network of pre-screened
            candidates across India's financial and service industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.tag}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 p-8 bg-gradient-to-br ${ind.color} backdrop-blur card-hover`}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="w-full h-full rounded-bl-full bg-gold" />
                </div>

                <Icon className="h-10 w-10 text-gold mb-5" />
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${ind.badge} mb-3 inline-block`}
                >
                  {ind.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-3 mb-3 leading-tight">
                  {ind.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  {ind.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ────────────────────────────────────────── */
const whyUs = [
  {
    icon: Users,
    title: "Large Talent Pool",
    description:
      "Access to a pre-verified database of thousands of candidates across roles, experience levels, and locations.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "We fill positions within 24–72 hours for most roles — because your business can't wait.",
  },
  {
    icon: TrendingUp,
    title: "Sector Expertise",
    description:
      "Deep understanding of NBFC, BFSI, and BPO requirements — we speak your industry's language.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Reliability",
    description:
      "Fully compliant with Labour laws, EPFO, ESIC, and all statutory requirements. Zero compromise on documentation.",
  },
];

function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 font-medium px-4 py-1.5">
              Why TSG
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose{" "}
              <span className="text-gradient-gold">TSGP Consulting</span>?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We're not just a placement agency — we're a strategic partner in
              building your workforce. Every assignment is handled with the
              rigor of a financial services firm.
            </p>
            <a href="#contact">
              <Button
                className="bg-navy-deep hover:bg-navy-mid text-white rounded-full px-8 font-semibold"
                data-ocid="whyus.primary_button"
              >
                Start Hiring Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          {/* Right: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-24 section-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30 font-medium px-4 py-1.5">
              About Us
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Dedicated to Building{" "}
              <span className="text-gradient-gold">Stronger Teams</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 text-left"
          >
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              <strong className="text-white">TSGP Consulting</strong> is a
              specialized manpower and staffing consultancy focused exclusively
              on the financial services and business process outsourcing
              sectors. Founded by{" "}
              <strong className="text-gold">Govardhan TS</strong>, Owner &amp;
              Managing Director, on a commitment to quality placements and
              compliance-first operations, we bridge the gap between talented
              professionals and the organizations that need them.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Our team brings hands-on experience in NBFC, BFSI, and BPO
              environments, allowing us to assess candidates beyond
              qualifications — evaluating role fitment, cultural alignment, and
              long-term potential. We operate with full transparency, deliver
              within timelines, and remain accountable at every step of the
              hiring process.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { icon: CheckCircle2, text: "Labour Law Compliant" },
                { icon: CheckCircle2, text: "Pan-India Network" },
                { icon: CheckCircle2, text: "BGV Verified Talent" },
                { icon: CheckCircle2, text: "24/7 Support" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-gold flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / Inquiry Form ───────────────────────────────── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    sector: "" as Sector | "",
    staffCount: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sector) {
      toast.error("Please select a sector.");
      return;
    }
    try {
      await submitInquiry.mutateAsync({
        name: formData.name,
        company: formData.company,
        sector: formData.sector as Sector,
        staffCount: BigInt(formData.staffCount || "1"),
        message: formData.message,
      });
      setSubmitted(true);
      toast.success("Inquiry submitted! We'll reach out soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 font-medium px-4 py-1.5">
              Contact Us
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Discuss Your{" "}
              <span className="text-gradient-gold">Hiring Needs</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Tell us about your staffing requirements and we'll get back to you
              within 24 hours with a customized proposal.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+91 63059 25803",
                },
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "tsgovardhan471@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "India",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-deep flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-3xl p-10 text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Inquiry Received!
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Thank you for reaching out. Our team will review your
                    requirements and contact you within{" "}
                    <strong className="text-foreground">24 hours</strong>.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        sector: "",
                        staffCount: "",
                        message: "",
                      });
                    }}
                    className="rounded-full px-6"
                    data-ocid="contact.secondary_button"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-3xl p-8 space-y-5"
                  data-ocid="contact.panel"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-foreground font-medium text-sm"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Rajesh Kumar"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-xl border-border bg-background"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-foreground font-medium text-sm"
                      >
                        Company Name *
                      </Label>
                      <Input
                        id="company"
                        placeholder="ABC Finance Ltd."
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            company: e.target.value,
                          }))
                        }
                        className="rounded-xl border-border bg-background"
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="sector"
                        className="text-foreground font-medium text-sm"
                      >
                        Sector *
                      </Label>
                      <Select
                        required
                        value={formData.sector}
                        onValueChange={(v) =>
                          setFormData((p) => ({ ...p, sector: v as Sector }))
                        }
                      >
                        <SelectTrigger
                          id="sector"
                          className="rounded-xl border-border bg-background"
                          data-ocid="contact.select"
                        >
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Sector.NBFC}>NBFC</SelectItem>
                          <SelectItem value={Sector.BFSI}>BFSI</SelectItem>
                          <SelectItem value={Sector.BPO}>BPO</SelectItem>
                          <SelectItem value={Sector.Other}>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="staffCount"
                        className="text-foreground font-medium text-sm"
                      >
                        Staff Required
                      </Label>
                      <Input
                        id="staffCount"
                        type="number"
                        placeholder="10"
                        min={1}
                        value={formData.staffCount}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            staffCount: e.target.value,
                          }))
                        }
                        className="rounded-xl border-border bg-background"
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-foreground font-medium text-sm"
                    >
                      Requirements / Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe the roles, experience required, location, timeline..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className="rounded-xl border-border bg-background resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="w-full bg-navy-deep hover:bg-navy-mid text-white rounded-full py-6 font-semibold text-base"
                    data-ocid="contact.submit_button"
                  >
                    {submitInquiry.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We respond within 24 hours on business days
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="section-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/tsg-logo-mark-transparent.dim_120x120.png"
                alt="TSG"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display font-bold text-white text-lg">
                TSGP Consulting
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your trusted manpower partner for NBFC, BFSI, and BPO sectors.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Services", "Industries", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/50 hover:text-gold text-sm transition-colors"
                      data-ocid="footer.link"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Sectors
            </h4>
            <ul className="space-y-2">
              {[
                "NBFC Staffing",
                "BFSI Staffing",
                "BPO Staffing",
                "Payroll Services",
                "BGV Services",
              ].map((s) => (
                <li key={s}>
                  <span className="text-white/50 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} TSGP Consulting. All rights reserved. | Owner: Govardhan TS
          </p>
          <p className="text-white/30 text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <IndustriesSection />
        <WhyChooseUsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
