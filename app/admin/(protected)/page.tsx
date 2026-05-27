"use client";

import { useCache, useGlobalControl } from "@/app/admin/cache-context";
import { api } from "@/lib/api";
import {
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Fetch function for dashboard stats
const fetchStats = async () => {
  return api("/api/stats").get() as Promise<{
    projectCount: number;
    teamCount: number;
    testimonialCount: number;
    contactCount: number;
    recentContacts: any[];
  }>;
};

export default function AdminDashboard() {
  const { data: stats, loading, refresh } = useCache("admin-stats", fetchStats, {
    tags: ["stats", "projects", "team", "testimonials", "contacts"],
    ttl: 30000, // 30s TTL
  });
  
  const { isPending, cacheUpdate } = useGlobalControl();
  const [manualSyncing, setManualSyncing] = useState(false);

  const handleSyncAll = async () => {
    setManualSyncing(true);
    // Invalidate everything to trigger smooth cascading updates
    await cacheUpdate(["stats", "projects", "team", "testimonials", "contacts"]);
    setTimeout(() => setManualSyncing(false), 800);
  };

  const cards = [
    {
      label: "Projects",
      count: stats?.projectCount ?? 0,
      icon: Briefcase,
      href: "/admin/projects",
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-500/20",
      description: "Manage portfolio items",
    },
    {
      label: "Team Members",
      count: stats?.teamCount ?? 0,
      icon: Users,
      href: "/admin/team",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20",
      description: "Horizon active team",
    },
    {
      label: "Testimonials",
      count: stats?.testimonialCount ?? 0,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/20",
      description: "Client satisfaction",
    },
    {
      label: "Contacts",
      count: stats?.contactCount ?? 0,
      icon: Mail,
      href: "/admin/contacts",
      color: "from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-500/20",
      description: "Inquiries & leads",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header section with actions & cache state */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-light-gray pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-brand-primary/10 text-brand-primary text-xs px-2.5 py-1 rounded-full font-label tracking-wider flex items-center gap-1.5 font-semibold">
              <Sparkles className="size-3" /> Real-time Hydration Active
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-secondary tracking-tight mt-1.5">
            Admin Dashboard
          </h1>
          <p className="text-sm text-mid-gray mt-1 font-body">
            Horizon Nepal system status overview and dynamic cache control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Caching Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-light-gray text-xs text-mid-gray font-medium">
            <span className={`size-2 rounded-full ${loading || isPending ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
            {loading ? "Revalidating..." : isPending ? "Propagating updates..." : "Cache Synchronized"}
          </div>

          <button
            onClick={handleSyncAll}
            disabled={loading || manualSyncing}
            className="flex items-center gap-2 h-10 px-4 py-2 border border-light-gray rounded-lg bg-white text-brand-secondary hover:bg-off-white transition disabled:opacity-50 text-sm font-semibold shadow-sm cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${manualSyncing || loading ? "animate-spin" : ""}`} />
            {manualSyncing ? "Syncing..." : "Sync Cache"}
          </button>
        </div>
      </div>

      {/* Grid of stats cards with modern elevated hover styles */}
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
                    {loading ? (
                      <span className="inline-block w-8 h-8 bg-light-gray animate-pulse rounded" />
                    ) : (
                      card.count
                    )}
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

      {/* Table section for recent contact submissions */}
      <div className="bg-white border border-light-gray/60 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
        <div className="border-b border-light-gray p-5 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-brand-secondary text-lg tracking-tight">
              Recent Inquiries
            </h2>
            <p className="text-xs text-mid-gray mt-0.5">
              Instant updates across client inquiries cache group.
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded-full font-label font-bold tracking-wide uppercase">
            <TrendingUp className="size-3" /> Auto Updates
          </span>
        </div>

        {loading && !stats ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-mid-gray">Retrieving cached records...</p>
          </div>
        ) : !stats || stats.recentContacts.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="size-8 mx-auto mb-3 text-light-gray" />
            <p className="text-mid-gray text-sm">No recent contact inquiries received.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-light-gray bg-off-white/40">
                  <th className="py-3 px-5 text-left font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Name</th>
                  <th className="py-3 px-5 text-left font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Email</th>
                  <th className="py-3 px-5 text-left font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Service Category</th>
                  <th className="py-3 px-5 text-left font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Received Date</th>
                  <th className="py-3 px-5 text-right font-label text-xs font-bold text-mid-gray tracking-wider uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray/50">
                {stats.recentContacts.map((c: any) => (
                  <tr key={c.id} className="hover:bg-off-white/20 transition-colors group">
                    <td className="py-3.5 px-5 text-sm font-semibold text-brand-secondary">{c.name}</td>
                    <td className="py-3.5 px-5 text-sm text-mid-gray font-mono text-xs">{c.email}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/5 text-brand-primary border border-brand-primary/10">
                        {c.serviceType || "General Inquiry"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-mid-gray">
                      {new Date(c.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href="/admin/contacts"
                        className="text-xs text-brand-primary hover:text-brand-secondary font-bold font-label tracking-wide uppercase opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        View Full
                      </Link>
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
