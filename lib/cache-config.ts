export const CACHE_TAGS = {
  PROJECTS: "projects",
  NEWS: "news",
  FAQS: "faqs",
  SECTIONS: "sections",
} as const;

export const CACHE_TTL = {
  [CACHE_TAGS.PROJECTS]: "hours",
  [CACHE_TAGS.NEWS]: "hours",
  [CACHE_TAGS.FAQS]: "hours",
  [CACHE_TAGS.SECTIONS]: "hours",
} as const;

export async function revalidateAllTags() {
  const { revalidateTag } = await import("next/cache");
  for (const tag of Object.values(CACHE_TAGS)) {
    revalidateTag(tag, "max");
  }
}
