"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function savePage(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

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

  const res = await fetch(`${BASE}/api/static-pages`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save page");

  revalidatePath("/admin/pages");
  redirect("/admin/pages?success=Page+saved");
}

export async function deletePage(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const res = await fetch(`${BASE}/api/static-pages?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete page");

  revalidatePath("/admin/pages");
}
