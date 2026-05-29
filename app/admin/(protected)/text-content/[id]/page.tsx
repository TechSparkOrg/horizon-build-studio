import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getById } from "@/lib/services/services/text-content.service";
import { saveTextContent } from "../actions";
import { TitleSlugFields } from "@/components/admin/TitleSlugFields";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";
const textarea = "w-full min-h-[100px] px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y";

export default async function EditTextContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getById(id);
  if (!item || typeof item !== "object" || "error" in (item as any)) notFound();

  return (
    <div>
      <Link
        href="/admin/text-content"
        className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="size-4" /> Back to Text Content
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit Text Content</h1>
      <form action={saveTextContent} className="bg-white rounded-xl p-8 shadow-sm space-y-5">
        <input type="hidden" name="id" value={item.id} />
        <TitleSlugFields initialLabel={item.label} initialSlug={item.slug} />

        <fieldset className="border-t border-light-gray pt-5">
          <legend className="text-sm font-semibold text-brand-secondary mb-4">Content</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Heading (EN)</label>
              <input name="headingEn" defaultValue={item.headingEn} className={input} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Heading (NP)</label>
              <input name="headingNp" defaultValue={item.headingNp} className={input} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Sub-heading (EN)</label>
              <textarea name="subheadingEn" defaultValue={item.subheadingEn} className={textarea} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-secondary mb-1">Sub-heading (NP)</label>
              <textarea name="subheadingNp" defaultValue={item.subheadingNp} className={textarea} />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end pt-2">
          <button type="submit" className="h-9 px-5 text-sm font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
            Update Text Content
          </button>
        </div>
      </form>
    </div>
  );
}
