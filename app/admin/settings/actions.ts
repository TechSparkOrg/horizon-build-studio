"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSetting(formData: FormData) {
  const entries = Array.from(formData.entries());

  for (const [key, value] of entries) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value), type: "text", section: "general" },
    });
  }

  revalidatePath("/");
  redirect("/admin/settings?success=Settings+saved");
}
