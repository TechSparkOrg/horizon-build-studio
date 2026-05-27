"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveFaqType(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const name = formData.get("name") as string;
  const order = Number(formData.get("order") ?? 0);
  const id = formData.get("id") as string;

  if (id) {
    await fetch(`/api/faq-types/${id}`, { method: "PUT", body: JSON.stringify({ name, order }), headers: { "Content-Type": "application/json" } });
  } else {
    await api("/api/faq-types").post({ name, order });
  }

  revalidatePath("/admin/categories/faq-types");
  redirect("/admin/categories/faq-types?success=FAQ+type+saved");
}
