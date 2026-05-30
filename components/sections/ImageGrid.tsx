"use client";

import Image from "next/image";
import { AnimateOnView } from "@/components/AnimateOnView";
import { useLang } from "@/lib/i18n/lang-client";
import { parseJSON, getVal, type SectionContentMap } from "@/lib/content/section-content";

const defaultImages = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", alt: "Modern house exterior" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", alt: "Luxury home interior" },
  { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80", alt: "Construction site" },
  { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=80", alt: "Architectural blueprint" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80", alt: "Building structure" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80", alt: "Residential complex" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80", alt: "Interior design" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80", alt: "Team at construction site" },
];

export function ImageGrid({ content }: { content?: SectionContentMap }) {
  const lang = useLang() as "en" | "np";
  const images = parseJSON<{ src: string; alt: string }[]>(content, "gallery", defaultImages);
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="text-center mb-12">
          <h2 className="font-display font-bold text-brand-secondary text-3xl sm:text-4xl">
            {getVal(content, "h2", "Our Work in Action", lang)}
          </h2>
          <p className="mt-3 text-mid-gray text-lg max-w-xl mx-auto">
            {getVal(content, "subtitle", "From concept to completion — a glimpse into the projects and people that define Horizon Nepal.", lang)}
          </p>
        </AnimateOnView>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <AnimateOnView
              key={i}
              animation="fade-in-up"
              className={`${i >= 6 ? "hidden md:block" : ""} ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className={`${i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
