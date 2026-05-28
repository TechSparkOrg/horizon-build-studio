import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const teamService = {
  getAll: () => dbQuery(() => prisma.teamMember.findMany({ orderBy: { order: "asc" } })),
  getById: (id: string) => dbQuery(() => prisma.teamMember.findUnique({ where: { id } })),
  create: (data: any) => dbMutate(() => prisma.teamMember.create({ data })),
  update: (id: string, data: any) => dbMutate(() => prisma.teamMember.update({ where: { id }, data })),
  delete: (id: string) => dbMutate(() => prisma.teamMember.delete({ where: { id } })),
};
