"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTestimonial(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
  revalidatePath("/admin/testimonials");
}

export async function saveTestimonial(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = {
    author: formData.get("author") as string,
    role: formData.get("role") as string,
    company: (formData.get("company") as string) ?? "",
    quote: formData.get("quote") as string,
    initials: formData.get("initials") as string,
    avatar: (formData.get("avatar") as string) || null,
    rating: Number(formData.get("rating") ?? 5),
    order: Number(formData.get("order") ?? 0),
  };
  const id = formData.get("id") as string;

  if (id) {
    await fetch(`/api/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
  } else {
    await api("/api/testimonials").post(data);
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials?success=Testimonial+saved");
}
