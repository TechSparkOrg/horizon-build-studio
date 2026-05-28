"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
}

export function CategoryForm({
  initialData,
  parents,
}: {
  initialData?: Category;
  parents: Category[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [parentId, setParentId] = useState(initialData?.parentId ?? "");
  const [saving, setSaving] = useState(false);
  const isNew = !initialData;

  const autoSlug = (v: string) => {
    if (isNew && !slug) setSlug(v.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name, slug: slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""), parentId: parentId || null };
      const url = initialData ? `/api/categories/${initialData.id}` : "/api/categories";
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to ${isNew ? "create" : "update"} category`);
      }
      toast.success(isNew ? "Category created" : "Category updated");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="size-4" /> Back to Categories
      </Link>

      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">
        {isNew ? "New Category" : "Edit Category"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1.5">Name</label>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); autoSlug(e.target.value); }}
            required
            className="w-full h-11 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1.5">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full h-11 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1.5">Parent Category</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="">None (top-level)</option>
            {parents.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition disabled:opacity-60"
        >
          <Save className="size-4" />
          {saving ? "Saving..." : isNew ? "Create Category" : "Update Category"}
        </button>
      </form>
    </div>
  );
}
