import { getAll } from "@/lib/services/services/team.service";
import { TeamMemberSchema } from "@/lib/schemas/misc";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { deleteTeamMember } from "./actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { z } from "zod";

export default async function TeamPage() {
  const raw = await getAll();
  const members = z.array(TeamMemberSchema).parse(raw);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">Team</h1>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition"
        >
          <Plus className="size-3.5" /> Add Member
        </Link>
      </div>

      <div className="bg-white border border-light-gray rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-off-white/50">
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Name</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Role</th>
              <th className="text-right py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                <td className="py-2 px-3 text-sm font-medium text-dark-text">{m.name}</td>
                <td className="py-2 px-3 text-xs text-mid-gray">{m.role}</td>
                <td className="py-2 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/team/${m.id}`} className="p-1.5 text-mid-gray hover:text-brand-primary" aria-label="Edit">
                      <Pencil className="size-3.5" />
                    </Link>
                    <ConfirmDelete id={m.id} label={m.name} action={deleteTeamMember} />
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
