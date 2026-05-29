import { getAll } from "@/lib/services/services/category.service";
import { CategoryForm } from "../form";

export default async function NewCategoryPage() {
  const parents = await getAll();

  return <CategoryForm parents={(Array.isArray(parents) ? parents : []) as any} />;
}
