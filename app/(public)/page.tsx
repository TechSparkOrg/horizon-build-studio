import { api } from "@/lib/api";
import type { HomeProject, FAQSectionItem } from "@/lib/schemas";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { QuoteBanner } from "@/components/sections/QuoteBanner";
import { NewsSection } from "@/components/sections/NewsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { cookies } from "next/headers";
import { getText } from "@/lib/lang";

export default async function HomePage() {
  const cookie = (await cookies()).get("lang")?.value;
  const t = getText(cookie);

  const [rawProjects, rawNews, rawFaqs] = await Promise.all([
    api("/api/projects").tag("projects").revalidate(60).get<{ published: boolean; title: string; slug: string; location: string; img: string; alt: string; status: string; completion: number; budget: number | null; shortDescription: string | null; category?: { name: string } | null }[]>(),
    api("/api/news").tag("news").revalidate(60).get<{ title: string; excerpt: string | null; category: string; publishedAt: string; image: string | null; slug: string }[]>(),
    api("/api/faqs").tag("faqs").revalidate(60).get<{ question: string; answer: string; faqType?: { name: string } | null; category?: { name: string } | null }[]>(),
  ]);

  const published = rawProjects.filter((p) => p.published);
  const projects: HomeProject[] = published.map((p) => ({
    title: p.title, slug: p.slug, location: p.location, img: p.img, alt: p.alt,
    status: p.status, completion: p.completion, budget: p.budget,
    shortDescription: p.shortDescription ?? "",
    category: p.category?.name ?? "Uncategorized",
  }));
  const filters = ["All", ...new Set(projects.map((p) => p.category).filter((c): c is string => !!c))];

  const news = rawNews.slice(0, 5).map((n) => ({
    title: n.title, excerpt: n.excerpt ?? "", cat: n.category,
    date: new Date(n.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    img: n.image ?? "", slug: n.slug,
  }));

  const faqs: FAQSectionItem[] = rawFaqs.map((f) => ({
    q: f.question, a: f.answer, type: f.faqType?.name, category: f.category?.name,
    faqTypeName: f.faqType?.name, categoryName: f.category?.name,
  }));

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection projects={projects} filters={filters} activeCategory="All" t={t} />
      <NewsSection news={news} />
      <QuoteBanner />
      <TestimonialsSection />
      <FAQSection faqs={faqs} />
    </>
  );
}
