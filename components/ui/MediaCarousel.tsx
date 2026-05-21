"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function MediaCarousel({ media }: { media: { id: string; url: string; alt: string }[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((v) => (v - 1 + media.length) % media.length), [media.length]);
  const next = useCallback(() => setIdx((v) => (v + 1) % media.length), [media.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, prev, next]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {media.map((m, i) => (
          <button
            key={m.id}
            onClick={() => { setIdx(i); setOpen(true); }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-light-gray/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-500 text-left"
          >
            <Image
              src={m.url}
              alt={m.alt || ""}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-300 flex items-center justify-center">
              <span className="size-12 rounded-full bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="size-5 text-brand-secondary" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="absolute top-4 right-4 size-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition z-10"
            aria-label="Close"
          >
            <X className="size-5 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition z-10"
            aria-label="Next"
          >
            <ChevronRight className="size-5 text-white" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={media[idx].url}
              alt={media[idx].alt || ""}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className={`size-2 rounded-full transition ${i === idx ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
