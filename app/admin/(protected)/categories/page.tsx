import { cacheTag } from "next/cache";
import { categoryService } from "@/lib/services/services/category.service";
import Link from "next/link";
import { Plus, ChevronRight, Tag } from "lucide-react";
import { DeleteCategoryButton } from "./delete-button";

function flatten(categories: any[], depth = 0): { id: string; name: string; slug: string; depth: number; parentId: string | null }[] {
  const result: { id: string; name: string; slug: string; depth: number; parentId: string | null }[] = [];
  const stack = categories.map((c) => ({ ...c, depth }));
  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push({ id: node.id, name: node.name, slug: node.slug, depth: node.depth, parentId: node.parentId });
    if (node.children?.length) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ ...node.children[i], depth: node.depth + 1 });
      }
    }
  }
  return result;
}

export default async function CategoriesPage() {
  'use cache'
  cacheTag("categories")
  const all = await categoryService.getAll() as { id: string; name: string; slug: string; parentId: string | null; order: number }[];
  type CatNode = { id: string; name: string; slug: string; parentId: string | null; order: number; children: CatNode[] };
  const map = new Map<string, CatNode>();
  const roots: CatNode[] = [];
  for (const c of all) {
    map.set(c.id, { id: c.id, name: c.name, slug: c.slug, parentId: c.parentId, order: c.order, children: [] });
  }
  for (const c of all) {
    const node = map.get(c.id)!;
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.children.push(node);
    } else if (!c.parentId) {
      roots.push(node);
    }
  }

  const flat = flatten(roots);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">Categories</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/categories/faq-types"
            className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-light-gray text-mid-gray rounded hover:border-brand-primary hover:text-brand-primary transition"
          >
            <Tag className="size-3.5" /> FAQ Types
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition"
          >
            <Plus className="size-3.5" /> New Category
          </Link>
        </div>
      </div>

      <div className="bg-white border border-light-gray rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-off-white/50">
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Name</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Slug</th>
              <th className="text-right py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flat.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-sm text-mid-gray">
                  No categories yet. Create your first category.
                </td>
              </tr>
            ) : (
              flat.map((cat) => (
                <tr key={cat.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                  <td className="py-2 px-3">
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium text-dark-text"
                      style={{ paddingLeft: `${cat.depth * 16}px` }}
                    >
                      {cat.depth > 0 && <ChevronRight className="size-3 text-mid-gray" />}
                      {cat.name}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs text-mid-gray">{cat.slug}</td>
                  <td className="py-2 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${cat.id}`}
                        className="text-xs text-mid-gray hover:text-brand-primary"
                      >
                        Edit
                      </Link>
                      <DeleteCategoryButton id={cat.id} name={cat.name} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
