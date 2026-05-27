"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Plus, Search, SlidersHorizontal, MapPin, Pencil, Eye, Trash2,
  CheckSquare, Square, ChevronLeft, ChevronRight, Grid3X3, List, Briefcase, Copy,
  FolderOpen,
} from "lucide-react";
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
import { ProjectCard } from "./components/ProjectCard";
import { STATUS_OPTIONS, STATUS_COLORS } from "./field-config";

const STATUS_MAP = Object.fromEntries(
  STATUS_OPTIONS.map((s) => [s.value, { label: s.label, color: STATUS_COLORS[s.value] ?? "bg-gray-50 text-gray-600 border-gray-200" }]),
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
  featured: boolean;
  published: boolean;
  updatedAt: string;
}

interface Props {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  q: string;
  status: string;
  category: string;
  categories: { id: string; name: string }[];
}

function Pagination({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onChange: (params: Record<string, string>) => void;
}) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-mid-gray">
        <span className="font-medium text-brand-secondary">{total}</span> project{total !== 1 ? "s" : ""}
        {totalPages > 1 && <span> · Page {page} of {totalPages}</span>}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          disabled={page <= 1}
          onClick={() => onChange({ page: String(page - 1) })}
          className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium rounded-lg border border-light-gray text-mid-gray hover:border-mid-gray hover:text-brand-secondary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-3.5" /> Previous
        </button>
        {getPages().map((p) => (
          <button
            key={p}
            onClick={() => onChange({ page: String(p) })}
            className={`h-8 w-8 text-xs font-medium rounded-lg transition-all ${
              p === page
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-light-gray text-mid-gray hover:border-mid-gray hover:text-brand-secondary"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => onChange({ page: String(page + 1) })}
          className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium rounded-lg border border-light-gray text-mid-gray hover:border-mid-gray hover:text-brand-secondary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function Filters({
  status,
  category,
  categories,
  query,
  onChange,
  onClear,
}: {
  status: string;
  category: string;
  categories: { id: string; name: string }[];
  query: string;
  onChange: (params: Record<string, string>) => void;
  onClear: () => void;
}) {
  const hasFilters = status || category || query;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-light-gray mt-3">
      <select
        value={status}
        onChange={(e) => onChange({ status: e.target.value, page: "1" })}
        className="h-9 px-3 rounded-lg border border-light-gray text-xs focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/20 bg-white"
      >
        <option value="">All Statuses</option>
        {Object.entries(STATUS_MAP).map(([value, s]) => (
          <option key={value} value={value}>
            {s.label}
          </option>
        ))}
      </select>
      <select
        value={category}
        onChange={(e) => onChange({ category: e.target.value, page: "1" })}
        className="h-9 px-3 rounded-lg border border-light-gray text-xs focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/20 bg-white"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {hasFilters && (
        <button
          onClick={onClear}
          className="h-9 px-3 text-xs font-medium text-mid-gray hover:text-destructive transition-colors rounded-lg hover:bg-red-50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-light-gray shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-16 text-center">
      <div className="size-16 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-orange-100 mx-auto mb-5 flex items-center justify-center">
        <FolderOpen className="size-7 text-brand-primary" />
      </div>
      <h3 className="text-xl font-display font-bold text-brand-secondary mb-2">
        {hasFilters ? "No matching projects" : "No projects yet"}
      </h3>
      <p className="text-sm text-mid-gray mb-6 max-w-sm mx-auto">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Create your first project to start showcasing your work."}
      </p>
      {!hasFilters && (
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 h-10 px-5 text-sm font-semibold rounded-xl border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition-all shadow-sm"
        >
          <Plus className="size-4" /> New Project
        </Link>
      )}
    </div>
  );
}

export function ProjectsClient({
  projects,
  total,
  page,
  limit,
  q: initialQ,
  status: initialStatus,
  category: initialCategory,
  categories,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState(initialQ);
  const [showFilters, setShowFilters] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id: string; title: string } | { open: boolean; bulk: true } | null>(null);

  const totalPages = Math.ceil(total / limit);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(sp.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.push(`/admin/projects?${params.toString()}`);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const hasFilters = !!(initialQ || initialStatus || initialCategory);

  async function handleDuplicate(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to duplicate project");
      const data = await res.json();
      toast.success(`"${data.title}" created`);
      router.push(`/admin/projects/${data.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Duplicate failed");
    }
  }

  async function handleDelete() {
    if (!confirmDelete || confirmDelete.open !== true) return;
    try {
      if ("bulk" in confirmDelete) {
        const ids = Array.from(selected);
        await Promise.allSettled(ids.map((id) => fetch(`/api/projects/${id}`, { method: "DELETE" })));
        setSelected(new Set());
        toast.success(`Deleted ${ids.length} project${ids.length > 1 ? "s" : ""}`);
      } else {
        const res = await fetch(`/api/projects/${confirmDelete.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete project");
        toast.success(`"${confirmDelete.title}" deleted`);
      }
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-secondary tracking-tight">Projects</h1>
          <p className="text-sm text-mid-gray mt-0.5">{total} total project{total !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 h-10 px-5 text-sm font-semibold rounded-xl border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition-all shadow-sm"
        >
          <Plus className="size-4" /> New Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-mid-gray" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateParams({ q: search, page: "1" })}
              placeholder="Search projects by title or location..."
              className="w-full h-10 pl-10 pr-4 text-sm rounded-xl border border-light-gray bg-off-white/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all placeholder:text-mid-gray/60"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium rounded-xl border transition-all ${
              showFilters || hasFilters
                ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                : "border-light-gray text-mid-gray hover:border-mid-gray hover:text-brand-secondary"
            }`}
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-light-gray text-mid-gray hover:border-mid-gray hover:text-brand-secondary transition-all"
            title={view === "grid" ? "List view" : "Grid view"}
          >
            {view === "grid" ? <List className="size-4" /> : <Grid3X3 className="size-4" />}
          </button>
        </div>
        {showFilters && (
          <Filters
            status={initialStatus}
            category={initialCategory}
            categories={categories}
            query={initialQ}
            onChange={updateParams}
            onClear={() => {
              setSearch("");
              router.push("/admin/projects");
            }}
          />
        )}
      </div>

      {selected.size > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 mb-6 flex items-center justify-between shadow-sm">
          <span className="text-sm text-red-700 font-medium">
            <span className="font-bold">{selected.size}</span> project{selected.size > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setConfirmDelete({ open: true, bulk: true })}
            className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium rounded-xl border border-red-300 text-red-700 hover:bg-red-100 transition-all"
          >
            <Trash2 className="size-4" /> Delete Selected
          </button>
        </div>
      )}

      {projects.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} selected={selected.has(p.id)} onToggle={toggleSelect} onDuplicate={handleDuplicate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray bg-off-white">
                <th className="w-12 py-3 px-4">
                  <button
                    onClick={() =>
                      setSelected(
                        selected.size === projects.length
                          ? new Set()
                          : new Set(projects.map((p) => p.id)),
                      )
                    }
                    className="text-mid-gray hover:text-brand-secondary transition-colors"
                  >
                    {selected.size === projects.length ? (
                      <CheckSquare className="size-4" />
                    ) : (
                      <Square className="size-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider hidden md:table-cell">
                  Published
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider hidden lg:table-cell">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider hidden lg:table-cell">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider hidden sm:table-cell">
                  Progress
                </th>
                <th className="text-right py-3 px-4 font-semibold text-mid-gray text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const s = STATUS_MAP[p.status];
                return (
                  <tr key={p.id} className="border-b border-light-gray/40 hover:bg-off-white/80 transition-colors">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleSelect(p.id)}
                        className="text-mid-gray hover:text-brand-secondary transition-colors"
                      >
                        {selected.has(p.id) ? (
                          <CheckSquare className="size-4" />
                        ) : (
                          <Square className="size-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl border border-light-gray/60 flex items-center justify-center text-mid-gray/40 bg-off-white shrink-0 overflow-hidden">
                          {p.img ? (
                            <img
                              src={p.img}
                              alt=""
                              className="size-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          ) : (
                            <Briefcase className="size-4" />
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/admin/projects/${p.id}`}
                            className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors"
                          >
                            {p.title}
                          </Link>
                          <p className="text-xs text-mid-gray/60 mt-0.5">
                            Updated {new Date(p.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {s && (
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${s.color}`}>
                          {s.label}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                        p.published
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-mid-gray hidden lg:table-cell">{p.category?.name ?? "—"}</td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <span className="inline-flex items-center gap-1 text-sm text-mid-gray">
                        <MapPin className="size-3.5" /> {p.location}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-light-gray overflow-hidden max-w-20">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-primary to-orange-400 transition-all"
                            style={{ width: `${p.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-mid-gray">{p.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <Link
                          href={`/admin/projects/${p.id}`}
                          className="p-2 rounded-lg text-mid-gray hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-mid-gray hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                          title="Preview"
                        >
                          <Eye className="size-4" />
                        </a>
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          className="p-2 rounded-lg text-mid-gray hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                          title="Duplicate"
                        >
                          <Copy className="size-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete({ open: true, id: p.id, title: p.title })}
                          className="p-2 rounded-lg text-mid-gray hover:text-destructive hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} total={total} onChange={updateParams} />

      <AlertDialog open={confirmDelete !== null} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDelete && "bulk" in confirmDelete
                ? `Delete ${selected.size} project${selected.size > 1 ? "s" : ""}?`
                : `Delete "${confirmDelete && "title" in confirmDelete ? confirmDelete.title : ""}"?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete && "bulk" in confirmDelete
                ? "This action cannot be undone."
                : "This project and all its associated data (media, videos, phases, attributes) will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:brightness-110">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
