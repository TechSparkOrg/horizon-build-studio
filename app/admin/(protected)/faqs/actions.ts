"use server";

import { revalidateTag } from "next/cache";
import { faqService } from "@/lib/services/services/faq.service";
import { redirect } from "next/navigation";

export async function deleteFaq(id: string) {
  await faqService.delete(id);
  revalidateTag("faqs", "max");
}

export async function saveFaq(formData: FormData) {
  const data = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    faqTypeId: (formData.get("faqTypeId") as string) || null,
    categoryId: (formData.get("categoryId") as string) || null,
    order: Number(formData.get("order") ?? 0),
  };
  const id = formData.get("id") as string;

  if (id) {
    await faqService.update(id, data);
  } else {
    await faqService.create(data);
  }

  revalidateTag("faqs", "max");
  redirect("/admin/faqs?success=FAQ+saved");
}
