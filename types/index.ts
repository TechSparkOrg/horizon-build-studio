export interface Project {
  readonly title: string;
  category: string;
  location: string;
  img: string;
  alt: string;
  status: string;
  completion: number;
  budget: number | null;
  shortDescription: string;
  slug: string;
}

export interface NewsItem {
  readonly title: string;
  excerpt: string;
  cat: string;
  date: string;
  img: string;
  slug: string;
}

export interface TeamMember {
  readonly name: string;
  role: string;
  img: string;
}

export interface Testimonial {
  readonly name: string;
  role: string;
  quote: string;
  initials: string;
}

export interface FAQItem {
  readonly q: string;
  a: string;
  type?: string;
  category?: string;
  faqTypeName?: string;
  categoryName?: string;
}
