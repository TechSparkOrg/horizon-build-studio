export interface SectionContentData {
  id: string;
  section: string;
  key: string;
  valueEn: string;
  valueNp: string;
  mediaUrl: string | null;
  mediaType: string | null;
  order: number;
}

export interface SectionDefData {
  id: string;
  slug: string;
  label: string;
  order: number;
}

export type SectionDef = SectionDefData;
