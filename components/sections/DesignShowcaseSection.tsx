"use client";

import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { AnimateOnView } from "@/components/AnimateOnView";
import { getVal, type SectionContentMap } from "@/lib/content/section-content";
import { useLang } from "@/lib/i18n/lang-client";

export function DesignShowcaseSection({ content }: { content?: SectionContentMap }) {
  const lang = useLang();
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);

  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView animation="scale-in" className="relative min-h-[70vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

          <div className="relative w-full h-[70vh]">
            <ModelViewer3D
              src={content?.showcaseModel?.mediaUrl || "/glb/folding.glb"}
              className="w-full h-full bg-white"
              hideBadge
              loading="lazy"
            />
          </div>

          <p className="absolute bottom-6 left-6 text-white/70 text-xs tracking-[0.2em] uppercase font-light">
            {val("showcaseLabel", "Featured Design")}
          </p>
        </AnimateOnView>
      </div>
    </section>
  );
}
