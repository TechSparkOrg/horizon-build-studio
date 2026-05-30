"use client";

import Link from "next/link";
import { ArrowRight, Shield, Award, Building2, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, parseJSONLocale, type SectionContentMap } from "@/lib/content/section-content";

interface TextContentData {
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
}

const STAT_ICONS: Record<string, LucideIcon> = { Shield, Award, Building2, Users };

const statsFallback: { icon: string; label: string }[] = [
  { icon: "Shield", label: "25+ Years Experience" },
  { icon: "Award", label: "200+ Projects Done" },
  { icon: "Building2", label: "50+ Team Members" },
  { icon: "Users", label: "15+ Districts" },
];

export function AboutHero({ content, textContent }: { content?: SectionContentMap; textContent?: TextContentData | null }) {
  const t = useText();
  const lang = useLang() as "en" | "np";
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);
  const stats = parseJSONLocale<{ icon: string; label: string }[]>(content, "heroStats", statsFallback, lang);

  const heading = lang === "np" && textContent?.headingNp ? textContent.headingNp : textContent?.headingEn || val("h2", t.about.h2);
  const subheading = lang === "np" && textContent?.subheadingNp ? textContent.subheadingNp : textContent?.subheadingEn || val("description", t.about.description);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
            "linear-gradient(90deg, oklch(0.19 0.05 260 / 0.92) 0%, oklch(0.19 0.05 260 / 0.65) 50%, oklch(0.19 0.05 260 / 0.3) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, oklch(0.19 0.05 260 / 0.5), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-24">
        <div className="max-w-[680px]">
          <AnimateOnView animation="fade-in-up">
            <SectionLabel>{val("label", t.about.label)}</SectionLabel>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <h1
              className="mt-5 font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {heading}
            </h1>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <p className="mt-5 text-white/75 text-lg max-w-[520px] leading-relaxed">
              {subheading}
            </p>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 flex flex-wrap gap-6">
              {stats.map((s) => {
                const Icon = STAT_ICONS[s.icon];
                if (!Icon) return null;
                return (
                  <div key={s.label} className="flex items-center gap-2 text-white/80">
                    <Icon className="size-4 text-brand-primary" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-px transition-all duration-200"
              >
                {val("cta", t.hero.cta)} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/projects"
                prefetch={false}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 transition-all duration-200"
              >
                {val("ctaAbout", t.about.cta)} <ArrowRight className="size-4" />
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
