import { z } from "zod";

import { FAQSchema, FAQTypeSchema } from "./faq";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string().nullable(),
  location: z.string(),
  budget: z.number().nullable(),
  img: z.string(),
  alt: z.string(),
  status: z.string(),
  completion: z.number(),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number(),
  ownerName: z.string(),
  ownerProfession: z.string(),
  ownerEarning: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  category: z.object({ id: z.string(), name: z.string() }).nullable(),
  categoryId: z.string().nullable(),
  media: z.array(z.object({
    id: z.string(), url: z.string(), alt: z.string(),
    isHero: z.boolean(), order: z.number(),
  })),
  videos: z.array(z.object({
    id: z.string(), platform: z.string(), sourceUrl: z.string(),
    videoId: z.string(), title: z.string(), thumbnail: z.string(),
    embedUrl: z.string(), fileUrl: z.string(), fileType: z.string(),
    duration: z.string(), isFeatured: z.boolean(), order: z.number(),
  })),
  models3d: z.array(z.object({
    id: z.string(), filename: z.string(), url: z.string(), type: z.string(),
  })),
  phases: z.array(z.object({
    id: z.string(), title: z.string(), description: z.string(),
    completion: z.number(), date: z.date().nullable(), order: z.number(),
    faqId: z.string().nullable(), youtubeUrl: z.string().optional(),
    images: z.array(z.string()).optional(),
    medias: z.array(z.object({
      id: z.string(),
      type: z.enum(["image", "video", "model3d"]),
      url: z.string(), message: z.string(), referenceNo: z.string(), order: z.number(),
    })),
  })),
  attributes: z.array(z.object({
    id: z.string(), label: z.string(), value: z.string(), order: z.number(),
  })),
  projectFaqs: z.array(z.object({
    id: z.string(), faqId: z.string(), order: z.number(),
    faq: z.object({ id: z.string(), question: z.string(), answer: z.string(), faqType: FAQTypeSchema.nullable() }).nullable().optional(),
  })),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectMedia = Project["media"][number];
export type ProjectVideo = Project["videos"][number];
export type ProjectModel = Project["models3d"][number];
export type ProjectPhase = Project["phases"][number];
export type ProjectAttribute = Project["attributes"][number];

export const ProjectPageSchema = z.object({
  project: ProjectSchema,
  faqs: z.array(FAQSchema),
  faqTypes: z.array(FAQTypeSchema),
  related: z.array(z.object({
    title: z.string(), slug: z.string(), img: z.string(), alt: z.string(),
    category: z.string().nullable(), location: z.string(),
  })),
  adjacent: z.object({
    prev: z.object({ title: z.string(), slug: z.string() }).nullable(),
    next: z.object({ title: z.string(), slug: z.string() }).nullable(),
  }),
});

export type ProjectPage = z.infer<typeof ProjectPageSchema>;


