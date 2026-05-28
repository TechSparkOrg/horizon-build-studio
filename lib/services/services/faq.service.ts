import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const faqService = {
  getAll: () =>
    dbQuery(() =>
      prisma.fAQ.findMany({
        orderBy: { order: "asc" },
        include: { faqType: true, category: true },
      }),
    ),
  getById: (id: string) =>
    dbQuery(() =>
      prisma.fAQ.findUnique({
        where: { id },
        include: { faqType: true, category: true },
      }),
    ),
  create: (data: any) =>
    dbMutate(() => prisma.fAQ.create({ data })),
  update: (id: string, data: any) =>
    dbMutate(() => prisma.fAQ.update({ where: { id }, data })),
  delete: (id: string) =>
    dbMutate(() => prisma.fAQ.delete({ where: { id } })),
};
