"use client";

import { AnimateOnView } from "@/components/AnimateOnView";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, type SectionContentMap } from "@/lib/content/section-content";

export function WelcomeText({ content }: { content?: SectionContentMap }) {
  const t = useText();
  const lang = useLang();
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnView>
          <span className="font-label text-xs tracking-[0.2em] uppercase text-brand-primary/60">
            {val("welcomeLabel", t.welcome.label)}
          </span>
          <h2 className="mt-4 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {val("welcomeH2", t.welcome.h2)}
          </h2>
          <div className="mt-6 mx-auto w-16 h-0.5 bg-brand-primary/30" />
          <p className="mt-6 text-mid-gray text-lg leading-relaxed max-w-[640px] mx-auto">
            {val("welcomeBody", t.welcome.body)}
          </p>
        </AnimateOnView>
      </div>
    </section>
  );
}
