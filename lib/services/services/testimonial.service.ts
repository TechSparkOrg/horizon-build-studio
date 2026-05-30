import type { TestimonialData } from "@/lib/services/types/testimonial.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<TestimonialData[]> {
 const res = await apiClient.get<ApiWrapperResponse<TestimonialData[]>>("/testimonial");
 return res.data.results;
}

export async function getById(id: string): Promise<TestimonialData | null> {
  const res = await apiClient.get<ApiWrapperResponse<TestimonialData | null>>(`/testimonial/${id}`);
  return res.data.results;
}


export async function createTestimonial(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<TestimonialData>>("/testimonial", data);
  return res.data.results;
}

export async function updateTestimonial(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<TestimonialData>>(`/testimonial/${id}`, data);
  return res.data.results;
}

export async function deleteTestimonial(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/testimonial/${id}`);
  return res.data.results;
}
