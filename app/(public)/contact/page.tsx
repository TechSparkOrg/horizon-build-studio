import { Suspense } from "react";
import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ContactLocationSection } from "@/components/sections/ContactLocationSection";
import { getSettings } from "@/lib/content/settings";
import { cachedSectionContent, cachedTextContent } from "@/lib/content/cached-content";
import { buildSectionsMap } from "@/lib/content/section-content";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: "Contact Us",
    description:
      `Get in touch with ${settings.site_name ?? "Horizon Nepal"} at ${settings.contact_email ?? "hello@horizonnepal.com.np"} or ${settings.contact_phone ?? "+977 1 441 1222"}. Schedule a free consultation for home construction, interior design, and material cost advice in Kathmandu.`,
    openGraph: {
      title: "Contact Us | Horizon Nepal",
      description:
        "Get in touch with Horizon Nepal. Schedule a free consultation for home construction, interior design, and material cost advice in Kathmandu.",
    },
  };
}

async function ContactContent() {
  const [settings, sectionsRaw, heroText] = await Promise.all([
    getSettings(),
    cachedSectionContent("contact"),
    cachedTextContent("contact-hero"),
  ]);

  const content = buildSectionsMap(sectionsRaw);

  return (
    <>
      <ContactHero settings={settings} content={content} textContent={heroText} />
      <ConsultationForm settings={settings} content={content} />
      <ContactLocationSection settings={settings} content={content} />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <ContactContent />
    </Suspense>
  );
}
