"use client";

import { motion } from "framer-motion";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { slideLeft, slideRight } from "@/lib/motion-variants";

interface AngleItem {
  label: string;
  title: string;
  description: string;
}

const angles: AngleItem[] = [
  {
    label: "01 — Front Elevation",
    title: "The Face of Your Building",
    description:
      "Every structure tells a story from the moment you approach it. Our front elevation designs balance proportion, material texture, and natural light to create a lasting first impression that complements its surroundings.",
  },
  {
    label: "02 — Rear Perspective",
    title: "Where Function Meets Nature",
    description:
      "The rear of a building is where indoor and outdoor living blend seamlessly. We design rear perspectives that maximize garden access, terrace flow, and passive ventilation — turning the back of your home into a private sanctuary.",
  },
  {
    label: "03 — Top-Down Layout",
    title: "The Blueprint of Flow",
    description:
      "A great building starts with an intelligent floor plan. Our top-down layouts prioritize circulation, zoning, and spatial efficiency — ensuring every square foot serves a purpose while maintaining an open, breathable atmosphere.",
  },
  {
    label: "04 — Interior Angle",
    title: "Spaces You Feel",
    description:
      "Interior design is about more than finishes — it is about how a room makes you feel. We craft interiors with layered lighting, warm material palettes, and intentional sightlines that guide you naturally from one space to the next.",
  },
  {
    label: "05 — Side Profile",
    title: "Silhouette & Substance",
    description:
      "A building's side profile reveals its structural rhythm. From roofline to foundation, we sculpt volumes that read beautifully from every street corner — where shadow lines, material transitions, and massing create a confident, grounded presence.",
  },
];

export function HowWeWorkDesignGrid() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Design Perspectives</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Every Angle Considered
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            We don&apos;t design facades — we design experiences. Here is how we
            approach each perspective of your project.
          </p>
        </AnimateOnView>

        <div className="space-y-16 sm:space-y-24">
          {angles.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.label}
                variants={isLeft ? slideLeft : slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid md:grid-cols-2 gap-8 sm:gap-12 items-center ${
                  isLeft ? "" : "md:direction-rtl"
                }`}
              >
                {/* Text side */}
                <div className={isLeft ? "md:pr-8" : "md:pl-8 md:order-2"}>
                  <span className="inline-block font-label text-sm tracking-[0.2em] uppercase text-brand-primary/60 mb-2">
                    {item.label}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-secondary leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-mid-gray leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 w-16 h-0.5 bg-brand-primary/30" />
                </div>

                {/* Visual side */}
                <div
                  className={`relative ${isLeft ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-light-gray/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="size-20 mx-auto rounded-full bg-brand-primary/5 grid place-items-center mb-4">
                        <span className="font-display font-bold text-2xl text-brand-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-xs tracking-[0.15em] uppercase text-brand-secondary/40 font-label">
                        {item.label}
                      </p>
                      <div className="mt-6 mx-auto w-20 h-px bg-brand-primary/20" />
                      <p className="mt-4 text-sm text-mid-gray/60 italic max-w-[200px] mx-auto">
                        &ldquo;{item.title}&rdquo;
                      </p>
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-3 left-3 size-8 border-t-2 border-l-2 border-brand-primary/20 rounded-tl-lg" />
                    <div className="absolute bottom-3 right-3 size-8 border-b-2 border-r-2 border-brand-primary/20 rounded-br-lg" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
