"use client";

import { useLang } from "@/lib/i18n/lang-client";
import { getVal, getMedia, parseJSONLocale, type SectionContentMap } from "./section-content";

export function useSectionValue(
  content: SectionContentMap | undefined,
  key: string,
  fallback: string,
): string {
  const lang = useLang();
  return getVal(content, key, fallback, lang);
}

export function useSectionMedia(
  content: SectionContentMap | undefined,
  key: string,
  fallback: string,
): string {
  return getMedia(content, key, fallback);
}

export function useSectionJSON<T = unknown>(
  content: SectionContentMap | undefined,
  key: string,
  fallback: T,
): T {
  const lang = useLang();
  return parseJSONLocale(content, key, fallback, lang);
}
