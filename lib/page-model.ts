export interface PageModel3D {
  id: string;
  modelId: string;
  url: string;
  filename: string;
  type: string;
  label: string;
  order: number;
}

export interface PageModelGroup {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  models3d: PageModel3D[];
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getPageModel(slug: string): Promise<PageModelGroup | null> {
  try {
    const res = await fetch(`${BASE}/api/page-models?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAllPageModels(): Promise<PageModelGroup[]> {
  try {
    const res = await fetch(`${BASE}/api/page-models`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
