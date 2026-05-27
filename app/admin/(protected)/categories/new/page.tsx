import { api } from "@/lib/api";
import { CategoryForm } from "../form";


export default async function NewCategoryPage() {
  const parents = await api("/api/categories").get();

  return <CategoryForm parents={(Array.isArray(parents) ? parents : []) as any} />;
}
