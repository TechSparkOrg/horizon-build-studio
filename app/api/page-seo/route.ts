import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (slug) {
    const item = await prisma.pageSEO.findUnique({ where: { slug } });
    return NextResponse.json(item);
  }
  const items = await prisma.pageSEO.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, text1En, text1Np, text2En, text2Np, metaTitle, metaDescription, metaKeywords, ogImage, customScript } = body;
    if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

    let item;
    if (id) {
      item = await prisma.pageSEO.update({
        where: { id },
        data: { slug, title: title ?? "", text1En: text1En ?? "", text1Np: text1Np ?? "", text2En: text2En ?? "", text2Np: text2Np ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", ogImage: ogImage ?? "", customScript: customScript ?? "" },
      });
    } else {
      item = await prisma.pageSEO.upsert({
        where: { slug },
        update: { title: title ?? "", text1En: text1En ?? "", text1Np: text1Np ?? "", text2En: text2En ?? "", text2Np: text2Np ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", ogImage: ogImage ?? "", customScript: customScript ?? "" },
        create: { slug, title: title ?? "", text1En: text1En ?? "", text1Np: text1Np ?? "", text2En: text2En ?? "", text2Np: text2Np ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", ogImage: ogImage ?? "", customScript: customScript ?? "" },
      });
    }

    revalidatePath("/");
    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to save page SEO:", error);
    return NextResponse.json({ error: "Failed to save page SEO" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.pageSEO.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete page SEO" }, { status: 500 });
  }
}
