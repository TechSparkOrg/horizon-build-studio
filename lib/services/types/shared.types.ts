export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Slugged {
  slug: string;
  title: string;
}

export interface CategoryRef {
  id: string;
  name: string;
}

export interface WithTimestamps {
  createdAt: Date;
  updatedAt?: Date;
}

export type MediaType = "image" | "video" | "model3d";
