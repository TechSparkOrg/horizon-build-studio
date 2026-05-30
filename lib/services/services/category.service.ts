import type { CategoryData } from "@/lib/services/types/category.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";


export async function getAll(): Promise<CategoryData[]> {
  const res = await apiClient.get<ApiWrapperResponse<CategoryData[]>>("/category");
  return res.data.results;
}

export async function getById(id: string): Promise<CategoryData | null> {
  const res = await apiClient.get<ApiWrapperResponse<CategoryData | null>>(`/category/${id}`);
  return res.data.results;
}


export async function createCategory(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<CategoryData>>("/category", data);
  return res.data.results;
}

export async function updateCategory(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<CategoryData>>(`/category/${id}`, data);
  return res.data.results;
}

export async function deleteCategory(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/category/${id}`);
  return res.data.results;
}
