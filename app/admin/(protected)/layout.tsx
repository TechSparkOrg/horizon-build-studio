import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-off-white">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-[1600px] mx-auto p-6 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
