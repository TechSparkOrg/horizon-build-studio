import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import { sendContactEmail } from "@/lib/email/email";
import { contactSchema } from "@/lib/schemas/contact";
import type { ContactItem, PaginatedResult } from "@/lib/services/types/shared.types";

export async function submit(body: unknown) {
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    throw new Error(JSON.stringify(fieldErrors));
  }

  const data = parsed.data;
  await prisma.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: data.service,
      description: data.description,
      preferredDate: data.date,
    },
  });

  await sendContactEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    serviceType: data.service,
    description: data.description,
    preferredDate: data.date,
  });

  return { success: true, message: "Thank you! We'll contact you within 24 hours." };
}

export function getAll(page = 1, limit = 100): Promise<PaginatedResult<ContactItem>> {
  return dbQuery(async () => {
    const skip = page > 1 ? (page - 1) * limit : 0;
    const [items, total] = await Promise.all([
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.contactSubmission.count(),
    ]);
    return { items: items as ContactItem[], total, page, limit };
  });
}

export function getById(id: string) {
  return dbQuery(() => prisma.contactSubmission.findUnique({ where: { id } }));
}

export function updateStatus(id: string, status: string) {
  return dbMutate(() =>
    prisma.contactSubmission.update({ where: { id }, data: { status } }),
  );
}
