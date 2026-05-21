import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const items = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
    include: { faqType: { select: { id: true, name: true, slug: true } } },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await prisma.fAQ.create({ data: body });
    revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
