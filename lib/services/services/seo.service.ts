import type { SeoData } from "@/lib/services/types/seo.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<SeoData[]> {
  const res = await apiClient.get<ApiWrapperResponse<SeoData[]>>("/seo");
  return res.data.results;
}

export async function getById(id: string): Promise<SeoData | null> {
  const res = await apiClient.get<ApiWrapperResponse<SeoData | null>>(`/seo/${id}`);
  return res.data.results;
}

export async function upsert(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<SeoData>>("/seo", data);
  return res.data.results;
}

export async function deleteSeo(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/seo/${id}`);
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<SeoData | null> {
  const res = await apiClient.get<ApiWrapperResponse<SeoData | null>>(`/seo/${slug}`);
  return res.data.results;
}