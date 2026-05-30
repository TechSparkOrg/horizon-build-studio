import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllNews, getNewsBySlug } from "@/lib/services/static-services";
import { NewsArticleSchema } from "@/lib/schemas/news";
import type { NewsDisplay } from "@/lib/services/types/news.types";

const NewsDetail = dynamic(() => import("@/components/sections/NewsDetail").then(m => m.NewsDetail));

export async function generateStaticParams() {
  try {
    const all = await getAllNews();
    if (all.length > 0) return all.map((n) => ({ slug: n.slug }));
  } catch {
    /* empty */
  }
  return [{ slug: "__placeholder__" }];
}

async function fetchArticle(slug: string): Promise<NewsDisplay | null> {
  try {
    const raw = await getNewsBySlug(slug);
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
    return null;
  }
}

async function getArticle(slug: string): Promise<NewsDisplay | null> {
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
