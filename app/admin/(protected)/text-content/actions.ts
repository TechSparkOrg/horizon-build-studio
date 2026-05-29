"use server";

import { revalidateTag } from "next/cache";
import { updateTextContent, createTextContent, deleteTextContent as serviceDeleteTextContent } from "@/lib/services/services/text-content.service";
import { redirect } from "next/navigation";

export async function saveTextContent(formData: FormData) {
  const label = formData.get("label") as string;
  const slug = (formData.get("slug") as string)?.trim() || label.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  const headingEn = formData.get("headingEn") as string;
  const headingNp = formData.get("headingNp") as string;
  const subheadingEn = formData.get("subheadingEn") as string;
  const subheadingNp = formData.get("subheadingNp") as string;
  const id = formData.get("id") as string;

  const data = { slug, label, headingEn, headingNp, subheadingEn, subheadingNp };

  if (id) {
    await updateTextContent(id, data);
  } else {
    await createTextContent(data);
  }

  revalidateTag("text-content", "max");
  redirect("/admin/text-content?success=Text+content+saved");
}

export async function deleteTextContent(id: string) {
  await serviceDeleteTextContent(id);
  revalidateTag("text-content", "max");
}
