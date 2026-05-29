import { dbMutate } from "@/lib/services/ServiceHelper";
import { uploadFile } from "@/lib/storage/upload";

const ALLOWED_SUBDIRS = new Set(["projects", "models", "images", "banners", "sections", "videos"]);

export function fileUpload(formData: FormData) {
  return dbMutate(async () => {
    const file = formData.get("file") as File | null;
    if (!file) throw new Error("No file provided");
    let subdir = (formData.get("subdir") as string) || "projects";
    if (!ALLOWED_SUBDIRS.has(subdir)) subdir = "projects";
    return uploadFile(file, subdir);
  });
}
