import { Playfair_Display, Barlow, Barlow_Condensed } from "next/font/google";
import RootHead from "@/components/RootHead";
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
      <RootHead />
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
