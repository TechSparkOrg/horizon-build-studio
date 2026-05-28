"use server";

import { revalidateTag } from "next/cache";
import { newsService } from "@/lib/services/services/news.service";
import { redirect } from "next/navigation";

export async function deleteNews(id: string) {
  await newsService.delete(id);
  revalidateTag("news", "max");
}

export async function saveNews(formData: FormData) {
  const title = formData.get("title") as string;
  const slug =
    (formData.get("slug") as string) ||
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  const data = {
    title,
    slug,
    excerpt: (formData.get("excerpt") as string) ?? "",
    content: (formData.get("content") as string) ?? "",
    contentNp: (formData.get("contentNp") as string) ?? "",
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    alt: (formData.get("alt") as string) ?? "",
    projectId: (formData.get("projectId") as string) || null,
    publishedAt: new Date(formData.get("publishedAt") as string),
    readingTimeMinutes: Number(formData.get("readingTimeMinutes") ?? 3),
    metaTitle: (formData.get("metaTitle") as string) ?? "",
    metaDescription: (formData.get("metaDescription") as string) ?? "",
    metaKeywords: (formData.get("metaKeywords") as string) ?? "",
    customScript: (formData.get("customScript") as string) ?? "",
  };
  const id = formData.get("id") as string;

  if (id) {
    await newsService.update(id, data);
  } else {
    await newsService.create(data);
  }

  revalidateTag("news", "max");
  redirect("/admin/news?success=Article+saved");
}
