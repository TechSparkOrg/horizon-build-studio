import type { StaticPageData } from "@/lib/services/types/page.types";
import type { SectionContentData } from "@/lib/services/types/section.types";
import type { FaqData, FaqTypeData } from "@/lib/services/types/faq.types";
import type { NewsDetail } from "@/lib/services/types/news.types";
import type {
  ProjectDetail,
  ProjectListItem,
  ProjectMeta,
  AdjacentItem,
  RelatedProjectItem,
} from "@/lib/services/types/project.types";

interface TextContentData {
  id: string;
  slug: string;
  headingEn: string;
  headingNp: string;
  subheadingEn: string;
  subheadingNp: string;
  createdAt: Date;
  updatedAt: Date;
}

const settings: Record<string, string> = {
  site_name: "Horizon Nepal",
  seo_title: "Horizon Nepal — Home Construction, Interior Design & Material Consultation",
  seo_description:
    "Horizon Nepal delivers quality home construction, interior design, and material consultation services in Kathmandu.",
  seo_keywords:
    "home construction Nepal, interior design Nepal, material consultation Kathmandu, building contractor Nepal",
  contact_phone: "+977 1 441 1222",
  contact_email: "hello@horizonnepal.com.np",
  contact_address: "Tinkune, Kathmandu, Nepal",
  seo_og_image: "/og-image.jpg",
};

