"use client";

import Link from "next/link";
import { ArrowRight, Home, Compass, PenTool, Users } from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, getMedia, parseJSONLocale, type SectionContentMap } from "@/lib/content/section-content";

const ICON_MAP = { Home, Compass, PenTool, Users } as const;

function ServiceCard({
  icon,
  title,
  body,
  exploreLabel,
}: {
  icon: keyof typeof ICON_MAP;
  title: string;
  body: string;
  exploreLabel: string;
}) {
  const Icon = ICON_MAP[icon];
  return (
    <article className="group relative bg-white rounded-2xl p-7 border border-light-gray/50 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-t-2xl" />

      <div className="size-11 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary grid place-items-center mb-5 transition-colors duration-300">
        <Icon className="size-5 text-brand-primary group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="font-body font-semibold text-lg text-brand-secondary">{title}</h3>
      <p className="mt-2.5 text-mid-gray text-sm leading-relaxed">{body}</p>

      <div className="mt-5 flex items-center gap-1 text-brand-primary text-xs font-semibold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        {exploreLabel} <ArrowRight className="size-3" />
      </div>
    </article>
  );
}

interface ModelEntry {
  url: string;
  filename: string;
  type: string;
  label: string;
}

export function ServicesSection({ content, models3d = [] }: { content?: SectionContentMap; models3d?: ModelEntry[] }) {
  const t = useText();
  const lang = useLang() as "en" | "np";
  const cards = parseJSONLocale<{ icon: string; title: string; body: string }[]>(content, "cards", t.services.cards, lang);

  return (
    <section id="services" className="bg-off-white py-20 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>{getVal(content, "label", t.services.label, lang)}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
            {getVal(content, "h2", t.services.h2, lang)}
          </h2>
          <p className="mt-4 text-mid-gray text-lg leading-relaxed">
            {getVal(content, "subtitle", t.services.subtitle, lang)}
          </p>
        </AnimateOnView>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 animate-stagger">
          {cards.slice(0, 3).map((s) => (
            <AnimateOnView key={s.title}>
              <ServiceCard icon={s.icon as keyof typeof ICON_MAP} title={s.title} body={s.body} exploreLabel={getVal(content, "explore", t.services.explore, lang)} />
            </AnimateOnView>
          ))}

          <AnimateOnView className="md:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-light-gray/50 shadow-[0_2px_16px_rgba(0,0,0,0.04)] bg-white">
              {(() => {
                const modelUrl = getMedia(content, "sandModelPath", "") || models3d[1]?.url || models3d[0]?.url;
                return modelUrl ? (
                  <ModelViewer3D
                    src={modelUrl}
                    className="w-full h-56 md:h-72 bg-transparent"
                    hideBadge
                  />
                ) : (
                  <div className="w-full h-56 md:h-72 flex items-center justify-center text-mid-gray/40 text-sm">
                    No model
                  </div>
                );
              })()}
              <div className="absolute bottom-4 left-4 bg-white/85 backdrop-blur-sm border border-light-gray/60 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none">
                <span className="size-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-xs font-semibold text-brand-secondary">3D Site Preview</span>
              </div>
            </div>
          </AnimateOnView>

          {cards.slice(3).map((s) => (
            <AnimateOnView key={s.title}>
              <ServiceCard icon={s.icon as keyof typeof ICON_MAP} title={s.title} body={s.body} exploreLabel={getVal(content, "explore", t.services.explore, lang)} />
            </AnimateOnView>
          ))}
        </div>

        <AnimateOnView className="mt-14 text-center">
          <Link
            href="/how-we-work"
            prefetch={false}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white active:scale-[0.97] transition-all duration-200"
          >
            {getVal(content, "explore", t.services.explore, lang)}
            <ArrowRight className="size-4" />
          </Link>
        </AnimateOnView>
      </div>
    </section>
  );
}