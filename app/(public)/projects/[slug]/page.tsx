import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache-config";
import { projectService } from "@/lib/services/services/project.service";
import { ProjectPageSchema, type ProjectPage } from "@/lib/schemas";

const ProjectDetail = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectDetail));
const ProjectFAQSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectFAQSection));
const ProjectRelatedSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectRelatedSection));
const ProjectAdjacentSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectAdjacentSection));

export async function generateStaticParams() {
  try {
    const all = await projectService.getAll() as any[];
    if (all.length > 0) return all.map((p: any) => ({ slug: p.slug }));
  } catch {
    /* empty */
  }
  return [{ slug: "__placeholder__" }];
}

async function getRawData(slug: string) {
  try {
    const raw = await projectService.getBySlug(slug) as unknown;
    return ProjectPageSchema.safeParse(raw);
  } catch {
    return { success: false as const };
  }
}

async function getData(slug: string) {
  "use cache";
  cacheLife(CACHE_TTL[CACHE_TAGS.PROJECTS]);
  cacheTag(CACHE_TAGS.PROJECTS);
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
