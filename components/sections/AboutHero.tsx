"use client";

import Link from "next/link";
import { ArrowRight, Shield, Award, Building2, Users } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText } from "@/lib/i18n/lang-client";

export function AboutHero() {
  const t = useText();
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
            "linear-gradient(90deg, oklch(0.19 0.05 260 / 0.92) 0%, oklch(0.19 0.05 260 / 0.65) 50%, oklch(0.19 0.05 260 / 0.3) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, oklch(0.19 0.05 260 / 0.5), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-24">
        <div className="max-w-[680px]">
          <AnimateOnView animation="fade-in-up">
            <SectionLabel>{t.about.label}</SectionLabel>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <h1
              className="mt-5 font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {t.about.h2}
            </h1>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <p className="mt-5 text-white/75 text-lg max-w-[520px] leading-relaxed">
              {t.about.description}
            </p>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { icon: Shield, label: "25+ Years Experience" },
                { icon: Award, label: "200+ Projects Done" },
                { icon: Building2, label: "50+ Team Members" },
                { icon: Users, label: "15+ Districts" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-white/80">
                  <s.icon className="size-4 text-brand-primary" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-px transition-all duration-200"
              >
                {t.hero.cta} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/projects"
                prefetch={false}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 transition-all duration-200"
              >
                {t.about.cta} <ArrowRight className="size-4" />
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
