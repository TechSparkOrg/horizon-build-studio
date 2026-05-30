"use client";

import Image from "next/image";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { useSectionValue } from "@/lib/content/use-section-value";
import type { SectionContentMap } from "@/lib/content/section-content";

interface TextContentData {
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
}

export function HowWeWorkHero({ content, textContent }: { content?: SectionContentMap; textContent?: TextContentData | null }) {
  const t = useText();
  const lang = useLang();

  const val = (key: string, fb: string) => useSectionValue(content, key, fb);

  const headingEn = textContent?.headingEn || t.howWeWork.hero.h1a + " " + t.howWeWork.hero.h1b;
  const headingNp = textContent?.headingNp || t.howWeWork.hero.h1a + " " + t.howWeWork.hero.h1b;
  const heading = lang === "np" ? headingNp : headingEn;

  const subheading = lang === "np" && textContent?.subheadingNp ? textContent.subheadingNp : textContent?.subheadingEn || val("subtitle", t.howWeWork.hero.subtitle);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content?.bgImage?.mediaUrl || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.19 0.05 260 / 0.88) 40%, oklch(0.19 0.05 260 / 0.35) 100%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div
          className="max-w-[640px] animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="font-label uppercase tracking-[0.15em] text-white text-xs font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-block">
            {val("label", t.howWeWork.hero.label)}
          </span>
        </div>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] animate-fade-in-up"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", animationDelay: "0.2s" }}
        >
          {heading}
        </h1>

        <p
          className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          {subheading}
        </p>

        <div
          className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#process"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            {val("cta", t.howWeWork.hero.cta)}
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
          >
            {val("cta2", t.howWeWork.hero.cta2)}
          </a>
        </div>
      </div>
    </section>
  );
}
