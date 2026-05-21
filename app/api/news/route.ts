import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const items = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug =
      body.slug ??
      body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    const item = await prisma.newsArticle.create({ data: { ...body, slug } });
    revalidatePath("/");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create news article" }, { status: 500 });
  }
}
