"use server";

import { revalidateTag } from "next/cache";
import { projectService } from "@/lib/services/services/project.service";
import { requireRole } from "@/lib/auth";

export async function createProject(data: unknown) {
  await requireRole("admin", "editor");
  const result = await projectService.create(data);
  revalidateTag("projects", "max");
  return result;
}

export async function updateProject(id: string, data: unknown) {
  await requireRole("admin", "editor");
  const result = await projectService.update(id, data);
  revalidateTag("projects", "max");
  return result;
}

export async function deleteProject(id: string) {
  await requireRole("admin");
  await projectService.delete(id);
  revalidateTag("projects", "max");
}
