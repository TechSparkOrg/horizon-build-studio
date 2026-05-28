import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

function pickNews(raw: any) {
  const { title, slug, excerpt, contentEn, contentNp, category, image, alt, publishedAt, featured, projectId, metaTitle, metaDescription, metaKeywords, customScript } = raw ?? {};
  return {
    title: typeof title === "string" ? title : "",
    slug: typeof slug === "string" ? slug : undefined,
    excerpt: typeof excerpt === "string" ? excerpt : "",
    contentEn: typeof contentEn === "string" ? contentEn : "",
    contentNp: typeof contentNp === "string" ? contentNp : "",
    category: typeof category === "string" ? category : "",
    image: typeof image === "string" ? image : "",
    alt: typeof alt === "string" ? alt : "",
    publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    featured: featured === true,
    projectId: typeof projectId === "string" ? projectId : null,
    metaTitle: typeof metaTitle === "string" ? metaTitle : "",
    metaDescription: typeof metaDescription === "string" ? metaDescription : "",
    metaKeywords: typeof metaKeywords === "string" ? metaKeywords : "",
    customScript: typeof customScript === "string" ? customScript : "",
  };
}

export const newsService = {
  getAll: () =>
    dbQuery(() =>
      prisma.newsArticle.findMany({
        orderBy: { publishedAt: "desc" },
        include: { project: { select: { id: true, title: true, slug: true } } },
      }),
    ),
  getBySlug: (slug: string) =>
    dbQuery(() =>
      prisma.newsArticle.findUnique({
        where: { slug },
        include: {
          project: {
            select: {
              id: true, title: true, slug: true, status: true, location: true,
              img: true, alt: true, completion: true,
              models3d: { select: { id: true, url: true, filename: true } },
              videos: { select: { id: true, platform: true, embedUrl: true, fileUrl: true, fileType: true, title: true } },
            },
          },
        },
      }),
    ),
  getById: (id: string) =>
    dbQuery(() => prisma.newsArticle.findUnique({ where: { id } })),
  create: (raw: unknown) =>
    dbMutate(() => {
      const data = pickNews(raw);
      const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
      return prisma.newsArticle.create({ data: { ...data, slug } });
    }),
  update: (id: string, raw: unknown) =>
    dbMutate(() => {
      const data = pickNews(raw);
      return prisma.newsArticle.update({ where: { id }, data });
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.newsArticle.delete({ where: { id } })),
};
