"use client";

import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { useText, useLang } from "@/lib/i18n/lang-client";
import type { SectionContentMap } from "@/lib/content/section-content";
import type { FAQSectionItem } from "@/lib/services/types/faq.types";

interface ModelEntry {
  url: string;
  filename: string;
  type: string;
  label: string;
}

export function FAQSection({ faqs = [], content, models3d = [] }: { faqs: FAQSectionItem[]; content?: SectionContentMap; models3d?: ModelEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const t = useText();
  const lang = useLang();
  function val(key: string, fb: string) {
    const c = content?.[key];
    if (!c) return fb;
    return lang === "np" && c.valueNp ? c.valueNp : c.valueEn || fb;
  }
  function media(key: string, fb: string) {
    return content?.[key]?.mediaUrl || fb;
  }

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <AnimateOnView>
          <SectionLabel>{val("label", t.faq.label)}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            {val("h2", t.faq.h2)}
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-md">
            {val("subtitle", t.faq.subtitle)}
          </p>
          <Link
            href="/#contact"
            prefetch={false}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            {val("ask", t.faq.ask)} <ArrowRight className="size-4" />
          </Link>
          <div className="mt-4">
            <Link
              href="/faq"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm text-brand-primary font-semibold hover:underline"
            >
              {val("viewAll", t.faq.viewAll)} <ArrowRight className="size-3" />
            </Link>
          </div>
          {(() => {
            const modelUrl = media("stopModelPath", "") || models3d[3]?.url || models3d[0]?.url;
            return modelUrl ? (
              <div className="mt-4 rounded-lg overflow-hidden h-40">
                <ModelViewer3D
                  src={modelUrl}
                  className="w-full h-full bg-transparent"
                  hideBadge
                  disableControls
                />
              </div>
            ) : null;
          })()}
        </AnimateOnView>

        <div className="space-y-3 animate-stagger">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl border border-light-gray/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 ${
                  isOpen
                    ? "border-l-4 border-l-brand-primary shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-brand-secondary"
                >
                  <h3 className="font-body text-base">{f.q}</h3>
                  {isOpen ? (
                    <Minus className="size-5 text-brand-primary shrink-0" />
                  ) : (
                    <Plus className="size-5 text-brand-primary shrink-0" />
                  )}
                </button>
                <div
                  id={`faq-${i}`}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-mid-gray leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
