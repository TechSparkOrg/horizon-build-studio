"use server";

import { getAll, upsertItems, getAllSectionDefs as getAllDefs, createSectionDef as createDef, deleteSectionDef as deleteDef } from "@/lib/services/services/section.service";
import { requireAuth, requireRole } from "@/lib/auth/guards";

export async function getAllSectionDefs() {
  await requireAuth();
  return getAllDefs();
}

export async function createSectionDef(slug: string, label: string) {
  await requireRole("admin");
  return createDef({ slug, label, order: 0 });
}

export async function deleteSectionDef(id: string) {
  await requireRole("admin");
  return deleteDef(id);
}

export async function getAllSectionContents() {
  await requireAuth();
  return getAll();
}

export async function upsertSectionContents(section: string, items: Array<{
  key: string; valueEn: string; valueNp: string;
  mediaUrl: string | null; mediaType: string | null; order: number;
}>) {
  await requireAuth();
  return upsertItems(section, items);
}

export async function uploadSectionFile(formData: FormData) {
  await requireAuth();
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided");
  const { uploadFile } = await import("@/lib/storage/upload");
  return uploadFile(file, "sections");
}
