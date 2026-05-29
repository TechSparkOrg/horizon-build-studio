export interface PageModel3D {
  id: string;
  url: string;
  filename: string;
  type: string;
  label: string;
  order: number;
}

export interface PageModelData {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  customScript: string;
  models3d: PageModel3D[];
}
