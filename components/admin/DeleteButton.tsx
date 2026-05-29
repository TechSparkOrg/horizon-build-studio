"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  id,
  label,
  onDelete,
}: {
  id: string;
  label: string;
  onDelete: (id: string) => Promise<void>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    setPending(true);
    try {
      await onDelete(id);
      toast.success(`"${label}" deleted`);
      router.refresh();
    } catch {
      toast.error("Delete failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex items-center gap-1 p-1.5 text-mid-gray hover:text-red-500 disabled:opacity-50"
      aria-label={`Delete ${label}`}
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}
