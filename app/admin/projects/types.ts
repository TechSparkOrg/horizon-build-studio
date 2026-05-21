export interface FormFields {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  status: string;
  completion: number;
  location: string;
  budget: string;
  startDate: string;
  endDate: string;
  img: string;
  alt: string;
  featured: boolean;
  published: boolean;
  order: number;
  ownerName: string;
  ownerProfession: string;
  ownerEarning: string;
}

export interface AttrItem {
  id: string;
  label: string;
  value: string;
  type: string;
  order: number;
}

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

export interface VideoItem {
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

export interface ModelItem {
  id: string;
  filename: string;
  url: string;
  type: string;
}

export interface PhaseMediaItem {
  id: string;
  type: "image" | "video" | "model3d";
  url: string;
  message: string;
  referenceNo: string;
  order: number;
}

export interface ProjectFaqItem {
  id: string;
  faqId: string;
  order: number;
  faq?: { id: string; question: string; answer: string; faqType?: { id: string; name: string; slug: string } | null } | null;
}

export interface PhaseItem {
  id: string;
  title: string;
  description: string;
  completion: number;
  date: string;
  youtubeUrl: string;
  faqId: string | null;
  medias: PhaseMediaItem[];
  order: number;
}

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  children?: CategoryNode[];
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string | null;
  category: { id: string; name: string } | null;
  status: string;
  completion: number;
  location: string;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  img: string;
  alt: string;
  featured: boolean;
  published: boolean;
  order: number;
  ownerName: string;
  ownerProfession: string;
  ownerEarning: string;
  media: MediaItem[];
  videos: VideoItem[];
  models3d: ModelItem[];
  phases: PhaseItem[];
  projectFaqs: ProjectFaqItem[];
  attributes: AttrItem[];
}
