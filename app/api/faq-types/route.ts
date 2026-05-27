import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function GET() {
  const items = await prisma.fAQType.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let slug = slugify(body.name);
    const existing = await prisma.fAQType.findUnique({ where: { slug } });
    if (existing) slug += `-${Date.now()}`;
    const item = await prisma.fAQType.create({ data: { name: body.name, slug, order: Number(body.order ?? 0) } });
    revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ type" }, { status: 500 });
  }
}
