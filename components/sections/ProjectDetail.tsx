"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Sparkles, Minus, Plus, User, Briefcase, Wallet, Box, Maximize2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { MediaCarousel } from "@/components/ui/MediaCarousel";
import { StreamingFallback } from "@/components/ui/StreamingFallback";
import { scaleUp, fadeUp, stagger } from "@/lib/motion-variants";

const STATUS_STYLES: Record<string, string> = {
  planning: "bg-white/10 text-white border-white/20 backdrop-blur-md",
  in_progress: "bg-white/10 text-white border-white/20 backdrop-blur-md",
  completed: "bg-white/10 text-white border-white/20 backdrop-blur-md",
  on_hold: "bg-white/10 text-white border-white/20 backdrop-blur-md",
};

const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

interface Phase {
  id: string;
  title: string;
  description: string;
  completion: number;
  date: Date | null;
  order: number;
  faqId: string | null;
  youtubeUrl?: string;
  images?: string[];
  medias?: PhaseMedia[];
}

interface PhaseMedia {
  id: string;
  type: string;
  url: string;
  message: string;
  referenceNo: string;
  order: number;
}

interface Attribute {
  id: string;
  label: string;
  value: string;
  order: number;
}

interface MediaItem {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

interface VideoItem {
  id: string;
  platform: string;
  sourceUrl: string;
  videoId: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  fileUrl: string;
  fileType: string;
  duration: string;
  isFeatured: boolean;
  order: number;
}

interface Model3DItem {
  id: string;
  filename: string;
  url: string;
  type: string;
}

interface FAQTypeItem {
  id: string;
  name: string;
  slug: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  faqType?: FAQTypeItem | null;
}

interface ProjectDetailData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string | null;
  status: string;
  completion: number;
  location: string;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  img: string;
  alt: string;
  ownerName: string;
  ownerProfession: string;
  ownerEarning: string;
  phases: Phase[];
  attributes: Attribute[];
  media: MediaItem[];
  videos: VideoItem[];
  models3d: Model3DItem[];
  faqs: FAQItem[];
  faqTypes: FAQTypeItem[];
}

interface RelatedProject {
  title: string;
  slug: string;
  img: string;
  alt: string;
  category: string | null;
  location: string;
}

interface AdjacentProject {
  title: string;
  slug: string;
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specs" },
  { id: "timeline", label: "Timeline" },
  { id: "3d-tour", label: "3D Tour" },
  { id: "media-showcase", label: "Media" },
  { id: "faq", label: "FAQ" },
];

