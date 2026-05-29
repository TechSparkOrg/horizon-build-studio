"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useText } from "@/lib/i18n/lang-client";

export function FooterInner({
  settings,
}: {
  settings?: Record<string, string>;
}) {
  const t = useText();
  const year = new Date().getFullYear();
  const phone = settings?.contact_phone ?? "+977 1 441 1222";
  const email = settings?.contact_email ?? "hello@horizonnepal.com.np";
  const address = settings?.contact_address ?? "Tinkune, Kathmandu";

  const quickLinks = [
    { label: t.footer.home, href: "/#home" },
    { label: t.footer.about, href: "/about" },
    { label: t.footer.services, href: "/#services" },
    { label: t.footer.portfolio, href: "/projects" },
    { label: t.nav.news, href: "/news" },
    { label: t.footer.contact, href: "/contact" },
  ];

  const services = [
    { label: t.footer.houseConstruction, href: "/#services" },
    { label: t.footer.interiorDesign, href: "/#services" },
    { label: t.footer.materialConsultation, href: "/#services" },
    { label: t.footer.siteVisit, href: "/#services" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: settings?.social_facebook ?? "https://www.facebook.com/horizonnepal", label: "Facebook" },
    { Icon: Instagram, href: settings?.social_instagram ?? "https://www.instagram.com/horizonnepal", label: "Instagram" },
    { Icon: Linkedin, href: settings?.social_linkedin ?? "https://www.linkedin.com/company/horizonnepal", label: "LinkedIn" },
    { Icon: Youtube, href: settings?.social_youtube ?? "https://www.youtube.com/@horizonnepal", label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl font-bold mb-4 flex items-center gap-2.5">
            <img
              src="/favicon.png"
              alt="Horizon Nepal Logo"
              className="h-7 w-7 object-contain"
            />
            <span className="flex items-center text-xl">
              <span className="text-brand-primary">Horizon</span>
              <span className="text-white ml-1.5 font-light tracking-wide">Nepal</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6">{t.footer.description}</p>
          <div className="flex gap-3">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="size-9 rounded-full border border-white/15 grid place-items-center hover:bg-brand-primary hover:border-brand-primary transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">{t.footer.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} prefetch={false} className="hover:text-brand-primary transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">{t.footer.services}</h3>
          <ul className="space-y-2 text-sm">
            {services.map((l) => (
              <li key={l.label}>
                <Link href={l.href} prefetch={false} className="hover:text-brand-primary transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">{t.footer.contact}</h3>
          <address className="not-italic text-sm space-y-2 leading-relaxed">
            <p>{address}</p>
            <p>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-primary">{phone}</a>
            </p>
            <p>
              <a href={`mailto:${email}`} className="hover:text-brand-primary">{email}</a>
            </p>
            <p className="text-white/50">{t.location.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {year} Horizon Nepal. {t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" prefetch={false} className="hover:text-brand-primary">{t.footer.privacy}</Link>
            <Link href="/terms" prefetch={false} className="hover:text-brand-primary">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
