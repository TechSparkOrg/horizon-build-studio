
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll() {
  const res = await apiClient.get<any>("/");
  return res.data.results;
}

export async function upsertMany(body: Record<string, string>): Promise<void> {
  await apiClient.post<ApiWrapperResponse<void>>("/bulk", body);
}
