"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useText } from "@/lib/lang-client";

export function QuoteBanner({
  image = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80",
}: {
  image?: string;
}) {
  const t = useText();
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setI((v) => (v + 1) % t.quotes.length), 6000);
    return () => clearInterval(interval);
  }, [t.quotes.length]);

  const q = t.quotes[i];

  return (
    <section ref={ref} className="relative py-16 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill sizes="100vw" loading="lazy" className="object-cover" />
      </div>
      <div
        className="absolute inset-0 bg-brand-dark/75"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div
          className="font-display text-gold-quote leading-none opacity-90"
          style={{ fontSize: "8rem" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <div className="-mt-10 min-h-[160px] flex items-start">
          <blockquote
            key={i}
            className="font-display italic text-white text-2xl sm:text-3xl leading-relaxed animate-fade-in-up"
          >
            {q.text}
          </blockquote>
        </div>
        <div className="mt-6 min-h-[24px] flex items-start">
          <p className="text-white/60 text-sm">&mdash; {q.attr}</p>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {t.quotes.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`size-2.5 rounded-full transition ${
                idx === i ? "bg-brand-primary" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
