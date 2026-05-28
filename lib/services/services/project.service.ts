import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import { makeUniqueProjectSlug } from "@/lib/slug";

type ProjectFields = {
  title?: string; slug?: string; description?: string; shortDescription?: string;
  categoryId?: string | null; status?: string; completion?: number; location?: string;
  budget?: number | null; startDate?: string | null; endDate?: string | null;
  img?: string; alt?: string; featured?: boolean; published?: boolean; order?: number;
  ownerName?: string; ownerProfession?: string; ownerEarning?: string;
  metaTitle?: string; metaDescription?: string; metaKeywords?: string; customScript?: string;
  media?: any[]; videos?: any[]; models3d?: any[]; phases?: any[]; projectFaqs?: any[]; attributes?: any[];
};

function pickFields(raw: any): ProjectFields {
  const {
    title, slug, description, shortDescription, categoryId, status,
    completion, location, budget, startDate, endDate, img, alt,
    featured, published, order, ownerName, ownerProfession, ownerEarning,
    metaTitle, metaDescription, metaKeywords, customScript,
    media, videos, models3d, phases, projectFaqs, attributes,
  } = raw ?? {};

  return {
    title: typeof title === "string" ? title : "",
    slug: typeof slug === "string" ? slug : undefined,
    description: typeof description === "string" ? description : "",
    shortDescription: typeof shortDescription === "string" ? shortDescription : "",
    categoryId: typeof categoryId === "string" ? categoryId : null,
    status: typeof status === "string" ? status : "planning",
    completion: typeof completion === "number" ? completion : 0,
    location: typeof location === "string" ? location : "",
    budget: budget != null && !isNaN(Number(budget)) ? Number(budget) : null,
    startDate: typeof startDate === "string" ? startDate : null,
    endDate: typeof endDate === "string" ? endDate : null,
    img: typeof img === "string" ? img : "",
    alt: typeof alt === "string" ? alt : "",
    featured: featured === true,
    published: published !== false,
    order: typeof order === "number" ? order : 0,
    ownerName: typeof ownerName === "string" ? ownerName : "",
    ownerProfession: typeof ownerProfession === "string" ? ownerProfession : "",
    ownerEarning: typeof ownerEarning === "string" ? ownerEarning : "",
    metaTitle: typeof metaTitle === "string" ? metaTitle : "",
    metaDescription: typeof metaDescription === "string" ? metaDescription : "",
    metaKeywords: typeof metaKeywords === "string" ? metaKeywords : "",
    customScript: typeof customScript === "string" ? customScript : "",
    media: Array.isArray(media) ? media : [],
    videos: Array.isArray(videos) ? videos : [],
    models3d: Array.isArray(models3d) ? models3d : [],
    phases: Array.isArray(phases) ? phases : [],
    projectFaqs: Array.isArray(projectFaqs) ? projectFaqs : [],
    attributes: Array.isArray(attributes) ? attributes : [],
  };
}

function buildProjectData(fields: ProjectFields, slug: string) {
  return {
    title: fields.title || "Untitled Project",
    slug,
    description: fields.description ?? "",
    shortDescription: fields.shortDescription ?? "",
    categoryId: fields.categoryId || null,
    status: fields.status || "planning",
    completion: Number(fields.completion ?? 0),
    location: fields.location ?? "",
    budget: fields.budget ? Number(fields.budget) : null,
    startDate: fields.startDate ? new Date(fields.startDate) : null,
    endDate: fields.endDate ? new Date(fields.endDate) : null,
    img: fields.img ?? "",
    alt: fields.alt ?? "",
    featured: fields.featured ?? false,
    published: fields.published ?? true,
    order: Number(fields.order ?? 0),
    ownerName: fields.ownerName ?? "",
    ownerProfession: fields.ownerProfession ?? "",
    ownerEarning: fields.ownerEarning ?? "",
    metaTitle: fields.metaTitle ?? "",
    metaDescription: fields.metaDescription ?? "",
    metaKeywords: fields.metaKeywords ?? "",
    customScript: fields.customScript ?? "",
  };
}

