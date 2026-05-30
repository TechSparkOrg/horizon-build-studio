import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllProjects, getProjectBySlug, getProjectRelated, getProjectAdjacent, getProjectMetaBySlug } from "@/lib/services/static-services";
import { ProjectPageSchema } from "@/lib/schemas/project";

const ProjectDetail = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectDetail));
const ProjectFAQSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectFAQSection));
const ProjectRelatedSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectRelatedSection));
const ProjectAdjacentSection = dynamic(() => import("@/components/sections/ProjectDetail").then(m => m.ProjectAdjacentSection));

export async function generateStaticParams() {
  try {
    const all = await getAllProjects();
    if (all.length > 0) return all.map((p: any) => ({ slug: p.slug }));
  } catch { /* empty */ }
  return [{ slug: "__placeholder__" }];
}

const cache = new Map<string, unknown>();

async function getRawData(slug: string) {
  if (cache.has(slug)) return cache.get(slug) as ReturnType<typeof fetchData>;
  const promise = fetchData(slug);
  cache.set(slug, promise);
  return promise;
}

async function fetchData(slug: string) {
  try {
    const project = await getProjectBySlug(slug);
    if (!project) return { success: false as const };

    const faqs = (project.projectFaqs ?? []).map((pf: any) => pf.faq).filter(Boolean);
    const faqTypes = [...new Map(faqs.filter((f: any) => f.faqType).map((f: any) => [f.faqType.id, f.faqType])).values()];
    const [related, [prev, next]] = await Promise.all([
      getProjectRelated(project.id, project.categoryId),
      getProjectAdjacent(project.order),
    ]);

    return ProjectPageSchema.safeParse({
      project,
      faqs,
      faqTypes,
      related: related.map((r: any) => ({ ...r, category: r.category?.name ?? null })),
      adjacent: { prev, next },
    });
  } catch {
    return { success: false as const };
  }
}

function projectToProps(project: any) {
  return { ...project, category: project.category?.name ?? null };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const meta = await getProjectMetaBySlug(slug);
  if (!meta) return { title: "Project Not Found" };
  return { title: meta.title, description: meta.shortDescription };
}

async function ProjectContent({ slug }: { slug: string }) {
  const parsed = await getRawData(slug);
  if (!parsed.success) notFound();

  const { project, faqs, faqTypes, related, adjacent } = parsed.data;

  return (
    <ProjectDetail
      project={projectToProps(project)}
      faqSlot={
        <Suspense fallback={null}>
          <ProjectFAQSection faqs={faqs} faqTypes={faqTypes} />
        </Suspense>
      }
      relatedSlot={related.length > 0 ? (
        <Suspense fallback={null}>
          <ProjectRelatedSection related={related} />
        </Suspense>
      ) : null}
      adjacentSlot={
        <Suspense fallback={null}>
          <ProjectAdjacentSection adjacent={adjacent} />
        </Suspense>
      }
    />
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <ProjectContent slug={slug} />;
}
