"use server";

import { revalidateTag } from "next/cache";
import { deleteTeamMember as serviceDeleteTeamMember, updateTeamMember, createTeamMember } from "@/lib/services/services/team.service";
import { redirect } from "next/navigation";

export async function deleteTeamMember(id: string) {
  await serviceDeleteTeamMember(id);
  revalidateTag("team", "max");
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
    await updateTeamMember(id, data);
  } else {
    await createTeamMember(data);
  }

  revalidateTag("team", "max");
  redirect("/admin/team?success=Member+saved");
}
