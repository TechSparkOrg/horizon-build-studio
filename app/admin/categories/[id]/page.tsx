import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CategoryForm } from "../form";


export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, parents] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    prisma.category.findMany({ where: { id: { not: id } }, orderBy: { order: "asc" } }),
  ]);

  if (!category) notFound();

  return <CategoryForm initialData={category} parents={parents} />;
}
