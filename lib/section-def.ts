export interface SectionDef {
  id: string;
  slug: string;
  label: string;
  order: number;
  createdAt: string;
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getAllSectionDefs(): Promise<SectionDef[]> {
  try {
    const res = await fetch(`${BASE}/api/section-defs`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
