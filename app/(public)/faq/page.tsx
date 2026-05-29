import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getAll as getAllFaqs } from "@/lib/services/services/faq.service";
import { getAll as getAllFaqTypes } from "@/lib/services/services/faq-type.service";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: t.listing.faq.title,
    description: t.listing.faq.description,
    openGraph: {
      title: t.listing.faq.heading,
      description: t.listing.faq.description,
      url: "/faq",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Horizon Nepal FAQ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.listing.faq.heading,
      description: t.listing.faq.description,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical: "/faq" },
  };
}

function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default async function FAQListingPage() {
  const t = getText((await cookies()).get("lang")?.value);
  const [rawFaqs, rawFaqTypes] = await Promise.all([
    getAllFaqs().catch(() => []),
    getAllFaqTypes().catch(() => []),
  ]);
  const faqs = rawFaqs
    .filter((f) => f.faqType !== null)
    .map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      faqType: { id: f.faqType!.id, name: f.faqType!.name, slug: f.faqType!.slug } as const,
    }));
  const faqTypes = rawFaqTypes.map((t) => ({ id: t.id, name: t.name, slug: t.slug }));

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.19 0.05 260 / 0.92) 40%, oklch(0.19 0.05 260 / 0.5) 100%)",
          }}
        />
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>{t.listing.faq.label}</SectionLabel>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            {t.listing.faq.heading}
          </h1>
          <p className="mt-4 text-white/75 text-lg leading-relaxed">
            {t.listing.faq.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <FAQAccordion
        items={faqs}
        types={faqTypes}
        filterAll={t.faq.filterAll}
        empty={t.listing.faq.empty}
      />

      <QuoteBanner />
    </>
  );
}