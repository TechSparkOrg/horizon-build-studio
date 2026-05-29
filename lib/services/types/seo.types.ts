import type { WithTimestamps, Slugged } from "./shared.types";

export interface SeoData extends Slugged, WithTimestamps {
  id: string;
  title: string;
  text1En: string;
  text1Np: string;
  text2En: string;
  text2Np: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  customScript: string;
}
