import type { Metadata } from "next";
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

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ImageGrid />
      <AboutSection />
      <HelpSection />
      <QuoteBanner />
      <TeamSection />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}
