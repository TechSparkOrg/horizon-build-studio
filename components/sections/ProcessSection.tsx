"use client";

import { useText, useLang } from "@/lib/lang-client";
import type { SectionContentMap } from "@/lib/section-content";

export function ProcessSection({ content }: { content?: SectionContentMap }) {
  const t = useText();
  const lang = useLang();
  function val(key: string, fb: string) {
    const c = content?.[key];
    if (!c) return fb;
    return lang === "np" && c.valueNp ? c.valueNp : c.valueEn || fb;
  }

  let steps: { title: string; body: string }[] = [];
  try { steps = content?.steps ? JSON.parse(content.steps.valueEn) : t.process.steps; } catch { steps = t.process.steps; }

  return (
    <section className="relative bg-off-white overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-brand-primary"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 25%, rgba(255,255,255,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] pointer-events-none opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 py-20 sm:py-32 items-center">
        <div className="lg:col-span-5 text-white pr-0 lg:pr-10 animate-slide-in-left">
          <span className="inline-block font-label uppercase tracking-[0.15em] text-white text-xs font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20">
            {val("label", t.process.label)}
          </span>
          <h2 className="mt-5 font-display font-bold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
            {val("h2", t.process.h2)}
          </h2>
          <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-sm">
            {val("subtitle", t.process.subtitle)}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
            <span className="text-2xl font-display font-bold text-white leading-none">
              {steps.length}
            </span>
            <span className="text-white/70 text-sm">{val("simpleSteps", t.process.simpleSteps)}</span>
          </div>
        </div>

        <div className="lg:col-span-7 animate-reveal-up">
          <div className="bg-white rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.07)] border border-light-gray/60 p-7 sm:p-10 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(var(--brand-primary-rgb,232,82,26),0.06), transparent 70%)",
              }}
            />

            <div className="animate-stagger space-y-0">
              {steps.map((s, idx) => {
                const isLast = idx === steps.length - 1;
                return (
                  <div key={s.title} className="group flex gap-5 sm:gap-6 relative">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="size-10 rounded-full bg-brand-primary/8 border-2 border-brand-primary/20 group-hover:bg-brand-primary group-hover:border-brand-primary text-brand-primary group-hover:text-white font-display font-bold text-sm grid place-items-center transition-all duration-300 shadow-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {!isLast && (
                        <div className="w-px flex-grow bg-gradient-to-b from-brand-primary/30 to-light-gray/60 my-2" />
                      )}
                    </div>

                    <div className={`pt-1.5 ${isLast ? "pb-0" : "pb-8"}`}>
                      <h3 className="font-body font-semibold text-base sm:text-lg text-brand-secondary group-hover:text-brand-primary transition-colors duration-300 leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-mid-gray text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}