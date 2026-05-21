"use client";

import { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"file" | "url">(value ? "url" : "file");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch {
      /* ignore */
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`h-7 px-2.5 text-xs border transition ${
            mode === "file"
              ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
              : "border-light-gray text-mid-gray hover:border-mid-gray"
          }`}
        >
          <Upload className="size-3 inline mr-1" /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`h-7 px-2.5 text-xs border transition ${
            mode === "url"
              ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
              : "border-light-gray text-mid-gray hover:border-mid-gray"
          }`}
        >
          <LinkIcon className="size-3 inline mr-1" /> URL
        </button>
      </div>

      {mode === "file" ? (
        <label className="flex items-center justify-center gap-2 h-20 border border-dashed border-light-gray text-mid-gray text-xs cursor-pointer hover:border-brand-primary hover:text-brand-primary transition">
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="size-4" />
              Click to upload image
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full h-8 px-2.5 text-xs border border-light-gray focus:outline-none focus:border-brand-primary"
        />
      )}

      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-28 w-auto object-cover border border-light-gray"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.3";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 size-5 rounded-full bg-destructive text-white flex items-center justify-center"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
}
