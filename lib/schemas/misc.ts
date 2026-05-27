import { z } from "zod";

export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatar: z.string().nullable(),
  rating: z.number(),
  order: z.number(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  order: z.number(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const ContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  service: z.string(),
  description: z.string(),
  date: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export type Contact = z.infer<typeof ContactSchema>;

export const SettingSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

export type Setting = z.infer<typeof SettingSchema>;

export const DashboardCountsSchema = z.object({
  projects: z.number(),
  news: z.number(),
  faqs: z.number(),
  testimonials: z.number(),
  team: z.number(),
  contacts: z.number(),
  categories: z.number(),
});

export type DashboardCounts = z.infer<typeof DashboardCountsSchema>;
