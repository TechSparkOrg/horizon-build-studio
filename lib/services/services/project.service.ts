import type {
  ProjectListItem,
  ProjectDetail,
  ProjectMeta,
  RelatedProjectItem,
  AdjacentItem,
  SearchResult,
} from "@/lib/services/types/project.types";
import { apiClient } from "../apiClient";
import { ApiWrapperResponse } from "../types/apiWrapperResponse.types";

export async function search(params: {
  q?: string;
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<SearchResult> {
  const res = await apiClient.get<ApiWrapperResponse<SearchResult>>("/search", {
    params: {
      q: params.q,
      status: params.status,
      category: params.category,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });
  return res.data.results;
}

export async function getAll(): Promise<ProjectListItem[]> {
  const res = await apiClient.get<ApiWrapperResponse<ProjectListItem[]>>("/");
  return res.data.results;
}

export async function getBySlug(slug: string): Promise<ProjectDetail | null> {
  const res = await apiClient.get<ApiWrapperResponse<ProjectDetail | null>>(
    `/slug/${slug}`,
  );
  return res.data.results;
}

export async function getBySlugMeta(slug: string): Promise<ProjectMeta | null> {
  const res = await apiClient.get<ApiWrapperResponse<ProjectMeta | null>>(
    `/slug/${slug}/meta`,
  );
  return res.data.results;
}

export async function getById(id: string): Promise<ProjectDetail | null> {
  const res = await apiClient.get<ApiWrapperResponse<ProjectDetail | null>>(
    `/ ${id}`,
  );
  return res.data.results;
}

export async function getRelated(
  projectId: string,
  categoryId: string | null,
  limit = 3,
): Promise<RelatedProjectItem[]> {
  const res = await apiClient.get<ApiWrapperResponse<RelatedProjectItem[]>>(
    "/related",
    {
      params: {
        projectId,
        categoryId,
        limit,
      },
    },
  );
  return res.data.results;
}

export async function getAdjacent(
  order: number,
): Promise<[AdjacentItem | null, AdjacentItem | null]> {
  const res = await apiClient.get<
    ApiWrapperResponse<[AdjacentItem | null, AdjacentItem | null]>
  >("/adjacent", {
    params: {
      order,
    },
  });
  return res.data.results;
}

export async function createProject(data: any) {
  const res = await apiClient.post<ApiWrapperResponse<ProjectDetail>>(
    "/",
    data,
  );
  return res.data.results;
}

export async function updateProject(id: string, data: any) {
  const res = await apiClient.put<ApiWrapperResponse<ProjectDetail>>(
    `/ ${id}`,
    data,
  );
  return res.data.results;
}

export async function deleteProject(id: string) {
  const res = await apiClient.delete<ApiWrapperResponse<void>>(`/ ${id}`);
  return res.data.results;
}
