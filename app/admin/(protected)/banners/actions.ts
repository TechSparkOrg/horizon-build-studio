"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function saveBanner(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

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

  const imagesRaw = formData.get("images") as string;
  if (imagesRaw) {
    payload.images = JSON.parse(imagesRaw);
  }

  const res = await fetch(`${BASE}/api/page-banners`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save banner");

  revalidatePath("/admin/banners");
  redirect("/admin/banners?success=Banner+saved");
}

export async function deleteBanner(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const res = await fetch(`${BASE}/api/page-banners?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete banner");

  revalidatePath("/admin/banners");
}
