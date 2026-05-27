"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Save, Trash2, Upload, Eye, X, Loader2 } from "lucide-react";
import Image from "next/image";
import type { PageBannerGroup } from "@/lib/page-banner";

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";

interface ImageForm {
  _key: number;
  image: string;
  alt: string;
}

function Toast({ msg, type }: { msg: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded text-sm shadow ${type === "ok" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
      {msg}
    </div>
  );
}

function Preview({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-8 cursor-pointer" onClick={onClose}>
      <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <Image src={url} alt="" width={1600} height={900} className="max-w-full max-h-[90vh] object-contain rounded" />
        <button onClick={onClose} className="absolute -top-3 -right-3 bg-white text-gray-800 size-8 rounded-full grid place-items-center shadow border cursor-pointer"><X className="size-4" /></button>
      </div>
    </div>
  );
}

function CharCount({ current, max }: { current: number; max: number }) {
  const over = current > max;
  return <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>{current}/{max}</span>;
}

export default function BannersPage() {
  const [groups, setGroups] = useState<PageBannerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [images, setImages] = useState<ImageForm[]>([]);
  const [nextKey, setNextKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const show = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/page-banners")
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(setGroups)
      .catch(() => show("Failed to load banners", "err"))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(g?: PageBannerGroup) {
    setEditing(g?.id ?? "__new__");
    setSlug(g?.slug ?? "");
    setTitle(g?.title ?? "");
    setMetaTitle(g?.metaTitle ?? "");
    setMetaDescription(g?.metaDescription ?? "");
    setMetaKeywords(g?.metaKeywords ?? "");
    setCustomScript(g?.customScript ?? "");
    setImages((g?.images ?? []).map((img, i) => ({ _key: i, image: img.image, alt: img.alt ?? "" })));
    setNextKey(g?.images.length ?? 0);
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
    setImages([]);
    setErrors({});
  }

  function addImage() {
    setImages((prev) => [...prev, { _key: nextKey, image: "", alt: "" }]);
    setNextKey((k) => k + 1);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!slug.trim()) e.slug = "Slug is required";
    if (images.length === 0) e.images = "At least one image is required";
    images.forEach((img, i) => { if (!img.image) e[`img_${img._key}`] = `Image ${i + 1} needs a file`; });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleUpload(idx: number) {
    setUploadingIdx(idx);
    try {
      const el = document.createElement("input");
      el.type = "file";
      el.accept = "image/*";
      el.onchange = async () => {
        const file = el.files?.[0];
        if (!file) { setUploadingIdx(null); return; }
        if (file.size > 10 * 1024 * 1024) { show("File too large (max 10MB)", "err"); setUploadingIdx(null); return; }
        try {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("subdir", "banners");
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          if (!res.ok) throw new Error("Upload failed");
          const { url } = await res.json();
          setImages((prev) => prev.map((img) => img._key === idx ? { ...img, image: url } : img));
          setErrors((prev) => { const n = { ...prev }; delete n[`img_${idx}`]; return n; });
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
      payload.images = images.map((img) => ({ image: img.image, alt: img.alt }));

      const res = await fetch("/api/page-banners", {
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
    if (!confirm("Delete this banner?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/page-banners?id=${id}`, { method: "DELETE" });
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
        {previewUrl && <Preview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
        {toast && <Toast msg={toast.msg} type={toast.type} />}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">{editing === "__new__" ? "New Banner" : "Edit Banner"}</h1>
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
              <span className="text-sm">Images *</span>
              <button onClick={addImage} className="cursor-pointer text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1">
                <Plus className="size-3" /> Add
              </button>
            </div>

            {errors.images && <p className="text-xs text-red-500 mb-2">{errors.images}</p>}

            {images.length === 0 && !errors.images && (
              <p className="text-sm text-gray-500 py-4 text-center border border-dashed border-gray-300 rounded">No images. Click Add.</p>
            )}

            <div className="space-y-3">
              {images.map((img, idx) => (
                <div key={img._key} className="p-4 border border-gray-200 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Image {idx + 1}</span>
                    <button onClick={() => setImages((prev) => prev.filter((i) => i._key !== img._key))} className="cursor-pointer text-red-500 text-xs hover:text-red-700">Remove</button>
                  </div>

                  {img.image ? (
                    <div className="relative mb-3">
                      <Image src={img.image} alt="" width={600} height={180} className="w-full h-32 object-cover rounded border" />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button onClick={() => setPreviewUrl(img.image)} className="cursor-pointer bg-black/60 text-white px-2 py-0.5 rounded text-xs hover:bg-black/80"><Eye className="size-3 inline" /> View</button>
                        <button onClick={() => setImages((prev) => prev.map((i) => i._key === img._key ? { ...i, image: "" } : i))} className="cursor-pointer bg-red-500 text-white px-2 py-0.5 rounded text-xs hover:bg-red-600">X</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => handleUpload(img._key)} disabled={uploadingIdx !== null} className="cursor-pointer w-full h-24 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
                      {uploadingIdx === img._key ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                      {uploadingIdx === img._key ? "Uploading..." : "Upload Image"}
                    </button>
                  )}
                  {errors[`img_${img._key}`] && <p className="text-xs text-red-500 mb-2">{errors[`img_${img._key}`]}</p>}

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Alt Text</label>
                    <input value={img.alt} onChange={(e) => setImages((prev) => prev.map((i) => i._key === img._key ? { ...i, alt: e.target.value } : i))} className={input} placeholder="Describe the image" />
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
        <h1 className="text-xl font-bold mb-6">Page Banners</h1>
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {previewUrl && <Preview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Page Banners</h1>
        <button onClick={() => startEdit()} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> New
        </button>
      </div>

      <div className="bg-white border border-gray-200">
        {groups.length === 0 ? (
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
              {groups.map((g) => (
                <tr key={g.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-mono text-sm">{g.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{g.title || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {g.images.map((img) => (
                        <div key={img.id} className="relative size-9 rounded overflow-hidden border cursor-pointer group" onClick={() => setPreviewUrl(img.image)}>
                          <Image src={img.image} alt="" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition">
                            <Eye className="size-3.5 text-white opacity-0 group-hover:opacity-100" />
                          </div>
                        </div>
                      ))}
                      {g.images.length === 0 && <span className="text-gray-400 text-xs">—</span>}
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
