"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  HelpCircle,
  Newspaper,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  FolderTree,
  Layout,
  Image,
  Box,
  FileText,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/sections", label: "Sections", icon: Layout },
  { href: "/admin/banners", label: "Banners", icon: Image },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/models", label: "Models", icon: Box },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-brand-dark text-white flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.08)]">
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-lg bg-brand-primary grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-white font-display font-bold text-sm">H</span>
          </div>
          <div>
            <div className="font-display text-base font-bold tracking-tight">
              <span className="text-brand-primary">Horizon</span>
              <span className="text-white/80"> Nepal</span>
            </div>
            <p className="text-[10px] font-medium text-white/40 tracking-wider uppercase -mt-0.5">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                isActive
                  ? "bg-brand-primary/10 text-white border-l-[3px] border-brand-primary pl-[11px]"
                  : "text-white/50 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent pl-[13px]",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/5 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-white/50 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent pl-[13px] transition-all"
        >
          <ExternalLink className="size-4 shrink-0" />
          View Site
        </a>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 border-l-[3px] border-transparent pl-[13px] transition-all w-full text-left"
        >
          <LogOut className="size-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
