"use client";

import { motion } from "framer-motion";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { scaleUp } from "@/lib/motion-variants";

export function DesignShowcaseSection() {
  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative min-h-[70vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

          <div className="relative w-full h-[70vh]">
            <ModelViewer3D
              src="/glb/folding.glb"
              className="w-full h-full bg-white"
              hideBadge
              loading="lazy"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 text-black/60 text-xs tracking-[0.2em] uppercase font-light"
          >
            Featured Design
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
