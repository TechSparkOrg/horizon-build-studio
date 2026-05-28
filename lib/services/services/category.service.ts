import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export const categoryService = {
  getAll: () =>
    dbQuery(() => prisma.category.findMany({ orderBy: { order: "asc" } })),
  getById: (id: string) =>
    dbQuery(() => prisma.category.findUnique({ where: { id } })),
  create: (data: any) =>
    dbMutate(() => {
      const slug = data.slug || toSlug(data.name);
      return prisma.category.create({ data: { ...data, slug } });
    }),
  update: (id: string, data: any) =>
    dbMutate(() => {
      const slug = data.slug || (data.name ? toSlug(data.name) : undefined);
      return prisma.category.update({ where: { id }, data: slug ? { ...data, slug } : data });
    }),
  delete: (id: string) =>
    dbMutate(() => prisma.category.delete({ where: { id } })),
};
