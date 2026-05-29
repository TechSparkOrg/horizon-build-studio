import { create } from "zustand";

type Lang = "en" | "np";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("horizon-lang");
    if (stored === "en" || stored === "np") return stored;
  } catch {}
  return "en";
}

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: getInitialLang(),
  setLang: (lang: Lang) => {
    set({ lang });
    if (typeof document !== "undefined") {
      try {
        localStorage.setItem("horizon-lang", lang);
      } catch {}
      document.cookie = `lang=${lang};path=/;max-age=${365 * 86400}`;
    }
  },
}));
