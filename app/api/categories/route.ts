import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/db";
import { requireAuth } from "@/lib/auth/guards";
import { revalidateTag } from "next/cache";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const slug = body.slug || toSlug(body.name);
    const category = await prisma.category.create({
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
