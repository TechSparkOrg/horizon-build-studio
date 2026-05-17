import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Portfolio", "News", "Contact"];
const services = ["Building", "Road Works", "Interiors", "Renovation", "Consultation"];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl font-bold mb-4">
            <span className="text-brand-primary">Horizon</span>
            <span className="text-white"> Nepal</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Engineering, research and construction excellence serving Nepal with
            precision and care since 2009.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={`Social link ${i + 1}`}
                className="size-9 rounded-full border border-white/15 grid place-items-center hover:bg-brand-primary hover:border-brand-primary transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-primary transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-primary transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body font-semibold text-white text-lg mb-4">Contact</h3>
          <address className="not-italic text-sm space-y-2 leading-relaxed">
            <p>Baluwatar, Kathmandu<br />Bagmati, Nepal 44600</p>
            <p>
              <a href="tel:+97714411222" className="hover:text-brand-primary">+977 1 441 1222</a>
            </p>
            <p>
              <a href="mailto:hello@horizonnepal.com.np" className="hover:text-brand-primary">
                hello@horizonnepal.com.np
              </a>
            </p>
            <p className="text-white/50">Mon–Sat · 9 AM – 6 PM NPT</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Horizon Nepal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-primary">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
