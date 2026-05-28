"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { useText } from "@/lib/lang-client";
import type { NewsDisplay, ProjectRef, VideoRef } from "@/lib/schemas";

const STATUS_STYLES: Record<string, string> = {
  planning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  on_hold: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

function ProjectSidebar({ project, visible }: { project: ProjectRef; visible: boolean }) {

  const firstModel = project.models3d?.[0];
  const firstVideo = project.videos?.find((v) => v.embedUrl || v.fileUrl);
  const t = useText();

  return (
    <aside
      className={`transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="sticky top-8 space-y-4">
        <div className="bg-white rounded-xl border border-light-gray shadow-sm overflow-hidden">
          {firstModel ? (
            <ModelViewer3D
              src={firstModel.url}
              className="h-52 bg-slate-50"
              hideBadge
              disableControls
            />
          ) : firstVideo ? (
            <VideoEmbed
              platform={firstVideo.platform}
              embedUrl={firstVideo.embedUrl}
              fileUrl={firstVideo.fileUrl}
              title={firstVideo.title}
            />
          ) : (
            <div className="h-32 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 flex items-center justify-center">
              <Building2 className="size-10 text-brand-primary/30" />
            </div>
          )}

          <div className="p-4 space-y-3">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={false}
              className="group inline-flex items-center gap-1.5 font-display font-bold text-brand-secondary hover:text-brand-primary transition-colors text-base"
            >
              {project.title}
              <ExternalLink className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>

            <div className="flex flex-wrap gap-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[project.status] ?? STATUS_STYLES.planning}`}>
                {STATUS_LABELS[project.status] ?? project.status}
              </span>
              {project.completion > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-brand-primary/5 text-brand-primary border-brand-primary/20">
                  {project.completion}% Complete
                </span>
              )}
            </div>

            {project.location && (
              <div className="flex items-center gap-1.5 text-xs text-mid-gray">
                <MapPin className="size-3" />
                {project.location}
              </div>
            )}

            {!firstModel && (
              <Link
                href={`/projects/${project.slug}`}
                prefetch={false}
                className="block w-full text-center h-8 text-xs font-semibold rounded-lg border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition"
              >
                {t.projectDetail.viewProject}
              </Link>
            )}
          </div>
        </div>

        {firstModel && (
          <Link
            href={`/projects/${project.slug}`}
            prefetch={false}
            className="block w-full text-center h-9 text-xs font-semibold rounded-lg border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition leading-9"
          >
            {t.projectDetail.viewFullProject}
          </Link>
        )}
      </div>
    </aside>
  );
}

export function NewsDetail({ article }: { article: NewsDisplay }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroDone, setHeroDone] = useState(false);
  const t = useText();

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroDone(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article>
      <section ref={heroRef} className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        <Image
          src={article.image}
          alt={article.alt || article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.19 0.05 260 / 0.85) 40%, oklch(0.19 0.05 260 / 0.35) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12 lg:pb-16">
            <div className="space-y-3 sm:space-y-4 max-w-[860px]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-label uppercase tracking-wider text-[11px] px-2.5 py-1 bg-brand-primary text-white">
                  {article.category}
                </span>
                {article.project && (
                  <Link
                    href={`/projects/${article.project.slug}`}
                    prefetch={false}
                    className="font-label uppercase tracking-wider text-[11px] px-2.5 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    {t.news.readMore}: {article.project.title}
                  </Link>
                )}
                {article.readingTimeMinutes && (
                  <span className="text-xs text-white/70 inline-flex items-center gap-1">
                    <Clock className="size-3" /> {article.readingTimeMinutes} min read
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white/70 backdrop-blur-md border-b border-light-gray/60 py-2.5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            prefetch={false}
            className="group inline-flex items-center gap-2 text-xs text-mid-gray hover:text-brand-primary font-semibold tracking-wide uppercase transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            {t.news.back}
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 min-w-0 max-w-[740px]">
            <div className="flex items-center gap-1.5 text-sm text-mid-gray mb-6 pb-5 border-b border-light-gray">
              <Calendar className="size-3.5" />
              <time dateTime={article.publishedAt.toISOString()}>
                {article.publishedAt.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <div className="text-sm sm:text-base text-dark-text/80 leading-relaxed whitespace-pre-line">
              {article.excerpt}
            </div>

            <div className="mt-10 sm:mt-14 pt-4 border-t border-light-gray">
              <Link
                href="/news"
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-brand-primary font-medium transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                {t.news.back}
              </Link>
            </div>
          </div>

          {article.project && (
            <>
              <div className="hidden lg:block w-[300px] shrink-0">
                <ProjectSidebar project={article.project} visible={heroDone} />
              </div>

              <div className="lg:hidden mt-6 pt-6 border-t border-light-gray">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-brand-secondary text-sm uppercase tracking-wider">
                    {t.projectDetail.related}
                  </h3>
                  <ProjectSidebar project={article.project} visible />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
