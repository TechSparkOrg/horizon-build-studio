import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { FaqData } from "@/lib/services/types/faq.types";

export function getAll(): Promise<FaqData[]> {
  return dbQuery(() =>
    prisma.fAQ.findMany({
      orderBy: { order: "asc" },
      include: { faqType: true, category: true },
    }),
  ) as Promise<FaqData[]>;
}

export function getById(id: string): Promise<FaqData | null> {
  return dbQuery(() =>
    prisma.fAQ.findUnique({
      where: { id },
      include: { faqType: true, category: true },
    }),
  ) as Promise<FaqData | null>;
}

export function createFaq(data: Record<string, unknown>) {
  return dbMutate(() => prisma.fAQ.create({ data }));
}

export function updateFaq(id: string, data: Record<string, unknown>) {
  return dbMutate(() => prisma.fAQ.update({ where: { id }, data }));
}

export function deleteFaq(id: string) {
  return dbMutate(() => prisma.fAQ.delete({ where: { id } }));
}
