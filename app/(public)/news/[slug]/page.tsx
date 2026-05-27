import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import { NewsArticleSchema, type NewsDisplay } from "@/lib/schemas";
import { NewsDetail } from "@/components/sections/NewsDetail";

export async function generateStaticParams() {
  try {
    const all = await api("/api/news").get<any[]>();
    if (all.length > 0) return all.map((n: any) => ({ slug: n.slug }));
  } catch {}
  const { getText } = await import("@/lib/lang");
  const t = getText("en");
  return (t.listing.news.items as any[]).map((n: any) => ({ slug: n.slug }));
}

async function fetchArticle(slug: string): Promise<NewsDisplay | null> {
  try {
    const raw = await api(`/api/news?slug=${slug}`).get();
    const parsed = NewsArticleSchema.safeParse(raw);
    if (!parsed.success) return null;
    const a = parsed.data;
    return {
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt ?? "",
      image: a.image ?? "",
      alt: a.alt,
      category: a.category,
      publishedAt: new Date(a.publishedAt),
      readingTimeMinutes: a.readingTimeMinutes,
      project: a.project ? { ...a.project, location: a.project.location ?? "" } : null,
    };
  } catch {
    const { getText } = await import("@/lib/lang");
    const t = getText("en");
    const item = (t.listing.news.items as any[]).find((n: any) => n.slug === slug);
    if (!item) return null;
    return {
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt ?? "",
      image: item.image ?? "",
      alt: item.title,
      category: item.category,
      publishedAt: new Date(item.publishedAt),
      readingTimeMinutes: null,
      project: null,
    };
  }
}

async function getArticle(slug: string): Promise<NewsDisplay | null> {
  "use cache";
  cacheLife("days");
  cacheTag("news");
  return fetchArticle(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

async function NewsContent({ slug }: { slug: string }) {
  const article = await getArticle(slug);
  if (!article) notFound();
  return <NewsDetail article={article} />;
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <NewsContent slug={slug} />
    </Suspense>
  );
}
