export interface FaqTypeData {
  id: string;
  name: string;
  slug: string;
}

export interface FaqData {
  id: string;
  question: string;
  answer: string;
  faqType: FaqTypeData | null;
  category: { name: string } | null;
}

export interface FAQSectionItem {
  q: string;
  a: string;
  type?: string;
  category?: string;
  faqTypeName?: string;
  categoryName?: string;
}
