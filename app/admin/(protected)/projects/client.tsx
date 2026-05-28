"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, Briefcase, MapPin } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { STATUS_COLORS } from "./field-config";
import { deleteProject } from "@/lib/services/actions/project.actions";

const STATUS_MAP = Object.fromEntries(
  Object.entries(STATUS_COLORS).map(([value, color]) => [value, { color }]),
);

interface Project {
  id: string;
  title: string;
  slug: string;
  status: string;
  completion: number;
  location: string;
  category: { id: string; name: string } | null;
  img: string;
  alt: string;
  published: boolean;
  updatedAt: string;
}

interface Props {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  q: string;
  categories: { id: string; name: string }[];
}

function Pagination({ page, totalPages, total, onChange }: {
  page: number; totalPages: number; total: number; onChange: (p: Record<string, string>) => void;
}) {
  if (totalPages <= 1) return null;
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className="flex items-center justify-between mt-6 border-t border-light-gray/60 pt-4">
      <p className="text-xs text-mid-gray font-medium">{total} project{total !== 1 ? "s" : ""} · Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1.5">
        <button disabled={page <= 1} onClick={() => onChange({ page: String(page - 1) })}
          className="h-8 px-3 text-xs border border-light-gray rounded-lg hover:bg-off-white transition disabled:opacity-40 cursor-pointer font-semibold flex items-center gap-1">
          <ChevronLeft className="size-3.5" /> Previous
        </button>
        {pages.map((p) => (
          <button key={p} onClick={() => onChange({ page: String(p) })}
            className={`h-8 w-8 text-xs border rounded-lg cursor-pointer transition font-bold ${p === page ? "bg-brand-primary border-brand-primary text-white" : "border-light-gray hover:bg-off-white text-brand-secondary"}`}>
            {p}
          </button>
        ))}
        <button disabled={page >= totalPages} onClick={() => onChange({ page: String(page + 1) })}
          className="h-8 px-3 text-xs border border-light-gray rounded-lg hover:bg-off-white transition disabled:opacity-40 cursor-pointer font-semibold flex items-center gap-1">
          Next <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ProjectsClient({ projects: initialProjects, total: initialTotal, page, limit, q: initialQ, categories }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [search, setSearch] = useState(initialQ);
  const [status, setStatus] = useState(sp.get("status") ?? "");
  const [category, setCategory] = useState(sp.get("category") ?? "");
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const [, startTransition] = useTransition();

  const projectsList = initialProjects;
  const currentTotal = initialTotal;
  const totalPages = Math.ceil(currentTotal / limit);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(sp.toString());
    Object.entries(updates).forEach(([k, v]) => { if (v) params.set(k, v); else params.delete(k); });
    
    startTransition(() => {
      router.push(`/admin/projects?${params.toString()}`);
    });
  };

  async function handleDelete() {
    if (!confirmDelete) return;
    const targetId = confirmDelete.id;
    const targetTitle = confirmDelete.title;

    try {
      await deleteProject(targetId);
      toast.success(`"${targetTitle}" deleted`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-light-gray pb-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-secondary tracking-tight">Projects</h1>
          <p className="text-xs text-mid-gray mt-0.5">
            {currentTotal} total project{currentTotal !== 1 ? "s" : ""} active · Dynamic Sync
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/admin/projects/new" className="bg-brand-primary text-white text-xs px-4 py-2.5 rounded-lg hover:opacity-90 flex items-center gap-2 font-bold font-label tracking-wide uppercase transition shadow-sm">
            <Plus className="size-3.5" /> New Project
          </Link>
        </div>
      </div>

      {/* Advanced Filter Panel with modern styling */}
      <div className="bg-white border border-light-gray/60 p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-mid-gray" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateParams({ q: search, page: "1" })}
              placeholder="Search by title or location... (Press Enter)"
              className="w-full h-10 pl-10 pr-4 text-sm border border-light-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          
          <div className="flex items-center gap-2">
            <select value={status} onChange={(e) => { setStatus(e.target.value); updateParams({ status: e.target.value, page: "1" }); }}
              className="h-10 px-3 text-xs border border-light-gray rounded-lg bg-white font-medium text-brand-secondary cursor-pointer focus:outline-none">
              <option value="">All Statuses</option>
              {Object.keys(STATUS_MAP).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            
            <select value={category} onChange={(e) => { setCategory(e.target.value); updateParams({ category: e.target.value, page: "1" }); }}
              className="h-10 px-3 text-xs border border-light-gray rounded-lg bg-white font-medium text-brand-secondary cursor-pointer focus:outline-none">
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table & List View */}
      {projectsList.length === 0 ? (
        <div className="bg-white border border-light-gray/60 p-16 rounded-xl text-center text-sm text-mid-gray shadow-sm">
          <Briefcase className="size-12 mx-auto mb-3 text-light-gray animate-pulse" />
          <p className="font-medium text-brand-secondary">No projects matching standard parameters.</p>
          <p className="text-xs text-mid-gray mt-1">Try clearing filters or search queries.</p>
        </div>
      ) : (
        <div className="bg-white border border-light-gray/60 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-light-gray bg-off-white/40">
                <th className="px-5 py-3.5 font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Project</th>
                <th className="px-5 py-3.5 hidden md:table-cell font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Status</th>
                <th className="px-5 py-3.5 hidden lg:table-cell font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Category</th>
                <th className="px-5 py-3.5 hidden lg:table-cell font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Location</th>
                <th className="px-5 py-3.5 hidden sm:table-cell font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Progress</th>
                <th className="px-5 py-3.5 text-right font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/40">
              {projectsList.map((p) => (
                <tr key={p.id} className="hover:bg-off-white/10 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-11 border border-light-gray flex items-center justify-center bg-off-white shrink-0 overflow-hidden rounded-lg shadow-inner group-hover:scale-102 transition-transform duration-200">
                        {p.img ? (
                          <img src={p.img} alt="" className="size-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <Briefcase className="size-4 text-mid-gray" />
                        )}
                      </div>
                      <div>
                        <Link href={`/admin/projects/${p.id}`} className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors">
                          {p.title}
                        </Link>
                        <p className="text-[10px] text-mid-gray mt-0.5">Updated: {new Date(p.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-label font-bold tracking-wide uppercase ${STATUS_COLORS[p.status] ?? "text-mid-gray border-light-gray"}`}>
                      {p.status}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4 text-xs font-semibold text-brand-secondary hidden lg:table-cell">
                    {p.category?.name ?? "—"}
                  </td>
                  
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs text-mid-gray font-medium">
                      <MapPin className="size-3.5 text-brand-primary/60" /> {p.location}
                    </span>
                  </td>
                  
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-light-gray/60 rounded-full max-w-20 overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${p.completion}%` }} />
                      </div>
                      <span className="text-xs font-bold text-brand-secondary font-mono">{p.completion}%</span>
                    </div>
                  </td>
                  
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/projects/${p.id}`} className="p-2 text-mid-gray hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition" title="Edit">
                        <Pencil className="size-4" />
                      </Link>
                      <button onClick={() => setConfirmDelete({ id: p.id, title: p.title })}
                        className="p-2 text-mid-gray hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition" title="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} total={currentTotal} onChange={updateParams} />

      <AlertDialog open={confirmDelete !== null} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent className="rounded-xl border-light-gray">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-brand-secondary font-bold">Delete "{confirmDelete?.title}"?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-mid-gray">
              This action cannot be undone. This project will be removed from all active displays immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-lg text-xs font-semibold border-light-gray cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold cursor-pointer">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
