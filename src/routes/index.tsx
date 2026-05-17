import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/horizon/Navbar";
import { Footer } from "@/components/horizon/Footer";
import {
  HeroSection,
  ServicesSection,
  PortfolioSection,
  QuoteBanner,
  NewsSection,
  ProcessSection,
  FAQSection,
  TestimonialsSection,
  ConsultationForm,
  LocationSection,
  TeamSection,
  QuoteBannerSecondary,
} from "@/components/horizon/sections";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Horizon Nepal — Engineering, Research & Construction in Kathmandu" },
      {
        name: "description",
        content:
          "Horizon Nepal is a premium engineering, research and construction company in Kathmandu delivering homes, infrastructure and interiors across Nepal.",
      },
      { property: "og:title", content: "Horizon Nepal — Construction & Engineering, Kathmandu" },
      {
        property: "og:description",
        content:
          "From concept to completion — precision engineering and innovative construction across residential, commercial and infrastructure projects in Nepal.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Horizon Nepal — Construction in Kathmandu" },
      {
        name: "twitter:description",
        content:
          "Engineering, research and construction excellence serving Nepal since 2009.",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
        fetchpriority: "high",
      } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Horizon Nepal",
          description: "Engineering, Research & Construction Company",
          url: "/",
          telephone: "+977-1-4411222",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Baluwatar",
            addressLocality: "Kathmandu",
            postalCode: "44600",
            addressCountry: "NP",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 27.7172,
            longitude: 85.324,
          },
          openingHours: "Mo-Sa 09:00-18:00",
          priceRange: "$$",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="bg-white text-dark-text">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <QuoteBanner />
        <NewsSection />
        <ProcessSection />
        <FAQSection />
        <TestimonialsSection />
        <ConsultationForm />
        <LocationSection />
        <TeamSection />
        <QuoteBannerSecondary />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
