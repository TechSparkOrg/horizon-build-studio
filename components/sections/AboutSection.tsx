"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Ruler, Users, MapPin } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { scaleUp, blurIn, stagger } from "@/lib/motion-variants";
import { about } from "@/data/about";

const statIcons = [Building2, Ruler, Users, MapPin];

export function AboutSection() {
  return (
    <section id="about" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-3xl">
          <SectionLabel>{about.label}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            {about.heading}
          </h2>
          <p className="mt-4 text-mid-gray text-lg leading-relaxed">
            {about.description}
          </p>
        </AnimateOnView>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {about.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={s.label}
                variants={scaleUp}
                className="bg-white rounded-2xl p-6 text-center border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="size-12 mx-auto rounded-lg bg-brand-primary/10 grid place-items-center mb-4">
                  <Icon className="size-6 text-brand-primary" />
                </div>
                <span className="block font-display font-bold text-3xl sm:text-4xl text-brand-secondary">
                  {s.value}
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-mid-gray">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 sm:mt-20 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <AnimateOnView>
            <div className="rounded-2xl overflow-hidden border border-light-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <ModelViewer3D src={about.model3D.src} loading="lazy" />
            </div>
          </AnimateOnView>

          <AnimateOnView>
            <div>
              <SectionLabel>Our Approach</SectionLabel>
              <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-brand-secondary">
                {about.story.title}
              </h3>
              <div className="mt-4 space-y-4 text-mid-gray leading-relaxed">
                {about.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </AnimateOnView>
        </div>

        <div className="mt-16 sm:mt-20">
          <AnimateOnView className="text-center mb-10">
            <SectionLabel>What We Stand For</SectionLabel>
            <h3 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-brand-secondary">
              Our Core Values
            </h3>
          </AnimateOnView>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {about.values.map((v) => (
              <motion.div
                key={v.title}
                variants={blurIn}
                className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-brand-primary shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <h4 className="font-display font-bold text-xl text-brand-secondary">
                  {v.title}
                </h4>
                <p className="mt-3 text-mid-gray leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {about.extraBlocks.length > 0 && (
          <div className="mt-16 sm:mt-20 space-y-12">
            {about.extraBlocks.map((block, i) => {
              switch (block.type) {
                case "text":
                  return (
                    <AnimateOnView key={i}>
                      <div className="max-w-3xl mx-auto text-center">
                        {block.title && (
                          <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-secondary">
                            {block.title}
                          </h3>
                        )}
                        {block.body && (
                          <p className="mt-4 text-mid-gray leading-relaxed">
                            {block.body}
                          </p>
                        )}
                      </div>
                    </AnimateOnView>
                  );
                case "image":
                  return (
                    <AnimateOnView key={i}>
                      <div className="rounded-2xl overflow-hidden border border-light-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        <Image
                          src={block.src ?? ""}
                          alt={block.alt ?? ""}
                          width={1200}
                          height={600}
                          loading="lazy"
                          className="w-full object-cover"
                        />
                      </div>
                    </AnimateOnView>
                  );
                case "3dmodel":
                  return (
                    <AnimateOnView key={i}>
                      <div>
                        {block.title && (
                          <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-secondary mb-4">
                            {block.title}
                          </h3>
                        )}
                        <div className="rounded-2xl overflow-hidden border border-light-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                          <ModelViewer3D src={block.src ?? "/glb/firstsample.glb"} />
                        </div>
                        {block.body && (
                          <p className="mt-4 text-mid-gray leading-relaxed text-center max-w-2xl mx-auto">
                            {block.body}
                          </p>
                        )}
                      </div>
                    </AnimateOnView>
                  );
              }
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={about.cta.href}
            className="inline-flex items-center gap-2 h-11 px-6 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            {about.cta.label} <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
