import { NextResponse } from "next/server";
import { saveTempFiles } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("file").filter((item) => item instanceof File) as File[];

  if (!files.length) {
    return NextResponse.json(
      { error: "Missing file" },
      { status: 400 }
    );
  }

  const stored = await saveTempFiles(files);

  return NextResponse.json({
    items: stored.map((file) => ({
      id: file.id,
      filename: file.filename,
      size: file.size,
      mime: file.mime
    }))
  });
}
