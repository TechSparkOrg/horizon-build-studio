import { ArrowRight, Compass, Home as HomeIcon, Wrench, PenTool, Users } from "lucide-react";
import { AnimateOnView } from "@/components/AnimateOnView";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";

const services = [
  {
    icon: HomeIcon,
    title: "Architect Work",
    body: "Comprehensive architectural design and planning services — from concept development to detailed construction drawings tailored to Nepal's terrain and climate.",
  },
  {
    icon: Compass,
    title: "Architecture Design",
    body: "Innovative space planning and aesthetic design that balances form with function, optimised for modern Nepali living and working environments.",
  },
  {
    icon: Wrench,
    title: "Reconstruction",
    body: "Expert renovation, retrofitting, and rebuilding services for residential, commercial, and institutional structures across Nepal.",
  },
  {
    icon: PenTool,
    title: "General Consultant",
    body: "End-to-end technical consultancy covering feasibility studies, structural analysis, project management, and regulatory approvals.",
  },
  {
    icon: Users,
    title: "Plumbing & Electrical",
    body: "Complete MEP (mechanical, electrical, plumbing) system design and installation for safe, efficient, and code-compliant buildings.",
  },
];

function ServiceCard({ icon: Icon, title, body }: { icon: typeof HomeIcon; title: string; body: string }) {
  return (
    <article className="group bg-white rounded-2xl p-7 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300">
      <div className="size-12 rounded-lg bg-brand-primary grid place-items-center mb-5">
        <Icon className="size-6 text-white" />
      </div>
      <h3 className="font-body font-semibold text-xl text-brand-secondary">{title}</h3>
      <p className="mt-3 text-mid-gray leading-relaxed">{body}</p>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnView className="max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            About Horizon Nepal
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Three decades of combined leadership delivering homes, civic infrastructure, and interior spaces engineered for Nepal.
          </p>
        </AnimateOnView>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
          ))}

          <div className="rounded-2xl overflow-hidden h-full min-h-[240px] bg-transparent">
            <ModelViewer3D
              src="/glb/sand.glb"
              className="w-full h-full rounded-2xl bg-transparent"
              hideBadge
            />
          </div>

          {services.slice(3).map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/how-we-work"
            className="inline-flex items-center gap-2 h-11 px-6 rounded border-2 border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition"
          >
            Explore More <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
