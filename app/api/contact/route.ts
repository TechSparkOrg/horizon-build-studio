import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, message: "Validation failed", fieldErrors },
        { status: 400 },
      );
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

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
