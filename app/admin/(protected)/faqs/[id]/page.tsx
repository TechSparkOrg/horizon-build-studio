import { cacheTag } from "next/cache";
import { faqService } from "@/lib/services/services/faq.service";
import { faqTypeService } from "@/lib/services/services/faq-type.service";
import { categoryService } from "@/lib/services/services/category.service";
import { notFound } from "next/navigation";
import { saveFaq } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";
const select = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CachedPage id={id} />;
}

async function CachedPage({ id }: { id: string }) {
  'use cache'
  cacheTag("faq-types")
  cacheTag("categories")
  const [item, faqTypes, categories] = (await Promise.all([
    faqService.getById(id),
    faqTypeService.getAll(),
    categoryService.getAll(),
  ])) as [any, any[], any[]];
  if (!item || typeof item !== "object" || "error" in (item as any)) notFound();

  return (
    <div>
      <Link href="/admin/faqs" className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6">
        <ArrowLeft className="size-4" /> Back to FAQs
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit FAQ</h1>
      <form action={saveFaq} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        <input type="hidden" name="id" value={item.id} />
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Question *</label>
          <input name="question" defaultValue={item.question} className={input} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Answer *</label>
          <textarea name="answer" rows={4} defaultValue={item.answer} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Type</label>
            <select name="faqTypeId" defaultValue={item.faqTypeId ?? ""} className={select}>
              <option value="">No type</option>
              {faqTypes.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Category</label>
            <select name="categoryId" defaultValue={item.categoryId ?? ""} className={select}>
              <option value="">No category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Order</label>
          <input name="order" type="number" defaultValue={item.order} className={input} />
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">Update FAQ</button>
      </form>
    </div>
  );
}
