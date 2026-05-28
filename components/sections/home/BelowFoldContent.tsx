import { getHomeContent } from "@/lib/cache-home";
import type { TextDict } from "@/lib/lang";
import type { SectionContentMap } from "@/lib/section-content";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";

export async function BelowFoldContent({ lang, sections }: { lang?: string; sections: Record<string, SectionContentMap> }) {
  const content = await getHomeContent(lang);

  return (
    <>
      <ProcessSection content={sections.process} />
      <PortfolioSection
        projects={content.projects}
        filters={content.filters}
        activeCategory="All"
        t={content.t as unknown as TextDict}
        content={sections.portfolio}
      />
      <NewsSection news={content.news} content={sections.news} />
      <QuoteBanner content={sections.quotes} />
      <TestimonialsSection content={sections.testimonials} />
      <FAQSection faqs={content.faqs} content={sections.faq} />
    </>
  );
}
