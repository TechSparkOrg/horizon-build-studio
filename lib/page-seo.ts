export interface PageSEO {
  id: string;
  slug: string;
  title: string;
  text1En: string;
  text1Np: string;
  text2En: string;
  text2Np: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  customScript: string;
  createdAt: string;
  updatedAt: string;
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  try {
    const res = await fetch(`${BASE}/api/page-seo?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAllPageSEO(): Promise<PageSEO[]> {
  try {
    const res = await fetch(`${BASE}/api/page-seo`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
