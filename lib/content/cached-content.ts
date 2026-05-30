import { getBySection as fetchSectionContent, getAllSections as fetchAllSections, getBySlugText as fetchTextContent } from "@/lib/services/static-services";
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
