"use server";

import { revalidateTag } from "next/cache";
import { modelService } from "@/lib/services/services/model.service";
import { redirect } from "next/navigation";

export async function saveModel(formData: FormData) {
  const id = formData.get("id") as string;
  const slug = (formData.get("slug") as string)?.trim();
  if (!slug) throw new Error("Slug is required");

  const payload: Record<string, unknown> = {
    slug,
    title: (formData.get("title") as string) ?? "",
    metaTitle: (formData.get("metaTitle") as string) ?? "",
    metaDescription: (formData.get("metaDescription") as string) ?? "",
    metaKeywords: (formData.get("metaKeywords") as string) ?? "",
    customScript: (formData.get("customScript") as string) ?? "",
  };
  if (id) payload.id = id;

  const modelsRaw = formData.get("models3d") as string;
  if (modelsRaw) {
    payload.models3d = JSON.parse(modelsRaw);
  }

  await modelService.upsert(payload);
  revalidateTag("models", "max");
  redirect("/admin/models?success=Model+group+saved");
}

export async function deleteModel(id: string) {
  await modelService.delete(id);
  revalidateTag("models", "max");
}
