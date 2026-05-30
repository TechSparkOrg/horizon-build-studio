import type {  PaginatedResult } from "@/lib/services/types/shared.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function submit(data: any) {
 const res = await apiClient.post("/contact", data);
 return res.data;
}

export async function getAll(page = 1, limit = 100): Promise<PaginatedResult<any>> {
 const res = await apiClient.get<PaginatedResult<any>>("/contact", {params: { page, limit }});
 return res.data;
}

export async function getById(id: string) {
  const res = await apiClient.get<ApiWrapperResponse<any | null>>(`/contact/${id}`);
  return res.data.results;
}

export async function updateStatus(id: string, status: string) {
  const res = await apiClient.put<ApiWrapperResponse<void>>(`/contact/${id}`, { status });
  return res.data.results;
}
