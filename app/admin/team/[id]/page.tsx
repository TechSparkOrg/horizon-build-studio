import { prisma } from "@/lib/db";
import { saveTeamMember } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const input =
  "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUniqueOrThrow({ where: { id } });

  return (
    <div>
      <Link href="/admin/team" className="inline-flex items-center gap-1 text-sm text-mid-gray hover:text-brand-primary mb-6">
        <ArrowLeft className="size-4" /> Back to Team
      </Link>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Edit Team Member</h1>
      <form action={saveTeamMember} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        <input type="hidden" name="id" value={member.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Name *</label>
            <input name="name" defaultValue={member.name} className={input} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Role *</label>
            <input name="role" defaultValue={member.role} className={input} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Image URL *</label>
          <input name="img" defaultValue={member.img} className={input} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Alt Text</label>
          <input name="alt" defaultValue={member.alt} className={input} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">LinkedIn URL</label>
            <input name="linkedin" defaultValue={member.linkedin ?? ""} className={input} />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-secondary mb-1">Email</label>
            <input name="email" type="email" defaultValue={member.email ?? ""} className={input} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-1">Order</label>
          <input name="order" type="number" defaultValue={member.order} className={input} />
        </div>
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
          Update Member
        </button>
      </form>
    </div>
  );
}
