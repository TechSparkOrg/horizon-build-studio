import { api } from "@/lib/api";
import { updateSetting } from "./actions";
import { ToastOnLoad } from "@/components/admin/ToastOnLoad";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

export default async function SettingsPage() {
  const map = await api("/api/settings").get() as Record<string, string>;

  const fields = [
    { key: "hero_title", label: "Hero Title", type: "text", value: map["hero_title"] ?? "Building Nepal's Future, One Structure at a Time" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "text", value: map["hero_subtitle"] ?? "From concept to completion, Horizon Nepal delivers precision engineering..." },
    { key: "about_heading", label: "About Heading", type: "text", value: map["about_heading"] ?? "About Horizon Nepal" },
    { key: "about_text", label: "About Text", type: "textarea", value: map["about_text"] ?? "" },
    { key: "contact_email", label: "Contact Email", type: "text", value: map["contact_email"] ?? "hello@horizonnepal.com.np" },
    { key: "contact_phone", label: "Contact Phone", type: "text", value: map["contact_phone"] ?? "+977 1 441 1222" },
    { key: "contact_address", label: "Contact Address", type: "text", value: map["contact_address"] ?? "Tinkune, Kathmandu" },
  ];

  return (
    <div>
      <ToastOnLoad />
      <h1 className="text-2xl font-display font-bold text-brand-secondary mb-6">Site Settings</h1>
      <form action={updateSetting} className="bg-white rounded-xl p-8 shadow-sm max-w-2xl space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-brand-secondary mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea name={field.key} rows={3} defaultValue={field.value} className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            ) : (
              <input name={field.key} defaultValue={field.value} className={input} />
            )}
          </div>
        ))}
        <button type="submit" className="h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition">
          Save Settings
        </button>
      </form>
    </div>
  );
}
