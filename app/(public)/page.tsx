import { Suspense } from "react";
import { getBySlug as getPageModelBySlug } from "@/lib/services/services/model.service";
import { getBySlug as getBannerBySlug } from "@/lib/services/services/banner.service";
import { getAll as getAllProjects } from "@/lib/services/services/project.service";
import { getAll as getAllNews } from "@/lib/services/services/news.service";
import { getAll as getAllFaqs } from "@/lib/services/services/faq.service";
import { cachedAllSections } from "@/lib/content/cached-content";
import { buildAllSectionsMap } from "@/lib/content/section-content";
import type { HomeProject } from "@/lib/services/types/project.types";
import { getSettings } from "@/lib/content/settings";
import { generateSchemaOrg } from "@/lib/content/schema";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";

async function getModels3d() {
  try {
    const model = await getPageModelBySlug("home-page-1");
    return model?.models3d ?? [];
  } catch {
    return [];
  }
}

async function getBanners() {
  try {
    const banner = await getBannerBySlug("home-page-banner");
    return banner?.images.map((img) => ({ image: img.image, alt: img.alt })) ?? [];
  } catch {
    return [];
  }
}

async function HomeContent() {
  const [rawSections, models3d, banners, settings, rawProjects, rawNewsResult, rawFaqs] =
    await Promise.all([
      cachedAllSections(),
      getModels3d(),
      getBanners(),
      getSettings(),
      getAllProjects().catch(() => []),
      getAllNews().catch(() => ({ items: [] })),
      getAllFaqs().catch(() => []),
    ]);

  const sections = buildAllSectionsMap(rawSections);
  const schemaOrg = generateSchemaOrg(settings);

  const published = rawProjects.filter((p) => p.published);
  const projects: HomeProject[] = published.map((p) => ({
    title: p.title,
    slug: p.slug,
    location: p.location,
    img: p.img,
    alt: p.alt ?? "",
    status: p.status,
    completion: p.completion,
    budget: p.budget,
    shortDescription: p.shortDescription ?? "",
    category: (p.category as { name?: string } | null)?.name ?? "Uncategorized",
  }));
  const filters = ["All", ...new Set(projects.map((p) => p.category).filter((c): c is string => !!c))];

  const news = rawNewsResult.items.slice(0, 5).map((n) => ({
    title: n.title,
    excerpt: n.excerpt ?? "",
    cat: n.category,
    date: new Date(n.publishedAt).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    }),
    img: n.image ?? "",
    slug: n.slug,
  }));

  const faqs = rawFaqs.map((f) => ({
    q: f.question,
    a: f.answer,
    type: (f.faqType as { name?: string } | null)?.name,
    category: (f.category as { name?: string } | null)?.name,
    faqTypeName: (f.faqType as { name?: string } | null)?.name ?? "",
    categoryName: (f.category as { name?: string } | null)?.name ?? "",
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      {settings.custom_head_scripts && (
        <script dangerouslySetInnerHTML={{ __html: settings.custom_head_scripts }} />
      )}
      <HeroSection content={sections.hero} models3d={models3d} banners={banners} />
      <ServicesSection content={sections.services} models3d={models3d} />
      <ProcessSection content={sections.process} />
      <PortfolioSection
        projects={projects}
        filters={filters}
        activeCategory="All"
        content={sections.portfolio}
      />
      <NewsSection news={news} content={sections.news} models3d={models3d} />
      <QuoteBanner content={sections["quote-banner"]} />
      <TestimonialsSection content={sections.testimonials} />
      <FAQSection faqs={faqs} content={sections.faq} models3d={models3d} />
    </>
  );
}

function LoadingFallback() {
  return <div className="min-h-screen animate-pulse bg-off-white" />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}
