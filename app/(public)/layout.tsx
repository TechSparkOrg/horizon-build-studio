import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/lib/lang-client";
import { Toaster } from "@/components/ui/sonner";
import type { Lang } from "@/lib/lang";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default:
      "Horizon Nepal — Home Construction, Interior Design & Material Consultation in Kathmandu",
    template: "%s | Horizon Nepal",
  },
  description:
    "Horizon Nepal is a trusted home construction, interior design, and material cost consultation company in Kathmandu, serving residential projects across Nepal.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "home construction Nepal",
    "house building Kathmandu",
    "interior design Nepal",
    "construction material cost consultation",
    "site visit Nepal",
    "house construction company",
    "Horizon Nepal",
  ],
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://horizonnepal.com.np",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Horizon Nepal | Home Construction & Interior Design",
    description:
      "From concept to completion — quality home construction, bespoke interior design, and transparent material cost consultation across Nepal.",
    url: "/",
    siteName: "Horizon Nepal",
    locale: "en_NP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Horizon Nepal home construction projects in Kathmandu Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Nepal | Home Construction & Interior Design",
    description:
      "Quality home construction, interior design, and material cost consultation across Nepal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

async function LayoutContent({ children }: { children: React.ReactNode }) {
  const initialLang: Lang = (await cookies()).get("lang")?.value === "np" ? "np" : "en";
  return (
    <LanguageProvider initialLang={initialLang}>
      <Toaster richColors position="top-right" />
      {children}
    </LanguageProvider>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-dark-text min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <main id="main-content" className="flex-grow">
        <Suspense fallback={<div className="min-h-screen" />}>
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
