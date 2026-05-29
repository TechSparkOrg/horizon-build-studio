"use client";

import { text as textEn } from "./text";
import { textNp } from "./text-np";
import { useLangStore } from "./store";
import type { Lang, TextDict } from "./lang";

export function useLang(): Lang {
  return useLangStore((s) => s.lang);
}

export function useText(): TextDict {
  const lang = useLangStore((s) => s.lang);
  return lang === "np" ? textNp : textEn;
}

export function useSetLang() {
  return useLangStore((s) => s.setLang);
}
