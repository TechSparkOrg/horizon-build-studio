"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import type { PageSEO } from "@/lib/page-seo";

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";
const textarea = "w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y";

const LIMITS = {
  metaTitle: 70,
  metaDescription: 160,
  metaKeywords: 200,
};

function CharCount({ current, max }: { current: number; max: number }) {
  const over = current > max;
  return <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>{current}/{max}</span>;
}

function Field({ label, desc, error, children }: { label: string; desc?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      {desc && <p className="text-xs text-gray-500 mb-1">{desc}</p>}
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded text-sm shadow ${type === "ok" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
      {msg}
    </div>
  );
}

export default function SEOAdminPage() {
  const [items, setItems] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [text1En, setText1En] = useState("");
  const [text1Np, setText1Np] = useState("");
  const [text2En, setText2En] = useState("");
  const [text2Np, setText2Np] = useState("");
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
    fetch("/api/page-seo")
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(setItems)
      .catch(() => show("Failed to load SEO entries", "err"))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(item?: PageSEO) {
    setEditing(item?.id ?? "__new__");
    setSlug(item?.slug ?? "");
    setTitle(item?.title ?? "");
    setText1En(item?.text1En ?? "");
    setText1Np(item?.text1Np ?? "");
    setText2En(item?.text2En ?? "");
    setText2Np(item?.text2Np ?? "");
    setMetaTitle(item?.metaTitle ?? "");
    setMetaDescription(item?.metaDescription ?? "");
    setMetaKeywords(item?.metaKeywords ?? "");
    setCustomScript(item?.customScript ?? "");
    setErrors({});
  }

  function cancelEdit() {
    setEditing(null);
    setSlug("");
    setTitle("");
    setText1En("");
    setText1Np("");
    setText2En("");
    setText2Np("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setCustomScript("");
    setErrors({});
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!slug.trim()) e.slug = "Slug is required";
    if (metaTitle.length > LIMITS.metaTitle) e.metaTitle = `Max ${LIMITS.metaTitle} characters`;
    if (metaDescription.length > LIMITS.metaDescription) e.metaDescription = `Max ${LIMITS.metaDescription} characters`;
    if (metaKeywords.length > LIMITS.metaKeywords) e.metaKeywords = `Max ${LIMITS.metaKeywords} characters`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: any = { slug: slug.trim(), title, text1En, text1Np, text2En, text2Np, metaTitle, metaDescription, metaKeywords, customScript };
      if (editing && editing !== "__new__") payload.id = editing;

      const res = await fetch("/api/page-seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");
      const saved = await res.json();
      setItems((prev) => {
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
    if (!confirm("Delete this SEO entry?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/page-seo?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => prev.filter((p) => p.id !== id));
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
          <h1 className="text-xl font-bold">{editing === "__new__" ? "New SEO Entry" : "Edit SEO Entry"}</h1>
          <button onClick={cancelEdit} className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Cancel</button>
        </div>

        <div className="bg-white p-6 border border-gray-200 max-w-3xl space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug *" error={errors.slug}>
              <input value={slug} onChange={(e) => { setSlug(e.target.value); setErrors((p) => { const n = { ...p }; delete n.slug; return n; }); }} className={`${input} ${errors.slug ? "border-red-400" : ""}`} placeholder="e.g. home, about, contact" />
            </Field>
            <Field label="Title">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} placeholder="Display label" />
            </Field>
          </div>

          <Field label="Text 1 (English)">
            <textarea value={text1En} onChange={(e) => setText1En(e.target.value)} className={`${textarea} min-h-24`} />
          </Field>
          <Field label="Text 1 (Nepali)">
            <textarea value={text1Np} onChange={(e) => setText1Np(e.target.value)} className={`${textarea} min-h-24`} />
          </Field>

          <Field label="Text 2 (English)">
            <textarea value={text2En} onChange={(e) => setText2En(e.target.value)} className={`${textarea} min-h-24`} />
          </Field>
          <Field label="Text 2 (Nepali)">
            <textarea value={text2Np} onChange={(e) => setText2Np(e.target.value)} className={`${textarea} min-h-24`} />
          </Field>

          <div className="border-t border-gray-200 pt-5">
            <p className="text-sm font-medium mb-3">SEO Tags</p>
            <div className="space-y-4">
              <Field label="Meta Title" desc="Browser tab title & search headline. Keep under 70 characters." error={errors.metaTitle}>
                <div className="relative">
                  <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={LIMITS.metaTitle + 20} className={`${input} pr-16`} placeholder="Override page title tag" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={metaTitle.length} max={LIMITS.metaTitle} /></div>
                </div>
              </Field>
              <Field label="Meta Description" desc="Search result snippet. Keep under 160 characters." error={errors.metaDescription}>
                <div className="relative">
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={LIMITS.metaDescription + 40} className={`${textarea} min-h-20 pr-16`} />
                  <div className="absolute right-2 bottom-2"><CharCount current={metaDescription.length} max={LIMITS.metaDescription} /></div>
                </div>
              </Field>
              <Field label="Meta Keywords" desc="Comma-separated keywords." error={errors.metaKeywords}>
                <div className="relative">
                  <input value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} maxLength={LIMITS.metaKeywords + 50} className={`${input} pr-16`} placeholder="keyword1, keyword2, keyword3" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={metaKeywords.length} max={LIMITS.metaKeywords} /></div>
                </div>
              </Field>
            </div>
          </div>

          <Field label="Custom Script">
            <textarea value={customScript} onChange={(e) => setCustomScript(e.target.value)} className={`${textarea} min-h-28 font-mono text-xs`} placeholder="<script>...</script> or <meta> tags or JSON-LD" />
          </Field>

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
        <h1 className="text-xl font-bold mb-6">Page SEO</h1>
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Page SEO</h1>
        <button onClick={() => startEdit()} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> Add Page
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 p-8 text-center">No SEO entries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 text-xs">
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Meta Title</th>
                <th className="px-4 py-3">Script</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{item.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.title || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{item.metaTitle || "—"}</td>
                  <td className="px-4 py-3 text-sm">{item.customScript ? <span className="text-green-600 text-xs">Yes</span> : <span className="text-gray-400 text-xs">—</span>}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => startEdit(item)} className="cursor-pointer text-sm text-gray-600 hover:text-black">Edit</button>
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
