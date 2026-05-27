export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  contentEn: string;
  contentNp: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  createdAt: string;
  updatedAt: string;
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getStaticPage(slug: string): Promise<StaticPage | null> {
  try {
    const res = await fetch(`${BASE}/api/static-pages?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAllStaticPages(): Promise<StaticPage[]> {
  try {
    const res = await fetch(`${BASE}/api/static-pages`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
