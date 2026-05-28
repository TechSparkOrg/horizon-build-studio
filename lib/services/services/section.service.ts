import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const sectionService = {
  getBySection: (section: string) =>
    dbQuery(() =>
      prisma.sectionContent.findMany({
        where: { section },
        orderBy: { order: "asc" },
      }),
    ),
  getAll: () =>
    dbQuery(() =>
      prisma.sectionContent.findMany({ orderBy: { order: "asc" } }),
    ),
  upsertItems: (section: string, items: Array<{
    key: string; valueEn: string; valueNp: string;
    mediaUrl?: string | null; mediaType?: string | null; order?: number;
  }>) =>
    dbMutate(async () => {
      await prisma.$transaction(
        items.map((item) =>
          prisma.sectionContent.upsert({
            where: { section_key: { section, key: item.key } },
            update: {
              valueEn: item.valueEn,
              valueNp: item.valueNp,
              mediaUrl: item.mediaUrl ?? null,
              mediaType: item.mediaType ?? null,
              order: item.order ?? 0,
            },
            create: {
              section,
              key: item.key,
              valueEn: item.valueEn,
              valueNp: item.valueNp,
              mediaUrl: item.mediaUrl ?? null,
              mediaType: item.mediaType ?? null,
              order: item.order ?? 0,
            },
          }),
        ),
      );
    }),
};

export const sectionDefService = {
  getAll: () =>
    dbQuery(() => prisma.sectionDef.findMany({ orderBy: { order: "asc" } })),
  create: (data: any) =>
    dbMutate(() => prisma.sectionDef.create({ data })),
  delete: (id: string) =>
    dbMutate(() => prisma.sectionDef.delete({ where: { id } })),
};
