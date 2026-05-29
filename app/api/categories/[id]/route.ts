import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/db";
import { requireAuth } from "@/lib/auth/guards";
import { revalidateTag } from "next/cache";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const slug = body.slug || (body.name ? toSlug(body.name) : undefined);
    const category = await prisma.category.update({
      where: { id },
      data: { name: body.name, slug, parentId: body.parentId || null },
    });
    revalidateTag("categories", "max");
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAuth();
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    revalidateTag("categories", "max");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 },
    );
  }
}
