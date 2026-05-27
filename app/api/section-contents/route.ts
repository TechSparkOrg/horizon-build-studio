import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");
  const where = section ? { section } : {};
  const items = await prisma.sectionContent.findMany({ where, orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      section: string;
      items: Array<{
        key: string;
        valueEn: string;
        valueNp: string;
        mediaUrl?: string | null;
        mediaType?: string | null;
        order?: number;
      }>;
    };

    await prisma.$transaction(
      body.items.map((item) =>
        prisma.sectionContent.upsert({
          where: { section_key: { section: body.section, key: item.key } },
          update: {
            valueEn: item.valueEn,
            valueNp: item.valueNp,
            mediaUrl: item.mediaUrl ?? null,
            mediaType: item.mediaType ?? null,
            order: item.order ?? 0,
          },
          create: {
            section: body.section,
            key: item.key,
            valueEn: item.valueEn,
            valueNp: item.valueNp,
            mediaUrl: item.mediaUrl ?? null,
            mediaType: item.mediaType ?? null,
            order: item.order ?? 0,
          },
        }),
      ),
    );

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update section content:", error);
    return NextResponse.json({ error: "Failed to update section content" }, { status: 500 });
  }
}
