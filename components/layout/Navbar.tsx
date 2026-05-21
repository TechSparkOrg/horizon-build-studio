"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/#works", label: "Our Works" },
  { href: "/#news", label: "News" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="sr-only sr-only-focusable">
        Skip to content
      </a>
      <nav
        aria-label="Primary navigation"
        className="absolute top-0 left-0 right-0 z-[100] py-6 px-4 sm:px-6"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[64px]">
          <a
            href="/#home"
            className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight group drop-shadow-md"
          >
            <img
              src="/favicon.png"
              alt="Horizon Nepal Logo"
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
            <span className="flex items-center text-xl sm:text-2xl drop-shadow-md">
              <span className="text-brand-primary font-extrabold">Horizon</span>
              <span className="text-white ml-1.5 font-medium tracking-wide">Nepal</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-white text-base font-bold tracking-wide hover:text-brand-primary transition-colors duration-200 drop-shadow-md"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full shadow-sm" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center px-6 h-10 rounded-full bg-brand-primary text-white text-[15px] font-bold tracking-wide shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Get A Quote
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="lg:hidden text-white p-2 hover:text-brand-primary transition-colors"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[110] bg-brand-dark/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between h-[64px] px-2">
                <a
                  href="/#home"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight"
                >
                  <img
                    src="/favicon.png"
                    alt="Horizon Nepal Logo"
                    className="h-9 w-9 object-contain"
                  />
                  <span className="flex items-center">
                    <span className="text-brand-primary">Horizon</span>
                    <span className="text-white ml-1.5 font-medium tracking-wide">Nepal</span>
                  </span>
                </a>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="text-white p-2 hover:text-brand-primary transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>
              <ul className="flex flex-col items-center gap-6 pt-16">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="text-white hover:text-brand-primary text-3xl font-display font-bold tracking-wide transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pb-12 flex justify-center">
              <a
                onClick={() => setOpen(false)}
                href="/#contact"
                className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-brand-primary text-white text-lg font-bold tracking-wide shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Get A Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
