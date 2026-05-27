"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteNews(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch(`/api/news/${id}`, { method: "DELETE" });
  revalidatePath("/admin/news");
}

export async function saveNews(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
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
    await fetch(`/api/news/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
  } else {
    await api("/api/news").post(data);
  }

  revalidatePath("/admin/news");
  redirect("/admin/news?success=Article+saved");
}
