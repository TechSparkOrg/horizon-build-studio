import type { FaqData } from "@/lib/services/types/faq.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<FaqData[]> {
  const res = await apiClient.get<ApiWrapperResponse<FaqData[]>>("/");
  return res.data.results;
}

export async function getById(id: string): Promise<FaqData | null> {
  const res = await apiClient.get<ApiWrapperResponse<FaqData | null>>(`/ ${id}`);
  return res.data.results;
}


export async function createFaq(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<FaqData>>(
    "/",
    data
  );
  return res.data.results;
}

export async function updateFaq(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<FaqData>>(
    `/ ${id}`,
    data
  );
  return res.data.results;
}

export async function deleteFaq(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/ ${id}`);
  return res.data.results;
}
