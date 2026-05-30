import { getAll } from "@/lib/services/services/news.service";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { deleteNews } from "./actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export default async function NewsPage() {
  const { items } = await getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">News</h1>
        <Link href="/admin/news/new" className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition">
          <Plus className="size-3.5" /> Add Article
        </Link>
      </div>
      <div className="bg-white border border-light-gray rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-off-white/50">
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Title</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Project</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Category</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Date</th>
              <th className="text-right py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                <td className="py-2 px-3 text-sm font-medium text-dark-text max-w-xs truncate">{item.title}</td>
                <td className="py-2 px-3 text-xs">
                  {item.project ? (
                    <Link href={`/admin/projects/${item.project.id}`} className="text-brand-primary hover:underline">
                      {item.project.title}
                    </Link>
                  ) : (
                    <span className="text-red-400">—</span>
                  )}
                </td>
                <td className="py-2 px-3 text-xs text-mid-gray">{item.category}</td>
                <td className="py-2 px-3 text-xs text-mid-gray">{new Date(item.publishedAt).toLocaleDateString()}</td>
                <td className="py-2 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/news/${item.id}`} className="p-1.5 text-mid-gray hover:text-brand-primary" aria-label="Edit">
                      <Pencil className="size-3.5" />
                    </Link>
                    <ConfirmDelete id={item.id} label={item.title} action={deleteNews} />
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
