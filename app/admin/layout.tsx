import { AdminShell } from "@/components/admin/AdminShell";
import { Toaster } from "sonner";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster richColors position="top-right" />
    </>
  );
}
