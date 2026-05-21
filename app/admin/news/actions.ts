"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteNews(id: string) {
  await prisma.newsArticle.delete({ where: { id } });
  revalidatePath("/admin/news");
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
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    alt: (formData.get("alt") as string) ?? "",
    projectId: (formData.get("projectId") as string) || null,
    publishedAt: new Date(formData.get("publishedAt") as string),
    readingTimeMinutes: Number(formData.get("readingTimeMinutes") ?? 3),
  };
  const id = formData.get("id") as string;

  if (id) {
    await prisma.newsArticle.update({ where: { id }, data });
  } else {
    await prisma.newsArticle.create({ data });
  }

  revalidatePath("/admin/news");
  redirect("/admin/news?success=Article+saved");
}
