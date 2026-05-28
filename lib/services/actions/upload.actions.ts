"use server";

import { uploadService } from "@/lib/services/services/upload.service";
import { requireRole } from "@/lib/auth";

export async function uploadFileAction(formData: FormData) {
  await requireRole("admin", "editor");
  return uploadService.file(formData);
}