export const projectService = {
  search: (params: { q?: string; status?: string; category?: string; page?: number; limit?: number }) =>
    dbQuery(async () => {
      const { q, status, category, page = 1, limit = 100 } = params;
      const where: Record<string, unknown> = {};
      if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }];
      if (status) where.status = status;
      if (category) where.categoryId = category;

      const [projects, total, categories] = await Promise.all([
        prisma.project.findMany({
          where: where as any,
          orderBy: { order: "asc" },
          skip: page > 1 ? (page - 1) * limit : 0,
          take: limit,
          include: { category: { select: { id: true, name: true } } },
        }),
        prisma.project.count({ where: where as any }),
        prisma.category.findMany({ orderBy: { order: "asc" } }),
      ]);

      return { items: projects, total, page, limit, categories };
    }),
  getAll: () =>
    dbQuery(() =>
      prisma.project.findMany({
        orderBy: { order: "asc" },
        include: { category: { select: { id: true, name: true } } },
      }),
    ),
  getBySlug: (slug: string) =>
    dbQuery(() =>
      prisma.project.findUnique({
        where: { slug },
        include: {
          media: true,
          videos: true,
          models3d: true,
          phases: { include: { medias: true } },
          projectFaqs: true,
          attributes: true,
          category: true,
        },
      }),
    ),
  getById: (id: string) =>
    dbQuery(() =>
      prisma.project.findUnique({
        where: { id },
        include: {
          media: true,
          videos: true,
          models3d: true,
          phases: { include: { medias: true } },
          projectFaqs: true,
          attributes: true,
          category: true,
        },
      }),
    ),
  create: (body: unknown) =>
    dbMutate(async () => {
      const fields = pickFields(body);
      if (!fields.title) fields.title = "Untitled Project";
      const slug = await makeUniqueProjectSlug(fields.title, fields.slug);

      return prisma.project.create({
        data: {
          ...buildProjectData(fields, slug),
          media: fields.media?.length ? { create: fields.media.map((m: any) => ({ url: m.url, alt: m.alt ?? "", type: "image", isHero: m.isHero ?? false, order: m.order ?? 0 })) } : undefined,
          videos: fields.videos?.length ? { create: fields.videos.map((v: any) => ({ platform: v.platform ?? "youtube", sourceUrl: v.sourceUrl ?? "", videoId: v.videoId ?? "", title: v.title ?? "", thumbnail: v.thumbnail ?? "", embedUrl: v.embedUrl ?? "", fileUrl: v.fileUrl ?? "", fileType: v.fileType ?? "", duration: v.duration ?? "", isFeatured: v.isFeatured ?? false, order: v.order ?? 0 })) } : undefined,
          models3d: fields.models3d?.length ? { create: fields.models3d.map((m: any) => ({ filename: m.filename, url: m.url, type: m.type ?? "glb" })) } : undefined,
          phases: fields.phases?.length ? { create: fields.phases.map((p: any) => ({ title: p.title, description: p.description ?? "", completion: p.completion ?? 0, date: p.date ? new Date(p.date) : null, images: p.images ?? [], youtubeUrl: p.youtubeUrl ?? "", faqId: p.faqId || null, order: p.order ?? 0, medias: p.medias?.length ? { create: p.medias.map((m: any) => ({ type: m.type, url: m.url, message: m.message ?? "", referenceNo: m.referenceNo ?? "", order: m.order ?? 0 })) } : undefined })) } : undefined,
          projectFaqs: fields.projectFaqs?.length ? { create: fields.projectFaqs.map((pf: any) => ({ faqId: pf.faqId, order: pf.order ?? 0 })) } : undefined,
          attributes: fields.attributes?.length ? { create: fields.attributes.map((a: any) => ({ label: a.label, value: a.value ?? "", type: a.type ?? "text", order: a.order ?? 0 })) } : undefined,
        },
        include: { media: true, videos: true, models3d: true, phases: true, projectFaqs: true, attributes: true, category: true },
      });
    }),
  update: (id: string, body: unknown) =>
    dbMutate(async () => {
      const fields = pickFields(body);
      if (!fields.title) fields.title = "Untitled Project";
      const slug = await makeUniqueProjectSlug(fields.title, fields.slug, id);

      await prisma.$transaction([
        prisma.projectMedia.deleteMany({ where: { projectId: id } }),
        prisma.projectVideo.deleteMany({ where: { projectId: id } }),
        prisma.projectModel3D.deleteMany({ where: { projectId: id } }),
        prisma.phaseMedia.deleteMany({ where: { phase: { projectId: id } } }),
        prisma.projectPhase.deleteMany({ where: { projectId: id } }),
        prisma.projectFAQ.deleteMany({ where: { projectId: id } }),
        prisma.projectAttribute.deleteMany({ where: { projectId: id } }),
      ]);

      return prisma.project.update({
        where: { id },
        data: {
          ...buildProjectData(fields, slug),
          media: fields.media?.length ? { create: fields.media.map((m: any) => ({ url: m.url, alt: m.alt ?? "", type: "image", isHero: m.isHero ?? false, order: m.order ?? 0 })) } : undefined,
          videos: fields.videos?.length ? { create: fields.videos.map((v: any) => ({ platform: v.platform ?? "youtube", sourceUrl: v.sourceUrl ?? "", videoId: v.videoId ?? "", title: v.title ?? "", thumbnail: v.thumbnail ?? "", embedUrl: v.embedUrl ?? "", fileUrl: v.fileUrl ?? "", fileType: v.fileType ?? "", duration: v.duration ?? "", isFeatured: v.isFeatured ?? false, order: v.order ?? 0 })) } : undefined,
          models3d: fields.models3d?.length ? { create: fields.models3d.map((m: any) => ({ filename: m.filename, url: m.url, type: m.type ?? "glb" })) } : undefined,
          phases: fields.phases?.length ? { create: fields.phases.map((p: any) => ({ title: p.title, description: p.description ?? "", completion: p.completion ?? 0, date: p.date ? new Date(p.date) : null, images: p.images ?? [], youtubeUrl: p.youtubeUrl ?? "", faqId: p.faqId || null, order: p.order ?? 0, medias: p.medias?.length ? { create: p.medias.map((m: any) => ({ type: m.type, url: m.url, message: m.message ?? "", referenceNo: m.referenceNo ?? "", order: m.order ?? 0 })) } : undefined })) } : undefined,
          projectFaqs: fields.projectFaqs?.length ? { create: fields.projectFaqs.map((pf: any) => ({ faqId: pf.faqId, order: pf.order ?? 0 })) } : undefined,
          attributes: fields.attributes?.length ? { create: fields.attributes.map((a: any) => ({ label: a.label, value: a.value ?? "", type: a.type ?? "text", order: a.order ?? 0 })) } : undefined,
        },
        include: { media: true, videos: true, models3d: true, phases: true, projectFaqs: true, attributes: true, category: true },
      });
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.project.delete({ where: { id } })),
};
