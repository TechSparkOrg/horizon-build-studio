"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function updateSetting(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch(`${BASE}/api/settings`, {
    method: "PUT",
    body: JSON.stringify(Object.fromEntries(formData.entries())),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/");
  redirect("/admin/settings?success=Settings+saved");
}
