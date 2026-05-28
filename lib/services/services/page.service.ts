import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const pageService = {
  getAll: () =>
    dbQuery(() =>
      prisma.staticPage.findMany({ orderBy: { createdAt: "desc" } }),
    ),
  getBySlug: (slug: string) =>
    dbQuery(() => prisma.staticPage.findUnique({ where: { slug } })),
  upsert: (body: any) =>
    dbMutate(async () => {
      const { id, slug, title, contentEn, contentNp, metaTitle, metaDescription, metaKeywords, customScript } = body;
      if (!slug) throw new Error("Slug is required");

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
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.staticPage.delete({ where: { id } })),
};
