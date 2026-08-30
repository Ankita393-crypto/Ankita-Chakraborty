import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSessionUser } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const user = await getSessionUser();
  if (!user || !user.is_admin) return new NextResponse("Forbidden", { status: 403 });

  const { filename } = await params;
  // Prevent path traversal: only allow the exact generated filename pattern.
  if (!/^id-\d+-[a-f0-9]{12}\.(jpg|png|pdf)$/.test(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const filePath = path.join(process.cwd(), "data", "uploads", filename);
  if (!fs.existsSync(filePath)) return new NextResponse("Not found", { status: 404 });

  const buf = fs.readFileSync(filePath);
  const type = filename.endsWith(".pdf")
    ? "application/pdf"
    : filename.endsWith(".png")
      ? "image/png"
      : "image/jpeg";
  return new NextResponse(new Uint8Array(buf), { headers: { "Content-Type": type } });
}
