import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getAllFaqs, getAllFaqTypes } from "@/lib/services/static-services";
import { cachedSectionContent } from "@/lib/content/cached-content";
import { buildSectionsMap, getVal } from "@/lib/content/section-content";
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

async function FAQContent() {
  const lang = (await cookies()).get("lang")?.value || "en";
  const t = getText(lang);
  const [rawFaqs, rawFaqTypes, sectionsRaw] = await Promise.all([
    getAllFaqs().catch(() => []),
    getAllFaqTypes().catch(() => []),
    cachedSectionContent("faq"),
  ]);

  const content = buildSectionsMap(sectionsRaw);
  const faqs = rawFaqs
    .filter((f) => f.faqType !== null)
    .map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      faqType: { id: f.faqType!.id, name: f.faqType!.name, slug: f.faqType!.slug } as const,
    }));
  const faqTypes = rawFaqTypes.map((t) => ({ id: t.id, name: t.name, slug: t.slug }));

  const l = lang as "en" | "np";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content?.bgImage?.mediaUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"}
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
          <SectionLabel>{getVal(content, "label", t.listing.faq.label, l)}</SectionLabel>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            {getVal(content, "h1", t.listing.faq.heading, l)}
          </h1>
          <p className="mt-4 text-white/75 text-lg leading-relaxed">
            {getVal(content, "subtitle", t.listing.faq.subtitle, l)}
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

      <QuoteBanner content={content} />
    </>
  );
}

export default function FAQListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <FAQContent />
    </Suspense>
  );
}