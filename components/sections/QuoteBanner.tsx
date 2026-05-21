"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const quotes = [
  {
    text: "At the core of our practice is the idea that cities are the incubators of our greatest achievements, and the best hope for a sustainable future.",
    attr: "Horizon Nepal · Core Philosophy",
  },
  {
    text: "Every structure we build is a quiet promise to the generation that will inherit it.",
    attr: "Arun Thapa · Lead Architect",
  },
  {
    text: "We measure success not by what we deliver, but by how it endures.",
    attr: "Priya Shrestha · Project Director",
  },
];

export function QuoteBanner({
  image = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2000&q=80",
}: {
  image?: string;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);

  const q = quotes[i];

  return (
    <section ref={ref} className="relative py-16 sm:py-28 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image src={image} alt="" fill sizes="100vw" loading="lazy" className="object-cover" />
      </motion.div>
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
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="-mt-10 font-display italic text-white text-2xl sm:text-3xl leading-relaxed"
        >
          {q.text}
        </motion.blockquote>
        <p className="mt-6 text-white/60 text-sm">&mdash; {q.attr}</p>
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, idx) => (
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
