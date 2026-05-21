import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const subdir = (formData.get("subdir") as string) || "projects";

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const result = await uploadFile(file, subdir);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
