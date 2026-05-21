"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { blurIn, stagger } from "@/lib/motion-variants";
import type { FAQItem } from "@/types";

export function FAQSection({ faqs = [] }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <AnimateOnView>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Answers to Your Construction Questions
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-md">
            Everything you need to know about working with Horizon Nepal &mdash;
            from first call to final inspection.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            Ask Us Anything <ArrowRight className="size-4" />
          </a>
          <div className="mt-8 rounded-lg overflow-hidden h-40">
            <ModelViewer3D
              src="/glb/stop.glb"
              className="w-full h-full bg-transparent"
              hideBadge
              disableControls
            />
          </div>
        </AnimateOnView>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-3"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={blurIn}
                className={`rounded-2xl border border-light-gray/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 ${
                  isOpen
                    ? "border-l-4 border-l-brand-primary shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-brand-secondary"
                >
                  <h3 className="font-body text-base">{f.q}</h3>
                  {isOpen ? (
                    <Minus className="size-5 text-brand-primary shrink-0" />
                  ) : (
                    <Plus className="size-5 text-brand-primary shrink-0" />
                  )}
                </button>
                <div
                  id={`faq-${i}`}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-mid-gray leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
