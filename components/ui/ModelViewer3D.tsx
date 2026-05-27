"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import Script from "next/script";
import { Box } from "lucide-react";

const LOADER = (
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50/90 backdrop-blur-sm pointer-events-none">
    <div className="relative">
      <div className="size-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
        <Box className="size-5 text-brand-primary/60" />
      </div>
      <div className="absolute -inset-1 rounded-2xl border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
    </div>
    <span className="text-xs font-medium text-slate-400 tracking-wide">Loading model…</span>
  </div>
);

function ModelViewer3DImpl({
  src,
  className,
  hideBadge,
  disableControls,
  loading = "lazy",
}: {
  src: string;
  className?: string;
  hideBadge?: boolean;
  disableControls?: boolean;
  loading?: "eager" | "lazy";
}) {
  const [visible, setVisible] = useState(loading === "eager");
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading !== "lazy" || !ref.current) { setVisible(true); return; }
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const modelRef = useCallback((el: HTMLElement | null) => {
    if (el) el.addEventListener("load", () => setLoaded(true), { once: true });
  }, []);

  return (
    <div
      ref={ref}
      className={
        className ??
        "relative w-full h-[400px] sm:h-[500px] bg-slate-50 rounded-3xl overflow-hidden"
      }
    >
      {!loaded && LOADER}

      {visible && (
        <>
          <Script
            type="module"
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
            strategy="afterInteractive"
          />
          {/* @ts-ignore */}
          <model-viewer
            ref={modelRef}
            src={src}
            alt="Horizon 3D Architectural Model Render"
            auto-rotate
            auto-rotate-delay="500"
            rotation-per-second="20deg"
            {...(!disableControls && { "camera-controls": true, ar: true })}
            loading={loading}
            shadow-intensity="1.2"
            exposure="0.95"
            shadow-softness="0.8"
            environment-image="neutral"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          >
            {!hideBadge && !disableControls && (
              <div
                slot="hotspot-0"
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-brand-secondary shadow-sm border border-light-gray flex items-center gap-1.5 pointer-events-none select-none"
              >
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Drag to rotate
              </div>
            )}
            {/* @ts-ignore */}
          </model-viewer>
        </>
      )}
    </div>
  );
}

export const ModelViewer3D = memo(ModelViewer3DImpl);