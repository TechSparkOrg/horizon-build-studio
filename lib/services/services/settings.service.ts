import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";

export const settingsService = {
  getAll: () =>
    dbQuery(async () => {
      const settings = await prisma.siteSetting.findMany();
      const map: Record<string, string> = {};
      for (const s of settings) map[s.key] = s.value;
      return map;
    }),
  upsertMany: (body: Record<string, string>) =>
    dbMutate(async () => {
      const upserts = Object.entries(body).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value), type: "text", section: "general" },
        }),
      );
      await Promise.all(upserts);
    }),
};
