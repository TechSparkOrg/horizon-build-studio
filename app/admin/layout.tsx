import { Toaster } from "sonner";
import { ToastOnLoad } from "@/components/admin/ToastOnLoad";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
      <ToastOnLoad />
    </>
  );
}
