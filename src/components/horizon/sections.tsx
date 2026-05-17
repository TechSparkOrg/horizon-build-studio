import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Home as HomeIcon,
  Wrench,
  Star,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

/* ---------- Shared ---------- */

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.12 } } };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="label-eyebrow">{children}</span>;
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.19 0.05 260 / 0.85) 40%, oklch(0.19 0.05 260 / 0.35) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <SectionLabel>Engineering · Research · Construction</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-bold text-white mt-4 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Building Nepal's Future, One Structure at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed"
          >
            From concept to completion, Horizon Nepal delivers precision engineering
            and innovative construction solutions across residential, commercial,
            and infrastructure projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
            >
              Get Started <ArrowRight className="size-4" />
            </a>
            <a
              href="#works"
              className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
            >
              View Projects
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { n: "250+", l: "Projects Completed" },
              { n: "15+", l: "Years Experience" },
              { n: "98%", l: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display font-bold text-brand-primary text-3xl">
                  {s.n}
                </dt>
                <dd className="text-white/70 text-xs sm:text-sm mt-1">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="ml-auto max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-brand-primary grid place-items-center">
                <CheckCircle2 className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70">Just Completed</p>
                <p className="font-semibold">Sunrise Residential Complex</p>
              </div>
            </div>
            <div className="mt-4 h-32 rounded-lg bg-cover bg-center" style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80')",
            }} />
            <p className="text-xs text-white/70 mt-3">Lalitpur · Delivered Q4 2023</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const services = [
  {
    icon: HomeIcon,
    title: "Building New Homes",
    body:
      "We bring your dream home to life with precision planning, quality materials, and expert craftsmanship tailored to Nepal's terrain and climate.",
  },
  {
    icon: Compass,
    title: "Designing Spaces",
    body:
      "Our architects design functional, beautiful spaces that balance aesthetics with structural integrity, optimised for modern Nepali living.",
  },
  {
    icon: Wrench,
    title: "Road Maintenance",
    body:
      "We specialise in durable road infrastructure and civil maintenance projects, ensuring safety and longevity in challenging topographies.",
  },
];

