"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGlobalControl } from "@/app/admin/cache-context";

function ToastOnLoadInner({ tag, tags }: { tag?: string; tags?: string[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const cacheControl = useGlobalControl();

  useEffect(() => {
    const message = sp.get("success");
    if (!message) return;
    
    toast.success(decodeURIComponent(message));
    
    // Purge related cache tags and stats in client-side context
    const tagsToUpdate = [...(tags || [])];
    if (tag) tagsToUpdate.push(tag);
    tagsToUpdate.push("stats"); // Always update stats when things are modified
    
    cacheControl.cacheUpdate(tagsToUpdate);
    
    const params = new URLSearchParams(sp.toString());
    params.delete("success");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [sp, router, tag, JSON.stringify(tags), cacheControl]);

  return null;
}

export function ToastOnLoad({ tag, tags }: { tag?: string; tags?: string[] }) {
  return (
    <Suspense fallback={null}>
      <ToastOnLoadInner tag={tag} tags={tags} />
    </Suspense>
  );
}
