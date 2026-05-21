"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
}

export async function saveTeamMember(formData: FormData) {
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
    await prisma.teamMember.update({ where: { id }, data });
  } else {
    await prisma.teamMember.create({ data });
  }

  revalidatePath("/admin/team");
  redirect("/admin/team?success=Member+saved");
}
