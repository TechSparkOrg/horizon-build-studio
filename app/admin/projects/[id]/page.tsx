import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectForm } from "../project-form";


export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      media: { orderBy: { order: "asc" } },
      videos: { orderBy: { order: "asc" } },
      models3d: { orderBy: { createdAt: "asc" } },
      phases: { include: { medias: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } },
      projectFaqs: { orderBy: { order: "asc" } },
      attributes: { orderBy: { order: "asc" } },
      category: { select: { id: true, name: true } },
    },
  });

  if (!project) notFound();

  return <ProjectForm initialData={JSON.parse(JSON.stringify(project))} />;
}
