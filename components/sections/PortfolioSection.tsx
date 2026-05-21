"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { scaleUp, stagger } from "@/lib/motion-variants";
import type { Project } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  planning: "bg-amber-400/20 text-amber-300 border-amber-400/40",
  in_progress: "bg-blue-400/20 text-blue-300 border-blue-400/40",
  completed: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
  on_hold: "bg-gray-400/20 text-gray-300 border-gray-400/40",
};

const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

function formatBudget(n: number | null): string {
  if (n == null) return "";
  if (n >= 1e7) return `रू ${(n / 1e7).toFixed(1)} Cr`;
  if (n >= 1e5) return `रू ${(n / 1e5).toFixed(1)} L`;
  return `रू ${n.toLocaleString("en-IN")}`;
}

export function PortfolioSection({
  projects,
  filters,
}: {
  projects: Project[];
  filters: string[];
}) {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="works" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Portfolio</SectionLabel>
              <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              Explore Our Works
            </h2>
          </div>
          <a
            href="#"
            className="text-brand-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight className="size-4" />
          </a>
        </AnimateOnView>

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
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p) => (
            <motion.a
              variants={scaleUp}
              href={`/projects/${p.slug}`}
              key={p.slug}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] block focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <Image
                src={p.img}
                alt={`${p.title} — ${p.category} project in ${p.location}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status badge */}
              <span className={`absolute top-3 left-3 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${STATUS_STYLES[p.status] || "bg-gray-400/20 text-gray-300 border-gray-400/40"}`}>
                {STATUS_LABELS[p.status] || p.status}
              </span>

              {/* Completion bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-black/30">
                <div
                  className="h-full bg-brand-primary transition-all"
                  style={{ width: `${p.completion}%` }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-transparent flex flex-col justify-end p-5">
                <span className="self-start font-label uppercase tracking-wider text-xs px-2 py-1 rounded bg-brand-primary text-white">
                  {p.category}
                </span>
                <h3 className="text-white font-semibold mt-2 text-lg">
                  {p.title}
                </h3>
                <p className="text-white/70 text-sm mt-1 line-clamp-2">
                  {p.shortDescription}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" /> {p.location}
                  </span>
                  {p.budget != null && (
                    <span>{formatBudget(p.budget)}</span>
                  )}
                </div>
                <span className="text-brand-primary text-sm font-semibold mt-2 inline-flex items-center gap-1">
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
