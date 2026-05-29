import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/content/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const defaults = {
    title: "Horizon Nepal — Home Construction, Interior Design & Material Consultation in Kathmandu",
    description: "Horizon Nepal is a trusted home construction, interior design, and material cost consultation company in Kathmandu, serving residential projects across Nepal.",
    ogImage: "/og-image.jpg",
  };

  return {
    title: {
      default: settings.seo_title ?? defaults.title,
      template: "%s | Horizon Nepal",
    },
    description: settings.seo_description ?? defaults.description,
    keywords: settings.seo_keywords?.split(",").map((k) => k.trim()) ?? [
      "home construction Nepal",
      "house building Kathmandu",
      "interior design Nepal",
      "construction material cost consultation",
      "site visit Nepal",
      "house construction company",
      "Horizon Nepal",
    ],
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    metadataBase: new URL(
      process.env["NEXT_PUBLIC_SITE_URL"] || "https://horizonnepal.com.np",
    ),
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.seo_title ?? "Horizon Nepal | Home Construction & Interior Design",
      description: settings.seo_description ?? "From concept to completion — quality home construction, bespoke interior design, and transparent material cost consultation across Nepal.",
      url: "/",
      siteName: settings.site_name ?? "Horizon Nepal",
      locale: "en_NP",
      type: "website",
      images: settings.seo_og_image
        ? [{ url: settings.seo_og_image, width: 1200, height: 630, alt: settings.site_name ?? "Horizon Nepal" }]
        : [{ url: defaults.ogImage, width: 1200, height: 630, alt: "Horizon Nepal home construction projects in Kathmandu Nepal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo_title ?? "Horizon Nepal | Home Construction & Interior Design",
      description: settings.seo_description ?? "Quality home construction, interior design, and material cost consultation across Nepal.",
      images: [settings.seo_og_image ?? defaults.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-dark-text min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Toaster richColors position="top-right" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
