"use server";

import { revalidateTag } from "next/cache";
import { upsert, deleteBanner as serviceDeleteBanner } from "@/lib/services/services/banner.service";
import { redirect } from "next/navigation";

export async function saveBanner(formData: FormData) {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string) ?? "";
  const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const payload: Record<string, unknown> = {
    slug,
    title: (formData.get("title") as string) ?? "",
    metaTitle: (formData.get("metaTitle") as string) ?? "",
    metaDescription: (formData.get("metaDescription") as string) ?? "",
    metaKeywords: (formData.get("metaKeywords") as string) ?? "",
    customScript: (formData.get("customScript") as string) ?? "",
  };
  if (id) payload.id = id;

  const imagesRaw = formData.get("images") as string;
  if (imagesRaw) {
    payload.images = JSON.parse(imagesRaw);
  }

  await upsert(payload);
  revalidateTag("banners", "max");
  redirect("/admin/banners?success=Banner+saved");
}

export async function deleteBanner(id: string) {
  await serviceDeleteBanner(id);
  revalidateTag("banners", "max");
}
