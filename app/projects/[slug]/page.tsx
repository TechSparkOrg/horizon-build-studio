import { Suspense } from "react";
import { notFound } from "next/navigation";
import { unstable_noStore } from "next/cache";
import { prisma } from "@/lib/db";
import { ProjectDetail, ProjectFAQSection, ProjectRelatedSection, ProjectAdjacentSection } from "@/components/sections/ProjectDetail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    select: { title: true, shortDescription: true },
  });
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

async function getFaqData(phaseFaqIds: (string | null)[], projectFaqIds: { faqId: string }[]) {
  const phaseIds = phaseFaqIds.filter((id): id is string => id !== null);
  const directIds = projectFaqIds.map((pf) => pf.faqId);
  const allIds = [...new Set([...phaseIds, ...directIds])];
  if (allIds.length === 0) return { faqs: [], faqTypes: [] };
  const faqs = await prisma.fAQ.findMany({
    where: { id: { in: allIds } },
    select: { id: true, question: true, answer: true, faqType: { select: { id: true, name: true, slug: true } } },
    orderBy: { order: "asc" },
  });
  const typeMap = new Map<string, { id: string; name: string; slug: string }>();
  faqs.forEach((f) => {
    if (f.faqType && !typeMap.has(f.faqType.id)) {
      typeMap.set(f.faqType.id, f.faqType);
    }
  });
  return { faqs, faqTypes: Array.from(typeMap.values()) };
}

async function getRelatedProjects(categoryId: string | null, excludeSlug: string) {
  if (!categoryId) return [];
  const related = await prisma.project.findMany({
    where: { categoryId, slug: { not: excludeSlug }, published: true },
    select: { title: true, slug: true, img: true, alt: true, category: { select: { name: true } }, location: true },
    orderBy: { order: "asc" },
    take: 3,
  });
  return related.map((p) => ({
    title: p.title,
    slug: p.slug,
    img: p.img,
    alt: p.alt,
    category: p.category?.name ?? null,
    location: p.location,
  }));
}

async function getAdjacentProjects(order: number) {
  const [prev, next] = await Promise.all([
    prisma.project.findFirst({
      where: { order: { lt: order }, published: true },
      orderBy: { order: "desc" },
      select: { title: true, slug: true },
    }),
    prisma.project.findFirst({
      where: { order: { gt: order }, published: true },
      orderBy: { order: "asc" },
      select: { title: true, slug: true },
    }),
  ]);
  return { prev, next };
}

// ── Streaming slot wrappers ──

async function FAQSlot({ phaseFaqIds, projectFaqIds }: { phaseFaqIds: (string | null)[]; projectFaqIds: { faqId: string }[] }) {
  const { faqs, faqTypes } = await getFaqData(phaseFaqIds, projectFaqIds);
  return <ProjectFAQSection faqs={faqs} faqTypes={faqTypes} />;
}

async function RelatedSlot({ categoryId, slug: excludeSlug }: { categoryId: string | null; slug: string }) {
  const related = await getRelatedProjects(categoryId, excludeSlug);
  if (related.length === 0) return null;
  return <ProjectRelatedSection related={related} />;
}

async function AdjacentSlot({ order, slug }: { order: number; slug: string }) {
  const adjacent = await getAdjacentProjects(order);
  return <ProjectAdjacentSection adjacent={adjacent} />;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  unstable_noStore();
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: {
      category: { select: { name: true, id: true } },
      media: { select: { id: true, url: true, alt: true, isHero: true, order: true }, orderBy: { order: "asc" } },
      videos: {
        select: { id: true, platform: true, sourceUrl: true, videoId: true, title: true, thumbnail: true, embedUrl: true, fileUrl: true, fileType: true, duration: true, isFeatured: true, order: true },
        orderBy: { order: "asc" },
      },
      models3d: { select: { id: true, filename: true, url: true, type: true }, orderBy: { createdAt: "asc" } },
      phases: {
        select: { id: true, title: true, description: true, completion: true, date: true, order: true, faqId: true, youtubeUrl: true, images: true, medias: { select: { id: true, type: true, url: true, message: true, referenceNo: true, order: true }, orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      },
      attributes: { select: { id: true, label: true, value: true, order: true }, orderBy: { order: "asc" } },
      projectFaqs: { select: { faqId: true }, orderBy: { order: "asc" } },
    },
  });

  if (!project) notFound();

  return (
    <ProjectDetail
      project={{
        title: project.title,
        slug: project.slug,
        description: project.description,
        shortDescription: project.shortDescription,
        category: project.category?.name ?? null,
        status: project.status,
        completion: project.completion,
        location: project.location,
        budget: project.budget,
        startDate: project.startDate,
        endDate: project.endDate,
        img: project.img,
        alt: project.alt,
        ownerName: project.ownerName,
        ownerProfession: project.ownerProfession,
        ownerEarning: project.ownerEarning,
        phases: project.phases,
        attributes: project.attributes,
        media: project.media,
        videos: project.videos,
        models3d: project.models3d,
      }}
      faqSlot={
        <Suspense fallback={<div className="h-32 bg-gray-50 rounded border border-gray-200 animate-pulse" />}>
          <FAQSlot phaseFaqIds={project.phases.map(p => p.faqId)} projectFaqIds={project.projectFaqs} />
        </Suspense>
      }
      relatedSlot={
        <Suspense fallback={null}>
          <RelatedSlot categoryId={project.category?.id ?? null} slug={slug} />
        </Suspense>
      }
      adjacentSlot={
        <Suspense fallback={null}>
          <AdjacentSlot order={project.order} slug={slug} />
        </Suspense>
      }
    />
  );
}
