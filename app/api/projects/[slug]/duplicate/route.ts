import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { makeUniqueProjectSlug } from "@/lib/slug";

export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: projectId } = await params;

    const source = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        media: true,
        videos: true,
        models3d: true,
        phases: { include: { medias: true }, orderBy: { order: "asc" } },
        projectFaqs: true,
        attributes: { orderBy: { order: "asc" } },
      },
    });

    if (!source) {
      return NextResponse.json({ error: "Source project not found" }, { status: 404 });
    }

    const newTitle = `${source.title} (Copy)`;
    const slug = await makeUniqueProjectSlug(newTitle);

    const project = await prisma.project.create({
      data: {
        title: newTitle,
        slug,
        description: source.description ?? "",
        shortDescription: source.shortDescription ?? "",
        status: source.status ?? "planning",
        completion: 0,
        location: source.location ?? "",
        budget: source.budget,
        startDate: source.startDate,
        endDate: source.endDate,
        img: source.img ?? "",
        alt: source.alt ?? "",
        featured: false,
        published: false,
        order: 0,
        ownerName: source.ownerName ?? "",
        ownerProfession: source.ownerProfession ?? "",
        ownerEarning: source.ownerEarning ?? "",
        categoryId: source.categoryId,
        media: source.media.length
          ? {
              create: source.media.map((m) => ({
                url: m.url,
                alt: m.alt ?? "",
                type: m.type ?? "image",
                isHero: m.isHero ?? false,
                order: m.order ?? 0,
              })),
            }
          : undefined,
        videos: source.videos.length
          ? {
              create: source.videos.map((v) => ({
                platform: v.platform ?? "youtube",
                sourceUrl: v.sourceUrl ?? "",
                videoId: v.videoId ?? "",
                title: v.title ?? "",
                thumbnail: v.thumbnail ?? "",
                embedUrl: v.embedUrl ?? "",
                fileUrl: v.fileUrl ?? "",
                fileType: v.fileType ?? "",
                duration: v.duration ?? "",
                isFeatured: v.isFeatured ?? false,
                order: v.order ?? 0,
              })),
            }
          : undefined,
        models3d: source.models3d.length
          ? {
              create: source.models3d.map((m) => ({
                filename: m.filename,
                url: m.url,
                type: m.type ?? "glb",
              })),
            }
          : undefined,
        phases: source.phases.length
          ? {
              create: source.phases.map((p) => ({
                title: p.title,
                description: p.description ?? "",
                completion: p.completion ?? 0,
                date: p.date,
                images: p.images ?? [],
                youtubeUrl: p.youtubeUrl ?? "",
                faqId: p.faqId,
                order: p.order ?? 0,
                medias: p.medias?.length
                  ? {
                      create: p.medias.map((m) => ({
                        type: m.type,
                        url: m.url,
                        message: m.message ?? "",
                        referenceNo: m.referenceNo ?? "",
                        order: m.order ?? 0,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,
        projectFaqs: source.projectFaqs.length
          ? {
              create: source.projectFaqs.map((pf) => ({
                faqId: pf.faqId,
                order: pf.order ?? 0,
              })),
            }
          : undefined,
        attributes: source.attributes.length
          ? {
              create: source.attributes.map((a) => ({
                label: a.label,
                value: a.value ?? "",
                type: a.type ?? "text",
                order: a.order ?? 0,
              })),
            }
          : undefined,
      },
      select: { id: true, slug: true, title: true },
    });

    revalidatePath("/");
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Duplicate project error:", error);
    return NextResponse.json({ error: "Failed to duplicate project" }, { status: 500 });
  }
}
