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
