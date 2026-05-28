import { cacheTag } from "next/cache";
import { faqTypeService } from "@/lib/services/services/faq-type.service";
import { FAQTypeSchema } from "@/lib/schemas";
import Link from "next/link";
import { z } from "zod";
import { Plus, Pencil, ArrowLeft } from "lucide-react";

export default async function FaqTypesPage() {
  'use cache'
  cacheTag("faq-types")
  const raw = await faqTypeService.getAll();
  const types = z.array(FAQTypeSchema).parse(raw);

  return (
    <div>
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="size-4" /> Back to Categories
      </Link>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">FAQ Types</h1>
        <Link
          href="/admin/categories/faq-types/new"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition"
        >
          <Plus className="size-3.5" /> New FAQ Type
        </Link>
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
            {types.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-sm text-mid-gray">
                  No FAQ types yet. Create your first type.
                </td>
              </tr>
            ) : (
              types.map((t) => (
                <tr key={t.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                  <td className="py-2 px-3 text-sm font-medium text-dark-text">{t.name}</td>
                  <td className="py-2 px-3 text-xs text-mid-gray">{t.slug}</td>
                  <td className="py-2 px-3 text-right">
                    <Link
                      href={`/admin/categories/faq-types/${t.id}`}
                      className="inline-flex items-center gap-1 p-1.5 text-mid-gray hover:text-brand-primary"
                      aria-label="Edit"
                    >
                      <Pencil className="size-3.5" />
                    </Link>
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
