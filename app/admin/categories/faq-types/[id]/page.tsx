import { prisma } from "@/lib/db";
import { saveFaqType } from "../new/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default async function EditFaqTypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const type = await prisma.fAQType.findUnique({ where: { id } });
  if (!type) notFound();

  return (
    <div>
      <Link
        href="/admin/categories/faq-types"
        className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6"
      >
        <ArrowLeft className="size-4" /> Back to FAQ Types
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit FAQ Type</h1>
      <form action={saveFaqType} className="bg-white rounded-xl p-8 shadow-sm max-w-lg space-y-5">
        <input type="hidden" name="id" value={type.id} />
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Name *</label>
          <input name="name" defaultValue={type.name} className={input} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Order</label>
          <input name="order" type="number" defaultValue={type.order} className={input} />
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
          Update FAQ Type
        </button>
      </form>
    </div>
  );
}
