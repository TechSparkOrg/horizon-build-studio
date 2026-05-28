import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const seoService = {
  getAll: () =>
    dbQuery(() => prisma.pageSEO.findMany({ orderBy: { createdAt: "desc" } })),
  getById: (id: string) =>
    dbQuery(() => prisma.pageSEO.findUnique({ where: { id } })),
  upsert: (body: any) =>
    dbMutate(async () => {
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
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.pageSEO.delete({ where: { id } })),
  getBySlug: (slug: string) =>
    dbQuery(() => prisma.pageSEO.findUnique({ where: { slug } })),
};
