"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  MessageCircle,
  MapPin,
  PenTool,
  CheckCircle2,
  Construction,
  Home,
} from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { slideLeft, fadeUp, stagger, revealUp } from "@/lib/motion-variants";

const steps = [
  {
    icon: Handshake,
    title: "Welcome & Discovery",
    body: "We start with a warm welcome. Tell us about your project, your vision, and your goals. We listen carefully to understand what matters most to you.",
  },
  {
    icon: MessageCircle,
    title: "Share Your Vision",
    body: "Share your ideas, references, sketches, or any inspiration. Our team reviews your requirements and outlines the best approach for your project.",
  },
  {
    icon: MapPin,
    title: "Site Visit & Assessment",
    body: "We visit your site to assess the land, surroundings, and feasibility. Our engineers take measurements, note challenges, and identify opportunities.",
  },
  {
    icon: PenTool,
    title: "Design & Planning",
    body: "Our architects create detailed designs, 3D renderings, and structural plans. You receive blueprints, BoQ, and permit-ready documents for review.",
  },
  {
    icon: CheckCircle2,
    title: "Review & Approve",
    body: "You review every detail of the design. We make revisions until you are 100% satisfied. Once approved, we move to construction with your signed go-ahead.",
  },
  {
    icon: Construction,
    title: "Build & Watch",
    body: "Our expert teams execute on-site with precision. You get weekly progress updates, photos, and milestone reports. Watch your project come to life.",
  },
  {
    icon: Home,
    title: "Handover & Celebrate",
    body: "We conduct a final walkthrough, address any punch-list items, and hand over the keys. Your dream is now reality &mdash; built to last for generations.",
  },
];

export function HowWeWorkProcess() {
  return (
    <section id="process" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            From First Hello to Final Handover
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Seven steps designed to make your construction journey smooth,
            transparent, and stress-free.
          </p>
        </AnimateOnView>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 relative pl-10 sm:pl-14 before:absolute before:left-[21px] sm:before:left-[25px] before:top-2 before:bottom-2 before:w-[2px] before:bg-light-gray"
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="relative pb-10 sm:pb-12 last:pb-0"
              >
                <div className="absolute -left-[29px] sm:-left-[37px] top-1 size-10 sm:size-11 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-sm">
                  <Icon className="size-4 sm:size-5 text-brand-primary" />
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-7 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="size-7 rounded-full bg-brand-primary text-white text-xs font-bold grid place-items-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-brand-secondary">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-mid-gray leading-relaxed pl-10">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
