import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { PageModelData } from "@/lib/services/types/model.types";

export function getAll(): Promise<PageModelData[]> {
  return dbQuery(() =>
    prisma.pageModel.findMany({
      orderBy: { createdAt: "desc" },
      include: { models3d: { orderBy: { order: "asc" } } },
    }),
  ) as Promise<PageModelData[]>;
}

export function getBySlug(slug: string): Promise<PageModelData | null> {
  return dbQuery(() =>
    prisma.pageModel.findUnique({
      where: { slug },
      include: { models3d: { orderBy: { order: "asc" } } },
    }),
  ) as Promise<PageModelData | null>;
}

export function upsert(body: Record<string, unknown>) {
  return dbMutate(async () => {
      const { id, slug, title, metaTitle, metaDescription, metaKeywords, customScript, models3d } = body as Record<string, unknown>;
      if (!slug || typeof slug !== "string") throw new Error("Slug is required");

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
  });
}

export function deleteModel(id: string) {
  return dbMutate(() => prisma.pageModel.delete({ where: { id } }));
}
