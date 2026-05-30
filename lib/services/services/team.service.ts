import type { TeamMemberData } from "@/lib/services/types/team.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function getAll(): Promise<TeamMemberData[]> {
  const res = await apiClient.get<ApiWrapperResponse<TeamMemberData[]>>("/team");
  return res.data.results;
}

export async function getById(id: string): Promise<TeamMemberData | null> {
  const res = await apiClient.get<ApiWrapperResponse<TeamMemberData | null>>(`/team/${id}`);
  return res.data.results;
}

export async function createTeamMember(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<TeamMemberData>>("/team", data);
  return res.data.results;
}

export async function updateTeamMember(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<TeamMemberData>>(`/team/${id}`, data);
  return res.data.results;
}

export async function deleteTeamMember(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/team/${id}`);
  return res.data.results;
}
