"use server";

import { getCachedCategories, getCachedFaqs } from "@/lib/cache-reference";
import { settingsService } from "@/lib/services/services/settings.service";
import { requireAuth } from "@/lib/auth";

export async function getCategories() {
  await requireAuth();
  return getCachedCategories();
}

export async function getFaqs() {
  await requireAuth();
  return getCachedFaqs();
}

export async function getSettings() {
  await requireAuth();
  return settingsService.getAll();
}
