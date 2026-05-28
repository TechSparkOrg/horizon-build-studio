import {
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const cards = [
  {
    label: "Projects",
    href: "/admin/projects",
    icon: Briefcase,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-500/20",
    description: "Manage portfolio items",
  },
  {
    label: "Team Members",
    href: "/admin/team",
    icon: Users,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20",
    description: "Horizon active team",
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/20",
    description: "Client satisfaction",
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-500/20",
    description: "Inquiries & leads",
  },
] as const;

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-light-gray pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-secondary tracking-tight mt-1.5">
            Admin Dashboard
          </h1>
          <p className="text-sm text-mid-gray mt-1 font-body">
            Horizon Nepal system status overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative bg-white border border-light-gray/60 rounded-xl p-5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:border-brand-primary/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-300" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${card.color} border shadow-inner`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-3xl font-display font-extrabold text-brand-secondary tracking-tight group-hover:scale-105 transition-transform duration-300">
                    0
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">
                  {card.label}
                </h3>
                <p className="text-xs text-mid-gray mt-0.5">{card.description}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-brand-primary font-bold tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase font-label">
                Manage panel <ArrowUpRight className="size-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white border border-light-gray/60 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
        <div className="border-b border-light-gray p-5 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-brand-secondary text-lg tracking-tight">
              Recent Inquiries
            </h2>
            <p className="text-xs text-mid-gray mt-0.5">
              Latest contact submissions.
            </p>
          </div>
        </div>
        <div className="p-12 text-center">
          <Mail className="size-8 mx-auto mb-3 text-light-gray" />
          <p className="text-mid-gray text-sm">No recent contact inquiries received.</p>
        </div>
      </div>
    </div>
  );
}
