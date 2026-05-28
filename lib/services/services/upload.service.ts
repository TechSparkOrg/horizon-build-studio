import { dbMutate } from "@/lib/services/ServiceHelper";
import { uploadFile } from "@/lib/upload";

const ALLOWED_SUBDIRS = new Set(["projects", "models", "images", "banners", "sections"]);

export const uploadService = {
  file: (formData: FormData) =>
    dbMutate(async () => {
      const file = formData.get("file") as File | null;
      if (!file) throw new Error("No file provided");
      let subdir = (formData.get("subdir") as string) || "projects";
      if (!ALLOWED_SUBDIRS.has(subdir)) subdir = "projects";
      return uploadFile(file, subdir);
    }),
};
