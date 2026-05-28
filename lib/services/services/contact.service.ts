import { prisma } from "@/lib/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/schemas/contact";

export const contactService = {
  submit: async (body: any) => {
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
  },
  getAll: () =>
    dbQuery(() =>
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    ),
  getById: (id: string) =>
    dbQuery(() => prisma.contactSubmission.findUnique({ where: { id } })),
  updateStatus: (id: string, status: string) =>
    dbMutate(() =>
      prisma.contactSubmission.update({ where: { id }, data: { status } }),
    ),
};
