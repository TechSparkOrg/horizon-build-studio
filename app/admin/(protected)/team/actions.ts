"use server";

import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTeamMember(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await fetch(`/api/team/${id}`, { method: "DELETE" });
  revalidatePath("/admin/team");
}

export async function saveTeamMember(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    img: formData.get("img") as string,
    alt: (formData.get("alt") as string) ?? "",
    linkedin: (formData.get("linkedin") as string) || null,
    email: (formData.get("email") as string) || null,
    order: Number(formData.get("order") ?? 0),
  };
  const id = formData.get("id") as string;

  if (id) {
    await fetch(`/api/team/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
  } else {
    await api("/api/team").post(data);
  }

  revalidatePath("/admin/team");
  redirect("/admin/team?success=Member+saved");
}
