import { search } from "@/lib/services/services/project.service";
import { ProjectsClient } from "./client";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; category?: string; page?: string }>;
}) {
  const sp = await searchParams;
  return <CachedPage q={sp.q ?? ""} status={sp.status ?? ""} category={sp.category ?? ""} page={String(sp.page ?? "1")} />;
}

async function CachedPage({ q, status, category, page: pageStr }: {
  q: string;
  status: string;
  category: string;
  page: string;
}) {
  const page = Math.max(1, Number(pageStr ?? 1));
  const limit = 12;

  const filters: Record<string, string | number> = { page, limit };
  if (q) filters.q = q;
  if (status) filters.status = status;
  if (category) filters.category = category;

  const raw = await search(filters) as any;
  const { items: projects, total, categories } = raw;

  return (
    <ProjectsClient
      projects={JSON.parse(JSON.stringify(projects))}
      total={total}
      page={page}
      limit={limit}
      q={q}
      categories={JSON.parse(JSON.stringify(categories))}
    />
  );
}
