"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, MapPin, User, Box, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { MediaCarousel } from "@/components/ui/MediaCarousel";
import { DETAIL_STATUS_STYLES, STATUS_LABELS } from "@/lib/status";
import { useText } from "@/lib/lang-client";
import type {
  ProjectDisplay, ProjectMedia, ProjectVideo, ProjectModel,
  ProjectPhase, ProjectAttribute,
  FAQ, FAQType, RelatedProject, AdjacentProject,
} from "@/lib/schemas";

// ── URL guard ──

function mediaUrl(str: string) {
  try { return new URL(str).href; } catch { return null; }
}

// ── Phase Media Item ──

type PhaseMediaItemType = ProjectPhase["medias"][number];

function PhaseMediaItem({ m }: { m: PhaseMediaItemType }) {
  const [show3d, setShow3d] = useState(false);
  const url = mediaUrl(m.url);

  if (!url) {
    return m.message ? <p className="text-sm text-gray-600 italic">{m.message}</p> : null;
  }

  if (m.type === "image") {
    return (
      <div className="space-y-2">
        {m.message && <p className="text-sm text-gray-600 italic">{m.message}</p>}
        <div className="relative aspect-video rounded border border-gray-200 bg-gray-50 overflow-hidden">
          <Image src={url} alt={m.message || ""} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
        </div>
      </div>
    );
  }

  if (m.type === "video") {
    return (
      <div className="space-y-2">
        {m.message && <p className="text-sm text-gray-600 italic">{m.message}</p>}
        <div className="max-w-sm rounded border border-gray-200 bg-black aspect-video overflow-hidden">
          <VideoEmbed platform="youtube" embedUrl={url} fileUrl="" title={m.message} />
        </div>
      </div>
    );
  }

  if (m.type === "model3d") {
    return (
      <div className="space-y-2">
        {m.message && <p className="text-sm text-gray-600 italic">{m.message}</p>}
        <div className="rounded border border-gray-200 bg-white overflow-hidden">
          {show3d ? (
            <div className="relative">
              <button onClick={() => setShow3d(false)} className="absolute top-2 right-2 z-10 size-7 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/70 transition">
                <span className="text-xs">✕</span>
              </button>
              <div className="h-[400px]">
                <ModelViewer3D src={url} loading="lazy" className="w-full h-full bg-transparent" hideBadge />
              </div>
            </div>
          ) : (
            <button onClick={() => setShow3d(true)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition text-left">
              <div className="size-10 rounded bg-blue-100 text-blue-600 grid place-items-center shrink-0">
                <Box className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  3D Model {m.referenceNo && <span className="text-gray-500 font-normal">· Ref: {m.referenceNo}</span>}
                </p>
                <span className="text-xs text-blue-600 font-medium">Click to view in 3D</span>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ── Featured Video ──

function FeaturedVideo({ video }: { video: ProjectVideo }) {
  return (
    <VideoEmbed
      platform={video.platform}
      embedUrl={video.embedUrl}
      fileUrl={video.fileUrl}
      title={video.title}
    />
  );
}

// ── FAQ Section Sub-component ──

function FAQSectionComponent({ faqs, faqTypes }: { faqs: FAQ[]; faqTypes: FAQType[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const t = useText();

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.projectDetail.faq}</h2>
      {faqTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => { setTypeFilter(null); setOpen(null); }}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition ${
              !typeFilter ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {t.projectDetail.filterAll}
          </button>
          {faqTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTypeFilter(t.id); setOpen(null); }}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition ${
                typeFilter === t.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-3">
        {faqs
          .filter((f) => !typeFilter || f.faqType?.id === typeFilter)
          .map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="bg-white border border-gray-200 rounded hover:shadow-sm transition-shadow">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium text-gray-900"
                >
                  <span>{f.question}</span>
                  {isOpen ? <Minus className="size-4 text-blue-600 shrink-0" /> : <Plus className="size-4 text-blue-600 shrink-0" />}
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-700 leading-relaxed">{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

// ── Related Section Sub-component ──

function RelatedSection({ related }: { related: RelatedProject[] }) {
  const t = useText();

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.projectDetail.related}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((r) => (
          <Link key={r.slug} href={`/projects/${r.slug}`} prefetch={false} className="group block relative overflow-hidden rounded aspect-[4/3] border border-gray-200 bg-gray-50 hover:shadow-md transition-shadow">
            <Image src={r.img} alt={r.alt || r.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col justify-end p-5">
              {r.category && <span className="self-start bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-sm mb-2">{r.category}</span>}
              <h3 className="text-white font-semibold">{r.title}</h3>
              {r.location && <p className="text-white/70 text-xs flex items-center gap-1 mt-1"><MapPin className="size-3" /> {r.location}</p>}
            </div>
            </Link>
          ))}
        </div>
    </section>
  );
}

// ── Adjacent Section Sub-component ──

function AdjacentSection({ adjacent }: { adjacent: { prev: AdjacentProject | null; next: AdjacentProject | null } }) {
  const t = useText();

  if (!adjacent.prev && !adjacent.next) return null;
  return (
    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200">
      {adjacent.prev ? (
        <Link href={`/projects/${adjacent.prev.slug}`} prefetch={false} className="flex items-center gap-3 px-5 py-4 rounded bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
          <ArrowLeft className="size-4 text-gray-400 shrink-0" />
          <div className="text-left">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projectDetail.previous}</span>
            <p className="text-sm font-medium text-gray-900 truncate">{adjacent.prev.title}</p>
          </div>
        </Link>
      ) : <div />}
      {adjacent.next ? (
        <Link href={`/projects/${adjacent.next.slug}`} prefetch={false} className="flex items-center justify-end gap-3 px-5 py-4 rounded bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projectDetail.next}</span>
            <p className="text-sm font-medium text-gray-900 truncate">{adjacent.next.title}</p>
          </div>
          <ArrowRight className="size-4 text-gray-400 shrink-0" />
        </Link>
      ) : <div />}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function ProjectDetail({
  project,
  faqSlot,
  relatedSlot,
  adjacentSlot,
}: {
  project: ProjectDisplay;
  faqSlot?: React.ReactNode;
  relatedSlot?: React.ReactNode;
  adjacentSlot?: React.ReactNode;
}) {
  const videos = project.videos ?? [];
  const models3d = project.models3d ?? [];
  const featuredVideo = videos.find((v) => v.isFeatured) || videos[0];
  const remainingVideos = videos.filter((v) => v !== featuredVideo);
  const featuredModel = models3d[0];
  const remainingModels = models3d.slice(1);
  const t = useText();

  return (
    <article className="font-serif bg-white text-gray-900 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative h-[60vh] sm:h-[65vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={project.img || "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"}
            alt={project.alt || project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 w-full pb-14 z-10">
          <div className="max-w-2xl space-y-4">
            {project.category && (
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm">
                {project.category}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-sm ${DETAIL_STATUS_STYLES[project.status] || "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                {STATUS_LABELS[project.status] || project.status}
              </span>
              {project.location && (
                <span className="text-xs text-white/70 flex items-center gap-1">
                  <MapPin className="size-3" /> {project.location}
                </span>
              )}
            </div>
          </div>
        </div>
        {project.completion > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-800/50">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${project.completion}%` }} />
          </div>
        )}
      </section>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* ── Overview ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.overview}</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 space-y-5">
            {project.shortDescription && (
              <p className="text-xl font-medium text-gray-900 leading-relaxed">
                {project.shortDescription}
              </p>
            )}
            {project.description && (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-200 pt-5">
                {project.description}
              </div>
            )}
          </div>
        </section>

        {/* ── Featured Video ── */}
        {featuredVideo && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.video}</h2>
            {featuredVideo.title && (
              <p className="text-sm text-gray-500 mb-3">{featuredVideo.title}</p>
            )}
            <FeaturedVideo video={featuredVideo} />
          </section>
        )}

        {/* ── Featured 3D ── */}
        {featuredModel && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.tour}</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-[500px]">
                <ModelViewer3D src={featuredModel.url} loading="lazy" className="w-full h-full bg-transparent" />
              </div>
              {featuredModel.filename && (
                <p className="text-xs text-gray-500 text-center py-3 border-t border-gray-200">{featuredModel.filename}</p>
              )}
            </div>
          </section>
        )}

        {/* ── Owner ── */}
        {project.ownerName && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.client}</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="size-14 rounded-full bg-blue-100 grid place-items-center shrink-0">
                  <User className="size-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0 grid sm:grid-cols-3 gap-5">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projectDetail.name}</span>
                    <p className="text-gray-900 font-medium mt-0.5">{project.ownerName}</p>
                  </div>
                  {project.ownerProfession && (
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projectDetail.profession}</span>
                      <p className="text-gray-900 font-medium mt-0.5">{project.ownerProfession}</p>
                    </div>
                  )}
                  {project.ownerEarning && (
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.projectDetail.earning}</span>
                      <p className="text-gray-900 font-medium mt-0.5">{project.ownerEarning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Specifications ── */}
        {(project.attributes ?? []).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.specifications}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.attributes ?? []).map((attr) => (
                <div key={attr.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{attr.label}</span>
                  <p className="text-gray-900 font-medium mt-1">{attr.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Timeline ── */}
        {(project.phases ?? []).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.timeline}</h2>
            <div className="space-y-6">
              {(project.phases ?? [])
                .sort((a, b) => a.order - b.order)
                .map((phase, i) => {
                  const medias = phase.medias || [];
                  const hasLegacyVideo = phase.youtubeUrl && phase.youtubeUrl !== "";
                  const hasLegacyImages = phase.images && phase.images.length > 0;

                  return (
                    <div key={phase.id} className="relative pl-8 border-l-2 border-blue-200 pb-8 last:pb-0">
                      <div className="absolute -left-[9px] top-2 size-4 rounded-full bg-blue-600 border-2 border-white" />
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{phase.title}</h3>
                          {phase.date && (
                            <span className="text-xs text-gray-500">{new Date(phase.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                          )}
                        </div>
                        {phase.description && <p className="text-sm text-gray-700 leading-relaxed">{phase.description}</p>}
                        {medias.length > 0 && (
                          <div className="space-y-4 border-l-2 border-blue-100 pl-4 ml-1">
                            {medias.sort((a, b) => a.order - b.order).map((m) => <PhaseMediaItem key={m.id} m={m} />)}
                          </div>
                        )}
                        {hasLegacyVideo && medias.length === 0 && (
                          <div className="rounded border border-gray-200 bg-black aspect-video overflow-hidden">
                            <VideoEmbed platform="youtube" embedUrl={phase.youtubeUrl || ""} fileUrl="" title="" />
                          </div>
                        )}
                        {hasLegacyImages && medias.length === 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(phase.images || []).map((img, idx) => (
                              <div key={idx} className="relative aspect-video rounded border border-gray-200 bg-gray-50 overflow-hidden">
                                <Image src={img} alt="" fill sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        {phase.completion > 0 && (
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex-grow h-1.5 rounded-full bg-gray-200 overflow-hidden max-w-[200px]">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${phase.completion}%` }} />
                            </div>
                            <span className="text-xs text-blue-600 font-medium">{phase.completion}% Complete</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ── Remaining 3D Models ── */}
        {remainingModels.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.additional3d}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {remainingModels.map((model) => (
                <div key={model.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-[300px]">
                    <ModelViewer3D src={model.url} loading="lazy" className="w-full h-full bg-transparent" />
                  </div>
                  {model.filename && <p className="text-xs text-gray-500 text-center py-2 border-t border-gray-200">{model.filename}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Remaining Videos ── */}
        {remainingVideos.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.moreVideos}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {remainingVideos.map((video) => (
                <div key={video.id}>
                  <VideoEmbed
                    platform={video.platform}
                    embedUrl={video.embedUrl}
                    fileUrl={video.fileUrl}
                    title={video.title}
                  />
                  {video.title && <p className="text-xs text-gray-600 text-center pt-2">{video.title}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Media Showcase ── */}
        {(project.media ?? []).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{t.projectDetail.media}</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <MediaCarousel media={(project.media ?? []).sort((a, b) => a.order - b.order)} />
            </div>
          </section>
        )}

        {/* ── FAQ (streamed slot or fallback) ── */}
        {faqSlot}

        {/* ── Related (streamed slot or fallback) ── */}
        {relatedSlot}

        {/* ── Adjacent (streamed slot or fallback) ── */}
        {adjacentSlot}

        {/* ── CTA ── */}
        <section className="bg-gray-900 rounded-lg p-10 sm:p-14 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{t.projectDetail.ctaHeading}</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            {t.projectDetail.ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact" prefetch={false} className="inline-flex items-center gap-2 h-12 px-7 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm">
              {t.projectDetail.ctaPrimary} <ArrowRight className="size-4" />
            </Link>
            <Link href="/projects" prefetch={false} className="inline-flex items-center gap-2 h-12 px-7 rounded border border-white/25 text-white font-medium hover:bg-white hover:text-gray-900 transition">
              {t.projectDetail.ctaSecondary}
            </Link>
          </div>
        </section>

        {/* ── Back Link ── */}
        <div className="flex justify-center">
          <Link href="/projects" prefetch={false} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors">
            <ArrowLeft className="size-4" />
            {t.projectDetail.backToPortfolio}
          </Link>
        </div>
      </div>
    </article>
  );
}

export const ProjectFAQSection = FAQSectionComponent;
export const ProjectRelatedSection = RelatedSection;
export const ProjectAdjacentSection = AdjacentSection;
