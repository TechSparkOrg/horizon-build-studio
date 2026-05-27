"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Plus, Save, Trash2, Upload, Loader2, FileIcon, Eye } from "lucide-react";
import type { PageModelGroup } from "@/lib/page-model";

const ModelPreview = dynamic(() => import("@/components/model-preview"), { ssr: false });

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";

interface ModelForm {
  _key: number;
  url: string;
  filename: string;
  type: string;
  label: string;
}

function CharCount({ current, max }: { current: number; max: number }) {
  const over = current > max;
  return <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>{current}/{max}</span>;
}

function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded text-sm shadow ${type === "ok" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
      {msg}
    </div>
  );
}

export default function ModelsPage() {
  const [groups, setGroups] = useState<PageModelGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [models3d, setModels3d] = useState<ModelForm[]>([]);
  const [nextKey, setNextKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const show = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/page-models")
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(setGroups)
      .catch(() => show("Failed to load models", "err"))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(g?: PageModelGroup) {
    setEditing(g?.id ?? "__new__");
    setSlug(g?.slug ?? "");
    setTitle(g?.title ?? "");
    setMetaTitle(g?.metaTitle ?? "");
    setMetaDescription(g?.metaDescription ?? "");
    setMetaKeywords(g?.metaKeywords ?? "");
    setCustomScript(g?.customScript ?? "");
    setModels3d((g?.models3d ?? []).map((m, i) => ({ _key: i, url: m.url, filename: m.filename, type: m.type, label: m.label })));
    setNextKey(g?.models3d.length ?? 0);
    setErrors({});
  }

  function cancelEdit() {
    setEditing(null);
    setSlug("");
    setTitle("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setCustomScript("");
    setModels3d([]);
    setErrors({});
  }

  function addModel() {
    setModels3d((prev) => [...prev, { _key: nextKey, url: "", filename: "", type: "glb", label: "" }]);
    setNextKey((k) => k + 1);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!slug.trim()) e.slug = "Slug is required";
    if (models3d.length === 0) e.models3d = "At least one model is required";
    models3d.forEach((m, i) => { if (!m.url) e[`url_${m._key}`] = `Model ${i + 1} needs a file`; });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleUpload(idx: number) {
    setUploadingIdx(idx);
    try {
      const el = document.createElement("input");
      el.type = "file";
      el.accept = ".glb,.gltf";
      el.onchange = async () => {
        const file = el.files?.[0];
        if (!file) { setUploadingIdx(null); return; }
        if (file.size > 50 * 1024 * 1024) { show("File too large (max 50MB)", "err"); setUploadingIdx(null); return; }
        try {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("subdir", "models");
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          if (!res.ok) throw new Error("Upload failed");
          const { url } = await res.json();
          const ext = file.name.split(".").pop()?.toLowerCase() ?? "glb";
          setModels3d((prev) => prev.map((m) => m._key === idx ? { ...m, url, filename: file.name, type: ext } : m));
          setErrors((prev) => { const n = { ...prev }; delete n[`url_${idx}`]; return n; });
          show("Uploaded");
        } catch { show("Upload failed", "err"); }
        setUploadingIdx(null);
      };
      el.click();
    } catch { show("Upload failed", "err"); setUploadingIdx(null); }
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: any = { slug: slug.trim(), title: title.trim(), metaTitle, metaDescription, metaKeywords, customScript };
      if (editing && editing !== "__new__") payload.id = editing;
      payload.models3d = models3d.map((m) => ({ url: m.url, filename: m.filename, type: m.type, label: m.label }));

      const res = await fetch("/api/page-models", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");
      const saved = await res.json();
      setGroups((prev) => {
        const idx = prev.findIndex((g) => g.id === saved.id || g.slug === saved.slug);
        if (idx >= 0) { const n = [...prev]; n[idx] = saved; return n; }
        return [...prev, saved];
      });
      show("Saved");
      cancelEdit();
    } catch { show("Failed to save", "err"); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this model group?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/page-models?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setGroups((prev) => prev.filter((g) => g.id !== id));
      show("Deleted");
      cancelEdit();
    } catch { show("Failed to delete", "err"); }
    setDeleting(false);
  }

  if (editing !== null) {
    return (
      <div>
        {previewUrl && <ModelPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
        {toast && <Toast msg={toast.msg} type={toast.type} />}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">{editing === "__new__" ? "New Model Group" : "Edit Model Group"}</h1>
          <button onClick={cancelEdit} className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Cancel</button>
        </div>

        <div className="bg-white p-6 border border-gray-200 max-w-2xl space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Slug *</label>
              <input value={slug} onChange={(e) => { setSlug(e.target.value); setErrors((p) => { const n = { ...p }; delete n.slug; return n; }); }} className={`${input} ${errors.slug ? "border-red-400" : ""}`} placeholder="e.g. home" />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} placeholder="Label" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">3D Models *</span>
              <button onClick={addModel} className="cursor-pointer text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1">
                <Plus className="size-3" /> Add
              </button>
            </div>

            {errors.models3d && <p className="text-xs text-red-500 mb-2">{errors.models3d}</p>}

            {models3d.length === 0 && !errors.models3d && (
              <p className="text-sm text-gray-500 py-4 text-center border border-dashed border-gray-300 rounded">No models. Click Add.</p>
            )}

            <div className="space-y-3">
              {models3d.map((m, idx) => (
                <div key={m._key} className="p-4 border border-gray-200 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Model {idx + 1}</span>
                    <button onClick={() => setModels3d((prev) => prev.filter((i) => i._key !== m._key))} className="cursor-pointer text-red-500 text-xs hover:text-red-700">Remove</button>
                  </div>

                  {m.url ? (
                    <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded flex items-center gap-3">
                      <FileIcon className="size-6 text-gray-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.filename || "model.glb"}</p>
                        <p className="text-xs text-gray-500">.{m.type}</p>
                      </div>
                      <button onClick={() => setPreviewUrl(m.url)} className="cursor-pointer text-xs text-gray-600 hover:text-black border border-gray-300 px-2 py-1 rounded flex items-center gap-1"><Eye className="size-3" /> View</button>
                      <button onClick={() => setModels3d((prev) => prev.map((i) => i._key === m._key ? { ...i, url: "", filename: "", type: "glb" } : i))} className="cursor-pointer bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">X</button>
                    </div>
                  ) : (
                    <button onClick={() => handleUpload(m._key)} disabled={uploadingIdx !== null} className="cursor-pointer w-full h-24 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
                      {uploadingIdx === m._key ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                      {uploadingIdx === m._key ? "Uploading..." : "Upload .glb / .gltf"}
                    </button>
                  )}
                  {errors[`url_${m._key}`] && <p className="text-xs text-red-500 mb-2">{errors[`url_${m._key}`]}</p>}

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Label</label>
                    <input value={m.label} onChange={(e) => setModels3d((prev) => prev.map((i) => i._key === m._key ? { ...i, label: e.target.value } : i))} className={input} placeholder="Optional label" />
                  </div>
                </div>
              ))}
            </div>
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
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={200} className="w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y min-h-20 pr-16" placeholder="SEO description" />
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
                <textarea value={customScript} onChange={(e) => setCustomScript(e.target.value)} rows={3} className="w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y min-h-20 font-mono text-xs" placeholder="<script>..." />
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
        <h1 className="text-xl font-bold mb-6">3D Models</h1>
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {previewUrl && <ModelPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">3D Models</h1>
        <button onClick={() => startEdit()} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        {groups.length === 0 ? (
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
              {groups.map((g) => (
                <tr key={g.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{g.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{g.title || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {g.models3d.map((m) => (
                        <button key={m.id} onClick={() => setPreviewUrl(m.url)} className="cursor-pointer text-xs border border-gray-200 px-2 py-1 rounded hover:bg-gray-50 flex items-center gap-1">
                          <FileIcon className="size-3" />
                          {m.filename || "model.glb"}
                        </button>
                      ))}
                      {g.models3d.length === 0 && <span className="text-gray-400 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => startEdit(g)} className="cursor-pointer text-sm text-gray-600 hover:text-black">Edit</button>
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
