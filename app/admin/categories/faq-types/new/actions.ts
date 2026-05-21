"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function saveFaqType(formData: FormData) {
  const name = formData.get("name") as string;
  const order = Number(formData.get("order") ?? 0);
  const id = formData.get("id") as string;
  let slug = slugify(name);

  const existing = await prisma.fAQType.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    slug = `${slug}-${Date.now()}`;
  }

  if (id) {
    await prisma.fAQType.update({
      where: { id },
      data: { name, slug, order },
    });
  } else {
    await prisma.fAQType.create({
      data: { name, slug, order },
    });
  }

  revalidatePath("/admin/categories/faq-types");
  redirect("/admin/categories/faq-types?success=FAQ+type+saved");
}
