import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  service: z.string().min(1, "Select a service"),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10+ chars)")
    .max(1000),
  date: z.string().min(1, "Choose a date"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
