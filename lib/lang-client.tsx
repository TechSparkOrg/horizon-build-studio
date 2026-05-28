"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { text as textEn } from "./text";
import { textNp } from "./text-np";
import type { Lang, TextDict } from "./lang";

const COOKIE = "lang";

type Ctx = { lang: Lang; text: TextDict; setLang: (l: Lang) => void };

const LangCtx = createContext<Ctx | null>(null);

function readCookie(): Lang {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(new RegExp(`(^| )${COOKIE}=([^;]+)`));
  return m?.[2] === "np" ? "np" : "en";
}

function writeCookie(lang: Lang) {
  document.cookie = `${COOKIE}=${lang};path=/;max-age=${365 * 86400}`;
}

function useLangCtx(): Ctx {
  const ctx = useContext(LangCtx);
  return ctx ?? { lang: "en", text: textEn, setLang: () => {} };
}

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang ?? readCookie());

  useEffect(() => { writeCookie(lang); }, [lang]);

  return (
    <LangCtx value={{ lang, text: lang === "np" ? textNp : textEn, setLang }}>
      {children}
    </LangCtx>
  );
}

export function useLang(): Lang {
  return useLangCtx().lang;
}

export function useText(): TextDict {
  return useLangCtx().text;
}

export function useSetLang() {
  return useLangCtx().setLang;
}
