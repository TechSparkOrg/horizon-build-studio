import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const testimonialService = {
  getAll: () => dbQuery(() => prisma.testimonial.findMany({ orderBy: { order: "asc" } })),
  getById: (id: string) => dbQuery(() => prisma.testimonial.findUnique({ where: { id } })),
  create: (data: any) => dbMutate(() => prisma.testimonial.create({ data })),
  update: (id: string, data: any) => dbMutate(() => prisma.testimonial.update({ where: { id }, data })),
  delete: (id: string) => dbMutate(() => prisma.testimonial.delete({ where: { id } })),
};
