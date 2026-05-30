import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getAllFaqs } from "@/lib/services/static-services";
import { cachedSectionContent, cachedTextContent } from "@/lib/content/cached-content";
import { buildSectionsMap, type SectionContentMap } from "@/lib/content/section-content";
import type { FAQSectionItem } from "@/lib/services/types/faq.types";
import { HowWeWorkHero } from "@/components/sections/HowWeWorkHero";
import { WelcomeText } from "@/components/sections/WelcomeText";
import { HowWeWorkProcess } from "@/components/sections/HowWeWorkProcess";
import { HowWeWorkDesignGrid } from "@/components/sections/HowWeWorkDesignGrid";
import { DesignShowcaseSection } from "@/components/sections/DesignShowcaseSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: t.howWeWork.meta.title,
    description: t.howWeWork.meta.description,
    keywords: t.howWeWork.meta.keywords,
    openGraph: {
      title: t.howWeWork.meta.ogTitle,
      description: t.howWeWork.meta.ogDescription,
      url: "/how-we-work",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.howWeWork.meta.ogTitle,
      description: t.howWeWork.meta.ogDescription,
    },
    alternates: { canonical: "/how-we-work" },
  };
}

async function FAQWrapper({ content }: { content: SectionContentMap }) {
  const db = await getAllFaqs().catch(() => []) as { question: string; answer: string; faqType?: { name: string } | null; category?: { name: string } | null }[];
  const faqs: FAQSectionItem[] = db.map((f) => ({
    q: f.question,
    a: f.answer,
    type: f.faqType?.name ?? undefined,
    category: f.category?.name ?? undefined,
    faqTypeName: f.faqType?.name ?? undefined,
    categoryName: f.category?.name ?? undefined,
  }));
  return <FAQSection faqs={faqs} content={content} />;
}

async function HowWeWorkContent() {
  const [sectionsRaw, heroText] = await Promise.all([
    cachedSectionContent("how-we-work"),
    cachedTextContent("how-we-work-hero"),
  ]);

  const content = buildSectionsMap(sectionsRaw);

  return (
    <>
      <HowWeWorkHero content={content} textContent={heroText} />
      <WelcomeText content={content} />
      <HowWeWorkProcess content={content} />
      <HowWeWorkDesignGrid content={content} />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <FAQWrapper content={content} />
      </Suspense>
      <DesignShowcaseSection content={content} />
      <ConsultationForm />
      <QuoteBannerSecondary content={content} />
    </>
  );
}

export default function HowWeWorkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <HowWeWorkContent />
    </Suspense>
  );
}
