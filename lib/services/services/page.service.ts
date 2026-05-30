import type { StaticPageData } from "@/lib/services/types/page.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<StaticPageData[]> {
  const res = await apiClient.get<ApiWrapperResponse<StaticPageData[]>>("/page");
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<StaticPageData | null> {
  const res = await apiClient.get<ApiWrapperResponse<StaticPageData | null>>(`/page/${slug}`);
  return res.data.results;
}


export async function upsert(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<StaticPageData>>("/page", data);
  return res.data.results;
}

export async function deletePage(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/page/${id}`);
  return res.data.results;
}
