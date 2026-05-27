import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (slug) {
    const model = await prisma.pageModel.findUnique({
      where: { slug },
      include: { models3d: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(model);
  }
  const models = await prisma.pageModel.findMany({
    orderBy: { createdAt: "desc" },
    include: { models3d: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(models);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, metaTitle, metaDescription, metaKeywords, customScript, models3d } = body;
    if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

    const data = { slug, title: title ?? "", metaTitle: metaTitle ?? "", metaDescription: metaDescription ?? "", metaKeywords: metaKeywords ?? "", customScript: customScript ?? "" };
    let group: any;
    if (id) {
      group = await prisma.pageModel.update({ where: { id }, data });
    } else {
      group = await prisma.pageModel.upsert({ where: { slug }, update: data, create: data });
    }

    if (models3d && Array.isArray(models3d)) {
      await prisma.pageModel3D.deleteMany({ where: { modelId: group.id } });

      if (models3d.length > 0) {
        await prisma.pageModel3D.createMany({
          data: models3d.map((m: any, idx: number) => ({
            modelId: group.id,
            url: m.url,
            filename: m.filename ?? "",
            type: m.type ?? "glb",
            label: m.label ?? "",
            order: idx,
          })),
        });
      }

      group = await prisma.pageModel.findUnique({
        where: { id: group.id },
        include: { models3d: { orderBy: { order: "asc" } } },
      });
    }

    revalidatePath("/");
    return NextResponse.json(group);
  } catch (error) {
    console.error("Failed to save page model:", error);
    return NextResponse.json({ error: "Failed to save page model" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.pageModel.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete page model" }, { status: 500 });
  }
}
