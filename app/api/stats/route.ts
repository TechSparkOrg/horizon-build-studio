import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [projectCount, teamCount, testimonialCount, contactCount] = await Promise.all([
    prisma.project.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count(),
  ]);

  const recentContacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return NextResponse.json({ projectCount, teamCount, testimonialCount, contactCount, recentContacts });
}
