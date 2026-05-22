"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PublicSiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");

  // Admin and API pages should not render the public navbar and footer
  if (isAdmin || isApi) {
    return <>{children}</>;
  }

  return (
    <div className="bg-white text-dark-text min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
