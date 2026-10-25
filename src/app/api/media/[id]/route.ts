import { NextResponse } from "next/server";
import { db } from "@/db";
import { uploadedMedia } from "@/db/schema";
import { eq } from "drizzle-orm";
import { readMedia } from "@/lib/media-storage";
import { isAdminAuthorized } from "@/lib/cms";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid media ID." }, { status: 400 });
  }

  try {
    const rows = await db.select().from(uploadedMedia).where(eq(uploadedMedia.id, numericId));
    const item = rows[0];
    if (!item) {
      return NextResponse.json({ error: "Media not found." }, { status: 404 });
    }
    const isReceipt = item.filename.startsWith("receipt-");
    if (isReceipt) {
      const auth = await isAdminAuthorized();
      if (!auth.authorized) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
      }
    }
    const bytes = item.storagePath
      ? await readMedia(item.storagePath)
      : item.dataBase64
        ? Buffer.from(item.dataBase64, "base64")
        : null;
    if (!bytes) {
      return NextResponse.json({ error: "Media file is missing." }, { status: 404 });
    }
    const body = new Uint8Array(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": item.mimeType || "image/jpeg",
        "Content-Length": String(body.byteLength),
        "Cache-Control": isReceipt ? "private, no-store" : "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Failed to serve uploaded media", err);
    return NextResponse.json({ error: "Unable to read media." }, { status: 500 });
  }
}
