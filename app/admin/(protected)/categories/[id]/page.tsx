import { getById, getAll } from "@/lib/services/services/category.service";
import { notFound } from "next/navigation";
import { CategoryForm } from "../form";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CachedPage id={id} />;
}

async function CachedPage({ id }: { id: string }) {
  const [category, parents] = await Promise.all([
    getById(id),
    getAll(),
  ]);

  if (!category || typeof category !== "object" || "error" in (category as any)) notFound();
  const parentsArr = (Array.isArray(parents) ? parents : []).filter((p: any) => p.id !== id);

  return <CategoryForm initialData={category as any} parents={parentsArr as any} />;
}
