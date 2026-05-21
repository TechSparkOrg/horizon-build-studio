import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Portfolio", "News", "Contact"];
const services = ["Building", "Road Works", "Interiors", "Renovation", "Consultation"];

export function Footer() {
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
          <p className="text-sm leading-relaxed mb-6">
            Engineering, research and construction excellence serving Nepal with
            precision and care since 2009.
          </p>
          <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/horizonnepal", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/horizonnepal", label: "Instagram" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/horizonnepal", label: "LinkedIn" },
                { Icon: Youtube, href: "https://www.youtube.com/@horizonnepal", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
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
          <h3 className="font-body font-semibold text-white text-lg mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-primary transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-primary transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">
            Contact
          </h3>
          <address className="not-italic text-sm space-y-2 leading-relaxed">
            <p>
              Tinkune, Kathmandu
              <br />
              Bagmati, Nepal 44600
            </p>
            <p>
              <a
                href="tel:+97714411222"
                className="hover:text-brand-primary"
              >
                +977 1 441 1222
              </a>
            </p>
            <p>
              <a
                href="mailto:hello@horizonnepal.com.np"
                className="hover:text-brand-primary"
              >
                hello@horizonnepal.com.np
              </a>
            </p>
            <p className="text-white/50">Mon&ndash;Sat &middot; 9 AM &ndash; 6 PM NPT</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Horizon Nepal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
