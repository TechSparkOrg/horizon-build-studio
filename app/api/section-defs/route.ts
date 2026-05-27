import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const items = await prisma.sectionDef.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, label } = body;
    if (!slug || !label) return NextResponse.json({ error: "Slug and label are required" }, { status: 400 });
    const max = await prisma.sectionDef.findFirst({ orderBy: { order: "desc" }, select: { order: true } });
    const item = await prisma.sectionDef.create({ data: { slug, label, order: (max?.order ?? -1) + 1 } });
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    return NextResponse.json({ error: "Failed to create section" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.sectionDef.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
}
