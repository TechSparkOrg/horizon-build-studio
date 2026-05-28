import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const modelService = {
  getAll: () =>
    dbQuery(() =>
      prisma.pageModel.findMany({
        orderBy: { createdAt: "desc" },
        include: { models3d: { orderBy: { order: "asc" } } },
      }),
    ),
  getBySlug: (slug: string) =>
    dbQuery(() =>
      prisma.pageModel.findUnique({
        where: { slug },
        include: { models3d: { orderBy: { order: "asc" } } },
      }),
    ),
  upsert: (body: any) =>
    dbMutate(async () => {
      const { id, slug, title, metaTitle, metaDescription, metaKeywords, customScript, models3d } = body;
      if (!slug) throw new Error("Slug is required");

      const result = await prisma.$transaction(async (tx) => {
        const m = id
          ? await tx.pageModel.update({ where: { id }, data: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" } })
          : await tx.pageModel.upsert({ where: { slug }, update: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" }, create: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" } });

        if (models3d && Array.isArray(models3d)) {
          await tx.pageModel3D.deleteMany({ where: { modelId: m.id } });
          if (models3d.length > 0) {
            await tx.pageModel3D.createMany({
              data: models3d.map((item: any, idx: number) => ({
                modelId: m.id,
                url: item.url,
                filename: item.filename ?? "",
                type: item.type ?? "glb",
                label: item.label ?? "",
                order: idx,
              })),
            });
          }
        }

        return tx.pageModel.findUnique({
          where: { id: m.id },
          include: { models3d: { orderBy: { order: "asc" } } },
        });
      });

      return result;
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.pageModel.delete({ where: { id } })),
};
