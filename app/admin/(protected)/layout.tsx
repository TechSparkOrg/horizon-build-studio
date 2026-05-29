import { requireAuthOrRedirect } from "@/lib/auth/guards";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";
import { ToastOnLoad } from "@/components/admin/ToastOnLoad";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthOrRedirect();

  return (
    <div className="flex min-h-screen bg-off-white">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-[1600px] mx-auto p-6 sm:p-8">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
      <ToastOnLoad />
    </div>
  );
}
