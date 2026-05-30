"use client";

import { Home, Building2, Paintbrush, Compass, HardHat, Leaf, Ruler, HeadphonesIcon, type LucideIcon } from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getVal, parseJSONLocale, type SectionContentMap } from "@/lib/content/section-content";
import { useLang } from "@/lib/i18n/lang-client";

const ICONS: Record<string, LucideIcon> = { Home, Building2, Paintbrush, Compass, HardHat, Leaf, Ruler, HeadphonesIcon };

const COLORS = [
  "bg-amber-50 text-amber-600", "bg-blue-50 text-blue-600", "bg-emerald-50 text-emerald-600",
  "bg-violet-50 text-violet-600", "bg-rose-50 text-rose-600", "bg-cyan-50 text-cyan-600",
  "bg-orange-50 text-orange-600", "bg-indigo-50 text-indigo-600",
];

const fallbackItems: { icon: string; title: string; description: string }[] = [
  { icon: "Home", title: "House Construction", description: "End-to-end residential construction from foundation to finish. We handle design, permits, materials, and labor so you get a turnkey home built to last." },
  { icon: "Building2", title: "Commercial Buildings", description: "Office towers, retail spaces, and mixed-use developments built to code with modern engineering standards and on-time delivery." },
  { icon: "Paintbrush", title: "Interior Design", description: "Bespoke interior fit-outs that blend aesthetics with functionality. From concept boards to final installation, we bring your vision to life." },
  { icon: "Compass", title: "Material Consultation", description: "Transparent cost analysis and material sourcing guidance. We help you choose the right materials for your budget without compromising quality." },
  { icon: "HardHat", title: "Site Visit & Assessment", description: "On-site evaluation by our senior engineers. We assess land conditions, structural feasibility, and provide accurate project estimates." },
  { icon: "Leaf", title: "Renovation & Remodeling", description: "Breathe new life into existing spaces. Structural renovations, heritage restorations, and interior upgrades with minimal disruption." },
  { icon: "Ruler", title: "Infrastructure & Roads", description: "Road construction, bridge works, and public infrastructure projects delivered with precision and compliance to government standards." },
  { icon: "HeadphonesIcon", title: "Project Management", description: "Dedicated project managers oversee every phase — from budgeting and scheduling to quality control and stakeholder communication." },
];

export function HelpSection({ content }: { content?: SectionContentMap }) {
  const lang = useLang() as "en" | "np";
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);
  const items = parseJSONLocale<{ icon: string; title: string; description: string }[]>(content, "helpItems", fallbackItems, lang);

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>{val("helpLabel", "How We Can Help")}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
            {val("helpHeading", "Every Service You Need Under One Roof")}
          </h2>
          <p className="mt-4 text-mid-gray text-lg leading-relaxed">
            {val("helpSubtitle", "Whether you are building from scratch, renovating an existing space, or needing expert advice on materials — our team has the experience to guide you at every step.")}
          </p>
        </AnimateOnView>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            if (!Icon) return null;
            return (
              <AnimateOnView key={item.title} animation="fade-in-up">
                <div className="group bg-white rounded-2xl p-6 border border-light-gray/40 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full">
                  <div
                    className={`size-11 rounded-xl ${COLORS[i % COLORS.length]} grid place-items-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {Icon && <Icon className="size-5" />}
                  </div>
                  <h3 className="font-body font-semibold text-lg text-brand-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-mid-gray text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateOnView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
