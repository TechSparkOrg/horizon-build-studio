"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HowWeWorkHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.19 0.05 260 / 0.88) 40%, oklch(0.19 0.05 260 / 0.35) 100%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-[640px]"
        >
          <span className="font-label uppercase tracking-[0.15em] text-white text-xs font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-block">
            Start Your Journey
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display font-bold text-white mt-6 leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          How We Transform Your Vision <br />
          <span className="text-brand-primary">Into Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed"
        >
          A transparent, collaborative journey from your first hello to your final
          handover. No surprises &mdash; just expert guidance at every step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#process"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            See Our Process
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
          >
            Book a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
