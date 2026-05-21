"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className ?? "w-full h-[400px] sm:h-[500px] bg-slate-50"} />;
  }

  return (
    <div
      className={
        className ??
        "relative w-full h-[400px] sm:h-[500px] bg-slate-50 border border-light-gray rounded-3xl overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)]"
      }
    >
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
    </div>
  );
}
