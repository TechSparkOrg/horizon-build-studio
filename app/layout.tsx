import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Playfair_Display, Barlow, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
      "Horizon Nepal — Engineering, Research & Construction in Kathmandu",
    template: "%s | Horizon Nepal",
  },
  description:
    "Horizon Nepal is a premium engineering, research and construction company in Kathmandu delivering homes, infrastructure and interiors across Nepal.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "construction company Nepal",
    "building contractor Kathmandu",
    "civil engineering Nepal",
    "road construction Nepal",
    "interior design Kathmandu",
    "Horizon Nepal",
  ],
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://horizonnepal.com.np",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Horizon Nepal | Premium Construction & Engineering",
    description:
      "From concept to completion — precision engineering and innovative construction across residential, commercial and infrastructure projects in Nepal.",
    url: "/",
    siteName: "Horizon Nepal",
    locale: "en_NP",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Horizon Nepal construction projects in Kathmandu Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Nepal | Construction & Engineering, Kathmandu",
    description:
      "Building Nepal's future with precision engineering since 2009.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

import { PublicSiteWrapper } from "@/components/layout/PublicSiteWrapper";

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
    >
      <head>
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
        <Toaster richColors position="top-right" />
        <Suspense fallback={null}>
          <PublicSiteWrapper>{children}</PublicSiteWrapper>
        </Suspense>
      </body>
    </html>
  );
}
