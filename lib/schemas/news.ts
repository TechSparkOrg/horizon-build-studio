import { z } from "zod";

export const VideoRefSchema = z.object({
  id: z.string(), platform: z.string(), embedUrl: z.string(),
  fileUrl: z.string(), fileType: z.string(), title: z.string(),
});
export type VideoRef = z.infer<typeof VideoRefSchema>;

export const ProjectRefSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.string(),
  location: z.string().nullable(),
  img: z.string(),
  alt: z.string(),
  completion: z.number(),
  models3d: z.array(z.object({ id: z.string(), url: z.string(), filename: z.string() })),
  videos: z.array(VideoRefSchema),
});
export type ProjectRef = z.infer<typeof ProjectRefSchema>;

export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  image: z.string().nullable(),
  alt: z.string(),
  category: z.string(),
  publishedAt: z.string(),
  projectId: z.string().nullable(),
  readingTimeMinutes: z.number().nullable(),
  project: ProjectRefSchema.nullable(),
});
export type NewsArticle = z.infer<typeof NewsArticleSchema>;

export type NewsDisplay = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  publishedAt: Date;
  readingTimeMinutes: number | null;
  project: (Omit<ProjectRef, "location"> & { location: string }) | null;
};
