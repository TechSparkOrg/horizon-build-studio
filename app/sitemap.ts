import type { MetadataRoute } from "next";
import { getAllProjects, getAllNews } from "@/lib/services/static-services";

const baseUrl = process.env["NEXT_PUBLIC_SITE_URL"] || "https://horizonnepal.com.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await getAllProjects()).map((project) => ({ slug: project.slug, updatedAt: new Date() }));
  const articles = (await getAllNews()).map((article) => ({ slug: article.slug, updatedAt: article.publishedAt }));

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
