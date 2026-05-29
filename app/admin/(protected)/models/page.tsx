import { getAll } from "@/lib/services/services/model.service";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { deleteModel } from "./actions";

export default async function ModelsPage() {
  const models = await getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">3D Models</h1>
        <Link href="/admin/models/new" className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </Link>
      </div>
      <div className="bg-white border border-gray-200">
        {models.length === 0 ? (
          <p className="text-sm text-gray-500 p-8 text-center">No model groups yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 text-xs">
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Models</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {models.map((g) => (
                <tr key={g.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{g.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{g.title || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{g.models3d.length}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Link href={`/admin/models/${g.slug}`} className="p-2 text-mid-gray hover:text-black" aria-label="Edit">
                      <Pencil className="size-4" />
                    </Link>
                    <ConfirmDelete id={g.id} label={g.title || g.slug} action={deleteModel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
