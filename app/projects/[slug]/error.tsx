"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <h2 className="text-2xl font-bold text-brand-dark">Something went wrong!</h2>
      <p className="text-mid-gray">We encountered an error loading this project.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-brand-primary text-white rounded font-medium hover:bg-brand-primary/90 transition"
      >
        Try again
      </button>
    </div>
  );
}
