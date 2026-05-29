import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { SeoData } from "@/lib/services/types/seo.types";

export function getAll(): Promise<SeoData[]> {
  return dbQuery(() => prisma.pageSEO.findMany({ orderBy: { createdAt: "desc" } })) as Promise<SeoData[]>;
}

export function getById(id: string): Promise<SeoData | null> {
  return dbQuery(() => prisma.pageSEO.findUnique({ where: { id } })) as Promise<SeoData | null>;
}

export function upsert(body: Record<string, unknown>) {
  return dbMutate(async () => {
    const { id, slug, ...fields } = body;
    if (!slug) throw new Error("Slug is required");

    const data = {
      slug,
      title: fields.title ?? "",
      text1En: fields.text1En ?? "",
      text1Np: fields.text1Np ?? "",
      text2En: fields.text2En ?? "",
      text2Np: fields.text2Np ?? "",
      metaTitle: fields.metaTitle ?? "",
      metaDescription: fields.metaDescription ?? "",
      metaKeywords: fields.metaKeywords ?? "",
      ogImage: fields.ogImage ?? "",
      customScript: fields.customScript ?? "",
    };

    return id
      ? prisma.pageSEO.update({ where: { id }, data })
      : prisma.pageSEO.upsert({ where: { slug }, update: data, create: { ...data, slug: slug.trim() } });
  });
}

export function deleteSeo(id: string) {
  return dbMutate(() => prisma.pageSEO.delete({ where: { id } }));
}

export function getBySlug(slug: string): Promise<SeoData | null> {
  return dbQuery(() => prisma.pageSEO.findUnique({ where: { slug } })) as Promise<SeoData | null>;
}
