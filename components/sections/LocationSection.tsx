"use client";

import { ArrowRight } from "lucide-react";
import { useText } from "@/lib/lang-client";

export function LocationSection() {
  const t = useText();
  return (
    <section className="relative bg-white">
      <div className="relative w-full h-[450px]">
        <iframe
          title="Horizon Nepal office location in Kathmandu"
          src="https://www.google.com/maps?q=Kathmandu,Nepal&z=12&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 sm:left-12 bg-white rounded-xl shadow-2xl p-6 max-w-xs animate-slide-in-left">
          <h3 className="font-display font-bold text-brand-secondary text-lg">
            {t.location.heading}
          </h3>
          <address className="not-italic mt-2 text-sm text-mid-gray space-y-1">
            <p>{t.location.address}</p>
            <p>{t.location.phone}</p>
            <p>{t.location.hours}</p>
          </address>
          <a
            href="https://www.google.com/maps?q=Kathmandu,Nepal"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-brand-primary text-sm font-semibold"
          >
            {t.location.directions} <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
