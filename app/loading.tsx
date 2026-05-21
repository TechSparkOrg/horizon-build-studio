import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark/95 backdrop-blur-md">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-16 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
          <div className="absolute size-10 rounded-full border-4 border-brand-primary/10 border-b-brand-primary animate-spin [animation-direction:reverse] [animation-duration:1s]" />

          <img
            src="/favicon.png"
            alt="Horizon Logo"
            className="size-6 object-contain animate-pulse"
          />
        </div>

        <div className="flex flex-col items-center gap-1 mt-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-white font-label">
            Horizon Nepal
          </p>
          <span className="text-[11px] text-mid-gray/80 tracking-wider">
            Structuring the Future...
          </span>
        </div>
      </div>
    </div>
  );
}
