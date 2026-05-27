import { api } from "@/lib/api";
import { saveNews } from "../actions";
import { ImageField } from "@/components/admin/ImageField";
import ContentEditor from "@/components/ContentEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";
const select = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white";

export default async function NewNewsPage() {
  const projectsRaw = await api("/api/projects?limit=100").get();
  const projects = (projectsRaw as any).items || [];
  return (
    <div>
      <Link href="/admin/news" className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6">
        <ArrowLeft className="size-4" /> Back to News
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">New Article</h1>
      <form action={saveNews} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Title *</label>
          <input name="title" className={input} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Slug</label>
            <input name="slug" className={input} placeholder="Auto-generated if empty" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Category *</label>
            <input name="category" className={input} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Excerpt</label>
          <textarea name="excerpt" rows={2} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Content (English)</label>
          <ContentEditor name="content" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Content (Nepali)</label>
          <ContentEditor name="contentNp" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Image *</label>
          <ImageField name="image" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Alt Text</label>
            <input name="alt" className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Published Date</label>
            <input name="publishedAt" type="date" className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Reading Time (min)</label>
          <input name="readingTimeMinutes" type="number" defaultValue={3} className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Reference Project</label>
          <select name="projectId" className={select}>
            <option value="">No project reference</option>
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div className="border-t border-light-gray pt-5">
          <p className="text-sm font-medium text-brand-secondary mb-3">SEO</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Meta Title</label>
              <p className="text-xs text-mid-gray mb-1">Keep under 70 characters.</p>
              <input name="metaTitle" maxLength={90} className={input} placeholder="SEO title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Meta Keywords</label>
              <p className="text-xs text-mid-gray mb-1">Keep under 200 characters.</p>
              <input name="metaKeywords" maxLength={220} className={input} placeholder="SEO keywords" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-brand-secondary mb-1">Meta Description</label>
            <p className="text-xs text-mid-gray mb-1">Keep under 160 characters.</p>
            <textarea name="metaDescription" maxLength={200} rows={2} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="SEO description" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-brand-secondary mb-1">Custom Script</label>
            <p className="text-xs text-mid-gray mb-1">Optional script or tracking code.</p>
            <textarea name="customScript" rows={3} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono" placeholder="<script>..." />
          </div>
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">Save Article</button>
      </form>
    </div>
  );
}
