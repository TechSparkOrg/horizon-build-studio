import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { CategoryData } from "@/lib/services/types/category.types";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function getAll(): Promise<CategoryData[]> {
  return dbQuery(() => prisma.category.findMany({ orderBy: { order: "asc" } })) as Promise<CategoryData[]>;
}

export function getById(id: string) {
  return dbQuery(() => prisma.category.findUnique({ where: { id } }));
}

export function createCategory(data: Record<string, unknown>) {
  return dbMutate(() => {
    const slug = (data.slug as string) || toSlug(data.name as string);
    return prisma.category.create({ data: { ...data, slug } });
  });
}

export function updateCategory(id: string, data: Record<string, unknown>) {
  return dbMutate(() => {
    const slug = (data.slug as string) || (data.name ? toSlug(data.name as string) : undefined);
    return prisma.category.update({ where: { id }, data: slug ? { ...data, slug } : data });
  });
}

export function deleteCategory(id: string) {
  return dbMutate(() => prisma.category.delete({ where: { id } }));
}
