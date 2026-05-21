"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/motion-variants";
import { team } from "@/data/team";

export function TeamSection() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnView>
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Meet the Team of Experts
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-xl mx-auto">
            Learn about our elite construction advisement team &mdash;
            architects, engineers, and project leaders.
          </p>
        </AnimateOnView>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((m) => (
            <motion.article
              variants={fadeUp}
              key={m.name}
              className="group bg-white rounded-2xl p-6 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <div className="relative size-[150px] mx-auto rounded-full overflow-hidden ring-0 group-hover:ring-4 group-hover:ring-brand-primary/30 transition">
                <Image
                  src={m.img}
                  alt={`Portrait of ${m.name}`}
                  fill
                  sizes="150px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-body font-bold text-xl text-brand-secondary">
                {m.name}
              </h3>
              <p className="mt-1 font-label uppercase tracking-wider text-sm text-brand-primary">
                {m.role}
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                  className="text-mid-gray hover:text-brand-primary"
                >
                  <Linkedin className="size-5" />
                </a>
                <a
                  href={`mailto:hello@horizonnepal.com.np`}
                  aria-label={`Email ${m.name}`}
                  className="text-mid-gray hover:text-brand-primary"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
