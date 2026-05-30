import type { PageModelData } from "@/lib/services/types/model.types";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";
import { apiClient } from "../apiClient";

export async function getAll(): Promise<PageModelData[]> {
  const res = await apiClient.get<ApiWrapperResponse<PageModelData[]>>("/");
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<PageModelData | null> {
  const res = await apiClient.get<ApiWrapperResponse<PageModelData | null>>(`/slug/${slug}`);
  return res.data.results;
}

export async function upsert(body: Record<string, unknown>) {
  const res = await apiClient.post<ApiWrapperResponse<PageModelData>>("/", body);
  return res.data.results;
}
     

export async function deleteModel(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<PageModelData>>(`/ ${id}`);
  return res.data.results;
}
