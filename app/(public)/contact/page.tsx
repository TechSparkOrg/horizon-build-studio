import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ContactLocationSection } from "@/components/sections/ContactLocationSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Horizon Nepal. Schedule a free consultation for home construction, interior design, and material cost advice in Kathmandu.",
  openGraph: {
    title: "Contact Us | Horizon Nepal",
    description:
      "Get in touch with Horizon Nepal. Schedule a free consultation for home construction, interior design, and material cost advice in Kathmandu.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ConsultationForm />
      <ContactLocationSection />
    </>
  );
}
