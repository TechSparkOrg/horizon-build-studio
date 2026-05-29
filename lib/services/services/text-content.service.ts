import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export interface TextContentData {
  id: string;
  slug: string;
  label: string;
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
}

export function getAll(): Promise<TextContentData[]> {
  return dbQuery(() =>
    prisma.textContent.findMany({ orderBy: { updatedAt: "desc" } }),
  ) as Promise<TextContentData[]>;
}

export function getById(id: string): Promise<TextContentData | null> {
  return dbQuery(() => prisma.textContent.findUnique({ where: { id } })) as Promise<TextContentData | null>;
}

export function getBySlug(slug: string): Promise<TextContentData | null> {
  return dbQuery(() => prisma.textContent.findUnique({ where: { slug } })) as Promise<TextContentData | null>;
}

export function createTextContent(data: Record<string, unknown>) {
  return dbMutate(() => prisma.textContent.create({ data: data as any }));
}

export function updateTextContent(id: string, data: Record<string, unknown>) {
  return dbMutate(() => prisma.textContent.update({ where: { id }, data: data as any }));
}

export function deleteTextContent(id: string) {
  return dbMutate(() => prisma.textContent.delete({ where: { id } }));
}
