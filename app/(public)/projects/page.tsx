import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getAll } from "@/lib/services/services/project.service";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

type CardItem = {
  id: string; title: string; slug: string; img: string; alt: string;
  status: string; completion: number; location: string;
  shortDescription: string; published: boolean;
  category: { id: string; name: string } | null;
};

async function t() { return getText((await cookies()).get("lang")?.value); }

function catUrl(cat: string, pg?: number) {
  if (cat === "All" && !pg) return "/projects";
  const p = new URLSearchParams();
  if (cat !== "All") p.set("cat", cat);
  if (pg && pg > 1) p.set("page", String(pg));
  return `/projects${p.toString() ? `?${p}` : ""}`;
}

const statusLabel = (tr: Record<string, string>) => {
  const m: Record<string, string> = {
    completed: tr.completed, in_progress: tr.inProgress,
    planning: tr.planning, on_hold: tr.onHold,
  };
  return (s: string) => m[s] ?? s;
};

export async function generateMetadata() {
  const lang = await t();
  const title = lang.listing.projects.title;
  const { description } = lang.listing.projects;
  return { title, description,
    openGraph: { title: lang.listing.projects.heading, description, url: "/projects", siteName: "Horizon Nepal", locale: "en_US", type: "website", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Horizon Nepal Projects" }] },
    twitter: { card: "summary_large_image", title: lang.listing.projects.heading, description, images: ["/og-image.jpg"] },
    alternates: { canonical: "/projects" },
  };
}

async function ProjectList({ searchParams }: { searchParams: Promise<{ page?: string; cat?: string }> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));
  const activeCat = sp.cat ?? "All";
  const limit = 12;
  const lang = await t();
  const label = statusLabel(lang.statusLabels);

  const all = (await getAll().catch(() => [] as CardItem[])).filter((p) => p.published === true);
  const categories = [...new Set(["All", ...all.map((p) => p.category?.name).filter(Boolean)])];
  const filtered = activeCat === "All" ? all : all.filter((p) => p.category?.name === activeCat);
  const items = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link key={cat} href={catUrl(cat)} prefetch={false}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${activeCat === cat ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-mid-gray border-light-gray hover:border-brand-primary hover:text-brand-primary"}`}>
            {cat}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-mid-gray">{lang.listing.projects.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/projects/${item.slug}`} prefetch={false}
              className="group bg-white rounded-2xl overflow-hidden border border-light-gray hover:shadow-lg transition">
              <div className="relative h-56 bg-gray-100">
                {item.img && <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                {item.status && <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-gray-900/30 text-white border-white/30">{label(item.status)}</span>}
              </div>
              <div className="p-5">
                {item.category?.name && <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">{item.category.name}</span>}
                <h2 className="mt-1 font-display font-bold text-brand-secondary text-lg leading-snug">{item.title}</h2>
                {item.shortDescription && <p className="mt-2 text-sm text-mid-gray line-clamp-2">{item.shortDescription}</p>}
                {(item.location || item.completion > 0) && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-mid-gray">
                    {item.location && <span>{item.location}</span>}
                    {item.completion > 0 && <span>{item.completion}% {lang.projectDetail.timeline}</span>}
                  </div>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary">{lang.portfolio.viewProject} &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3">
          {page > 1 && <Link href={catUrl(activeCat, page - 1)} prefetch={false} className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition">&larr; {lang.listing.projects.page} {page - 1}</Link>}
          <span className="text-sm text-mid-gray">{lang.listing.projects.page} {page} {lang.listing.projects.of} {totalPages}</span>
          {page < totalPages && <Link href={catUrl(activeCat, page + 1)} prefetch={false} className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition">{lang.listing.projects.page} {page + 1} &rarr;</Link>}
        </div>
      )}
    </>
  );
}

export default async function ProjectsListingPage({ searchParams }: { searchParams: Promise<{ page?: string; cat?: string }> }) {
  const lang = await t();
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0.19 0.05 260 / 0.92) 40%, oklch(0.19 0.05 260 / 0.5) 100%)" }} />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>{lang.listing.projects.label}</SectionLabel>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">{lang.listing.projects.heading}</h1>
          <p className="mt-4 text-white/75 text-lg max-w-[640px] leading-relaxed">{lang.listing.projects.subtitle}</p>
        </div>
      </section>
      <main className="pb-16 mt-4 bg-off-white min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-wrap gap-2 mb-8">{[1, 2, 3, 4].map((i) => <div key={i} className="h-9 w-20 rounded-lg bg-white border border-light-gray" />)}</div>
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
