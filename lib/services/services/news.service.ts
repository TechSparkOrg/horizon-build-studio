import type { NewsListItem, NewsDetail } from "@/lib/services/types/news.types";
import type { PaginatedResult } from "@/lib/services/types/shared.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

interface NewsFieldData {
  title: string;
  slug?: string;
  excerpt: string;
  contentEn: string;
  contentNp: string;
  category: string;
  image: string;
  alt: string;
  publishedAt: Date;
  featured: boolean;
  projectId: string | null;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
}

function pickNews(raw: unknown): NewsFieldData {
  const rec = raw as Record<string, unknown>;
  const title = typeof rec.title === "string" ? rec.title : "";
  const slug = typeof rec.slug === "string" ? rec.slug : undefined;
  const excerpt = typeof rec.excerpt === "string" ? rec.excerpt : "";
  const contentEn = typeof rec.contentEn === "string" ? rec.contentEn : "";
  const contentNp = typeof rec.contentNp === "string" ? rec.contentNp : "";
  const category = typeof rec.category === "string" ? rec.category : "";
  const image = typeof rec.image === "string" ? rec.image : "";
  const alt = typeof rec.alt === "string" ? rec.alt : "";
  const publishedAt = rec.publishedAt ? new Date(rec.publishedAt as string) : new Date();
  const featured = rec.featured === true;
  const projectId = typeof rec.projectId === "string" ? rec.projectId : null;
  const metaTitle = typeof rec.metaTitle === "string" ? rec.metaTitle : "";
  const metaDescription = typeof rec.metaDescription === "string" ? rec.metaDescription : "";
  const metaKeywords = typeof rec.metaKeywords === "string" ? rec.metaKeywords : "";
  const customScript = typeof rec.customScript === "string" ? rec.customScript : "";
  return { title, slug, excerpt, contentEn, contentNp, category, image, alt, publishedAt, featured, projectId, metaTitle, metaDescription, metaKeywords, customScript };
}

export async function getAll(page = 1, limit = 100): Promise<PaginatedResult<NewsListItem>> {
  const res = await apiClient.get<ApiWrapperResponse<PaginatedResult<NewsListItem>>>("/", {
    params: { page, limit },
  });
  return res.data.results;

}

export async function getBySlug(slug: string): Promise<NewsDetail | null> {
  const res = await apiClient.get<ApiWrapperResponse<NewsDetail | null>>(`/slug/${slug}`);
  return res.data.results;
}

export async function getById(id: string): Promise<NewsDetail | null> {
  const res = await apiClient.get<ApiWrapperResponse<NewsDetail | null>>(`/ ${id}`);
  return res.data.results;
}

export async function createNews(raw: unknown) {
  const res = await apiClient.post<ApiWrapperResponse<NewsDetail>>(
    "/",
    pickNews(raw)
  );
  return res.data.results;
}

export async function updateNews(id: string, raw: unknown) {
  const res = await apiClient.put<ApiWrapperResponse<NewsDetail>>(
    `/ ${id}`,
    pickNews(raw)
  );
  return res.data.results;
}

export async function deleteNews(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/ ${id}`);
  return res.data.results;
}
