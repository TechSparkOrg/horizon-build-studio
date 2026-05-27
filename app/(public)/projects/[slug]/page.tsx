import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import { ProjectPageSchema, type ProjectPage } from "@/lib/schemas";
import { ProjectDetail, ProjectFAQSection, ProjectRelatedSection, ProjectAdjacentSection } from "@/components/sections/ProjectDetail";

export async function generateStaticParams() {
  try {
    const all = await api("/api/projects").get<any[]>();
    if (all.length > 0) return all.map((p: any) => ({ slug: p.slug }));
  } catch {}
  const { getText } = await import("@/lib/lang");
  const t = getText("en");
  return (t.listing.projects.items as any[]).map((p: any) => ({ slug: p.slug }));
}

async function getRawData(slug: string) {
  try {
    const raw = await api(`/api/projects/${slug}/page`).get<unknown>();
    return ProjectPageSchema.safeParse(raw);
  } catch {
    const { getText } = await import("@/lib/lang");
    const t = getText("en");
    const item = (t.listing.projects.items as any[]).find((p) => p.slug === slug);
    if (!item) return { success: false as const };
    const mock = {
      project: {
        id: item.id || slug,
        title: item.title,
        slug: item.slug,
        description: item.shortDescription || "",
        shortDescription: item.shortDescription || null,
        location: item.location || "",
        budget: item.budget || null,
        img: item.img || "",
        alt: item.alt || "",
        status: item.status || "planning",
        completion: item.completion || 0,
        featured: false,
        published: false,
        order: 0,
        ownerName: "",
        ownerProfession: null,
        ownerEarning: null,
        startDate: null,
        endDate: null,
        category: item.category || null,
        categoryId: null,
        media: [],
        videos: [],
        models3d: [],
        phases: [],
        attributes: [],
        projectFaqs: [],
      },
      faqs: [],
      faqTypes: [],
      related: [],
      adjacent: { prev: null, next: null },
    };
    return ProjectPageSchema.safeParse(mock);
  }
}

async function getData(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("projects");
  return getRawData(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const parsed = await getData(slug);
  if (!parsed.success) return { title: "Project Not Found" };
  return { title: parsed.data.project.title, description: parsed.data.project.shortDescription };
}

async function ProjectContent({ slug }: { slug: string }) {
  const parsed = await getData(slug);
  if (!parsed.success) notFound();

  const { project, faqs, faqTypes, related, adjacent } = parsed.data;

  return (
    <ProjectDetail
      project={{
        title: project.title,
        slug: project.slug,
        description: project.description,
        shortDescription: project.shortDescription ?? "",
        category: project.category?.name ?? null,
        status: project.status,
        completion: project.completion,
        location: project.location,
        budget: project.budget,
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        img: project.img,
        alt: project.alt,
        ownerName: project.ownerName,
        ownerProfession: project.ownerProfession,
        ownerEarning: project.ownerEarning,
        phases: project.phases.map(p => ({
          id: p.id, title: p.title, description: p.description,
          completion: p.completion, date: p.date ? new Date(p.date) : null,
          order: p.order, faqId: p.faqId,
          youtubeUrl: p.youtubeUrl ?? undefined,
          images: p.images ?? undefined,
          medias: p.medias,
        })),
        attributes: project.attributes,
        media: project.media,
        videos: project.videos,
        models3d: project.models3d,
      }}
      faqSlot={<ProjectFAQSection faqs={faqs} faqTypes={faqTypes} />}
      relatedSlot={related.length > 0 ? <ProjectRelatedSection related={related} /> : null}
      adjacentSlot={<ProjectAdjacentSection adjacent={adjacent} />}
    />
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProjectContent slug={slug} />
    </Suspense>
  );
}
