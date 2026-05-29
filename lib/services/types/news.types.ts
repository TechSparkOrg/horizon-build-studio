import type { Slugged, WithTimestamps } from "./shared.types";

export interface NewsVideoRef {
  id: string;
  platform: string;
  embedUrl: string;
  fileUrl: string;
  fileType: string;
  title: string;
}

export interface NewsProjectRef {
  id: string;
  title: string;
  slug: string;
  status: string;
  location: string | null;
  img: string;
  alt: string;
  completion: number;
  models3d: { id: string; url: string; filename: string }[];
  videos: NewsVideoRef[];
}

export interface NewsListItem extends Slugged {
  id: string;
  excerpt: string | null;
  category: string;
  image: string | null;
  alt: string;
  publishedAt: Date;
  featured: boolean;
  project: { id: string; title: string; slug: string } | null;
}

export interface NewsDetail extends NewsListItem {
  contentEn: string;
  contentNp: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  readingTimeMinutes: number | null;
  project: NewsProjectRef | null;
}

export type ProjectRef = NewsProjectRef;
export type VideoRef = NewsVideoRef;

export interface NewsDisplay {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  publishedAt: Date;
  readingTimeMinutes: number | null;
  project: ProjectRef | null;
}
