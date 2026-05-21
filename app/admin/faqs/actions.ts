"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteFaq(id: string) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/admin/faqs");
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
    await prisma.fAQ.update({ where: { id }, data });
  } else {
    await prisma.fAQ.create({ data });
  }

  revalidatePath("/admin/faqs");
  redirect("/admin/faqs?success=FAQ+saved");
}
