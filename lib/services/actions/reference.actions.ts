"use server";

import { getAll as getCategoriesAll } from "@/lib/services/services/category.service";
import { getAll as getFaqsAll } from "@/lib/services/services/faq.service";
import { getAll as getSettingsAll } from "@/lib/services/services/settings.service";
import { requireAuth } from "@/lib/auth/guards";

export async function getCategories() {
  await requireAuth();
  return getCategoriesAll();
}

export async function getFaqs() {
  await requireAuth();
  return getFaqsAll();
}

export async function getSettings() {
  await requireAuth();
  return getSettingsAll();
}
