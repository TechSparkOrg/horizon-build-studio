import "server-only";
import { redis } from "./redis";
import { projectService } from "@/lib/services/services/project.service";
import { newsService } from "@/lib/services/services/news.service";
import { faqService } from "@/lib/services/services/faq.service";
import { sectionService } from "@/lib/services/services/section.service";
import { getText } from "@/lib/lang";
import type { SectionContentMap } from "@/lib/section-content";
import type { HomeProject, FAQSectionItem } from "@/lib/schemas";

const CACHE_TTL = 3600;

export interface SectionsData {
  sections: Record<string, SectionContentMap>;
}

export interface ContentData {
  projects: HomeProject[];
  news: { title: string; excerpt: string; cat: string; date: string; img: string; slug: string }[];
  faqs: FAQSectionItem[];
  filters: string[];
  t: { portfolio: { label: string; h2: string; viewAll: string; viewProject: string } };
}

export interface HomePageData extends SectionsData, ContentData {}

function buildSections(rawSections: Awaited<ReturnType<typeof sectionService.getAll>>): Record<string, SectionContentMap> {
  const sections: Record<string, SectionContentMap> = {};
  for (const item of rawSections) {
    if (!sections[item.section]) sections[item.section] = {};
    sections[item.section][item.key] = {
      valueEn: item.valueEn,
      valueNp: item.valueNp,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    };
  }
  return sections;
}

export async function getHomeSections(lang?: string): Promise<SectionsData> {
  const key = `homepage:sections:${lang ?? "en"}`;
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached) as SectionsData;
  } catch { /* fall through */ }

  const rawSections = await sectionService.getAll();
  const sections = buildSections(rawSections);
  const data: SectionsData = { sections };

  redis.set(key, JSON.stringify(data), "EX", CACHE_TTL).catch(() => {});

  return data;
}

export async function getHomeContent(lang?: string): Promise<ContentData> {
  const key = `homepage:content:${lang ?? "en"}`;
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached) as ContentData;
  } catch { /* fall through */ }

  const [rawProjects, rawNews, rawFaqs, t] = await Promise.all([
    projectService.getAll(),
    newsService.getAll(),
    faqService.getAll(),
    Promise.resolve(getText(lang)),
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
    date: new Date(n.publishedAt).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    }),
    img: n.image ?? "", slug: n.slug,
  }));

  const faqs: FAQSectionItem[] = rawFaqs.map((f) => ({
    q: f.question, a: f.answer, type: f.faqType?.name, category: f.category?.name,
    faqTypeName: f.faqType?.name, categoryName: f.category?.name,
  }));

  const data: ContentData = {
    projects, news, faqs, filters,
    t: { portfolio: { label: t.portfolio.label, h2: t.portfolio.h2, viewAll: t.portfolio.viewAll, viewProject: t.portfolio.viewProject } },
  };

  redis.set(key, JSON.stringify(data), "EX", CACHE_TTL).catch(() => {});

  return data;
}

export async function getCachedHomePage(lang?: string): Promise<HomePageData> {
  const [sections, content] = await Promise.all([
    getHomeSections(lang),
    getHomeContent(lang),
  ]);
  return { ...sections, ...content };
}

export async function purgeHomePageCache() {
  try {
    const keys = await redis.keys("homepage:*");
    if (keys.length > 0) await redis.del(...keys);
  } catch { /* ignore */ }
}
