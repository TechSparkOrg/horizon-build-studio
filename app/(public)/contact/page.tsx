import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ContactLocationSection } from "@/components/sections/ContactLocationSection";
import { getSettings } from "@/lib/content/settings";

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

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <ContactHero settings={settings} />
      <ConsultationForm settings={settings} />
      <ContactLocationSection settings={settings} />
    </>
  );
}
