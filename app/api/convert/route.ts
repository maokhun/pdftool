import { NextResponse } from "next/server";
import { getFiles } from "@/lib/storage";
import { convertFiles, validateFiles, type ConvertAction } from "@/lib/converters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const action = (body?.action as ConvertAction) ?? "compress";
  const ids = Array.isArray(body?.ids)
    ? body.ids.filter((id: unknown) => typeof id === "string")
    : typeof body?.id === "string"
      ? [body.id]
      : [];
  const options = body?.options ?? {};

  if (!ids.length) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  const files = await getFiles(ids);
  if (!files) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const validationError = validateFiles(action, files);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const converted = await convertFiles(action, files, options);
    return NextResponse.json({
      id: converted.id,
      filename: converted.filename,
      size: converted.size,
      mime: converted.mime
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Conversion failed" },
      { status: 500 }
    );
  }
}
