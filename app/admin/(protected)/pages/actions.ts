"use server";

import { revalidateTag } from "next/cache";
import { pageService } from "@/lib/services/services/page.service";
import { redirect } from "next/navigation";

export async function savePage(formData: FormData) {
  const id = formData.get("id") as string;
  const slug = (formData.get("slug") as string)?.trim();
  if (!slug) throw new Error("Slug is required");

  const payload: Record<string, string> = {
    slug,
    title: (formData.get("title") as string) ?? "",
    contentEn: (formData.get("contentEn") as string) ?? "",
    contentNp: (formData.get("contentNp") as string) ?? "",
    metaTitle: (formData.get("metaTitle") as string) ?? "",
    metaDescription: (formData.get("metaDescription") as string) ?? "",
    metaKeywords: (formData.get("metaKeywords") as string) ?? "",
    customScript: (formData.get("customScript") as string) ?? "",
  };
  if (id) payload.id = id;

  await pageService.upsert(payload);
  revalidateTag("pages", "max");
  redirect("/admin/pages?success=Page+saved");
}

export async function deletePage(id: string) {
  await pageService.delete(id);
  revalidateTag("pages", "max");
}
