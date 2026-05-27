import { api } from "@/lib/api";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { ToastOnLoad } from "@/components/admin/ToastOnLoad";
import { deleteBanner } from "./actions";
import type { PageBannerGroup } from "@/lib/page-banner";

export default async function BannersPage() {
  const banners = await api("/api/page-banners").get<PageBannerGroup[]>();

  return (
    <div>
      <ToastOnLoad />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Page Banners</h1>
        <Link href="/admin/banners/new" className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </Link>
      </div>
      <div className="bg-white border border-gray-200">
        {banners.length === 0 ? (
          <p className="text-sm text-gray-500 p-8 text-center">No banners yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 text-xs">
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Images</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {banners.map((g) => (
                <tr key={g.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{g.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{g.title || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{g.images.length}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Link href={`/admin/banners/${g.slug}`} className="p-2 text-mid-gray hover:text-black" aria-label="Edit">
                      <Pencil className="size-4" />
                    </Link>
                    <ConfirmDelete id={g.id} label={g.title || g.slug} action={deleteBanner} tag="banners" />
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
