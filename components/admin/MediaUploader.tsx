"use client";

import { useCallback, useState } from "react";
import { uid } from "@/lib/id";
import { toast } from "sonner";
import { Upload, X, Star, GripVertical } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

interface Props {
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}

export function MediaUploader({ items, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (!files.length) return;
      await uploadFiles(files);
    },
    [items.length],
  );

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    await uploadFiles(files);
    e.target.value = "";
  };

  async function uploadFiles(files: File[]) {
    setUploading(true);
    const newItems: MediaItem[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("subdir", "images");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        toast.error(err.error || "Upload failed");
        continue;
      }
      const { url } = await res.json();
      newItems.push({
        id: uid(),
        url,
        alt: "",
        isHero: items.length === 0 && newItems.length === 0,
        order: items.length + newItems.length,
      });
    }
    onChange([...items, ...newItems]);
    setUploading(false);
  }

  const remove = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    if (items.find((i) => i.id === id)?.isHero && next.length) next[0].isHero = true;
    onChange(next);
  };

  const setHero = (id: string) => {
    onChange(items.map((i) => ({ ...i, isHero: i.id === id })));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-light-gray rounded-xl p-8 text-center hover:border-brand-primary/50 transition cursor-pointer"
      >
        <Upload className="mx-auto size-8 text-mid-gray mb-2" />
        <p className="text-sm text-mid-gray mb-2">
          Drag and drop images here, or click to browse
        </p>
        <label className="inline-flex h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition cursor-pointer">
          Browse Files
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleInput} />
        </label>
        {uploading && <p className="text-xs text-mid-gray mt-2">Uploading...</p>}
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative group rounded-lg overflow-hidden border-2 ${
                item.isHero ? "border-brand-primary" : "border-transparent"
              }`}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setHero(item.id)}
                  className={`p-1.5 rounded-full ${
                    item.isHero
                      ? "bg-brand-primary text-white"
                      : "bg-white/90 text-mid-gray hover:bg-brand-primary hover:text-white"
                  }`}
                  title="Set as hero"
                >
                  <Star className="size-3.5" fill={item.isHero ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="p-1.5 rounded-full bg-white/90 text-mid-gray hover:bg-destructive hover:text-white"
                  title="Remove"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              {item.isHero && (
                <span className="absolute top-1 left-1 bg-brand-primary text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  HERO
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
