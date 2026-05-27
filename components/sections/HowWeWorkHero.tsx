"use client";

import Image from "next/image";
import { useText } from "@/lib/lang-client";

export function HowWeWorkHero() {
  const t = useText();
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
        <div
          className="max-w-[640px] animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="font-label uppercase tracking-[0.15em] text-white text-xs font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-block">
            {t.howWeWork.hero.label}
          </span>
        </div>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] animate-fade-in-up"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", animationDelay: "0.2s" }}
        >
          {t.howWeWork.hero.h1a} <br />
          <span className="text-brand-primary">{t.howWeWork.hero.h1b}</span>
        </h1>

        <p
          className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          {t.howWeWork.hero.subtitle}
        </p>

        <div
          className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#process"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            {t.howWeWork.hero.cta}
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
          >
            {t.howWeWork.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
