import { promises as fs } from "fs";
import { getFileMeta } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const stored = await getFileMeta(params.id);
  if (!stored) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await fs.readFile(stored.path);
  return new Response(buffer, {
    headers: {
      "Content-Type": stored.mime,
      "Content-Disposition": `attachment; filename="${stored.filename}"`
    }
  });
}
