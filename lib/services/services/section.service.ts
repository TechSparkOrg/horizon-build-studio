import type { SectionContentData, SectionDefData } from "@/lib/services/types/section.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getBySection(section: string): Promise<SectionContentData[]> {
  const res = await apiClient.get<ApiWrapperResponse<SectionContentData[]>>("/section", { params: { section } });
  return res.data.results;
}

export async function getAll(): Promise<SectionContentData[]> {
  const res = await apiClient.get<ApiWrapperResponse<SectionContentData[]>>("/");
  return res.data.results;
}

export interface UpsertItem {
  key: string; valueEn: string; valueNp: string;
  mediaUrl?: string | null; mediaType?: string | null; order?: number;
}

export async function upsertItems(section: string, items: UpsertItem[]) {
  const res = await apiClient.post<ApiWrapperResponse<SectionContentData[]>>("/section/upsert", { section, items });
  return res.data.results;
}

// ── SectionDef ──

export async function getAllSectionDefs(): Promise<SectionDefData[]> {
  const res = await apiClient.get<ApiWrapperResponse<SectionDefData[]>>("/section/def");
  return res.data.results;
}

export async function createSectionDef(data: Record<string, unknown>) {
  const res = await apiClient.post<ApiWrapperResponse<SectionDefData>>("/section/def", data);
  return res.data.results;
}

export async function deleteSectionDef(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/section/def/${id}`);
  return res.data.results;
}
