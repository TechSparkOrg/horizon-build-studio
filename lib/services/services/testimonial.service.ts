import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { TestimonialData } from "@/lib/services/types/testimonial.types";

export function getAll(): Promise<TestimonialData[]> {
  return dbQuery(() => prisma.testimonial.findMany({ orderBy: { order: "asc" } })) as Promise<TestimonialData[]>;
}

export function getById(id: string): Promise<TestimonialData | null> {
  return dbQuery(() => prisma.testimonial.findUnique({ where: { id } })) as Promise<TestimonialData | null>;
}

export function createTestimonial(data: Record<string, unknown>) {
  return dbMutate(() => prisma.testimonial.create({ data }));
}

export function updateTestimonial(id: string, data: Record<string, unknown>) {
  return dbMutate(() => prisma.testimonial.update({ where: { id }, data }));
}

export function deleteTestimonial(id: string) {
  return dbMutate(() => prisma.testimonial.delete({ where: { id } }));
}
