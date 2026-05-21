"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
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
            "linear-gradient(to right, oklch(0.19 0.05 260 / 0.85) 40%, oklch(0.19 0.05 260 / 0.35) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <SectionLabel>Engineering &middot; Research &middot; Construction</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-bold text-white mt-4 leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Building Nepal&apos;s Future, One Structure at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed"
          >
            From concept to completion, Horizon Nepal delivers precision
            engineering and innovative construction solutions across
            residential, commercial, and infrastructure projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
            >
              Get Started <ArrowRight className="size-4" />
            </a>
            <a
              href="#works"
              className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
            >
              View Projects
            </a>
          </motion.div>

          {/* <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { n: "250+", l: "Projects Completed" },
              { n: "15+", l: "Years Experience" },
              { n: "98%", l: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display font-bold text-brand-primary text-3xl">
                  {s.n}
                </dt>
                <dd className="text-white/70 text-xs sm:text-sm mt-1">
                  {s.l}
                </dd>
              </div>
            ))}
          </motion.dl> */}
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="ml-auto max-w-sm relative group">
            <div className="rounded-lg overflow-hidden h-48 sm:h-56">
              <ModelViewer3D
                src="/glb/house.glb"
                className="w-full h-full bg-transparent"
                hideBadge
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 rounded-lg flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/90 text-xs px-3 py-1.5 rounded-full">
                <CheckCircle2 className="size-3" />
                Sunrise Residential Complex &middot; Lalitpur
              </span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
