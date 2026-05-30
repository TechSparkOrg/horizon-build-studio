import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getAllNews } from "@/lib/services/static-services";
import { cachedSectionContent } from "@/lib/content/cached-content";
import { buildSectionsMap, getVal } from "@/lib/content/section-content";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

async function fetchNewsList() {
  return getAllNews().catch(() => []);
}

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: t.listing.news.title,
    description: t.listing.news.description,
    openGraph: {
      title: t.listing.news.heading,
      description: t.listing.news.description,
      url: "/news",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Horizon Nepal News" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.listing.news.heading,
      description: t.listing.news.description,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical: "/news" },
  };
}

async function NewsList({
  searchParams,
}: {
  searchParams: Awaited<{ page?: string }>;
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 12;
  const t = getText((await cookies()).get("lang")?.value);

  const all = (await fetchNewsList()) as any[];
  const total = all.length;
  const totalPages = Math.ceil(total / limit);
  const items = all.slice((page - 1) * limit, page * limit);

  return (
    <>
      {/* Empty state */}
      {items.length === 0 ? (
        <p className="text-mid-gray">{t.listing.news.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              prefetch={false}
              className="group bg-white rounded-2xl overflow-hidden border border-light-gray hover:shadow-lg transition"
            >
              {/* Card image */}
              <div className="relative h-48 bg-gray-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Card body */}
              <div className="p-5">
                <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                  {item.category}
                </span>
                <h2 className="mt-2 font-display font-bold text-brand-secondary text-lg leading-snug">
                  {item.title}
                </h2>
                {item.excerpt && (
                  <p className="mt-2 text-sm text-mid-gray line-clamp-2">{item.excerpt}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary">
                  {t.news.readMore} &rarr;
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
              href={`/news?page=${page - 1}`}
              prefetch={false}
              className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
            >
              &larr; {t.listing.news.page} {page - 1}
            </Link>
          )}
          <span className="text-sm text-mid-gray">
            {t.listing.news.page} {page} {t.listing.news.of} {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/news?page=${page + 1}`}
              prefetch={false}
              className="h-10 px-4 rounded-lg border border-light-gray text-sm font-medium text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
            >
              {t.listing.news.page} {page + 1} &rarr;
            </Link>
          )}
        </div>
      )}
    </>
  );
}

async function NewsContent({ searchParams }: { searchParams: any }) {
  const lang = (await cookies()).get("lang")?.value || "en";
  const t = getText(lang);
  const [sectionsRaw] = await Promise.all([
    cachedSectionContent("news"),
  ]);

  const content = buildSectionsMap(sectionsRaw);

  const l = lang as "en" | "np";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content?.bgImage?.mediaUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"}
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
          <SectionLabel>{getVal(content, "label", t.listing.news.label, l)}</SectionLabel>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            {getVal(content, "h1", t.listing.news.heading, l)}
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-[640px] leading-relaxed">
            {getVal(content, "subtitle", t.listing.news.subtitle, l)}
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="pb-16 mt-4 bg-off-white min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<NewsSkeleton />}>
            <NewsList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default async function NewsListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;

  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <NewsContent searchParams={sp} />
    </Suspense>
  );
}


function NewsSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-light-gray">
          <div className="h-48 bg-gray-100" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-16 bg-gray-100 rounded" />
            <div className="h-5 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}