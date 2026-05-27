import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { STATUS_STYLES, STATUS_LABELS } from "@/lib/status";
import type { HomeProject } from "@/lib/schemas";
import type { TextDict } from "@/lib/lang";

function formatBudget(n: number | null): string {
  if (n == null) return "";
  if (n >= 1e7) return `रू ${(n / 1e7).toFixed(1)} Cr`;
  if (n >= 1e5) return `रू ${(n / 1e5).toFixed(1)} L`;
  return `रू ${n.toLocaleString("en-IN")}`;
}

export function PortfolioSection({
  projects,
  filters,
  activeCategory,
  t,
}: {
  projects: HomeProject[];
  filters: string[];
  activeCategory: string;
  t: TextDict;
}) {
  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>{t.portfolio.label}</SectionLabel>
              <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              {t.portfolio.h2}
            </h2>
          </div>
          <Link
            href="/projects"
            prefetch={false}
            className="text-brand-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            {t.portfolio.viewAll} <ArrowRight className="size-4" />
          </Link>
        </AnimateOnView>

        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-1 border-b border-light-gray min-w-max">
            {filters.map((f) => (
              <Link
                key={f}
                href={f === "All" ? "/" : `/?category=${encodeURIComponent(f)}`}
                prefetch={false}
                scroll={false}
                className={`px-5 py-3 text-sm font-medium transition relative ${
                  activeCategory === f
                    ? "text-brand-primary"
                    : "text-mid-gray hover:text-brand-secondary"
                }`}
              >
                {f}
                {activeCategory === f && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-primary transition-all duration-300" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div
          key={activeCategory}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger"
        >
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              prefetch={false}
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

              <span className={`absolute top-3 left-3 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${STATUS_STYLES[p.status] || "bg-gray-400/20 text-gray-300 border-gray-400/40"}`}>
                {STATUS_LABELS[p.status] || p.status}
              </span>

              <div className="absolute bottom-0 inset-x-0 h-1 bg-black/30">
                <div
                  className="h-full bg-brand-primary transition-all"
                  style={{ width: `${p.completion}%` }}
                />
              </div>

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
                  {t.portfolio.viewProject} <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
