import { z } from "zod";

export const FAQTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  faqType: FAQTypeSchema.nullable(),
  category: z.object({ name: z.string() }).nullable().optional(),
});

export type FAQ = z.infer<typeof FAQSchema>;
export type FAQType = z.infer<typeof FAQTypeSchema>;
