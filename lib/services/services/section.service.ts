import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { SectionContentData, SectionDefData } from "@/lib/services/types/section.types";

export function getBySection(section: string): Promise<SectionContentData[]> {
  return dbQuery(() =>
    prisma.sectionContent.findMany({
      where: { section },
      orderBy: { order: "asc" },
    }),
  ) as Promise<SectionContentData[]>;
}

export function getAll(): Promise<SectionContentData[]> {
  return dbQuery(() =>
    prisma.sectionContent.findMany({ orderBy: { order: "asc" } }),
  ) as Promise<SectionContentData[]>;
}

export interface UpsertItem {
  key: string; valueEn: string; valueNp: string;
  mediaUrl?: string | null; mediaType?: string | null; order?: number;
}

export function upsertItems(section: string, items: UpsertItem[]) {
  return dbMutate(async () => {
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
  });
}

// ── SectionDef ──

export function getAllSectionDefs(): Promise<SectionDefData[]> {
  return dbQuery(() => prisma.sectionDef.findMany({ orderBy: { order: "asc" } })) as Promise<SectionDefData[]>;
}

export function createSectionDef(data: Record<string, unknown>) {
  return dbMutate(() => prisma.sectionDef.create({ data }));
}

export function deleteSectionDef(id: string) {
  return dbMutate(() => prisma.sectionDef.delete({ where: { id } }));
}
