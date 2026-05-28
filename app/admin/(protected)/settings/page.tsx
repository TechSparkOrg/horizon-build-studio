"use client";

import { useState, useEffect } from "react";
import { updateSetting } from "./actions";
import { ImageField } from "@/components/admin/ImageField";
import { getSettings } from "@/lib/services/actions/reference.actions";
import { Globe, Image, Phone, Share2, Search } from "lucide-react";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";
const textarea = "w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y";
const tabBase = "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition cursor-pointer";
const tabActive = "bg-brand-primary/10 text-brand-primary border border-brand-primary/20";
const tabInactive = "text-mid-gray hover:text-brand-secondary hover:bg-gray-50 border border-transparent";

const TABS = [
  { id: "core", label: "Core", icon: Globe },
  { id: "logo", label: "Logo", icon: Image },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "social", label: "Social", icon: Share2 },
  { id: "seo", label: "SEO", icon: Search },
] as const;

function CharCount({ current, max }: { current: number; max: number }) {
  const over = current > max;
  return <span className={`text-xs ${over ? "text-red-500" : "text-gray-400"}`}>{current}/{max}</span>;
}

function MetaInput({ name, defaultValue, maxLen }: { name: string; defaultValue: string; maxLen: number }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div className="relative">
      <input name={name} value={val} onChange={(e) => setVal(e.target.value)} maxLength={maxLen + 50} className={`${input} pr-16`} />
      <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={val.length} max={maxLen} /></div>
    </div>
  );
}

function MetaTextarea({ name, defaultValue, maxLen }: { name: string; defaultValue: string; maxLen: number }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div className="relative">
      <textarea name={name} value={val} onChange={(e) => setVal(e.target.value)} maxLength={maxLen + 50} rows={3} className={`${textarea} pr-16`} />
      <div className="absolute right-2 bottom-2"><CharCount current={val.length} max={maxLen} /></div>
    </div>
  );
}

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">{label}</label>
      {description && <p className="text-xs text-mid-gray mb-2">{description}</p>}
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("core");
  const [map, setMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then(setMap).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Site Settings</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`${tabBase} ${tab === t.id ? tabActive : tabInactive}`}>
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      <form action={updateSetting} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl">
        {loading ? (
          <p className="text-sm text-mid-gray">Loading...</p>
        ) : (
          <>
            {tab === "core" && (
              <div className="space-y-4">
                <Field label="Site Name" description="Your brand or company name used across the site">
                  <input name="site_name" defaultValue={map["site_name"] ?? "Horizon Nepal"} className={input} />
                </Field>
                <Field label="Tagline" description="Short description or motto shown prominently on the homepage">
                  <input name="site_tagline" defaultValue={map["site_tagline"] ?? "Building Nepal's Future, One Structure at a Time"} className={input} />
                </Field>
              </div>
            )}

            {tab === "logo" && (
              <div className="space-y-4">
                <Field label="Site Logo" description="Upload your brand logo. Shown in the navbar navigation bar.">
                  <ImageField name="site_logo" defaultValue={map["site_logo"] ?? ""} />
                </Field>
              </div>
            )}

            {tab === "contact" && (
              <div className="space-y-4">
                <Field label="Email" description="Primary contact email displayed in the footer and contact page">
                  <input name="contact_email" defaultValue={map["contact_email"] ?? "hello@horizonnepal.com.np"} className={input} />
                </Field>
                <Field label="Phone" description="Primary phone number displayed in the footer and contact page">
                  <input name="contact_phone" defaultValue={map["contact_phone"] ?? "+977 1 441 1222"} className={input} />
                </Field>
                <Field label="Address" description="Physical office address shown in the footer and contact page">
                  <input name="contact_address" defaultValue={map["contact_address"] ?? "Tinkune, Kathmandu"} className={input} />
                </Field>
                <Field label="Hours" description="Business hours displayed on the contact page">
                  <input name="contact_hours" defaultValue={map["contact_hours"] ?? "Mon–Sat · 9 AM – 6 PM"} className={input} />
                </Field>
                <Field label="Google Maps URL" description="Full Google Maps URL for your office location embed">
                  <input name="contact_maps_url" defaultValue={map["contact_maps_url"] ?? "https://www.google.com/maps?q=Tinkune,Kathmandu,Nepal"} className={input} />
                </Field>
              </div>
            )}

            {tab === "social" && (
              <div className="space-y-4">
                <Field label="Facebook URL" description="Full URL to your Facebook page">
                  <input name="social_facebook" defaultValue={map["social_facebook"] ?? "https://www.facebook.com/horizonnepal"} className={input} />
                </Field>
                <Field label="Instagram URL" description="Full URL to your Instagram profile">
                  <input name="social_instagram" defaultValue={map["social_instagram"] ?? "https://www.instagram.com/horizonnepal"} className={input} />
                </Field>
                <Field label="LinkedIn URL" description="Full URL to your LinkedIn company page">
                  <input name="social_linkedin" defaultValue={map["social_linkedin"] ?? "https://www.linkedin.com/company/horizonnepal"} className={input} />
                </Field>
                <Field label="YouTube URL" description="Full URL to your YouTube channel">
                  <input name="social_youtube" defaultValue={map["social_youtube"] ?? "https://www.youtube.com/@horizonnepal"} className={input} />
                </Field>
              </div>
            )}

            {tab === "seo" && (
              <div className="space-y-4">
                <Field label="Default Meta Title" description="Browser tab title & search headline. Keep under 70 characters.">
                  <MetaInput name="seo_title" defaultValue={map["seo_title"] ?? "Horizon Nepal — Home Construction, Interior Design & Material Consultation in Kathmandu"} maxLen={70} />
                </Field>
                <Field label="Default Meta Description" description="Search result snippet text. Keep under 160 characters.">
                  <MetaTextarea name="seo_description" defaultValue={map["seo_description"] ?? ""} maxLen={160} />
                </Field>
                <Field label="Meta Keywords" description="Comma-separated keywords.">
                  <MetaInput name="seo_keywords" defaultValue={map["seo_keywords"] ?? "horizon nepal, home construction, interior design, kathmandu, nepal"} maxLen={200} />
                </Field>
                <Field label="Default OG Image" description="Default Open Graph image when shared on social media.">
                  <ImageField name="seo_og_image" defaultValue={map["seo_og_image"] ?? ""} />
                </Field>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-gray-100">
              <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
                Save Settings
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
