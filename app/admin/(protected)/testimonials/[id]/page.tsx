import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { saveTestimonial } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await api(`/api/testimonials/${id}`).get() as any;
  if (!item || typeof item !== "object" || "error" in (item as any)) notFound();

  return (
    <div>
      <Link href="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6">
        <ArrowLeft className="size-4" /> Back to Testimonials
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit Testimonial</h1>
      <form action={saveTestimonial} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        <input type="hidden" name="id" value={item.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Author *</label>
            <input name="author" defaultValue={item.author} className={input} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Initials *</label>
            <input name="initials" defaultValue={item.initials} className={input} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Role</label>
            <input name="role" defaultValue={item.role} className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Company</label>
            <input name="company" defaultValue={item.company} className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Quote *</label>
          <textarea name="quote" rows={3} defaultValue={item.quote} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Avatar URL</label>
            <input name="avatar" defaultValue={item.avatar ?? ""} className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Rating (1-5)</label>
            <input name="rating" type="number" min={1} max={5} defaultValue={item.rating} className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Order</label>
          <input name="order" type="number" defaultValue={item.order} className={input} />
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">Update Testimonial</button>
      </form>
    </div>
  );
}
