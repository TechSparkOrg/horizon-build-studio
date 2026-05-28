import { Suspense } from "react";
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache-config";
import { getText } from "@/lib/lang";
import { projectService } from "@/lib/services/services/project.service";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

async function getAllProjects() {
  "use cache";
  cacheLife(CACHE_TTL[CACHE_TAGS.PROJECTS]);
  cacheTag(CACHE_TAGS.PROJECTS);
  return projectService.getAll().catch(() => []);
}

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: t.listing.projects.title,
    description: t.listing.projects.description,
    openGraph: {
      title: t.listing.projects.heading,
      description: t.listing.projects.description,
      url: "/projects",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Horizon Nepal Projects" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.listing.projects.heading,
      description: t.listing.projects.description,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical: "/projects" },
  };
}

async function ProjectList({
  searchParams,
}: {
  searchParams: Awaited<{ page?: string; cat?: string }>;
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const activeCat = searchParams.cat ?? "All";
  const limit = 12;
  const t = getText((await cookies()).get("lang")?.value);

  const all = (await getAllProjects()) as any[];
  const categories = ["All", ...new Set(all.map((p: any) => p.category?.name).filter(Boolean))];
  const filtered = activeCat === "All" ? all : all.filter((p: any) => p.category?.name === activeCat);
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const items = filtered.slice((page - 1) * limit, page * limit);

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      completed: t.statusLabels.completed,
      in_progress: t.statusLabels.inProgress,
      planning: t.statusLabels.planning,
      on_hold: t.statusLabels.onHold,
    };
    return map[status] ?? status;
  };

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(categories as string[]).map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/projects" : `/projects?cat=${encodeURIComponent(cat)}`}
            prefetch={false}
            className={[
              "px-4 py-2 text-sm font-medium rounded-lg border transition",
              activeCat === cat
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-mid-gray border-light-gray hover:border-brand-primary hover:text-brand-primary",
            ].join(" ")}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <p className="text-mid-gray">{t.listing.projects.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Link
              key={item.id}
              href={`/projects/${item.slug}`}
              prefetch={false}
              className="group bg-white rounded-2xl overflow-hidden border border-light-gray hover:shadow-lg transition"
            >
              {/* Card image */}
              <div className="relative h-56 bg-gray-100">
                {item.img && (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {item.status && (
                  <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-gray-900/30 text-white border-white/30">
                    {statusLabel(item.status)}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                {item.category?.name && (
                  <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                    {item.category.name}
                  </span>
                )}
                <h2 className="mt-1 font-display font-bold text-brand-secondary text-lg leading-snug">
                  {item.title}
                </h2>
                {item.shortDescription && (
                  <p className="mt-2 text-sm text-mid-gray line-clamp-2">{item.shortDescription}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-mid-gray">
                  {item.location && <span>{item.location}</span>}
                  {item.completion > 0 && (
                    <span>
                      {item.completion}% {t.projectDetail.timeline}
                    </span>
                  )}
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary">
                  {t.portfolio.viewProject} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3">
          {page > 1 && (
            <Link
              href={`/projects?page=${page - 1}${activeCat !== "All" ? `&cat=${encodeURIComponent(activeCat)}` : ""}`}
              prefetch={false}
              className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
            >
              &larr; {t.listing.projects.page} {page - 1}
            </Link>
          )}
          <span className="text-sm text-mid-gray">
            {t.listing.projects.page} {page} {t.listing.projects.of} {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/projects?page=${page + 1}${activeCat !== "All" ? `&cat=${encodeURIComponent(activeCat)}` : ""}`}
              prefetch={false}
              className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
            >
              {t.listing.projects.page} {page + 1} &rarr;
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default async function ProjectsListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; cat?: string }>;
}) {
  const sp = await searchParams;
  const t = getText((await cookies()).get("lang")?.value);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.19 0.05 260 / 0.92) 40%, oklch(0.19 0.05 260 / 0.5) 100%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>{t.listing.projects.label}</SectionLabel>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            {t.listing.projects.heading}
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-[640px] leading-relaxed">
            {t.listing.projects.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="pb-16 mt-4 bg-off-white min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectList searchParams={sp} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-wrap gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-20 rounded-lg bg-white border border-light-gray" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-light-gray">
            <div className="h-56 bg-gray-100" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-5 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}