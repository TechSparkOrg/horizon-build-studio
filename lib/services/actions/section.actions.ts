"use server";

import { sectionService, sectionDefService } from "@/lib/services/services/section.service";
import { requireAuth, requireRole } from "@/lib/auth";

export async function getAllSectionDefs() {
  await requireAuth();
  return sectionDefService.getAll();
}

export async function createSectionDef(slug: string, label: string) {
  await requireRole("admin");
  return sectionDefService.create({ slug, label, order: 0 });
}

export async function deleteSectionDef(id: string) {
  await requireRole("admin");
  return sectionDefService.delete(id);
}

export async function getAllSectionContents() {
  await requireAuth();
  return sectionService.getAll();
}

export async function upsertSectionContents(section: string, items: Array<{
  key: string; valueEn: string; valueNp: string;
  mediaUrl: string | null; mediaType: string | null; order: number;
}>) {
  await requireAuth();
  return sectionService.upsertItems(section, items);
}

export async function uploadSectionFile(formData: FormData) {
  await requireAuth();
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided");
  const { uploadFile } = await import("@/lib/upload");
  return uploadFile(file, "sections");
}
