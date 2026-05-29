import { cache } from "react";
import { getAll as getAllSettings } from "@/lib/services/services/settings.service";

export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    return await getAllSettings();
  } catch {
    return {};
  }
});
