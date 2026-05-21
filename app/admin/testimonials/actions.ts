"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

export async function saveTestimonial(formData: FormData) {
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
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials?success=Testimonial+saved");
}
