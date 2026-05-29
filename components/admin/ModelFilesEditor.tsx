"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Upload, FileIcon, Eye, Loader2 } from "lucide-react";

const ModelPreview = dynamic(() => import("@/components/model-preview"), { ssr: false });

interface ModelEntry {
  _key: number;
  url: string;
  filename: string;
  type: string;
  label: string;
}

export default function ModelFilesEditor({ initialModels = [] }: { initialModels?: { url: string; filename: string; type: string; label: string }[] }) {
  const [models3d, setModels3d] = useState<ModelEntry[]>(() =>
    initialModels.map((m, i) => ({ _key: i, url: m.url, filename: m.filename, type: m.type, label: m.label }))
  );
  const [nextKey, setNextKey] = useState(initialModels.length);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function addModel() {
    setModels3d((prev) => [...prev, { _key: nextKey, url: "", filename: "", type: "glb", label: "" }]);
    setNextKey((k) => k + 1);
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
        try {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("subdir", "models");
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          if (!res.ok) throw new Error("Upload failed");
          const { url } = await res.json();
          const ext = file.name.split(".").pop()?.toLowerCase() ?? "glb";
          setModels3d((prev) => prev.map((m) => m._key === idx ? { ...m, url, filename: file.name, type: ext } : m));
        } catch {}
        setUploadingIdx(null);
      };
      el.click();
    } catch { setUploadingIdx(null); }
  }

  return (
    <div>
      {previewUrl && <ModelPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
      <input type="hidden" name="models3d" value={JSON.stringify(models3d.map(({ url, filename, type, label }) => ({ url, filename, type, label })))} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm">3D Models *</span>
        <button type="button" onClick={addModel} className="cursor-pointer text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1">
          <Plus className="size-3" /> Add
        </button>
      </div>
      {models3d.length === 0 && (
        <p className="text-sm text-gray-500 py-4 text-center border border-dashed border-gray-300 rounded">No models. Click Add.</p>
      )}
      <div className="space-y-3">
        {models3d.map((m, idx) => (
          <div key={m._key} className="p-4 border border-gray-200 rounded">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Model {idx + 1}</span>
              <button type="button" onClick={() => setModels3d((prev) => prev.filter((i) => i._key !== m._key))} className="cursor-pointer text-red-500 text-xs hover:text-red-700">Remove</button>
            </div>
            {m.url ? (
              <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded flex items-center gap-3">
                <FileIcon className="size-6 text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.filename || "model.glb"}</p>
                  <p className="text-xs text-gray-500">.{m.type}</p>
                </div>
                <button type="button" onClick={() => setPreviewUrl(m.url)} className="cursor-pointer text-xs text-gray-600 hover:text-black border border-gray-300 px-2 py-1 rounded flex items-center gap-1"><Eye className="size-3" /> View</button>
                <button type="button" onClick={() => setModels3d((prev) => prev.map((i) => i._key === m._key ? { ...i, url: "", filename: "", type: "glb" } : i))} className="cursor-pointer bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">X</button>
              </div>
            ) : (
              <button type="button" onClick={() => handleUpload(m._key)} disabled={uploadingIdx !== null} className="cursor-pointer w-full h-24 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
                {uploadingIdx === m._key ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                {uploadingIdx === m._key ? "Uploading..." : "Upload .glb / .gltf"}
              </button>
            )}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Label</label>
              <input value={m.label} onChange={(e) => setModels3d((prev) => prev.map((i) => i._key === m._key ? { ...i, label: e.target.value } : i))} className="w-full h-10 px-3 rounded border border-gray-300 text-sm" placeholder="Optional label" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
