"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function ToastOnLoadInner() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = sp.get("success");
    if (!message) return;
    toast.success(decodeURIComponent(message));
    const params = new URLSearchParams(sp.toString());
    params.delete("success");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [sp, router]);

  return null;
}

export function ToastOnLoad() {
  return (
    <Suspense fallback={null}>
      <ToastOnLoadInner />
    </Suspense>
  );
}
