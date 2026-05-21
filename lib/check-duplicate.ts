import { prisma } from "@/lib/db";

export async function checkDuplicateProject(
  title: string,
  excludeId?: string,
): Promise<{ isDuplicate: boolean; existing: { id: string; title: string; slug: string } | null }> {
  const existing = await prisma.project.findFirst({
    where: {
      title: { equals: title, mode: "insensitive" },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true, title: true, slug: true },
  });
  return {
    isDuplicate: !!existing,
    existing,
  };
}

export async function checkDuplicateSlug(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const existing = await prisma.project.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });
  return !!existing;
}
