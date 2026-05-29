import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const pageModel = await prisma.pageModel.findUnique({
    where: { slug },
    include: { models3d: { orderBy: { order: "asc" } } },
  });

  if (!pageModel) {
    return NextResponse.json({ models3d: [] });
  }

  return NextResponse.json({ models3d: pageModel.models3d });
}
