"use client";

import { useState, useMemo, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useText } from "@/lib/lang-client";
import { LanguageToggle } from "@/components/LanguageToggle";

const NAV_ITEMS = [
  { href: "/#home", key: "home" },
  { href: "/about", key: "about" },
  { href: "/how-we-work", key: "howWeWork" },
  { href: "/projects", key: "ourWorks" },
  { href: "/news", key: "news" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useText();
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Elevate nav when hero is about to end
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main?.firstElementChild) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
    );
    observer.observe(main.firstElementChild);
    return () => observer.disconnect();
  }, [pathname]);

  const links = useMemo(
    () => NAV_ITEMS.map((item) => ({ href: item.href, label: t.nav[item.key] })),
    [t],
  );

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-primary focus:text-white focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center h-[68px]">
          {/* Logo */}
          <Link
            href="/#home"
            prefetch={false}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative">
              <img
                src="/favicon.png"
                alt="Horizon Nepal Logo"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -inset-1 rounded-full bg-brand-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <span className="flex items-center text-xl sm:text-2xl drop-shadow-md leading-none">
              <span className="text-brand-primary font-extrabold tracking-tight">Horizon</span>
              <span className="text-white ml-1.5 font-medium tracking-wide">Nepal</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center justify-center gap-0.5 flex-1" role="list">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? "text-brand-primary bg-brand-primary/10"
                        : "text-white/80 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <LanguageToggle />
            <Link
              href="/contact"
              prefetch={false}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 h-9 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all duration-200"
            >
              {t.nav.getQuote}
              <ChevronRight className="size-3.5 opacity-80" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 hover:text-brand-primary transition-all duration-200"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[108] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-[110] w-[min(320px,100vw)] bg-brand-dark border-l border-white/8 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-white/8 flex-shrink-0">
          <Link
            href="/#home"
            prefetch={false}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5"
          >
            <img src="/favicon.png" alt="Horizon Nepal Logo" className="h-7 w-7 object-contain" />
            <span className="flex items-center text-lg leading-none">
              <span className="text-brand-primary font-extrabold">Horizon</span>
              <span className="text-white ml-1 font-medium">Nepal</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="flex flex-col gap-1" role="list">
            {links.map((l, i) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={l.href}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "text-white/75 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {l.label}
                    <ChevronRight
                      className={`size-4 transition-opacity ${active ? "opacity-100 text-brand-primary" : "opacity-30"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer CTA */}
        <div className="p-5 border-t border-white/8 flex-shrink-0">
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            prefetch={false}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-brand-primary text-white text-base font-bold tracking-wide shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 active:scale-[0.98] transition-all duration-200"
          >
            {t.nav.getQuote}
            <ChevronRight className="size-4 opacity-80" />
          </Link>
        </div>
      </div>
    </>
  );
}