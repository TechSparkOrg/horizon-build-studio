import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const bannerService = {
  getAll: () =>
    dbQuery(() =>
      prisma.pageBanner.findMany({
        orderBy: { createdAt: "desc" },
        include: { images: { orderBy: { order: "asc" } } },
      }),
    ),
  getBySlug: (slug: string) =>
    dbQuery(() =>
      prisma.pageBanner.findUnique({
        where: { slug },
        include: { images: { orderBy: { order: "asc" } } },
      }),
    ),
  upsert: (body: any) =>
    dbMutate(async () => {
      const { id, slug, title, metaTitle, metaDescription, metaKeywords, customScript, images } = body;
      if (!slug) throw new Error("Slug is required");

      const banner = await prisma.$transaction(async (tx) => {
        const b = id
          ? await tx.pageBanner.update({ where: { id }, data: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" } })
          : await tx.pageBanner.upsert({ where: { slug }, update: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" }, create: { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" } });

        if (images && Array.isArray(images)) {
          await tx.pageBannerImage.deleteMany({ where: { bannerId: b.id } });
          if (images.length > 0) {
            await tx.pageBannerImage.createMany({
              data: images.map((img: any, idx: number) => ({
                bannerId: b.id,
                image: img.image,
                alt: img.alt ?? "",
                order: idx,
              })),
            });
          }
        }

        return tx.pageBanner.findUnique({
          where: { id: b.id },
          include: { images: { orderBy: { order: "asc" } } },
        });
      });

      return banner;
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.pageBanner.delete({ where: { id } })),
};