export function ServicesSection() {
  return (
    <section id="about" className="bg-off-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            About Horizon Nepal
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Three decades of combined leadership delivering homes, civic
            infrastructure, and interior spaces engineered for Nepal.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.article
              variants={fadeUp}
              key={s.title}
              className="group bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 border-l-4 border-transparent hover:border-brand-primary"
            >
              <div className="size-12 rounded-lg bg-brand-primary grid place-items-center mb-5">
                <s.icon className="size-6 text-white" />
              </div>
              <h3 className="font-body font-semibold text-xl text-brand-secondary">
                {s.title}
              </h3>
              <p className="mt-3 text-mid-gray leading-relaxed">{s.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="#works"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            Explore More <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio ---------- */

const projects = [
  { title: "Sunrise Residential Complex", category: "Buildings", location: "Lalitpur", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80" },
  { title: "Araniko Highway Maintenance", category: "Road Works", location: "Bhaktapur", img: "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&w=900&q=80" },
  { title: "New Baneshwor Office Tower", category: "Buildings", location: "Kathmandu", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80" },
  { title: "Boutique Hotel Interiors", category: "Interiors", location: "Thamel", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" },
  { title: "Patan Heritage Renovation", category: "Renovation", location: "Patan", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80" },
  { title: "Bagmati Bridge Upgrade", category: "Road Works", location: "Kathmandu", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=900&q=80" },
];

const filters = ["All", "Buildings", "Road Works", "Interiors", "Renovation"];

export function PortfolioSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="works" className="bg-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Portfolio</SectionLabel>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              Explore Our Works
            </h2>
          </div>
          <a href="#" className="text-brand-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
            View All Projects <ArrowRight className="size-4" />
          </a>
        </Reveal>

        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-1 border-b border-light-gray min-w-max">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-3 text-sm font-medium transition relative ${
                  active === f
                    ? "text-brand-primary"
                    : "text-mid-gray hover:text-brand-secondary"
                }`}
              >
                {f}
                {active === f && (
                  <motion.span
                    layoutId="portfolio-underline"
                    className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={active}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p) => (
            <motion.a
              variants={fadeUp}
              href="#"
              key={p.title}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] block focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <img
                src={p.img}
                alt={`${p.title} — ${p.category} project in ${p.location}`}
                loading="lazy"
                className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-5">
                <span className="self-start font-label uppercase tracking-wider text-xs px-2 py-1 rounded bg-brand-primary text-white">
                  {p.category}
                </span>
                <h3 className="text-white font-semibold mt-2 text-lg">{p.title}</h3>
                <span className="text-brand-primary text-sm font-semibold mt-1 inline-flex items-center gap-1">
                  View Project <ArrowRight className="size-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Quote Banner ---------- */

const quotes = [
  {
    text: "At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.",
    attr: "Horizon Nepal · Core Philosophy",
  },
  {
    text: "Every structure we build is a quiet promise to the generation that will inherit it.",
    attr: "Arun Thapa · Lead Architect",
  },
  {
    text: "We measure success not by what we deliver, but by how it endures.",
    attr: "Priya Shrestha · Project Director",
  },
];

export function QuoteBanner({
  image = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80",
}: { image?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const q = quotes[i];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-brand-dark/75" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="font-display text-gold-quote leading-none opacity-90" style={{ fontSize: "8rem" }} aria-hidden="true">
          “
        </div>
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="-mt-10 font-display italic text-white text-2xl sm:text-3xl leading-relaxed"
        >
          {q.text}
        </motion.blockquote>
        <p className="mt-6 text-white/60 text-sm">— {q.attr}</p>
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`size-2.5 rounded-full transition ${idx === i ? "bg-brand-primary" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- News ---------- */

const news = [
  {
    title: "How Earthquake-Resilient Design Is Reshaping Kathmandu Housing",
    excerpt: "New code-compliant techniques are quietly transforming residential construction across the valley.",
    cat: "Engineering",
    date: "Mar 12, 2024",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Inside Our Net-Zero Office Tower Pilot in New Baneshwor",
    excerpt: "From rooftop solar to greywater systems — a look at Nepal's first carbon-neutral commercial build.",
    cat: "Sustainability",
    date: "Feb 28, 2024",
    img: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Why Local Materials Matter: A Field Report from Pokhara",
    excerpt: "Sourcing stone, slate and timber within 50 km of site is changing project economics.",
    cat: "Field Notes",
    date: "Feb 10, 2024",
    img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=900&q=80",
  },
];

export function NewsSection() {
  return (
    <section id="news" className="bg-off-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionLabel>Latest Updates</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Read Some Latest News Articles
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {news.map((n) => (
            <motion.article
              variants={fadeUp}
              key={n.title}
              className="bg-white rounded-lg overflow-hidden border border-light-gray hover:shadow-xl transition group"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-label uppercase tracking-wider text-xs px-2 py-1 bg-off-white text-brand-primary rounded">
                    {n.cat}
                  </span>
                  <time className="text-xs text-mid-gray">{n.date}</time>
                </div>
                <h3 className="font-body font-semibold text-xl text-brand-secondary line-clamp-2">
                  {n.title}
                </h3>
                <p className="mt-2 text-mid-gray line-clamp-2">{n.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-brand-primary font-semibold text-sm">
                  Read More <ArrowRight className="size-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 h-11 px-6 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition">
            View All Articles <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const steps = [
  { n: 1, title: "Share Your Plan", body: "Tell us your vision, budget and timeline. We listen, ask sharp questions, and confirm fit before any commitment." },
  { n: 2, title: "Design & Planning Phase", body: "Our architects produce blueprints, 3D renders, BoQ, and permit-ready documents for your review and approval." },
  { n: 3, title: "Build & Handover", body: "Expert teams execute on-site with weekly client updates, third-party inspections, and a clean final handover." },
];

export function ProcessSection() {
  return (
    <section className="relative bg-white">
      <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-brand-primary" aria-hidden="true" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 py-20 sm:py-28">
        <Reveal className="text-white">
          <span className="font-label uppercase tracking-[0.15em] text-white/80 text-sm font-semibold">
            How We Work
          </span>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            The Infinite Construction in 3 Easy Steps
          </h2>
          <p className="mt-5 text-white/85 text-lg max-w-md leading-relaxed">
            A transparent, milestone-based process built around your peace of
            mind — from first conversation to keys in hand.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white lg:-mr-8 lg:rounded-2xl lg:shadow-xl lg:p-10 relative"
        >
          {steps.map((s, idx) => (
            <motion.div variants={fadeUp} key={s.n} className="flex gap-5 relative pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="size-11 rounded-full bg-brand-primary text-white font-display font-bold grid place-items-center shrink-0">
                  {s.n}
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 w-px border-l-2 border-dashed border-brand-primary/40 my-2" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="font-body font-semibold text-xl text-brand-secondary">{s.title}</h3>
                <p className="mt-2 text-mid-gray leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  { q: "What types of projects does Horizon Nepal handle?", a: "Residential homes, commercial buildings, road and bridge infrastructure, interior fit-outs, and heritage renovations across Bagmati and beyond." },
  { q: "How long does a typical construction project take?", a: "A standalone home runs 8–14 months; commercial builds 18–30. We provide a detailed milestone schedule before contract signing." },
  { q: "Do you handle all permits and government approvals?", a: "Yes. Our in-house liaison team manages municipal approvals, NBC compliance, and utility connections end-to-end." },
  { q: "What makes Horizon Nepal different from competitors?", a: "Transparent pricing, weekly client reporting, third-party quality inspections, and a 5-year structural warranty as standard." },
  { q: "How do I get started with a project consultation?", a: "Book a free 30-minute consultation through the form below or call our office directly — we'll cover scope, budget and feasibility." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Answers to Your Construction Questions
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-md">
            Everything you need to know about working with Horizon Nepal — from
            first call to final inspection.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            Ask Us Anything <ArrowRight className="size-4" />
          </a>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-lg border border-light-gray bg-white transition ${isOpen ? "border-l-4 border-l-brand-primary shadow-md" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-brand-secondary"
                >
                  <h3 className="font-body text-base">{f.q}</h3>
                  {isOpen ? (
                    <Minus className="size-5 text-brand-primary shrink-0" />
                  ) : (
                    <Plus className="size-5 text-brand-primary shrink-0" />
                  )}
                </button>
                <div
                  id={`faq-${i}`}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-mid-gray leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const testimonials = [
  { name: "Rajesh Maharjan", role: "Homeowner · Lalitpur", quote: "Horizon Nepal delivered our family home on time and 4% under budget. The weekly updates made everything feel under control.", initials: "RM" },
  { name: "Sita Gurung", role: "MD · Annapurna Retail", quote: "We've now done three commercial fit-outs with this team. The attention to structural detail is genuinely unmatched in the valley.", initials: "SG" },
  { name: "Bibek Karki", role: "Director · Public Works", quote: "Their road maintenance crew is the rare contractor that finishes ahead of schedule and still passes every inspection.", initials: "BK" },
  { name: "Anita Sharma", role: "Hotelier · Thamel", quote: "The interior renovation was handled with respect for our heritage building. Craftsmanship at a level we hadn't seen before.", initials: "AS" },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const perView = 3;
  const max = Math.max(0, testimonials.length - perView);
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(max, v + 1));

  return (
    <section className="bg-off-white py-20 sm:py-28" aria-label="Customer testimonials">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Client Stories</SectionLabel>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              What Our Customers Are Saying
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous testimonial" className="size-11 rounded-full border border-light-gray bg-white grid place-items-center hover:border-brand-primary hover:text-brand-primary transition">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={next} aria-label="Next testimonial" className="size-11 rounded-full border border-light-gray bg-white grid place-items-center hover:border-brand-primary hover:text-brand-primary transition">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${i} * (100% / 3) - ${i} * 1.5rem / 3))` }}
            aria-live="polite"
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl p-6 shadow-sm hover:border-t-4 hover:border-brand-primary hover:-translate-y-1 transition border-t-4 border-transparent"
              >
                <div className="flex gap-1 text-gold-quote mb-3">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-dark-text italic leading-relaxed">
                  <span className="text-brand-primary font-display text-xl">“</span>
                  {t.quote}
                  <span className="text-brand-primary font-display text-xl">”</span>
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-11 rounded-full bg-brand-secondary text-white grid place-items-center font-semibold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-secondary">{t.name}</p>
                    <p className="text-sm text-mid-gray">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Consultation Form ---------- */

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  service: z.string().min(1, "Select a service"),
  description: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
  date: z.string().min(1, "Choose a date"),
});
type FormValues = z.infer<typeof formSchema>;

export function ConsultationForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", description: "", date: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Consultation request received — we'll be in touch within one business day.");
    console.log("Consultation request:", data);
    reset();
  };

  const errBase = "mt-1 text-xs text-destructive";
  const inputBase = "w-full h-11 px-3 rounded-md border bg-white text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <section id="contact" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-0 lg:gap-10 items-stretch">
        <div
          className="relative rounded-l-2xl lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none bg-brand-dark text-white p-8 sm:p-12 overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0 2px, transparent 2px 14px)",
          }}
        >
          <SectionLabel>Book A Consultation</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            Schedule a Smooth and Stress-Free Consultation
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed max-w-md">
            Our experts are available Monday–Saturday, 9 AM–6 PM NPT. No pitch
            decks — just a real conversation about your project.
          </p>
          <ul className="mt-8 space-y-4 text-white/85">
            <li className="flex items-center gap-3">
              <Phone className="size-5 text-brand-primary" />
              <a href="tel:+97714411222" className="hover:text-brand-primary">+977 1 441 1222</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-brand-primary" />
              <a href="mailto:hello@horizonnepal.com.np" className="hover:text-brand-primary">hello@horizonnepal.com.np</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 text-brand-primary" />
              <span>Baluwatar, Kathmandu</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-off-white rounded-r-2xl rounded-b-2xl lg:rounded-b-2xl lg:rounded-bl-none p-8 sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold text-brand-secondary">
            Book Your Free Consultation
          </h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="name">
                Full Name <span className="text-brand-primary">*</span>
              </label>
              <input id="name" aria-required="true" aria-invalid={!!errors.name} {...register("name")} className={`${inputBase} ${errors.name ? "border-destructive" : "border-light-gray"}`} />
              {errors.name && <p role="alert" className={errBase}>{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="email">
                Email Address <span className="text-brand-primary">*</span>
              </label>
              <input id="email" type="email" aria-required="true" aria-invalid={!!errors.email} {...register("email")} className={`${inputBase} ${errors.email ? "border-destructive" : "border-light-gray"}`} />
              {errors.email && <p role="alert" className={errBase}>{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="phone">
                Phone Number <span className="text-brand-primary">*</span>
              </label>
              <input id="phone" type="tel" placeholder="+977 ..." aria-required="true" aria-invalid={!!errors.phone} {...register("phone")} className={`${inputBase} ${errors.phone ? "border-destructive" : "border-light-gray"}`} />
              {errors.phone && <p role="alert" className={errBase}>{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="service">
                Service Type <span className="text-brand-primary">*</span>
              </label>
              <select id="service" aria-required="true" aria-invalid={!!errors.service} {...register("service")} className={`${inputBase} ${errors.service ? "border-destructive" : "border-light-gray"}`}>
                <option value="">Choose a service…</option>
                <option>Building</option>
                <option>Road</option>
                <option>Interior</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
              {errors.service && <p role="alert" className={errBase}>{errors.service.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="description">
                Project Description <span className="text-brand-primary">*</span>
              </label>
              <textarea id="description" rows={4} aria-required="true" aria-invalid={!!errors.description} {...register("description")} className={`w-full px-3 py-2 rounded-md border bg-white text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${errors.description ? "border-destructive" : "border-light-gray"}`} />
              {errors.description && <p role="alert" className={errBase}>{errors.description.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="date">
                Preferred Date <span className="text-brand-primary">*</span>
              </label>
              <input id="date" type="date" aria-required="true" aria-invalid={!!errors.date} {...register("date")} className={`${inputBase} ${errors.date ? "border-destructive" : "border-light-gray"}`} />
              {errors.date && <p role="alert" className={errBase}>{errors.date.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full h-[52px] rounded-md bg-brand-primary text-white font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : (<>Schedule My Consultation <ArrowRight className="size-4" /></>)}
          </button>
          <p className="mt-3 text-xs text-mid-gray">
            We respect your privacy. Your details are never shared.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ---------- Location ---------- */

export function LocationSection() {
  return (
    <section className="relative bg-white">
      <div className="relative w-full h-[450px]">
        <iframe
          title="Horizon Nepal office location in Kathmandu"
          src="https://www.google.com/maps?q=Kathmandu,Nepal&z=12&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 sm:left-12 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
          <h3 className="font-display font-bold text-brand-secondary text-lg">Horizon Nepal HQ</h3>
          <address className="not-italic mt-2 text-sm text-mid-gray space-y-1">
            <p>Baluwatar, Kathmandu 44600</p>
            <p>+977 1 441 1222</p>
            <p>Mon–Sat · 9 AM – 6 PM</p>
          </address>
          <a
            href="https://www.google.com/maps?q=Kathmandu,Nepal"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-brand-primary text-sm font-semibold"
          >
            Get Directions <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */

const team = [
  { name: "Arun Thapa", role: "Lead Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { name: "Priya Shrestha", role: "Project Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { name: "Bikash Tamang", role: "Civil Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { name: "Sunita Rai", role: "Interior Designer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
];

export function TeamSection() {
  return (
    <section className="bg-off-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Meet the Team of Experts
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-xl mx-auto">
            Learn about our elite construction advisement team — architects,
            engineers, and project leaders.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((m) => (
            <motion.article
              variants={fadeUp}
              key={m.name}
              className="group bg-white rounded-2xl p-6 hover:shadow-xl transition"
            >
              <div className="relative size-[150px] mx-auto rounded-full overflow-hidden ring-0 group-hover:ring-4 group-hover:ring-brand-primary/30 transition">
                <img src={m.img} alt={`Portrait of ${m.name}`} loading="lazy" className="size-full object-cover" />
              </div>
              <h3 className="mt-5 font-body font-bold text-xl text-brand-secondary">{m.name}</h3>
              <p className="mt-1 font-label uppercase tracking-wider text-sm text-brand-primary">
                {m.role}
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="#" aria-label={`${m.name} on LinkedIn`} className="text-mid-gray hover:text-brand-primary">
                  <Linkedin className="size-5" />
                </a>
                <a href={`mailto:hello@horizonnepal.com.np`} aria-label={`Email ${m.name}`} className="text-mid-gray hover:text-brand-primary">
                  <Mail className="size-5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Secondary Quote Banner ---------- */

export function QuoteBannerSecondary() {
  return (
    <section className="relative bg-brand-secondary overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(1 0 0 / 0.4) 0, transparent 30%), radial-gradient(circle at 80% 70%, oklch(0.62 0.21 35 / 0.5) 0, transparent 35%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="font-display text-gold-quote leading-none" style={{ fontSize: "7rem" }} aria-hidden="true">
          “
        </div>
        <blockquote className="-mt-8 font-display italic text-white text-2xl sm:text-3xl leading-relaxed">
          We don't just build structures — we build the streets, schools and
          homes that our grandchildren will live in.
        </blockquote>
        <p className="mt-6 text-white/60 text-sm">— Horizon Nepal Leadership</p>
      </div>
    </section>
  );
}
