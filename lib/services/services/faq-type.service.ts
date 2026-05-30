
import type { FaqTypeData } from "@/lib/services/types/faq.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<FaqTypeData[]> {
  const res = await apiClient.get<ApiWrapperResponse<FaqTypeData[]>>("/faq-type");
  return res.data.results;
}

export async function getById(id: string): Promise<FaqTypeData | null> {
  const res = await apiClient.get<ApiWrapperResponse<FaqTypeData | null>>(`/faq-type/${id}`);
  return res.data.results;
}

export async function createFaqType(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<FaqTypeData>>("/faq-type", data);
  return res.data.results;
}

export async function updateFaqType(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<FaqTypeData>>(`/faq-type/${id}`, data);
  return res.data.results;
}

export async function deleteFaqType(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/faq-type/${id}`);
  return res.data.results;
}
