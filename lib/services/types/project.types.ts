import type { CategoryRef, MediaType } from "./shared.types";

export interface ProjectMedia {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

export interface ProjectVideo {
  id: string;
  platform: string;
  sourceUrl: string;
  videoId: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  fileUrl: string;
  fileType: string;
  duration: string;
  isFeatured: boolean;
  order: number;
}

export interface ProjectModel {
  id: string;
  filename: string;
  url: string;
  type: string;
}

export interface PhaseMedia {
  id: string;
  type: MediaType;
  url: string;
  message: string;
  referenceNo: string;
  order: number;
}

export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  completion: number;
  date: Date | null;
  order: number;
  faqId: string | null;
  youtubeUrl?: string;
  images?: string[];
  medias: PhaseMedia[];
}

export interface ProjectAttribute {
  id: string;
  label: string;
  value: string;
  order: number;
}

export interface ProjectFaqRef {
  id: string;
  faqId: string;
  order: number;
  faq: {
    id: string;
    question: string;
    answer: string;
    faqType: { id: string; name: string; slug: string } | null;
  } | null;
}

export interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  budget: number | null;
  img: string;
  alt: string;
  status: string;
  completion: number;
  featured: boolean;
  published: boolean;
  order: number;
  ownerName: string;
  ownerProfession: string;
  ownerEarning: string;
  startDate: Date | null;
  endDate: Date | null;
  category: CategoryRef | null;
  categoryId: string | null;
  media: ProjectMedia[];
  videos: ProjectVideo[];
  models3d: ProjectModel[];
  phases: ProjectPhase[];
  attributes: ProjectAttribute[];
  projectFaqs: ProjectFaqRef[];
}

export type ProjectListItem = Pick<ProjectDetail, "title" | "slug" | "location" | "img" | "alt" | "status" | "completion" | "budget" | "published"> & {
  category: CategoryRef | null;
  shortDescription: string;
};

export type ProjectMeta = Pick<ProjectDetail, "title" | "shortDescription">;

export type RelatedProjectItem = Pick<ProjectDetail, "title" | "slug" | "img" | "alt" | "location"> & {
  category: string | null;
};

export type AdjacentItem = Pick<ProjectDetail, "title" | "slug">;

export type RelatedProject = RelatedProjectItem;
export type AdjacentProject = AdjacentItem;

export type ProjectDisplay = ProjectDetail;

export interface HomeProject {
  title: string;
  slug: string;
  location: string;
  img: string;
  alt: string;
  status: string;
  completion: number;
  budget: number | null;
  shortDescription: string;
  category: string;
}

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  faqType: { id: string; name: string; slug: string } | null;
};

export type FAQType = {
  id: string;
  name: string;
};

export interface SearchResult {
  items: ProjectListItem[];
  total: number;
  page: number;
  limit: number;
  categories: { id: string; name: string; slug: string; order: number }[];
}
