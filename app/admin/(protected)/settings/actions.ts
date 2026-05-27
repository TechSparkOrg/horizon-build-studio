"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSetting(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch("/api/settings", { method: "PUT", body: JSON.stringify(Object.fromEntries(formData.entries())), headers: { "Content-Type": "application/json" } });

  revalidatePath("/");
  redirect("/admin/settings?success=Settings+saved");
}
