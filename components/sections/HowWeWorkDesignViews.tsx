"use client";

import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

export function HowWeWorkDesignViews() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel>Design Showcase</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            See Your Project Come to Life Before We Build
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Explore interactive 3D architectural designs and interior walkthroughs
            &mdash; all created before a single brick is laid.
          </p>
        </AnimateOnView>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
          <AnimateOnView>
            <div className="space-y-4">
              <span className="font-label uppercase tracking-wider text-[11px] font-semibold text-brand-primary">
                Architectural Design
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-secondary">
                Interactive 3D Model
              </h3>
              <p className="text-mid-gray text-sm leading-relaxed">
                Explore every detail of your project in real time. Rotate, zoom,
                and inspect the design from every angle before construction begins.
              </p>
              <div className="rounded-2xl overflow-hidden border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <ModelViewer3D src="/glb/house.glb" hideBadge />
              </div>
            </div>
          </AnimateOnView>

          <AnimateOnView>
            <div className="space-y-4">
              <span className="font-label uppercase tracking-wider text-[11px] font-semibold text-brand-primary">
                Interior Design
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-secondary">
                Design Walkthrough
              </h3>
              <p className="text-mid-gray text-sm leading-relaxed">
                Step inside your future space with detailed interior visualizations
                that capture every finish, texture, and layout decision.
              </p>
              <div className="rounded-2xl overflow-hidden border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div className="aspect-video bg-brand-dark flex items-center justify-center text-white/40 text-sm rounded-2xl">
                  <VideoEmbed
                    platform="youtube"
                    embedUrl=""
                    fileUrl=""
                    fileType=""
                    title=""
                    thumbnail=""
                    sourceUrl=""
                  />
                </div>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
