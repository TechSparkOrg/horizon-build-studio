"use client";

import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

export interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  basePath: string;
  onDelete?: (id: string) => void;
}

export function DataTable({
  columns,
  data,
  basePath,
  onDelete,
}: DataTableProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-brand-secondary capitalize">
          {basePath.split("/").pop()}
        </h1>
        <Link
          href={`${basePath}/new`}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition"
        >
          <Plus className="size-4" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray bg-off-white">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left py-3 px-4 font-medium text-mid-gray text-xs uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right py-3 px-4 font-medium text-mid-gray text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-12 text-center text-mid-gray"
                  >
                    No items yet.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id as string}
                    className="border-b border-light-gray/50 hover:bg-off-white/50 transition"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-3 px-4 text-dark-text">
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? "")}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`${basePath}/${row.id}`}
                          className="p-2 text-mid-gray hover:text-brand-primary transition"
                          aria-label="Edit"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row.id as string)}
                            className="p-2 text-mid-gray hover:text-destructive transition"
                            aria-label="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
