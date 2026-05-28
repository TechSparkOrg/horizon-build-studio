"use client";

import { useRouter } from "next/navigation";
import { useLang, useSetLang } from "@/lib/lang-client";

export function LanguageToggle() {
  const lang = useLang();
  const setLang = useSetLang();
  const { refresh } = useRouter();
  const next = lang === "en" ? "np" : "en";

  return (
    <button
      onClick={() => { setLang(next); refresh(); }}
      className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-full border-2 border-brand-primary bg-brand-primary text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition whitespace-nowrap"
      aria-label={next === "np" ? "Switch to Nepali" : "Switch to English"}
    >
      {lang === "en" ? (
        <>
          <img src="/staticimg/flag-for-flag-nepal.svg" alt="Nepali" className="size-4 object-contain" />
          <span>नेपाली</span>
        </>
      ) : (
        <>
          <img src="/staticimg/US-UK_Flag.png" alt="English" className="size-4 object-contain" />
          <span>English</span>
        </>
      )}
    </button>
  );
}
