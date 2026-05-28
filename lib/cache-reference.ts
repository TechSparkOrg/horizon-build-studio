import "server-only";
import { redis } from "./redis";
import { categoryService } from "@/lib/services/services/category.service";
import { faqService } from "@/lib/services/services/faq.service";

const TTL = 300;

export async function getCachedCategories() {
  try {
    const cached = await redis.get("ref:categories");
    if (cached) return JSON.parse(cached);
  } catch { /* fall through */ }
  const data = await categoryService.getAll();
  redis.set("ref:categories", JSON.stringify(data), "EX", TTL).catch(() => {});
  return data;
}

export async function getCachedFaqs() {
  try {
    const cached = await redis.get("ref:faqs");
    if (cached) return JSON.parse(cached);
  } catch { /* fall through */ }
  const data = await faqService.getAll();
  redis.set("ref:faqs", JSON.stringify(data), "EX", TTL).catch(() => {});
  return data;
}

export async function purgeReferenceCache() {
  try {
    const keys = await redis.keys("ref:*");
    if (keys.length > 0) await redis.del(...keys);
  } catch { /* ignore */ }
}
