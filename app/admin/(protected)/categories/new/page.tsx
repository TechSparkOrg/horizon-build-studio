import { cacheTag } from "next/cache";
import { categoryService } from "@/lib/services/services/category.service";
import { CategoryForm } from "../form";

export default async function NewCategoryPage() {
  'use cache'
  cacheTag("categories")
  const parents = await categoryService.getAll();

  return <CategoryForm parents={(Array.isArray(parents) ? parents : []) as any} />;
}
