import { prisma } from "@/lib/db/db";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function makeUniqueProjectSlug(
  title: string,
  existingSlug?: string,
  excludeId?: string,
): Promise<string> {
  const slug = existingSlug?.trim() || toSlug(title) || "untitled";

  let candidate = slug;
  let n = 1;
  for (let i = 0; i < 100; i++) {
    const existing = await prisma.project.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${slug}-${n++}`;
  }
  return `${slug}-${Date.now()}`;
}