function PhaseMediaItem({ m }: { m: PhaseMedia }) {
  const [show3d, setShow3d] = useState(false);

  if (m.type === "image") {
    return (
      <div className="space-y-1.5">
        {m.message && (
          <p className="text-sm text-dark-text/80 italic flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
            {m.message}
          </p>
        )}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-black/[0.03] bg-white">
          <Image src={m.url} alt={m.message || ""} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
        </div>
      </div>
    );
  }

  if (m.type === "video") {
    return (
      <div className="space-y-1.5">
        {m.message && (
          <p className="text-sm text-dark-text/80 italic flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-blue-400 shrink-0" />
            {m.message}
          </p>
        )}
        <div className="max-w-sm rounded-lg overflow-hidden border border-black/[0.03] bg-black aspect-video">
          <VideoEmbed
            platform="youtube"
            embedUrl={m.url}
            fileUrl=""
            fileType=""
            title={m.message}
            thumbnail=""
            sourceUrl={m.url}
          />
        </div>
      </div>
    );
  }

  if (m.type === "model3d") {
    return (
      <div className="space-y-1.5">
        {m.message && (
          <p className="text-sm text-dark-text/80 italic flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-purple-400 shrink-0" />
            {m.message}
          </p>
        )}
        <div className="rounded-lg border border-black/[0.03] bg-white overflow-hidden">
          {show3d ? (
            <div className="relative">
              <button
                onClick={() => setShow3d(false)}
                className="absolute top-2 right-2 z-10 size-7 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70 transition"
              >
                <X className="size-3.5" />
              </button>
              <div className="h-[400px]">
                <ModelViewer3D src={m.url} loading="lazy" className="w-full h-full bg-transparent" hideBadge />
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShow3d(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-off-white transition text-left"
            >
              <div className="size-10 rounded-lg bg-purple-100 text-purple-600 grid place-items-center shrink-0">
                <Box className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-secondary">
                  3D Model {m.referenceNo && <span className="text-mid-gray font-normal">· Ref: {m.referenceNo}</span>}
                </p>
                <span className="text-xs text-brand-primary font-medium inline-flex items-center gap-1 mt-0.5">
                  <Maximize2 className="size-3" /> Click to view in 3D
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export function ProjectDetail({
  project,
  related = [],
  adjacent = { prev: null, next: null },
}: {
  project: ProjectDetailData;
  related?: RelatedProject[];
  adjacent?: { prev: AdjacentProject | null; next: AdjacentProject | null };
}) {
  const [activeSection, setActiveSection] = useState("");
  const [faqOpen, setFaqOpen] = useState<string | null>(null);
  const [faqTypeFilter, setFaqTypeFilter] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current.set(id, el);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article className="bg-[#FAFAFA] min-h-screen selection:bg-brand-primary/20 selection:text-brand-dark font-body pb-20">


      {/* ── Hero Section ── */}
      <section className="relative h-[65vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden flex items-end">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.img || "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"}
            alt={project.alt || project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 40%, oklch(0.19 0.05 260 / 0.95) 100%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-16 lg:pb-24 z-20">
          <div className="max-w-3xl space-y-4">
            {project.category && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 font-label uppercase tracking-widest text-[11px] px-3.5 py-1.5 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/20"
              >
                <Sparkles className="size-3" />
                {project.category}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex gap-2"
            >
              <span className={`text-[12px] font-semibold tracking-wide uppercase px-3 py-1 rounded-md border backdrop-blur-md shadow-sm ${STATUS_STYLES[project.status] || "bg-white/10 text-white border-white/20 backdrop-blur-md"}`}>
                {STATUS_LABELS[project.status] || project.status}
              </span>
            </motion.div>
          </div>
        </div>

        {project.completion > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/40 z-20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.completion}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="h-full bg-brand-primary shadow-[0_0_12px_var(--color-brand-primary)]"
            />
          </div>
        )}
      </section>

      {/* ── Sticky Section Nav ── */}
      <nav className="sticky top-[0px] z-30 bg-white/90 backdrop-blur-xl border-b border-black/[0.05] shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`shrink-0 px-5 py-3.5 text-[13px] font-bold uppercase tracking-widest transition-all border-b-[3px] ${
                activeSection === id
                  ? "text-brand-primary border-brand-primary"
                  : "text-dark-text/70 border-transparent hover:text-brand-secondary hover:border-light-gray"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 space-y-12 sm:space-y-16">

        {/* ── Project Overview ── */}
        <section id="overview">
          <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
            Project Overview
          </h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white border border-black/[0.03] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 relative overflow-hidden"
          >
            {project.shortDescription && (
              <p className="text-lg sm:text-2xl font-display font-medium text-brand-secondary leading-relaxed border-l-[3px] border-brand-primary/80 pl-6">
                {project.shortDescription}
              </p>
            )}
            {project.description && (
              <div className="text-sm sm:text-base text-dark-text/80 leading-relaxed whitespace-pre-line border-t border-light-gray/60 pt-6">
                {project.description}
              </div>
            )}
          </motion.div>
        </section>

        {/* ── Owner Card ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white border border-black/[0.03] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500"
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="size-14 rounded-full bg-brand-primary/10 grid place-items-center shrink-0">
              <User className="size-6 text-brand-primary" />
            </div>
            <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-wider flex items-center gap-1.5">
                  <User className="size-3 text-brand-primary" /> Owner
                </span>
                <p className="text-sm font-semibold text-brand-secondary mt-0.5">{project.ownerName || "Unknown"}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="size-3 text-brand-primary" /> Profession
                </span>
                <p className="text-sm font-semibold text-brand-secondary mt-0.5">{project.ownerProfession || "Unknown"}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="size-3 text-brand-primary" /> Earning
                </span>
                <p className="text-sm font-semibold text-brand-secondary mt-0.5">{project.ownerEarning || "Unknown"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Specifications ── */}
        {project.attributes.length > 0 && (
          <section id="specs">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Specifications
            </h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {project.attributes.map((attr) => (
                <motion.div
                  variants={scaleUp}
                  key={attr.id}
                  className="px-5 py-4 bg-white border border-black/[0.03] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-wider">
                    {attr.label}
                  </span>
                  <span className="block mt-0.5 text-sm font-semibold text-brand-secondary">
                    {attr.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Timeline (Comment-Style Feed) ── */}
        {project.phases.length > 0 && (
          <section id="timeline">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Project Timeline
            </h2>
            <div className="relative pl-8 sm:pl-10 before:absolute before:left-[15px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand-primary/30 before:via-black/[0.05] before:to-transparent">
              {project.phases
                .sort((a, b) => a.order - b.order)
                .map((phase, i) => {
                  const faq = phase.faqId ? project.faqs.find((f) => f.id === phase.faqId) : null;
                  const medias = phase.medias || [];
                  const hasLegacyVideo = phase.youtubeUrl && phase.youtubeUrl !== "";
                  const hasLegacyImages = phase.images && phase.images.length > 0;

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="relative pb-8 last:pb-0"
                    >
                      <div className="absolute -left-[31px] top-2 size-8 rounded-full border-[3px] border-[#FAFAFA] bg-brand-primary flex items-center justify-center shadow-md shadow-brand-primary/30">
                        <div className="size-2.5 rounded-full bg-white" />
                      </div>

                      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
                        {/* Title + Date */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-semibold text-brand-secondary">
                            {phase.title}
                          </h3>
                          {phase.date && (
                            <span className="text-[11px] font-semibold text-mid-gray tracking-wide bg-off-white px-2.5 py-0.5 rounded border border-light-gray">
                              {new Date(phase.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                            </span>
                          )}
                        </div>

                        {faq && (
                          <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary text-[11px] font-medium px-2 py-0.5 rounded border border-brand-primary/10">
                            <Sparkles className="size-3" />
                            From FAQ: {faq.question}
                          </div>
                        )}

                        {/* Description */}
                        {phase.description && (
                          <p className="text-sm text-dark-text/75 leading-relaxed">
                            {phase.description}
                          </p>
                        )}

                        {/* ── Comment-Style Media Feed ── */}
                        {medias.length > 0 && (
                          <div className="space-y-4 border-l-2 border-brand-primary/15 pl-4 ml-1">
                            {medias
                              .sort((a, b) => a.order - b.order)
                              .map((m) => (
                                <PhaseMediaItem key={m.id} m={m} />
                              ))}
                          </div>
                        )}

                        {/* Legacy youtubeUrl fallback */}
                        {hasLegacyVideo && medias.length === 0 && (
                          <div className="rounded-lg overflow-hidden border border-black/[0.03] bg-black aspect-video">
                            <VideoEmbed
                              platform="youtube"
                              embedUrl={phase.youtubeUrl || ""}
                              fileUrl=""
                              fileType=""
                              title=""
                              thumbnail=""
                              sourceUrl={phase.youtubeUrl || ""}
                            />
                          </div>
                        )}

                        {/* Legacy images fallback */}
                        {hasLegacyImages && medias.length === 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(phase.images || []).map((img, idx) => (
                              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-black/[0.03] bg-white">
                                <Image src={img} alt="" fill sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Progress */}
                        {phase.completion > 0 && (
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex-grow h-1.5 rounded-full bg-light-gray overflow-hidden max-w-[200px]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${phase.completion}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-brand-primary rounded-full"
                              />
                            </div>
                            <span className="text-[11px] text-brand-primary font-semibold">
                              {phase.completion}% Complete
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ── 3D Interactive Tour ── */}
        {project.models3d.length > 0 && (
          <section id="3d-tour">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Interactive 3D Tour
            </h2>
            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <Suspense
                fallback={
                  <div className="bg-white border border-black/[0.03] rounded-3xl overflow-hidden">
                    <StreamingFallback label="Loading 3D Model..." minH={400} />
                  </div>
                }
              >
                {project.models3d.map((model) => (
                  <div key={model.id} className="bg-white border border-black/[0.03] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <ModelViewer3D src={model.url} loading="lazy" />
                    {model.filename && (
                      <p className="text-xs text-mid-gray text-center py-3 border-t border-light-gray/40">
                        {model.filename}
                      </p>
                    )}
                  </div>
                ))}
              </Suspense>
            </motion.div>
          </section>
        )}

        {/* ── Media Showcase ── */}
        {project.media.length > 0 && (
          <section id="media-showcase">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Media Showcase
            </h2>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Suspense
                fallback={
                  <div className="bg-white border border-black/[0.03] rounded-3xl p-10">
                    <StreamingFallback label="Loading Media..." minH={300} />
                  </div>
                }
              >
                <MediaCarousel media={project.media.sort((a, b) => a.order - b.order)} />
              </Suspense>
            </motion.div>
          </section>
        )}

        {/* ── Project FAQ ── */}
        {project.faqs.length > 0 && (
          <section id="faq">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Project FAQ
            </h2>
            {project.faqTypes.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => { setFaqTypeFilter(null); setFaqOpen(null); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                    !faqTypeFilter
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-mid-gray border-light-gray hover:border-brand-primary/30"
                  }`}
                >
                  All
                </button>
                {project.faqTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { setFaqTypeFilter(t.id); setFaqOpen(null); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                      faqTypeFilter === t.id
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-white text-mid-gray border-light-gray hover:border-brand-primary/30"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-3"
            >
              {project.faqs
                .filter((f) => !faqTypeFilter || f.faqType?.id === faqTypeFilter)
                .map((f) => {
                  const isOpen = faqOpen === f.id;
                  return (
                    <motion.div
                      key={f.id}
                      variants={fadeUp}
                      className={`rounded-3xl border border-black/[0.03] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow duration-300 ${
                        isOpen ? "border-l-4 border-l-brand-primary shadow-[0_20px_40px_rgb(0,0,0,0.08)] -translate-y-0.5" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setFaqOpen(isOpen ? null : f.id)}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-brand-secondary"
                      >
                        <h3 className="font-body text-base">{f.question}</h3>
                        {isOpen ? (
                          <Minus className="size-5 text-brand-primary shrink-0" />
                        ) : (
                          <Plus className="size-5 text-brand-primary shrink-0" />
                        )}
                      </button>
                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-mid-gray leading-relaxed">{f.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </section>
        )}

        {/* ── Related Projects ── */}
        {related.length > 0 && (
          <section id="related">
            <h2 className="font-display font-bold text-brand-secondary text-2xl sm:text-3xl mb-6">
              Similar Projects
            </h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {related.map((r) => (
                <motion.a
                  key={r.slug}
                  variants={scaleUp}
                  href={`/projects/${r.slug}`}
                  className="group relative overflow-hidden rounded-3xl aspect-[4/3] block border border-black/[0.03] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] -translate-y-0.5 transition-shadow duration-300"
                >
                  <Image
                    src={r.img}
                    alt={r.alt || r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent flex flex-col justify-end p-5">
                    {r.category && (
                      <span className="self-start font-label uppercase tracking-wider text-[10px] px-2 py-1 rounded bg-brand-primary text-white mb-2">
                        {r.category}
                      </span>
                    )}
                    <h3 className="text-white font-semibold text-base">{r.title}</h3>
                    {r.location && (
                      <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="size-3" /> {r.location}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Prev / Next Navigation ── */}
        {(adjacent.prev || adjacent.next) && (
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-light-gray/60">
            {adjacent.prev ? (
              <Link
                href={`/projects/${adjacent.prev.slug}`}
                className="group flex items-center gap-3 px-5 py-4 rounded-3xl bg-white border border-black/[0.03] hover:border-brand-primary/30 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <ArrowLeft className="size-5 text-mid-gray group-hover:text-brand-primary transition shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] font-semibold text-mid-gray uppercase tracking-wider">Previous</span>
                  <p className="text-sm font-semibold text-brand-secondary truncate">{adjacent.prev.title}</p>
                </div>
              </Link>
            ) : <div />}
            {adjacent.next && (
              <Link
                href={`/projects/${adjacent.next.slug}`}
                className="group flex items-center justify-end gap-3 px-5 py-4 rounded-3xl bg-white border border-black/[0.03] hover:border-brand-primary/30 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-mid-gray uppercase tracking-wider">Next</span>
                  <p className="text-sm font-semibold text-brand-secondary truncate">{adjacent.next.title}</p>
                </div>
                <ArrowRight className="size-5 text-mid-gray group-hover:text-brand-primary transition shrink-0" />
              </Link>
            )}
          </div>
        )}

        {/* ── CTA Section ── */}
        <motion.section
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-brand-dark rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-brand-dark/20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0 2px, transparent 2px 14px)",
          }}
        >
          <div className="relative z-10">
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Build Something Similar
            </h2>
            <p className="mt-4 text-white/70 max-w-md mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your
              vision to life — just like we did with {project.title}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
              >
                Start Your Project <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/#works"
                className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white/30 text-white font-semibold hover:bg-white hover:text-brand-dark transition"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── Back Link ── */}
        <div className="flex justify-center">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 text-sm text-mid-gray hover:text-brand-primary font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </article>
  );
}
