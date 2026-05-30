import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export interface TextContentData {
  id: string;
  slug: string;
  label: string;
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
}

export async function getAll(): Promise<TextContentData[]> {
  const res = await apiClient.get<ApiWrapperResponse<TextContentData[]>>("/text-content");
  return res.data.results;
}

export async function getById(id: string): Promise<TextContentData | null> {
  const res = await apiClient.get<ApiWrapperResponse<TextContentData | null>>(`/text-content/${id}`);
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<TextContentData | null> {
  const res = await apiClient.get<ApiWrapperResponse<TextContentData | null>>(`/text-content/slug/${slug}`);
  return res.data.results;
}

export async function createTextContent(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<TextContentData>>("/text-content", data);
  return res.data.results;
}

export async function updateTextContent(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<TextContentData>>(`/text-content/${id}`, data);
  return res.data.results;
}

export async function deleteTextContent(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/text-content/${id}`);
  return res.data.results;
}
