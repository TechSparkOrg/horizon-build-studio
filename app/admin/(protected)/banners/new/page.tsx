import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { saveBanner } from "../actions";
import BannerImagesEditor from "@/components/admin/BannerImagesEditor";

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";

export default function NewBannerPage() {
  return (
    <div>
      <Link href="/admin/banners" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="size-4" /> Back to Banners
      </Link>
      <h1 className="text-xl font-bold mb-6">New Banner</h1>
      <form action={saveBanner} className="bg-white p-6 border border-gray-200 max-w-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input name="title" className={input} placeholder="Label" />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input name="slug" className={input} placeholder="Auto-generated from title" />
          </div>
        </div>
        <div>
          <BannerImagesEditor />
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm font-medium mb-3">SEO</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Meta Title</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 70 characters.</p>
              <input name="metaTitle" maxLength={90} className={`${input} max-w-md`} placeholder="SEO title override" />
            </div>
            <div>
              <label className="block text-sm mb-1">Meta Description</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 160 characters.</p>
              <textarea name="metaDescription" maxLength={200} rows={2} className="w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y min-h-20 max-w-md" placeholder="SEO description" />
            </div>
            <div>
              <label className="block text-sm mb-1">Meta Keywords</label>
              <p className="text-xs text-gray-500 mb-1">Keep under 200 characters.</p>
              <input name="metaKeywords" maxLength={220} className={`${input} max-w-md`} placeholder="SEO keywords" />
            </div>
            <div>
              <label className="block text-sm mb-1">Custom Script</label>
              <p className="text-xs text-gray-500 mb-1">Optional script or tracking code.</p>
              <textarea name="customScript" rows={3} className="w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y font-mono text-xs max-w-lg" placeholder="<script>..." />
            </div>
          </div>
        </div>
        <button type="submit" className="cursor-pointer bg-black text-white text-sm px-5 py-2 rounded hover:opacity-85">Save</button>
      </form>
    </div>
  );
}
