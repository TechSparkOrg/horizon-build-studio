import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (slug) {
    const banner = await prisma.pageBanner.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(banner);
  }
  const banners = await prisma.pageBanner.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(banners);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, metaTitle, metaDescription, metaKeywords, customScript, images } = body;

    if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

    const data = { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" };
    let banner: any;
    if (id) {
      banner = await prisma.pageBanner.update({ where: { id }, data });
    } else {
      banner = await prisma.pageBanner.upsert({ where: { slug }, update: data, create: data });
    }

    if (images && Array.isArray(images)) {
      await prisma.pageBannerImage.deleteMany({ where: { bannerId: banner.id } });

      if (images.length > 0) {
        await prisma.pageBannerImage.createMany({
          data: images.map((img: any, idx: number) => ({
            bannerId: banner.id,
            image: img.image,
            alt: img.alt ?? "",
            order: idx,
          })),
        });
      }

      banner = await prisma.pageBanner.findUnique({
        where: { id: banner.id },
        include: { images: { orderBy: { order: "asc" } } },
      });
    }

    revalidatePath("/");
    return NextResponse.json(banner);
  } catch (error) {
    console.error("Failed to save page banner:", error);
    return NextResponse.json({ error: "Failed to save page banner" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.pageBanner.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete page banner" }, { status: 500 });
  }
}
