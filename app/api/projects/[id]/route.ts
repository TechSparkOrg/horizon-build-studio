import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { makeUniqueProjectSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { media: true, videos: true, models3d: true, phases: { include: { medias: true } }, projectFaqs: true, attributes: true, category: true },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { media, videos, models3d, phases, projectFaqs, attributes, ...fields } = body;

    if (!fields.title) fields.title = "Untitled Project";
    if (!fields.location) fields.location = "";
    const slug = await makeUniqueProjectSlug(fields.title, fields.slug, id);

    // Delete old relations (PhaseMedia cascades from ProjectPhase)
    await Promise.all([
      prisma.projectMedia.deleteMany({ where: { projectId: id } }),
      prisma.projectVideo.deleteMany({ where: { projectId: id } }),
      prisma.projectModel3D.deleteMany({ where: { projectId: id } }),
      prisma.phaseMedia.deleteMany({ where: { phase: { projectId: id } } }),
      prisma.projectPhase.deleteMany({ where: { projectId: id } }),
      prisma.projectFAQ.deleteMany({ where: { projectId: id } }),
      prisma.projectAttribute.deleteMany({ where: { projectId: id } }),
    ]);

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...fields,
        slug,
        categoryId: fields.categoryId || null,
        budget: fields.budget ? Number(fields.budget) : null,
        completion: Number(fields.completion ?? 0),
        order: Number(fields.order ?? 0),
        startDate: fields.startDate ? new Date(fields.startDate) : null,
        endDate: fields.endDate ? new Date(fields.endDate) : null,
        media: media?.length
          ? {
              create: media.map((m: { url: string; alt: string; isHero: boolean; order: number }) => ({
                url: m.url,
                alt: m.alt ?? "",
                type: "image",
                isHero: m.isHero ?? false,
                order: m.order ?? 0,
              })),
            }
          : undefined,
        videos: videos?.length
          ? {
              create: videos.map((v: { platform: string; sourceUrl: string; videoId: string; title: string; thumbnail: string; embedUrl: string; fileUrl: string; fileType: string; duration: string; isFeatured: boolean; order: number }) => ({
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
        models3d: models3d?.length
          ? {
              create: models3d.map((m: { filename: string; url: string; type: string }) => ({
                filename: m.filename,
                url: m.url,
                type: m.type ?? "glb",
              })),
            }
          : undefined,
        phases: phases?.length
          ? {
              create: phases.map((p: { title: string; description: string; completion: number; date: string | null; images: string[]; youtubeUrl: string; faqId: string | null; order: number; medias?: { type: string; url: string; message: string; referenceNo: string; order: number }[] }) => ({
                title: p.title,
                description: p.description ?? "",
                completion: p.completion ?? 0,
                date: p.date ? new Date(p.date) : null,
                images: p.images ?? [],
                youtubeUrl: p.youtubeUrl ?? "",
                faqId: p.faqId || null,
                order: p.order ?? 0,
                medias: p.medias?.length
                  ? {
                      create: p.medias.map((m: { type: string; url: string; message: string; referenceNo: string; order: number }) => ({
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
        projectFaqs: projectFaqs?.length
          ? {
              create: projectFaqs.map((pf: { faqId: string; order: number }) => ({
                faqId: pf.faqId,
                order: pf.order ?? 0,
              })),
            }
          : undefined,
        attributes: attributes?.length
          ? {
              create: attributes.map((a: { label: string; value: string; type: string; order: number }) => ({
                label: a.label,
                value: a.value ?? "",
                type: a.type ?? "text",
                order: a.order ?? 0,
              })),
            }
          : undefined,
      },
      include: { media: true, videos: true, models3d: true, phases: true, projectFaqs: true, attributes: true, category: true },
    });

    revalidatePath("/");
    return NextResponse.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
