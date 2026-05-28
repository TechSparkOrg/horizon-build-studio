"use client";

import { useText } from "@/lib/lang-client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useText();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-20 min-h-[400px] flex flex-col items-center justify-center text-mid-gray bg-off-white">
      <div className="size-12 rounded-full bg-red-100 grid place-items-center mb-4">
        <span className="text-red-600 text-xl font-bold">!</span>
      </div>
      <h2 className="font-display text-2xl font-bold text-brand-secondary mb-2">
        {t.errors.title}
      </h2>
      <p className="text-mid-gray text-center max-w-md">
        {error.message || t.errors.default}
      </p>
      <button
        onClick={reset}
        className="mt-6 h-11 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
      >
        {t.errors.retry}
      </button>
    </div>
  );
}
