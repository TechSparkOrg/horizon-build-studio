"use server";

import { revalidateTag } from "next/cache";
import { faqTypeService } from "@/lib/services/services/faq-type.service";
import { redirect } from "next/navigation";

export async function saveFaqType(formData: FormData) {
  const name = formData.get("name") as string;
  const order = Number(formData.get("order") ?? 0);
  const id = formData.get("id") as string;

  if (id) {
    await faqTypeService.update(id, { name, order });
  } else {
    await faqTypeService.create({ name, order });
  }

  revalidateTag("faq-types", "max");
  redirect("/admin/categories/faq-types?success=FAQ+type+saved");
}
