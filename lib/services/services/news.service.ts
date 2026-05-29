import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { NewsListItem, NewsDetail } from "@/lib/services/types/news.types";
import type { PaginatedResult } from "@/lib/services/types/shared.types";

interface NewsFieldData {
  title: string;
  slug?: string;
  excerpt: string;
  contentEn: string;
  contentNp: string;
  category: string;
  image: string;
  alt: string;
  publishedAt: Date;
  featured: boolean;
  projectId: string | null;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
}

function pickNews(raw: unknown): NewsFieldData {
  const rec = raw as Record<string, unknown>;
  const title = typeof rec.title === "string" ? rec.title : "";
  const slug = typeof rec.slug === "string" ? rec.slug : undefined;
  const excerpt = typeof rec.excerpt === "string" ? rec.excerpt : "";
  const contentEn = typeof rec.contentEn === "string" ? rec.contentEn : "";
  const contentNp = typeof rec.contentNp === "string" ? rec.contentNp : "";
  const category = typeof rec.category === "string" ? rec.category : "";
  const image = typeof rec.image === "string" ? rec.image : "";
  const alt = typeof rec.alt === "string" ? rec.alt : "";
  const publishedAt = rec.publishedAt ? new Date(rec.publishedAt as string) : new Date();
  const featured = rec.featured === true;
  const projectId = typeof rec.projectId === "string" ? rec.projectId : null;
  const metaTitle = typeof rec.metaTitle === "string" ? rec.metaTitle : "";
  const metaDescription = typeof rec.metaDescription === "string" ? rec.metaDescription : "";
  const metaKeywords = typeof rec.metaKeywords === "string" ? rec.metaKeywords : "";
  const customScript = typeof rec.customScript === "string" ? rec.customScript : "";
  return { title, slug, excerpt, contentEn, contentNp, category, image, alt, publishedAt, featured, projectId, metaTitle, metaDescription, metaKeywords, customScript };
}

export function getAll(page = 1, limit = 100): Promise<PaginatedResult<NewsListItem>> {
  return dbQuery(async () => {
    const skip = page > 1 ? (page - 1) * limit : 0;
    const [items, total] = await Promise.all([
      prisma.newsArticle.findMany({
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
        include: { project: { select: { id: true, title: true, slug: true } } },
      }),
      prisma.newsArticle.count(),
    ]);
    return { items: items as unknown as NewsListItem[], total, page, limit };
  });
}

export function getBySlug(slug: string): Promise<NewsDetail | null> {
  return dbQuery(() =>
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
  ) as Promise<NewsDetail | null>;
}

export function getById(id: string) {
  return dbQuery(() => prisma.newsArticle.findUnique({ where: { id } }));
}

export function createNews(raw: unknown) {
  return dbMutate(() => {
    const data = pickNews(raw);
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    return prisma.newsArticle.create({ data: { ...data, slug } });
  });
}

export function updateNews(id: string, raw: unknown) {
  return dbMutate(() => {
    const data = pickNews(raw);
    return prisma.newsArticle.update({ where: { id }, data });
  });
}

export function deleteNews(id: string) {
  return dbMutate(() => prisma.newsArticle.delete({ where: { id } }));
}
