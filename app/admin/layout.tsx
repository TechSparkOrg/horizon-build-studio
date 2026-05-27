import { Toaster } from "sonner";
import { AdminCacheProvider } from "./cache-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminCacheProvider>
      {children}
      <Toaster richColors position="top-right" />
    </AdminCacheProvider>
  );
}
