import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const item = await prisma.newsArticle.findUnique({
      where: { slug },
      include: {
        project: {
          select: {
            id: true, title: true, slug: true, status: true, location: true, img: true, alt: true, completion: true,
            models3d: { select: { id: true, url: true, filename: true } },
            videos: { select: { id: true, platform: true, embedUrl: true, fileUrl: true, fileType: true, title: true } },
          },
        },
      },
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  const items = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
    include: { project: { select: { id: true, title: true, slug: true } } },
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
