import type { MediaType } from "./shared.types";
import type { Slugged } from "./shared.types";

export interface BannerImage {
  image: string;
  alt: string;
  order: number;
}

export interface BannerData extends Slugged {
  id: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  images: BannerImage[];
}
