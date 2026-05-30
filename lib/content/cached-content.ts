import { getBySection as fetchSectionContent, getAll as fetchAllSections } from "@/lib/services/services/section.service";
import { getBySlug as fetchTextContent } from "@/lib/services/services/text-content.service";
import { memo } from "@/lib/cache/memo";

const TTL = Number(process.env.CONTENT_CACHE_TTL) || 5 * 60 * 1000;

export function cachedSectionContent(section: string) {
  return memo(`section:${section}`, () => fetchSectionContent(section), TTL);
}

export function cachedTextContent(slug: string) {
  return memo(`text:${slug}`, () => fetchTextContent(slug), TTL);
}

export function cachedAllSections() {
  return memo("sections:all", () => fetchAllSections(), TTL);
}
