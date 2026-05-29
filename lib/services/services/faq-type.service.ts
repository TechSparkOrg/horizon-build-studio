import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { FaqTypeData } from "@/lib/services/types/faq.types";

export function getAll(): Promise<FaqTypeData[]> {
  return dbQuery(() => prisma.fAQType.findMany({ orderBy: { order: "asc" } })) as Promise<FaqTypeData[]>;
}

export function getById(id: string): Promise<FaqTypeData | null> {
  return dbQuery(() => prisma.fAQType.findUnique({ where: { id } })) as Promise<FaqTypeData | null>;
}

export function createFaqType(data: Record<string, unknown>) {
  return dbMutate(() => prisma.fAQType.create({ data }));
}

export function updateFaqType(id: string, data: Record<string, unknown>) {
  return dbMutate(() => prisma.fAQType.update({ where: { id }, data }));
}

export function deleteFaqType(id: string) {
  return dbMutate(() => prisma.fAQType.delete({ where: { id } }));
}
