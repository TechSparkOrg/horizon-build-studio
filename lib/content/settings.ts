import { cache } from "react";
import { getAllSettings } from "@/lib/services/static-services";

export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    return await getAllSettings();
  } catch {
    return {};
  }
});
