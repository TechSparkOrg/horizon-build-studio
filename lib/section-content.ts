const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export interface SectionContentItem {
  id: string;
  section: string;
  key: string;
  valueEn: string;
  valueNp: string;
  mediaUrl: string | null;
  mediaType: string | null;
  order: number;
}

export type SectionContentMap = Record<string, Pick<SectionContentItem, "valueEn" | "valueNp" | "mediaUrl" | "mediaType">>;

export async function getSectionContent(section: string, lang?: string): Promise<SectionContentMap> {
  const url = `${BASE}/api/section-contents?section=${encodeURIComponent(section)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return {};
  const items: SectionContentItem[] = await res.json();
  const map: SectionContentMap = {};
  for (const item of items) {
    map[item.key] = {
      valueEn: item.valueEn,
      valueNp: item.valueNp,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    };
  }
  return map;
}

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
