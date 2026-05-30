"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Clock, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, parseJSONLocale, type SectionContentMap } from "@/lib/content/section-content";

interface TextContentData {
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
}

const HIGHLIGHT_ICONS: Record<string, LucideIcon> = { Phone, Mail, MapPin, Clock };

const highlightsFallback: { icon: string; label: string }[] = [
  { icon: "Phone", label: "Call Us" },
  { icon: "Mail", label: "Email Us" },
  { icon: "MapPin", label: "Visit Us" },
  { icon: "Clock", label: "Office Hours" },
];

function highlightValue(item: { icon: string; label: string }, settings?: Record<string, string>): { value: string; href?: string } {
  const phone = settings?.contact_phone ?? "+977 1 441 1222";
  const email = settings?.contact_email ?? "hello@horizonnepal.com.np";
  const address = settings?.contact_address ?? "Tinkune, Kathmandu";
  const hours = settings?.contact_hours ?? "Mon–Sat · 9 AM – 6 PM";
  switch (item.icon) {
    case "Phone": return { value: phone, href: `tel:${phone.replace(/\s/g, "")}` };
    case "Mail": return { value: email, href: `mailto:${email}` };
    case "MapPin": return { value: address };
    case "Clock": return { value: hours };
    default: return { value: item.label };
  }
}

export function ContactHero({ settings, content, textContent }: { settings?: Record<string, string>; content?: SectionContentMap; textContent?: TextContentData | null }) {
  const t = useText();
  const lang = useLang() as "en" | "np";
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);
  const highlights = parseJSONLocale<{ icon: string; label: string }[]>(content, "highlights", highlightsFallback, lang);

  const heading = lang === "np" && textContent?.headingNp ? textContent.headingNp : textContent?.headingEn || val("h2", t.consultation.h2);
  const subheading = lang === "np" && textContent?.subheadingNp ? textContent.subheadingNp : textContent?.subheadingEn || val("subtitle", t.consultation.subtitle);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content?.bgImage?.mediaUrl || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"}
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
            <SectionLabel>{val("label", t.consultation.label)}</SectionLabel>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <h1
              className="mt-5 font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              {heading}
            </h1>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <p className="mt-5 text-white/75 text-lg max-w-[520px] leading-relaxed">
              {subheading}
            </p>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => {
                const Icon = HIGHLIGHT_ICONS[item.icon];
                const hv = highlightValue(item, settings);
                if (!Icon) return null;
                return (
                  <div key={item.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <div className="size-9 rounded-lg bg-brand-primary/20 grid place-items-center shrink-0">
                      <Icon className="size-4 text-brand-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/50 text-xs font-medium">{item.label}</p>
                      {hv.href ? (
                        <a href={hv.href} className="text-white text-sm font-semibold hover:text-brand-primary transition truncate block">
                          {hv.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-semibold truncate">{hv.value}</p>
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
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-p1 transition-all duration-200"
              >
                {val("submitText", t.consultation.submit)} <ArrowRight className="size-4" />
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
