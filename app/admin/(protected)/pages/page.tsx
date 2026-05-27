"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import type { StaticPage } from "@/lib/static-page";

function CharCount({ current, max }: { current: number; max: number }) {
  const over = current > max;
  return <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>{current}/{max}</span>;
}

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), { ssr: false });

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";
const textarea = "w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y";

function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded text-sm shadow ${type === "ok" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
      {msg}
    </div>
  );
}

export default function StaticPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const show = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/static-pages")
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(setPages)
      .catch(() => show("Failed to load pages", "err"))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(p?: StaticPage) {
    setEditing(p?.id ?? "__new__");
    setSlug(p?.slug ?? "");
    setTitle(p?.title ?? "");
    setContentEn(p?.contentEn ?? "");
    setContentNp(p?.contentNp ?? "");
    setMetaTitle(p?.metaTitle ?? "");
    setMetaDescription(p?.metaDescription ?? "");
    setMetaKeywords(p?.metaKeywords ?? "");
    setCustomScript(p?.customScript ?? "");
    setErrors({});
  }

  function cancelEdit() {
    setEditing(null);
    setSlug("");
    setTitle("");
    setContentEn("");
    setContentNp("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setCustomScript("");
    setErrors({});
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!slug.trim()) e.slug = "Slug is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: any = { slug: slug.trim(), title, contentEn, contentNp, metaTitle, metaDescription, metaKeywords, customScript };
      if (editing && editing !== "__new__") payload.id = editing;

      const res = await fetch("/api/static-pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");
      const saved = await res.json();
      setPages((prev) => {
        const idx = prev.findIndex((p) => p.id === saved.id || p.slug === saved.slug);
        if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
        return [...prev, saved];
      });
      show("Saved");
      cancelEdit();
    } catch { show("Failed to save", "err"); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this page?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/static-pages?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPages((prev) => prev.filter((p) => p.id !== id));
      show("Deleted");
      cancelEdit();
    } catch { show("Failed to delete", "err"); }
    setDeleting(false);
  }

  if (editing !== null) {
    return (
      <div>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">{editing === "__new__" ? "New Page" : "Edit Page"}</h1>
          <button onClick={cancelEdit} className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Cancel</button>
        </div>

        <div className="bg-white p-6 border border-gray-200 max-w-3xl space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Slug *</label>
              <input value={slug} onChange={(e) => { setSlug(e.target.value); setErrors((p) => { const n = { ...p }; delete n.slug; return n; }); }} className={`${input} ${errors.slug ? "border-red-400" : ""}`} placeholder="e.g. privacy-policy" />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} placeholder="Page heading" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Content (English)</label>
            <RichTextEditor value={contentEn} onChange={setContentEn} />
          </div>

          <div>
            <label className="block text-sm mb-1">Content (Nepali)</label>
            <RichTextEditor value={contentNp} onChange={setContentNp} />
          </div>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-medium mb-3">SEO</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Meta Title</label>
                <p className="text-xs text-gray-500 mb-1">Keep under 70 characters.</p>
                <div className="relative">
                  <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={90} className={`${input} pr-16`} placeholder="SEO title override" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={metaTitle.length} max={70} /></div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Meta Description</label>
                <p className="text-xs text-gray-500 mb-1">Keep under 160 characters.</p>
                <div className="relative">
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={200} className={`${textarea} min-h-20 pr-16`} placeholder="SEO description" />
                  <div className="absolute right-2 bottom-2"><CharCount current={metaDescription.length} max={160} /></div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Meta Keywords</label>
                <p className="text-xs text-gray-500 mb-1">Keep under 200 characters.</p>
                <div className="relative">
                  <input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} maxLength={220} className={`${input} pr-16`} placeholder="SEO keywords" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={metaKeywords.length} max={200} /></div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Custom Script</label>
                <p className="text-xs text-gray-500 mb-1">Optional script or tracking code.</p>
                <textarea value={customScript} onChange={(e) => setCustomScript(e.target.value)} rows={3} className={`${textarea} min-h-20 font-mono text-xs`} placeholder="<script>..." />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="cursor-pointer bg-black text-white text-sm px-5 py-2 rounded hover:opacity-85 disabled:opacity-50 flex items-center gap-2">
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              {saving ? "Saving..." : "Save"}
            </button>
            {editing !== "__new__" && (
              <button onClick={() => handleDelete(editing)} disabled={deleting} className="cursor-pointer border border-red-200 text-red-500 text-sm px-5 py-2 rounded hover:bg-red-50 disabled:opacity-50 flex items-center gap-2">
                {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-6">Pages</h1>
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Static Pages</h1>
        <button onClick={() => startEdit()} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </button>
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
                  <td className="px-4 py-3">
                    <button onClick={() => startEdit(p)} className="cursor-pointer text-sm text-gray-600 hover:text-black">Edit</button>
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
