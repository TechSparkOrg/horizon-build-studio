import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/db";

const baseUrl = process.env["NEXT_PUBLIC_SITE_URL"] || "https://horizonnepal.com.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: { slug: string; updatedAt: Date }[] = [];
  let articles: { slug: string; updatedAt: Date }[] = [];
  try {
    [projects, articles] = await Promise.all([
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.newsArticle.findMany({
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch {}

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${baseUrl}/news/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
