import { api } from "@/lib/api";
import { Briefcase, Users, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";

async function getStats() {
  return api("/api/stats").get() as any;
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Projects", count: stats.projectCount, icon: Briefcase, href: "/admin/projects" },
    { label: "Team", count: stats.teamCount, icon: Users, href: "/admin/team" },
    { label: "Testimonials", count: stats.testimonialCount, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "Contacts", count: stats.contactCount, icon: Mail, href: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="text-xl font-display font-bold text-brand-secondary tracking-tight mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-light-gray rounded p-4 hover:border-mid-gray transition"
          >
            <div className="flex items-center justify-between mb-2">
              <card.icon className="size-6 text-brand-primary" />
              <span className="text-2xl font-display font-bold text-brand-secondary">
                {card.count}
              </span>
            </div>
            <p className="text-xs text-mid-gray">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-light-gray rounded p-4">
        <h2 className="font-display font-bold text-brand-secondary text-sm mb-3 tracking-tight">
          Recent Contact Submissions
        </h2>
        {stats.recentContacts.length === 0 ? (
          <p className="text-mid-gray text-sm">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light-gray/50">
                  <th className="text-left py-2 px-2 font-medium text-mid-gray text-xs">Name</th>
                  <th className="text-left py-2 px-2 font-medium text-mid-gray text-xs">Email</th>
                  <th className="text-left py-2 px-2 font-medium text-mid-gray text-xs">Service</th>
                  <th className="text-left py-2 px-2 font-medium text-mid-gray text-xs">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentContacts.map((c: any) => (
                  <tr key={c.id} className="border-b border-light-gray/30">
                    <td className="py-2 px-2 text-sm font-medium text-dark-text">{c.name}</td>
                    <td className="py-2 px-2 text-xs text-mid-gray">{c.email}</td>
                    <td className="py-2 px-2 text-xs text-mid-gray">{c.serviceType}</td>
                    <td className="py-2 px-2 text-xs text-mid-gray">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
