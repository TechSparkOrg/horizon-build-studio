"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteFaq(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch(`/api/faqs/${id}`, { method: "DELETE" });
  revalidatePath("/admin/faqs");
}

export async function saveFaq(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    faqTypeId: (formData.get("faqTypeId") as string) || null,
    categoryId: (formData.get("categoryId") as string) || null,
    order: Number(formData.get("order") ?? 0),
  };
  const id = formData.get("id") as string;

  if (id) {
    await fetch(`/api/faqs/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
  } else {
    await api("/api/faqs").post(data);
  }

  revalidatePath("/admin/faqs");
  redirect("/admin/faqs?success=FAQ+saved");
}
