"use server";

import { revalidateTag } from "next/cache";
import { settingsService } from "@/lib/services/services/settings.service";
import { redirect } from "next/navigation";

export async function updateSetting(formData: FormData) {
  const entries = Array.from(formData.entries()).map(([k, v]) => [k, String(v)]);
  await settingsService.upsertMany(Object.fromEntries(entries));
  revalidateTag("settings", "max");
  redirect("/admin/settings?success=Settings+saved");
}
