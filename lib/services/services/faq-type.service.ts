import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const faqTypeService = {
  getAll: () =>
    dbQuery(() => prisma.fAQType.findMany({ orderBy: { order: "asc" } })),
  getById: (id: string) =>
    dbQuery(() => prisma.fAQType.findUnique({ where: { id } })),
  create: (data: any) =>
    dbMutate(() => prisma.fAQType.create({ data })),
  update: (id: string, data: any) =>
    dbMutate(() => prisma.fAQType.update({ where: { id }, data })),
  delete: (id: string) =>
    dbMutate(() => prisma.fAQType.delete({ where: { id } })),
};
