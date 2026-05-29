"use server";

import { revalidateTag } from "next/cache";
import { createProject as createProjectService, updateProject as updateProjectService, deleteProject as deleteProjectService } from "@/lib/services/services/project.service";
import { requireRole } from "@/lib/auth/guards";

export async function createProject(data: unknown) {
  await requireRole("admin", "editor");
  const result = await createProjectService(data);
  revalidateTag("projects", "max");
  return result;
}

export async function updateProject(id: string, data: unknown) {
  await requireRole("admin", "editor");
  const result = await updateProjectService(id, data);
  revalidateTag("projects", "max");
  return result;
}

export async function deleteProject(id: string) {
  await requireRole("admin");
  await deleteProjectService(id);
  revalidateTag("projects", "max");
}
