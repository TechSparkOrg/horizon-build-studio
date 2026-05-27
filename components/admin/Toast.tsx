import { useEffect, useState, useCallback } from "react";

interface ToastData {
  msg: string;
  type: "ok" | "err";
}

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const show = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);
  return { toast, show };
}

export function Toast({ msg, type }: ToastData) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded text-sm shadow ${type === "ok" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
      {msg}
    </div>
  );
}
