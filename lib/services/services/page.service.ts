import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { StaticPageData } from "@/lib/services/types/page.types";

export function getAll(): Promise<StaticPageData[]> {
  return dbQuery(() =>
    prisma.staticPage.findMany({ orderBy: { createdAt: "desc" } }),
  ) as Promise<StaticPageData[]>;
}

export function getBySlug(slug: string): Promise<StaticPageData | null> {
  return dbQuery(() => prisma.staticPage.findUnique({ where: { slug } })) as Promise<StaticPageData | null>;
}

export function upsert(body: Record<string, unknown>) {
  return dbMutate(async () => {
      const { id, slug, title, contentEn, contentNp, metaTitle, metaDescription, metaKeywords, customScript } = body as Record<string, unknown>;
      if (!slug || typeof slug !== "string") throw new Error("Slug is required");

    const data = {
      slug,
      title: title ?? "",
      contentEn: contentEn ?? "",
      contentNp: contentNp ?? "",
      metaTitle: metaTitle ?? "",
      metaDescription: metaDescription ?? "",
      metaKeywords: metaKeywords ?? "",
      customScript: customScript ?? "",
    };

    return id
      ? prisma.staticPage.update({ where: { id }, data })
      : prisma.staticPage.upsert({ where: { slug }, update: data, create: { ...data, slug: slug.trim() } });
  });
}

export function deletePage(id: string) {
  return dbMutate(() => prisma.staticPage.delete({ where: { id } }));
}
