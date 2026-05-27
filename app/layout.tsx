import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Barlow, Barlow_Condensed } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/lib/lang-client";
import type { Lang } from "@/lib/lang";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-label",
  display: "swap",
});

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

async function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const initialLang: Lang = langCookie === "np" ? "np" : "en";

  return (
    <LanguageProvider initialLang={initialLang}>
      <Toaster richColors position="top-right" />
      {children}
    </LanguageProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${barlow.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://pub-a19a6c84befd4048bbb715b4a6d4f307.r2.dev" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://ajax.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://horizonnepal.com.np/#business",
              name: "Horizon Nepal",
              description: "Engineering, Research & Construction Company",
              url: "https://horizonnepal.com.np",
              telephone: "+977 1 441 1222",
              email: "hello@horizonnepal.com.np",
              foundingDate: "2009",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tinkune",
                addressLocality: "Kathmandu",
                addressRegion: "Bagmati Province",
                addressCountry: "NP",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 27.7172,
                longitude: 85.324,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
              image: "https://horizonnepal.com.np/og-image.jpg",
              sameAs: [
                "https://www.facebook.com/horizonnepal",
                "https://www.instagram.com/horizonnepal",
                "https://www.linkedin.com/company/horizonnepal",
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <Suspense fallback={<main>{children}</main>}>
          <LanguageWrapper>{children}</LanguageWrapper>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
