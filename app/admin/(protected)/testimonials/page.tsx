import { cacheTag } from "next/cache";
import { testimonialService } from "@/lib/services/services/testimonial.service";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { deleteTestimonial } from "./actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export default async function TestimonialsPage() {
  'use cache'
  cacheTag("testimonials")
  const items = await testimonialService.getAll() as any[];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition">
          <Plus className="size-3.5" /> Add Testimonial
        </Link>
      </div>
      <div className="bg-white border border-light-gray rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-off-white/50">
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Author</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Role</th>
              <th className="text-right py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                <td className="py-2 px-3 text-sm font-medium text-dark-text">{item.author}</td>
                <td className="py-2 px-3 text-xs text-mid-gray">{item.role}</td>
                <td className="py-2 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/testimonials/${item.id}`} className="p-1.5 text-mid-gray hover:text-brand-primary" aria-label="Edit">
                      <Pencil className="size-3.5" />
                    </Link>
                    <ConfirmDelete id={item.id} label={item.author} action={deleteTestimonial} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
