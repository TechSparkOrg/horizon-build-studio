import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { NewsDetail } from "@/components/sections/NewsDetail";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          location: true,
          img: true,
          alt: true,
          completion: true,
          models3d: { select: { id: true, url: true, filename: true } },
          videos: {
            select: { id: true, platform: true, embedUrl: true, fileUrl: true, fileType: true, title: true },
          },
        },
      },
    },
  });

  if (!article) notFound();

  return <NewsDetail article={article} />;
}
