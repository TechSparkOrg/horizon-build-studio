import { prisma } from "@/lib/db";
import { ProjectsClient } from "./client";


export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; category?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const status = sp.status ?? "";
  const category = sp.category ?? "";
  const page = Math.max(1, Number(sp.page ?? 1));
  const limit = 12;

  const where: Record<string, unknown> = {};
  if (q) where.OR = [
    { title: { contains: q, mode: "insensitive" } },
    { location: { contains: q, mode: "insensitive" } },
  ];
  if (status) where.status = status;
  if (category) where.categoryId = category;

  const [projects, total, categories] = await Promise.all([
    prisma.project.findMany({
      where: where as any,
      orderBy: { order: "asc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { category: { select: { id: true, name: true } } },
    }),
    prisma.project.count({ where: where as any }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <ProjectsClient
      projects={JSON.parse(JSON.stringify(projects))}
      total={total}
      page={page}
      limit={limit}
      q={q}
      status={status}
      category={category}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
