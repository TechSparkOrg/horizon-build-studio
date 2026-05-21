"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

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
