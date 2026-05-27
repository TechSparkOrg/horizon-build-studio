import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { saveNews } from "../actions";
import { ImageField } from "@/components/admin/ImageField";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";
const select = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, projectsRaw] = (await Promise.all([
    api(`/api/news/${id}`).get(),
    api("/api/projects?limit=100").get(),
  ])) as [any, any];
  if (!item || typeof item !== "object" || "error" in (item as any)) notFound();
  const projects = (projectsRaw as any).items || [];

  return (
    <div>
      <Link href="/admin/news" className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6">
        <ArrowLeft className="size-4" /> Back to News
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit Article</h1>
      <form action={saveNews} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        <input type="hidden" name="id" value={item.id} />
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Title *</label>
          <input name="title" defaultValue={item.title} className={input} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Slug</label>
            <input name="slug" defaultValue={item.slug} className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Category *</label>
            <input name="category" defaultValue={item.category} className={input} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Excerpt</label>
          <textarea name="excerpt" rows={2} defaultValue={item.excerpt} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Image *</label>
          <ImageField name="image" defaultValue={item.image} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Alt Text</label>
            <input name="alt" defaultValue={item.alt} className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Published Date</label>
            <input name="publishedAt" type="date" defaultValue={item.publishedAt.toISOString().split("T")[0]} className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Reading Time (min)</label>
          <input name="readingTimeMinutes" type="number" defaultValue={item.readingTimeMinutes ?? 3} className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Reference Project</label>
          <select name="projectId" defaultValue={item.projectId ?? ""} className={select}>
            <option value="">No project reference</option>
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">Update Article</button>
      </form>
    </div>
  );
}
