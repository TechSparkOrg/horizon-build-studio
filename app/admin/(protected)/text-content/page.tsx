import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAll } from "@/lib/services/services/text-content.service";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTextContent } from "./actions";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default async function TextContentPage() {
  const items = await getAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight">Text Content</h1>
        <Link
          href="/admin/text-content/new"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold border border-brand-primary bg-brand-primary text-white rounded hover:opacity-85 transition"
        >
          <Plus className="size-3.5" /> New Text Content
        </Link>
      </div>

      <div className="bg-white border border-light-gray rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-off-white/50">
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Label</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Slug</th>
              <th className="text-left py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Heading (EN)</th>
              <th className="text-right py-2 px-3 font-medium text-mid-gray text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-mid-gray">
                  No text content yet. Create your first entry.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-light-gray/30 hover:bg-off-white/50">
                  <td className="py-2 px-3 text-sm font-medium text-dark-text">{item.label}</td>
                  <td className="py-2 px-3 text-xs text-mid-gray">{item.slug}</td>
                  <td className="py-2 px-3 text-sm text-dark-text truncate max-w-xs">{item.headingEn}</td>
                  <td className="py-2 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/admin/text-content/${item.id}`}
                        className="inline-flex items-center gap-1 p-1.5 text-mid-gray hover:text-brand-primary"
                        aria-label="Edit"
                      >
                        <Pencil className="size-3.5" />
                      </Link>
                      <DeleteButton
                        id={item.id}
                        label={item.label}
                        onDelete={deleteTextContent}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
