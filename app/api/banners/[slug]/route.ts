import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const banner = await prisma.pageBanner.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!banner) {
    return NextResponse.json({ images: [] });
  }

  return NextResponse.json({
    images: banner.images.map((img) => ({
      image: img.image,
      alt: img.alt,
    })),
  });
}
