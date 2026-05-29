import { getBySlug } from "@/lib/services/services/seo.service";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { saveSeo } from "../actions";

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";
const textarea = "w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y";

export default async function EditSeoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getBySlug(id);
  if (!item) notFound();

  return (
    <div>
      <Link href="/admin/seo" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="size-4" /> Back to SEO
      </Link>
      <h1 className="text-xl font-bold mb-6">Edit SEO Entry</h1>
      <form action={saveSeo} className="bg-white p-6 border border-gray-200 max-w-3xl space-y-5">
        <input type="hidden" name="id" value={item.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input name="title" defaultValue={item.title} className={input} placeholder="Page heading" />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input name="slug" defaultValue={item.slug} className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Text 1 (English)</label>
          <textarea name="text1En" defaultValue={item.text1En} rows={3} className={`${textarea} min-h-20`} placeholder="Primary text content" />
        </div>
        <div>
          <label className="block text-sm mb-1">Text 1 (Nepali)</label>
          <textarea name="text1Np" defaultValue={item.text1Np} rows={3} className={`${textarea} min-h-20`} placeholder="प्राथमिक पाठ सामग्री" />
        </div>
        <div>
          <label className="block text-sm mb-1">Text 2 (English)</label>
          <textarea name="text2En" defaultValue={item.text2En} rows={3} className={`${textarea} min-h-20`} placeholder="Secondary text content" />
        </div>
        <div>
          <label className="block text-sm mb-1">Text 2 (Nepali)</label>
          <textarea name="text2Np" defaultValue={item.text2Np} rows={3} className={`${textarea} min-h-20`} placeholder="द्वितीयक पाठ सामग्री" />
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm font-medium mb-3">SEO</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Meta Title</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 70 characters.</p>
              <input name="metaTitle" defaultValue={item.metaTitle} maxLength={90} className={`${input} max-w-md`} placeholder="SEO title" />
            </div>
            <div>
              <label className="block text-sm mb-1">Meta Description</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 160 characters.</p>
              <textarea name="metaDescription" defaultValue={item.metaDescription} maxLength={200} rows={2} className={`${textarea} max-w-md min-h-20`} placeholder="SEO description" />
            </div>
            <div>
              <label className="block text-sm mb-1">Meta Keywords</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 200 characters.</p>
              <input name="metaKeywords" defaultValue={item.metaKeywords} maxLength={220} className={`${input} max-w-md`} placeholder="SEO keywords" />
            </div>
            <div>
              <label className="block text-sm mb-1">OG Image URL</label>
              <p className="text-xs text-gray-500 mb-1">URL for social sharing image.</p>
              <input name="ogImage" defaultValue={item.ogImage} className={`${input} max-w-lg`} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm mb-1">Custom Script</label>
              <p className="text-xs text-gray-500 mb-1">Optional script or tracking code.</p>
              <textarea name="customScript" defaultValue={item.customScript} rows={3} className="w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y font-mono text-xs max-w-lg" placeholder="<script>..." />
            </div>
          </div>
        </div>
        <button type="submit" className="cursor-pointer bg-black text-white text-sm px-5 py-2 rounded hover:opacity-85">Save</button>
      </form>
    </div>
  );
}
