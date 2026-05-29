"use server";

import { fileUpload as uploadFileService } from "@/lib/services/services/upload.service";
import { requireRole } from "@/lib/auth/guards";

export async function uploadFileAction(formData: FormData) {
  await requireRole("admin", "editor");
  return uploadFileService(formData);
}
