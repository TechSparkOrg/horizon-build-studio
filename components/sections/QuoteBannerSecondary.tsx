"use client";

import { motion } from "framer-motion";
import { scaleUp } from "@/lib/motion-variants";

export function QuoteBannerSecondary() {
  return (
    <section className="relative bg-brand-secondary overflow-hidden py-16 sm:py-28">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(1 0 0 / 0.4) 0, transparent 30%), radial-gradient(circle at 80% 70%, oklch(0.26 0.07 265 / 0.3) 0, transparent 35%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <div
          className="font-display text-gold-quote leading-none"
          style={{ fontSize: "7rem" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <blockquote className="-mt-8 font-display italic text-white text-2xl sm:text-3xl leading-relaxed">
          We don&apos;t just build structures &mdash; we build the streets,
          schools and homes that our grandchildren will live in.
        </blockquote>
        <p className="mt-6 text-white/60 text-sm">
          &mdash; Horizon Nepal Leadership
        </p>
      </motion.div>
    </section>
  );
}
