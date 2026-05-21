import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import { DesignShowcaseSection } from "@/components/sections/DesignShowcaseSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { LocationSection } from "@/components/sections/LocationSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";
import { StreamingFallback } from "@/components/ui/StreamingFallback";

// ── Portfolio Suspense Wrapper ──
async function PortfolioWrapper() {
  const [dbProjects, dbCategories] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      select: { title: true, slug: true, location: true, img: true, alt: true, status: true, completion: true, budget: true, shortDescription: true, category: { select: { name: true } } },
      orderBy: { order: "asc" },
    }),
    prisma.category.findMany({ select: { name: true }, orderBy: { order: "asc" } }),
  ]);

  const projects = dbProjects.map((p) => ({
    title: p.title,
    slug: p.slug,
    category: p.category?.name ?? "Uncategorized",
    location: p.location,
    img: p.img,
    alt: p.alt,
    status: p.status,
    completion: p.completion,
    budget: p.budget,
    shortDescription: p.shortDescription,
  }));

  const filters = ["All", ...dbCategories.map((c) => c.name)];

  return <PortfolioSection projects={projects} filters={filters} />;
}

// ── News Suspense Wrapper ──
async function NewsWrapper() {
  const dbNews = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
    take: 5,
  });

  const newsList = dbNews.map((n) => ({
    title: n.title,
    excerpt: n.excerpt,
    cat: n.category,
    date: n.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    img: n.image,
    slug: n.slug,
  }));

  return <NewsSection news={newsList} />;
}

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

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <ServicesSection />

      <ProcessSection />
      <Suspense fallback={<StreamingFallback label="Streaming Portfolio Works..." minH={600} />}>
        <PortfolioWrapper />
      </Suspense>
      <Suspense fallback={<StreamingFallback label="Streaming News Updates..." />}>
        <NewsWrapper />
      </Suspense>
      <QuoteBanner />

      <DesignShowcaseSection />

      <AboutSection />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
      <TeamSection />

      <Suspense fallback={<StreamingFallback label="Streaming FAQ Details..." minH={400} />}>
        <FAQWrapper />
      </Suspense>
      <QuoteBannerSecondary />
    </>
  );
}
