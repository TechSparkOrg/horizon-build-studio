"use client";

import { Box } from "lucide-react";
import { toast } from "sonner";
import type { ModelItem } from "../types";
import { uid } from "@/lib/id";

export function ModelsSection({
  items,
  onChange,
}: {
  items: ModelItem[];
  onChange: (items: ModelItem[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">
        3D Models
      </label>
      <p className="text-xs text-mid-gray mb-4">Upload GLTF or GLB files.</p>

      <div className="border-2 border-dashed border-light-gray rounded-xl p-8 text-center">
        <Box className="mx-auto size-8 text-mid-gray mb-2" />
        <p className="text-sm text-mid-gray mb-2">Upload 3D model files</p>
        <input
          type="file"
          accept=".gltf,.glb"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            const added: ModelItem[] = [];
            for (const file of files) {
              const fd = new FormData();
              fd.set("file", file);
              fd.set("subdir", "models");
              const res = await fetch("/api/upload", { method: "POST", body: fd });
              if (!res.ok) {
                const err = await res.json().catch(() => ({ error: res.statusText }));
                toast.error(err.error || "Upload failed");
                continue;
              }
              const { url } = await res.json();
              added.push({
                id: uid(),
                filename: file.name,
                url,
                type: file.name.endsWith(".gltf") ? "gltf" : "glb",
              });
            }
            onChange([...items, ...added]);
          }}
          className="hidden"
          id="model-upload"
        />
        <label
          htmlFor="model-upload"
          className="inline-flex h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition cursor-pointer"
        >
          Browse Files
        </label>
      </div>

      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          {items.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Box className="size-5 text-brand-primary" />
                <div>
                  <p className="text-sm font-medium text-dark-text">{m.filename}</p>
                  <p className="text-xs text-mid-gray uppercase">{m.type}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange(items.filter((x) => x.id !== m.id))}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
