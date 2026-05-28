import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const FlatCatSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CategoryTreeSchema: z.ZodType<{
  id: string;
  name: string;
  slug: string;
  children?: { id: string; name: string; slug: string; children?: unknown[] }[];
}> = CategorySchema.extend({
  children: z.lazy(() => CategoryTreeSchema.array().optional()),
});
