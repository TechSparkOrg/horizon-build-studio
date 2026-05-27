import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (slug) {
    const page = await prisma.staticPage.findUnique({ where: { slug } });
    return NextResponse.json(page);
  }
  const pages = await prisma.staticPage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(pages);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, contentEn, contentNp, metaTitle, metaDescription, metaKeywords, customScript } = body;
    if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

    let page;
    const data = { slug, title: title ?? "", contentEn: contentEn ?? "", contentNp: contentNp ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" };
    if (id) {
      page = await prisma.staticPage.update({ where: { id }, data });
    } else {
      page = await prisma.staticPage.upsert({ where: { slug }, update: data, create: { ...data, slug: slug.trim() } });
    }

    revalidatePath("/");
    return NextResponse.json(page);
  } catch (error) {
    console.error("Failed to save static page:", error);
    return NextResponse.json({ error: "Failed to save static page" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.staticPage.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete static page" }, { status: 500 });
  }
}
