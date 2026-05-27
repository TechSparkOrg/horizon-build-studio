import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { CategoryForm } from "../form";


export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, parents] = await Promise.all([
    api(`/api/categories/${id}`).get(),
    api("/api/categories").get(),
  ]);

  if (!category || typeof category !== "object" || "error" in (category as any)) notFound();
  const parentsArr = (Array.isArray(parents) ? parents : []).filter((p: any) => p.id !== id);

  return <CategoryForm initialData={category as any} parents={parentsArr as any} />;
}
