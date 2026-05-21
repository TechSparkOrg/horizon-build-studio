import { prisma } from "@/lib/db";
import { CategoryForm } from "../form";


export default async function NewCategoryPage() {
  const parents = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return <CategoryForm parents={parents} />;
}
