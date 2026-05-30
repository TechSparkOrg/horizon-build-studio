import type { SectionContentData } from "@/lib/services/types/section.types";

export type SectionContentMap = Record<string, {
  valueEn: string;
  valueNp: string;
  mediaUrl: string | null;
  mediaType: string | null;
}>;

export function getVal(map: SectionContentMap | undefined, key: string, fallback: string, lang: "en" | "np" = "en"): string {
  if (!map?.[key]) return fallback;
  return lang === "np" && map[key].valueNp ? map[key].valueNp : (map[key].valueEn || fallback);
}

export function getMedia(map: SectionContentMap | undefined, key: string, fallback: string): string {
  return map?.[key]?.mediaUrl || fallback;
}

export function parseJSON<T = unknown>(map: SectionContentMap | undefined, key: string, fallback: T): T {
  if (!map?.[key]) return fallback;
  try {
    return JSON.parse(map[key].valueEn) as T;
  } catch {
    return fallback;
  }
}

export function parseJSONLocale<T = unknown>(map: SectionContentMap | undefined, key: string, fallback: T, lang: "en" | "np" = "en"): T {
  if (!map?.[key]) return fallback;
  const src = lang === "np" && map[key].valueNp ? map[key].valueNp : map[key].valueEn;
  if (!src) return fallback;
  try {
    return JSON.parse(src) as T;
  } catch {
    return fallback;
  }
}

export function buildSectionsMap(raw: SectionContentData[]): SectionContentMap {
  const map: SectionContentMap = {};
  for (const item of raw) {
    map[item.key] = {
      valueEn: item.valueEn,
      valueNp: item.valueNp,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    };
  }
  return map;
}

export type AllSectionsMap = Record<string, SectionContentMap>;

export function buildAllSectionsMap(raw: SectionContentData[]): AllSectionsMap {
  const sections: AllSectionsMap = {};
  for (const item of raw) {
    if (!sections[item.section]) sections[item.section] = {};
    sections[item.section][item.key] = {
      valueEn: item.valueEn,
      valueNp: item.valueNp,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    };
  }
  return sections;
}
