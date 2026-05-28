"use client";

import { useState } from "react";
import { Plus, Upload, Eye, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadFileAction } from "@/lib/services/actions/upload.actions";

interface ImageEntry {
  _key: number;
  image: string;
  alt: string;
}

export default function BannerImagesEditor({ initialImages = [] }: { initialImages?: { image: string; alt: string }[] }) {
  const [images, setImages] = useState<ImageEntry[]>(() =>
    initialImages.map((img, i) => ({ _key: i, image: img.image, alt: img.alt ?? "" }))
  );
  const [nextKey, setNextKey] = useState(initialImages.length);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function addImage() {
    setImages((prev) => [...prev, { _key: nextKey, image: "", alt: "" }]);
    setNextKey((k) => k + 1);
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
        if (file.size > 10 * 1024 * 1024) { setUploadingIdx(null); return; }
        try {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("subdir", "banners");
          const { url } = await uploadFileAction(fd);
          setImages((prev) => prev.map((img) => img._key === idx ? { ...img, image: url } : img));
        } catch {}
        setUploadingIdx(null);
      };
      el.click();
    } catch { setUploadingIdx(null); }
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

  return (
    <div>
      {previewUrl && <Preview url={previewUrl} onClose={() => setPreviewUrl(null)} />}
      <input type="hidden" name="images" value={JSON.stringify(images.map(({ image, alt }) => ({ image, alt })))} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm">Images *</span>
        <button type="button" onClick={addImage} className="cursor-pointer text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1">
          <Plus className="size-3" /> Add
        </button>
      </div>
      {images.length === 0 && (
        <p className="text-sm text-gray-500 py-4 text-center border border-dashed border-gray-300 rounded">No images. Click Add.</p>
      )}
      <div className="space-y-3">
        {images.map((img, idx) => (
          <div key={img._key} className="p-4 border border-gray-200 rounded">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Image {idx + 1}</span>
              <button type="button" onClick={() => setImages((prev) => prev.filter((i) => i._key !== img._key))} className="cursor-pointer text-red-500 text-xs hover:text-red-700">Remove</button>
            </div>
            {img.image ? (
              <div className="relative mb-3">
                <Image src={img.image} alt="" width={600} height={180} className="w-full h-32 object-cover rounded border" />
                <div className="absolute top-1 right-1 flex gap-1">
                  <button type="button" onClick={() => setPreviewUrl(img.image)} className="cursor-pointer bg-black/60 text-white px-2 py-0.5 rounded text-xs hover:bg-black/80"><Eye className="size-3 inline" /> View</button>
                  <button type="button" onClick={() => setImages((prev) => prev.map((i) => i._key === img._key ? { ...i, image: "" } : i))} className="cursor-pointer bg-red-500 text-white px-2 py-0.5 rounded text-xs hover:bg-red-600">X</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => handleUpload(img._key)} disabled={uploadingIdx !== null} className="cursor-pointer w-full h-24 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
                {uploadingIdx === img._key ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                {uploadingIdx === img._key ? "Uploading..." : "Upload Image"}
              </button>
            )}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Alt Text</label>
              <input value={img.alt} onChange={(e) => setImages((prev) => prev.map((i) => i._key === img._key ? { ...i, alt: e.target.value } : i))} className="w-full h-10 px-3 rounded border border-gray-300 text-sm" placeholder="Describe the image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
