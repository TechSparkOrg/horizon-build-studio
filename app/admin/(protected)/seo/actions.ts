"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function saveSeo(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const slug = (formData.get("slug") as string)?.trim();
  if (!slug) throw new Error("Slug is required");

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

  const res = await fetch(`${BASE}/api/page-seo`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save SEO entry");

  revalidatePath("/admin/seo");
  redirect("/admin/seo?success=SEO+entry+saved");
}

export async function deleteSeo(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const res = await fetch(`${BASE}/api/page-seo?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete SEO entry");

  revalidatePath("/admin/seo");
}
