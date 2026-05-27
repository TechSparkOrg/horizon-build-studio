import { api } from "@/lib/api";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { ToastOnLoad } from "@/components/admin/ToastOnLoad";
import { deletePage } from "./actions";
import type { StaticPage } from "@/lib/static-page";

export default async function StaticPagesPage() {
  const pages = await api("/api/static-pages").get<StaticPage[]>();

  return (
    <div>
      <ToastOnLoad />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Static Pages</h1>
        <Link href="/admin/pages/new" className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </Link>
      </div>

      <div className="bg-white border border-gray-200">
        {pages.length === 0 ? (
          <p className="text-sm text-gray-500 p-8 text-center">No pages yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 text-xs">
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{p.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.title || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(p.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Link href={`/admin/pages/${p.slug}`} className="p-2 text-mid-gray hover:text-black" aria-label="Edit">
                      <Pencil className="size-4" />
                    </Link>
                    <ConfirmDelete id={p.id} label={p.title || p.slug} action={deletePage} tag="pages" />
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
