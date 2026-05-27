import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { ProjectForm } from "../project-form";


export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raw = await api(`/api/projects/${id}`).get();
  if (!raw || (typeof raw === "object" && "error" in (raw as Record<string, unknown>))) notFound();

  return <ProjectForm initialData={raw as any} />;
}
