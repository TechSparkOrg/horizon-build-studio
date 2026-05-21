"use client";

import { motion } from "framer-motion";

export function WelcomeText() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-label text-xs tracking-[0.2em] uppercase text-brand-primary/60">
            Welcome to Horizon Nepal
          </span>
          <h2 className="mt-4 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Your Vision, Our Craft
          </h2>
          <div className="mt-6 mx-auto w-16 h-0.5 bg-brand-primary/30" />
          <p className="mt-6 text-mid-gray text-lg leading-relaxed max-w-[640px] mx-auto">
            We believe in transparency, craftsmanship, and collaboration.
            This page walks you through exactly how we work — from your first
            idea to the moment you step inside your completed space. No
            jargon, no hidden steps — just a clear partnership built around
            your vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
