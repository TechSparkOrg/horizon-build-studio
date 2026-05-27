import { api } from "@/lib/api";
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

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  if (category) params.set("category", category);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const raw = await api(`/api/projects?${params.toString()}`).get() as any;
  const { items: projects, total, categories } = raw;

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
