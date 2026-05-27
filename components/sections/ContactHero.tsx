"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText } from "@/lib/lang-client";

const contactHighlights = [
  { icon: Phone, label: "Call Us", value: "+977 1 441 1222", href: "tel:+97714411222" },
  { icon: Mail, label: "Email Us", value: "hello@horizonnepal.com.np", href: "mailto:hello@horizonnepal.com.np" },
  { icon: MapPin, label: "Visit Us", value: "Tinkune, Kathmandu" },
  { icon: Clock, label: "Office Hours", value: "Mon–Sat · 9 AM – 6 PM" },
];

export function ContactHero() {
  const t = useText();
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
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
            <SectionLabel>{t.consultation.label}</SectionLabel>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <h1
              className="mt-5 font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {t.consultation.h2}
            </h1>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <p className="mt-5 text-white/75 text-lg max-w-[520px] leading-relaxed">
              {t.consultation.subtitle}
            </p>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <div className="size-9 rounded-lg bg-brand-primary/20 grid place-items-center shrink-0">
                      <Icon className="size-4 text-brand-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/50 text-xs font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm font-semibold hover:text-brand-primary transition truncate block">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-semibold truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8">
              <Link
                href="#consultation-form"
                prefetch={false}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-px transition-all duration-200"
              >
                {t.consultation.submit} <ArrowRight className="size-4" />
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
