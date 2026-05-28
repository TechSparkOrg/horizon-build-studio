"use server";

import { revalidateTag } from "next/cache";
import { testimonialService } from "@/lib/services/services/testimonial.service";
import { redirect } from "next/navigation";

export async function deleteTestimonial(id: string) {
  await testimonialService.delete(id);
  revalidateTag("testimonials", "max");
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
    await testimonialService.update(id, data);
  } else {
    await testimonialService.create(data);
  }

  revalidateTag("testimonials", "max");
  redirect("/admin/testimonials?success=Testimonial+saved");
}
