"use client";

import {
  Handshake,
  MessageCircle,
  MapPin,
  PenTool,
  CheckCircle2,
  Construction,
  Home,
} from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText } from "@/lib/lang-client";

const STEP_ICONS = [
  Handshake,
  MessageCircle,
  MapPin,
  PenTool,
  CheckCircle2,
  Construction,
  Home,
];

export function HowWeWorkProcess() {
  const t = useText();
  return (
    <section id="process" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>{t.howWeWork.process.label}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            {t.howWeWork.process.h2}
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            {t.howWeWork.process.subtitle}
          </p>
        </AnimateOnView>

        <div className="mt-12 relative pl-10 sm:pl-14 before:absolute before:left-[21px] sm:before:left-[25px] before:top-2 before:bottom-2 before:w-[2px] before:bg-light-gray animate-stagger">
          {t.howWeWork.process.steps.map((s, idx) => {
            const Icon = STEP_ICONS[idx] ?? STEP_ICONS[0];
            return (
              <div
                key={s.title}
                className="relative pb-10 sm:pb-12 last:pb-0"
              >
                <div className="absolute -left-[29px] sm:-left-[37px] top-1 size-10 sm:size-11 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-sm">
                  <Icon className="size-4 sm:size-5 text-brand-primary" />
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-7 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="size-7 rounded-full bg-brand-primary text-white text-xs font-bold grid place-items-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-brand-secondary">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-mid-gray leading-relaxed pl-10">
                    {s.body}
                  </p>
                </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
