import type { BannerData } from "@/lib/services/types/banner.types";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";
import { apiClient } from "../apiClient";

export async function getAll(): Promise<BannerData[]> {
  const res = await apiClient.get<ApiWrapperResponse<BannerData[]>>("/");
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<BannerData | null> {
  const res = await apiClient.get<ApiWrapperResponse<BannerData | null>>(`/slug/${slug}`);
  return res.data.results;
}

export async function upsert(body: Record<string, unknown>) {
  const res = await apiClient.post<ApiWrapperResponse<BannerData>>("/", body);
  return res.data.results;
}

export async function deleteBanner(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<BannerData>>(`/ ${id}`);
  return res.data.results;
}
