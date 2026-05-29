import type { Slugged, WithTimestamps } from "./shared.types";

export interface StaticPageData extends Slugged, WithTimestamps {
  id: string;
  contentEn: string;
  contentNp: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
}
