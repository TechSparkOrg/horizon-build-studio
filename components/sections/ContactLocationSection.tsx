"use client";

import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, getMedia, parseJSONLocale, type SectionContentMap } from "@/lib/content/section-content";

const galleryFallback = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Modern house exterior" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "Luxury living room" },
  { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", alt: "Construction site" },
  { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80", alt: "Architectural blueprint" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "Building structure" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", alt: "Residential complex" },
];

export function ContactLocationSection({ settings, content }: { settings?: Record<string, string>; content?: SectionContentMap }) {
  const t = useText();
  const lang = useLang() as "en" | "np";
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);
  const gallery = parseJSONLocale<{ src: string; alt: string }[]>(content, "contactGallery", galleryFallback, lang);

  const phone = settings?.contact_phone ?? "+977 1 441 1222";
  const email = settings?.contact_email ?? "hello@horizonnepal.com.np";
  const address = settings?.contact_address ?? "Tinkune, Kathmandu";
  const hours = settings?.contact_hours ?? "Mon–Sat · 9 AM – 6 PM";
  const mapsUrl = settings?.contact_maps_url ?? "https://www.google.com/maps?q=Tinkune,Kathmandu,Nepal";
  const siteName = settings?.site_name ?? "Horizon Nepal";

  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="text-center mb-14">
          <SectionLabel>{val("locationLabel", t.location.heading)}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
            {val("locationHeading", "Visit Our Office")}
          </h2>
          <p className="mt-4 text-mid-gray text-lg max-w-2xl mx-auto">
            {val("locationSubtitle", `Stop by our ${address} headquarters or give us a call. We are here Monday through Saturday.`)}
          </p>
        </AnimateOnView>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <AnimateOnView animation="slide-in-left">
            <div className="bg-off-white rounded-2xl p-8 sm:p-10 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] h-full">
              <div className="size-14 rounded-2xl bg-brand-primary/10 grid place-items-center mb-6">
                <MapPin className="size-6 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-secondary">
                {siteName} HQ
              </h3>
              <p className="text-mid-gray mt-2">{address}</p>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-light-gray/40 hover:border-brand-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="size-10 rounded-lg bg-brand-primary/10 grid place-items-center group-hover:bg-brand-primary transition-colors">
                    <Phone className="size-4 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-mid-gray font-medium">Phone</p>
                    <p className="text-sm font-semibold text-brand-secondary">{phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-light-gray/40 hover:border-brand-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="size-10 rounded-lg bg-brand-primary/10 grid place-items-center group-hover:bg-brand-primary transition-colors">
                    <Mail className="size-4 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-mid-gray font-medium">Email</p>
                    <p className="text-sm font-semibold text-brand-secondary">{email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-light-gray/40">
                  <div className="size-10 rounded-lg bg-brand-primary/10 grid place-items-center">
                    <Clock className="size-4 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-mid-gray font-medium">Office Hours</p>
                    <p className="text-sm font-semibold text-brand-secondary">{hours}</p>
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-brand-primary text-sm font-semibold hover:underline"
              >
                {t.location.directions} <ArrowRight className="size-3" />
              </a>
            </div>
          </AnimateOnView>

          <AnimateOnView animation="slide-in-right">
            <div className="relative rounded-2xl overflow-hidden border border-light-gray/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full min-h-[400px]">
              <iframe
                title={`${siteName} office location in Kathmandu`}
                src={`${mapsUrl}&z=15&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimateOnView>
        </div>

        <div>
          <AnimateOnView className="text-center mb-10">
            <SectionLabel>{val("galleryLabel", "Gallery")}</SectionLabel>
            <h3 className="mt-2 font-display font-bold text-brand-secondary text-2xl sm:text-3xl">
              {val("galleryHeading", "Our Projects in Focus")}
            </h3>
          </AnimateOnView>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <AnimateOnView className="md:col-span-2 md:row-span-2">
              <div className="relative rounded-xl overflow-hidden group h-full min-h-[200px] md:min-h-[360px]">
                <Image
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
              </div>
            </AnimateOnView>

            {gallery.slice(1, 3).map((img) => (
              <AnimateOnView key={img.alt}>
                <div className="relative rounded-xl overflow-hidden group h-full min-h-[160px] md:min-h-[170px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
                </div>
              </AnimateOnView>
            ))}

            <AnimateOnView className="md:col-span-2">
              <div className="relative rounded-xl overflow-hidden group h-full min-h-[160px] md:min-h-[200px]">
                <Image
                  src={gallery[3].src}
                  alt={gallery[3].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
              </div>
            </AnimateOnView>

            <AnimateOnView>
              <div className="relative rounded-xl overflow-hidden group h-full min-h-[160px] md:min-h-[200px]">
                <Image
                  src={gallery[4].src}
                  alt={gallery[4].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
              </div>
            </AnimateOnView>

            <AnimateOnView>
              <div className="relative rounded-xl overflow-hidden group h-full min-h-[160px] md:min-h-[200px]">
                <Image
                  src={gallery[5].src}
                  alt={gallery[5].alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
              </div>
            </AnimateOnView>
          </div>
        </div>
      </div>
    </section>
  );
}
