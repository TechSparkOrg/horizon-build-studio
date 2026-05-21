"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export function ModelViewer3D({
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
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(loading === "eager");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (loading !== "lazy" || !ref.current) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  if (!mounted) {
    return <div className={className ?? "w-full h-[400px] sm:h-[500px] bg-slate-50"} />;
  }

  return (
    <div
      ref={ref}
      className={
        className ??
        "relative w-full h-[400px] sm:h-[500px] bg-slate-50 border border-light-gray rounded-3xl overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)]"
      }
    >
      {!visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
            <span className="text-xs text-mid-gray">Loading 3D model...</span>
          </div>
        </div>
      )}

      {visible && (
        <>
          <Script
            type="module"
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
            strategy="afterInteractive"
          />
          {/* @ts-ignore */}
          <model-viewer
            src={src}
            alt="Horizon 3D Architectural Model Render"
            auto-rotate
            {...(!disableControls && { "camera-controls": true, ar: true })}
            loading={loading}
            shadow-intensity="1"
            exposure="1"
            shadow-softness="0.6"
            environment-image="neutral"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          >
            {!hideBadge && !disableControls && (
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-brand-secondary shadow-sm border border-light-gray flex items-center gap-1.5 pointer-events-none">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Interactive 3D View (Drag to Rotate)
              </div>
            )}
            {/* @ts-ignore */}
          </model-viewer>
        </>
      )}
    </div>
  );
}
