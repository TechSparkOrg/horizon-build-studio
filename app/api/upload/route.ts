import { NextRequest, NextResponse } from "next/server";
import { tryAuth } from "@/lib/auth/guards";
import { uploadFile } from "@/lib/storage/upload";

export async function POST(request: NextRequest) {
  const user = await tryAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const subdir = (formData.get("subdir") as string) || "projects";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const result = await uploadFile(file, subdir);
  return NextResponse.json(result);
}
