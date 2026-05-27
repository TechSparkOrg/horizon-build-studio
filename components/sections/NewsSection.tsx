"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { useText } from "@/lib/lang-client";
interface NewsItem { title: string; excerpt: string; cat: string; date: string; img: string; slug: string; }

export function NewsSection({ news = [] }: { news: NewsItem[] }) {
  const t = useText();
  return (
    <section id="news" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>{t.news.label}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            {t.news.h2}
          </h2>
        </AnimateOnView>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
          {news.map((n) => (
            <article
              key={n.slug}
              className="bg-white rounded-2xl overflow-hidden border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300 group"
            >
              <Link href={`/news/${n.slug}`} prefetch={false} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={n.img}
                    alt={n.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-label uppercase tracking-wider text-xs px-2 py-1 bg-off-white text-brand-primary rounded">
                      {n.cat}
                    </span>
                    <time className="text-xs text-mid-gray">{n.date}</time>
                  </div>
                  <h3 className="font-body font-semibold text-xl text-brand-secondary line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-mid-gray line-clamp-2">{n.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-brand-primary font-semibold text-sm group-hover:underline">
                    {t.news.readMore} <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            </article>
          ))}

          <div className="rounded-lg overflow-hidden bg-transparent min-h-[360px]">
            <ModelViewer3D
              src="/glb/brigfe.glb"
              className="w-full h-full rounded-lg bg-transparent"
              hideBadge
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            prefetch={false}
            className="inline-flex items-center gap-2 h-11 px-6 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            {t.news.viewAll} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
