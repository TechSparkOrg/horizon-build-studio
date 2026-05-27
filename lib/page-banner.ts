export interface PageBannerImage {
  id: string;
  bannerId: string;
  image: string;
  alt: string;
  order: number;
}

export interface PageBannerGroup {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  images: PageBannerImage[];
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getPageBanner(slug: string): Promise<PageBannerGroup | null> {
  try {
    const res = await fetch(`${BASE}/api/page-banners?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAllPageBanners(): Promise<PageBannerGroup[]> {
  try {
    const res = await fetch(`${BASE}/api/page-banners`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
