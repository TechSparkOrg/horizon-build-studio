import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#works", label: "Our Works" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only sr-only-focusable">
        Skip to content
      </a>
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="#home" className="font-display text-2xl font-bold tracking-tight">
            <span className="text-brand-primary">Horizon</span>
            <span className="text-white"> Nepal</span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-white/90 text-sm font-medium hover:text-brand-primary transition-colors"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-5 h-10 rounded bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition"
            >
              Get A Quote
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="lg:hidden text-white p-2"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-brand-dark lg:hidden"
          >
            <div className="flex items-center justify-between h-[72px] px-6">
              <span className="font-display text-2xl font-bold">
                <span className="text-brand-primary">Horizon</span>
                <span className="text-white"> Nepal</span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-white p-2"
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
                    className="text-white text-2xl font-display"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  onClick={() => setOpen(false)}
                  href="#contact"
                  className="mt-4 inline-flex items-center justify-center px-6 h-12 rounded bg-brand-primary text-white font-semibold"
                >
                  Get A Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
