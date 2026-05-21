import { Suspense } from "react";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import { HowWeWorkHero } from "@/components/sections/HowWeWorkHero";
import { WelcomeText } from "@/components/sections/WelcomeText";
import { HowWeWorkProcess } from "@/components/sections/HowWeWorkProcess";
import { HowWeWorkDesignGrid } from "@/components/sections/HowWeWorkDesignGrid";
import { DesignShowcaseSection } from "@/components/sections/DesignShowcaseSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";
import { StreamingFallback } from "@/components/ui/StreamingFallback";



export const metadata: Metadata = {
  title: "How We Work — Horizon Nepal Construction Process",
  description:
    "From your first consultation to final handover — discover Horizon Nepal's 7-step construction process. Transparent, collaborative, and built around your vision.",
  keywords: [
    "construction process Nepal",
    "building design Kathmandu",
    "architectural services Nepal",
    "how construction works",
    "Horizon Nepal process",
    "Nepal construction company",
    "residential building process",
    "commercial construction Nepal",
  ],
  openGraph: {
    title: "How We Work | Horizon Nepal",
    description:
      "A transparent 7-step journey from first hello to final handover. See how we transform your vision into reality.",
    url: "/how-we-work",
    siteName: "Horizon Nepal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | Horizon Nepal",
    description:
      "A transparent 7-step journey from first hello to final handover. See how we transform your vision into reality.",
  },
  alternates: {
    canonical: "/how-we-work",
  },
};

// ── FAQ Suspense Wrapper ──
async function FAQWrapper() {
  const dbFaqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
    include: { faqType: { select: { name: true } }, category: { select: { name: true } } },
  });

  const faqs = dbFaqs.map((f) => ({
    q: f.question,
    a: f.answer,
    type: f.faqType?.name,
    category: f.category?.name,
    faqTypeName: f.faqType?.name,
    categoryName: f.category?.name,
  }));

  return <FAQSection faqs={faqs} />;
}

export default function HowWeWorkPage() {
  return (
    <>
      <HowWeWorkHero />

      <WelcomeText />

      <HowWeWorkProcess />

      <HowWeWorkDesignGrid />

      <Suspense fallback={<StreamingFallback label="Loading FAQ..." minH={400} />}>
        <FAQWrapper />
      </Suspense>

      <DesignShowcaseSection />

      <ConsultationForm />

      <QuoteBannerSecondary />
    </>
  );
}
