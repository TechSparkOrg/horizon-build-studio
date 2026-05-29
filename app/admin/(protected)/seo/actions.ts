"use server";

import { revalidateTag } from "next/cache";
import { upsert, deleteSeo as serviceDeleteSeo } from "@/lib/services/services/seo.service";
import { redirect } from "next/navigation";

export async function saveSeo(formData: FormData) {
  const id = formData.get("id") as string;
  const title = (formData.get("title") as string) ?? "";
  const slug = (formData.get("slug") as string)?.trim() || title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const payload: Record<string, string> = {
    slug,
    title: (formData.get("title") as string) ?? "",
    text1En: (formData.get("text1En") as string) ?? "",
    text1Np: (formData.get("text1Np") as string) ?? "",
    text2En: (formData.get("text2En") as string) ?? "",
    text2Np: (formData.get("text2Np") as string) ?? "",
    metaTitle: (formData.get("metaTitle") as string) ?? "",
    metaDescription: (formData.get("metaDescription") as string) ?? "",
    metaKeywords: (formData.get("metaKeywords") as string) ?? "",
    ogImage: (formData.get("ogImage") as string) ?? "",
    customScript: (formData.get("customScript") as string) ?? "",
  };
  if (id) payload.id = id;

  await upsert(payload);
  revalidateTag("seo", "max");
  redirect("/admin/seo?success=SEO+entry+saved");
}

export async function deleteSeo(id: string) {
  await serviceDeleteSeo(id);
  revalidateTag("seo", "max");
}
