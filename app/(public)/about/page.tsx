import { Suspense } from "react";
import type { Metadata } from "next";
import { cachedSectionContent, cachedTextContent } from "@/lib/content/cached-content";
import { buildSectionsMap } from "@/lib/content/section-content";
import { AboutHero } from "@/components/sections/AboutHero";
import { ImageGrid } from "@/components/sections/ImageGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { HelpSection } from "@/components/sections/HelpSection";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { LocationSection } from "@/components/sections/LocationSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Horizon Nepal — our story, values, and the team behind Nepal's trusted home construction and interior design company.",
  openGraph: {
    title: "About Us | Horizon Nepal",
    description:
      "Learn about Horizon Nepal — our story, values, and the team behind Nepal's trusted home construction and interior design company.",
  },
};

async function AboutContent() {
  const [sectionsRaw, heroText] = await Promise.all([
    cachedSectionContent("about"),
    cachedTextContent("about-hero"),
  ]);

  const content = buildSectionsMap(sectionsRaw);

  return (
    <>
      <AboutHero content={content} textContent={heroText} />
      <ImageGrid content={content} />
      <AboutSection content={content} />
      <HelpSection content={content} />
      <QuoteBanner content={content} />
      <TeamSection content={content} />
      <TestimonialsSection content={content} />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <AboutContent />
    </Suspense>
  );
}
