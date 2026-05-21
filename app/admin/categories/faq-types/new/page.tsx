import { saveFaqType } from "./actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default function NewFaqTypePage() {
  return (
    <div>
      <Link
        href="/admin/categories/faq-types"
        className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="size-4" /> Back to FAQ Types
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">New FAQ Type</h1>
      <form action={saveFaqType} className="bg-white rounded-xl p-8 shadow-sm max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Name *</label>
          <input name="name" className={input} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Order</label>
          <input name="order" type="number" className={input} />
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
          Save FAQ Type
        </button>
      </form>
    </div>
  );
}
