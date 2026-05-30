
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, getMedia, type SectionContentMap } from "@/lib/content/section-content";

interface ModelEntry {
  url: string;
  filename: string;
  type: string;
  label: string;
}

interface BannerEntry {
  image: string;
  alt: string;
}

export function HeroSection({ content, models3d = [], banners = [] }: { content?: SectionContentMap; models3d?: ModelEntry[]; banners?: BannerEntry[] }) {
  const t = useText();
  const lang = useLang();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setCurrentBanner((c) => (c + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const bgImages = banners.length > 0
    ? banners.map((b) => b.image)
    : [getMedia(content, "bgImage", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80")];

  const bgAlts = banners.length > 0
    ? banners.map((b) => b.alt)
    : [""];

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background carousel */}
      <div className="absolute inset-0">
        {bgImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentBanner ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={bgAlts[i] ?? ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Overlay — slightly deeper on the left for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.19 0.05 260 / 0.92) 0%, oklch(0.19 0.05 260 / 0.60) 55%, oklch(0.19 0.05 260 / 0.25) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, oklch(0.19 0.05 260 / 0.5), transparent)" }}
        aria-hidden="true"
      />

      {/* Dot indicators */}
      {bgImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {bgImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentBanner(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentBanner
                  ? "w-6 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left — text */}
        <div className="lg:col-span-7 max-w-[640px]">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <SectionLabel>{getVal(content, "label", t.hero.label, lang)}</SectionLabel>
          </div>

          <div className="mt-5 min-h-[5.5rem] flex items-start">
            <h1
              className="font-display font-bold text-white leading-[1.05] animate-fade-in-up"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", animationDelay: "0.2s" }}
            >
              {getVal(content, "h1", t.hero.h1, lang)}
            </h1>
          </div>

          <div className="mt-5 min-h-[5rem] flex items-start">
            <p
              className="text-white/75 text-lg max-w-[480px] leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              {getVal(content, "subtitle", t.hero.subtitle, lang)}
            </p>
          </div>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="/#contact"
              prefetch={false}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              {getVal(content, "cta", t.hero.cta, lang)}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#works"
              prefetch={false}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-white/60 active:scale-[0.98] transition-all duration-200"
            >
              <Play className="size-3.5 fill-white" />
              {getVal(content, "cta2", t.hero.cta2, lang)}
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="mt-10 flex items-center gap-5 animate-fade-in-up"
            style={{ animationDelay: "0.55s" }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm"
                />
              ))}
            </div>
            <p className="text-white/55 text-sm">
              {getVal(content, "trustText", "Trusted by 50+ clients across Nepal", lang)}
            </p>
          </div>
        </div>

        {/* Right — 3D card */}
        <aside
          className="hidden lg:flex lg:col-span-5 justify-end animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="w-full max-w-[360px] relative group">
            {/* Card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/40">
              <div className="h-56">
                {models3d[0] ? (
                  <ModelViewer3D
                    src={models3d[0].url}
                    className="w-full h-full bg-transparent"
                    hideBadge
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                    No model
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">
                    {getVal(content, "cardTitle", "Sunrise Residential Complex", lang)}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">{getVal(content, "cardLocation", "Lalitpur, Nepal", lang)}</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-brand-primary/20 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-primary/25">
                  <CheckCircle2 className="size-3" />
                  {getVal(content, "cardStatus", "Completed", lang)}
                </span>
              </div>
            </div>

            {/* Decorative ring */}
            <div
              className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 24px 48px -12px rgba(0,0,0,0.5)" }}
              aria-hidden="true"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