const sectionContent: SectionContentData[] = [];
const textContent: TextContentData[] = [
  {
    id: "about-hero",
    slug: "about-hero",
    headingEn: "We build beautiful homes with honesty, quality, and care.",
    headingNp: "हामी इमान्दारी, गुणस्तर र माया साथ सुन्दर घर बनाउँछौं।",
    subheadingEn: "Our team partners with you from design to delivery, creating spaces that feel like home.",
    subheadingNp: "हाम्रो टिमले डिजाइनदेखि डेलिवरीसम्म तपाईंको साथ काम गर्छ, यस्तो घर बनाउँछ जुन साँच्चिकै घर जस्तो महसुस हुन्छ।",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "contact-hero",
    slug: "contact-hero",
    headingEn: "Tell us about your dream home and we will call you back.",
    headingNp: "तपाईंले कल्पना गर्नुभएको घरका बारेमा हामीलाई जानकारी दिनुहोस् र हामी छिट्टै सम्पर्क गर्दछौं।",
    subheadingEn: "Share your vision, budget, and timeline so we can deliver the right solution for you.",
    subheadingNp: "आफ्नो विचार, बजेट र समयसीमा हाम्रा साथ साझा गर्नुहोस् ताकि हामी तपाईंका लागि उत्तम समाधान दिन सकौं।",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "how-we-work-hero",
    slug: "how-we-work-hero",
    headingEn: "Our process is simple, transparent, and built around your needs.",
    headingNp: "हाम्रो प्रक्रिया सरल, पारदर्शी र तपाईंको आवश्यकतामा आधारित छ।",
    subheadingEn: "From discovery to delivery, every step is clear, collaborative, and designed for your peace of mind.",
    subheadingNp: "अनुसन्धानदेखि डेलिवरीसम्म, हरेक कदम स्पष्ट, सहकार्यात्मक र तपाईंको मनको शान्तिका लागि डिजाइन गरिएको छ।",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const banners = [
  {
    id: "home-page-banner",
    slug: "home-page-banner",
    images: [
      {
        image: "",
        alt: "Home page banner",
      },
    ],
  },
];

const pageModels = [
  {
    id: "home-page-1",
    slug: "home-page-1",
    models3d: [],
  },
];

const projects: ProjectDetail[] = [
  {
    id: "project-1",
    title: "Modern Mountain Home",
    slug: "modern-mountain-home",
    description:
      "A modern residential project designed for comfort, durability, and style in the Kathmandu valley.",
    shortDescription: "A modern residential home project in Kathmandu.",
    location: "Kathmandu",
    budget: 120000,
    img: "",
    alt: "Modern home exterior",
    status: "completed",
    completion: 100,
    featured: true,
    published: true,
    order: 1,
    ownerName: "Horizon Nepal",
    ownerProfession: "Construction & Design",
    ownerEarning: "N/A",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-06-01"),
    category: { id: "category-1", name: "Residential" },
    categoryId: "category-1",
    media: [],
    videos: [],
    models3d: [],
    phases: [],
    attributes: [],
    projectFaqs: [],
  },
];

const newsArticles: NewsDetail[] = [
  {
    id: "news-1",
    title: "Horizon Nepal Launches New Sustainable Design Service",
    slug: "sustainable-design-service",
    excerpt: "We are excited to introduce sustainable design and construction solutions for modern homes in Nepal.",
    category: "News",
    image: "",
    alt: "Sustainable home design",
    publishedAt: new Date("2025-05-01"),
    featured: false,
    project: null,
    contentEn:
      "Horizon Nepal now offers sustainable design solutions for residential projects across Kathmandu.",
    contentNp: "",
    metaTitle: "Sustainable Design Service by Horizon Nepal",
    metaDescription: "Horizon Nepal introduces sustainable home design services for modern Nepalese living.",
    metaKeywords: "sustainable design, Nepal, home construction",
    customScript: "",
    readingTimeMinutes: 3,
  },
];

const faqTypes: FaqTypeData[] = [
  { id: "faq-type-1", name: "General", slug: "general" },
];

const faqs: FaqData[] = [
  {
    id: "faq-1",
    question: "How do I start a project with Horizon Nepal?",
    answer: "Reach out through our contact form and our team will schedule a consultation.",
    faqType: faqTypes[0],
    category: { name: "Project" },
  },
];

const staticPages: StaticPageData[] = [
  {
    id: "page-terms",
    title: "Terms & Conditions",
    slug: "terms",
    contentEn:
      "These are the default terms and conditions for using the Horizon Nepal website.",
    contentNp: "",
    metaTitle: "Terms & Conditions",
    metaDescription: "Default terms and conditions for Horizon Nepal.",
    metaKeywords: "terms, conditions, Horizon Nepal",
    customScript: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    slug: "privacy",
    contentEn:
      "This privacy policy describes how Horizon Nepal collects and uses data.",
    contentNp: "",
    metaTitle: "Privacy Policy",
    metaDescription: "Default privacy policy for Horizon Nepal.",
    metaKeywords: "privacy, data, Horizon Nepal",
    customScript: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getAllSettings() {
  return settings;
}

export async function getBySection(section: string) {
  return sectionContent.filter((item) => item.section === section);
}

export async function getAllSections() {
  return sectionContent;
}

export async function getBySlugText(slug: string) {
  return textContent.find((item) => item.slug === slug) ?? null;
}

export async function getBySlugBanner(slug: string) {
  return banners.find((item) => item.slug === slug) ?? null;
}

export async function getBySlugModel(slug: string) {
  return pageModels.find((item) => item.slug === slug) ?? null;
}

export async function getAllProjects(): Promise<ProjectListItem[]> {
  return projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    location: project.location,
    img: project.img,
    alt: project.alt,
    status: project.status,
    completion: project.completion,
    budget: project.budget,
    shortDescription: project.shortDescription,
    published: project.published,
    category: project.category,
  }));
}

export async function getAllNews(): Promise<NewsDetail[]> {
  return newsArticles;
}

export async function getAllFaqs(): Promise<FaqData[]> {
  return faqs;
}

export async function getAllFaqTypes(): Promise<FaqTypeData[]> {
  return faqTypes;
}

export async function getBySlugPage(slug: string): Promise<StaticPageData | null> {
  return staticPages.find((page) => page.slug === slug) ?? null;
}

export async function getAllProjectsForListing(): Promise<ProjectDetail[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectRelated(projectId: string, categoryId: string | null) {
  const related = projects.filter(
    (project) => project.categoryId === categoryId && project.id !== projectId,
  );
  return related.map((project) => ({
    title: project.title,
    slug: project.slug,
    img: project.img,
    alt: project.alt,
    location: project.location,
    category: project.category?.name ?? null,
  })) as RelatedProjectItem[];
}

export async function getProjectAdjacent(order: number) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((project) => project.order === order);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
  return [prev ? { title: prev.title, slug: prev.slug } : null, next ? { title: next.title, slug: next.slug } : null] as [AdjacentItem | null, AdjacentItem | null];
}

export async function getProjectMetaBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return null;
  return { title: project.title, shortDescription: project.shortDescription } as ProjectMeta;
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  return newsArticles.find((article) => article.slug === slug) ?? null;
}

export async function getNewsList() {
  return newsArticles;
}
