import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
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

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const phaseFaqIds = project.phases.map((p) => p.faqId).filter((id): id is string => id !== null);
  const directIds = project.projectFaqs.map((pf) => pf.faqId);
  const allFaqIds = [...new Set([...phaseFaqIds, ...directIds])];

  const faqs = allFaqIds.length > 0
    ? await prisma.fAQ.findMany({
        where: { id: { in: allFaqIds } },
        select: { id: true, question: true, answer: true, faqType: { select: { id: true, name: true, slug: true } } },
        orderBy: { order: "asc" },
      })
    : [];

  const faqTypes = [...new Map(faqs.filter(f => f.faqType).map(f => [f.faqType!.id, f.faqType!]))].values();

  const related = project.category?.id
    ? await prisma.project.findMany({
        where: { categoryId: project.category.id, slug: { not: slug }, published: true },
        select: { title: true, slug: true, img: true, alt: true, category: { select: { name: true } }, location: true },
        orderBy: { order: "asc" },
        take: 3,
      })
    : [];

  const [prev, next] = await Promise.all([
    prisma.project.findFirst({
      where: { order: { lt: project.order }, published: true },
      orderBy: { order: "desc" },
      select: { title: true, slug: true },
    }),
    prisma.project.findFirst({
      where: { order: { gt: project.order }, published: true },
      orderBy: { order: "asc" },
      select: { title: true, slug: true },
    }),
  ]);

  return NextResponse.json({
    project,
    faqs,
    faqTypes: [...faqTypes],
    related: related.map((p) => ({
      title: p.title,
      slug: p.slug,
      img: p.img,
      alt: p.alt,
      category: p.category?.name ?? null,
      location: p.location,
    })),
    adjacent: { prev, next },
  });
}
