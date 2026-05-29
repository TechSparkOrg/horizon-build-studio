import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.string().email().optional(),
  SITE_URL: z.string().optional(),
});

let _env: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (!_env) {
    _env = envSchema.parse({
      DATABASE_URL: process.env["DATABASE_URL"],
      AUTH_SECRET: process.env["AUTH_SECRET"],
      RESEND_API_KEY: process.env["RESEND_API_KEY"],
      CONTACT_EMAIL_TO: process.env["CONTACT_EMAIL_TO"],
      SITE_URL: process.env["SITE_URL"] ?? process.env["NEXT_PUBLIC_SITE_URL"],
    });
  }
  return _env;
}
