import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { uploadedMedia } from "@/db/schema";
import { desc } from "drizzle-orm";
import { isAdminAuthorized } from "@/lib/cms";
import { appealPhotos, galleryPhotos, img } from "@/lib/content";
import { saveMedia } from "@/lib/media-storage";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function GET() {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const uploaded = await db
      .select({
        id: uploadedMedia.id,
        filename: uploadedMedia.filename,
        createdAt: uploadedMedia.createdAt,
      })
      .from(uploadedMedia)
      .orderBy(desc(uploadedMedia.id))
      .limit(60);

    const library = [
      ...uploaded.map((u) => ({
        url: `/api/media/${u.id}`,
        label: `Uploaded: ${u.filename}`,
        group: "Uploaded",
      })),
      ...appealPhotos.map((p) => ({
        url: p.src,
        label: `${p.place} — ${p.caption.slice(0, 42)}`,
        group: "Pakistan Appeal",
      })),
      ...galleryPhotos.slice(0, 20).map((g) => ({
        url: img(g.src),
        label: g.caption,
        group: "Field Archive",
      })),
    ];

    return NextResponse.json({ library });
  } catch (err) {
    console.error("Failed to list media library", err);
    return NextResponse.json({ library: [] });
  }
}

export async function POST(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please choose an image file to upload." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Please upload a JPG, PNG, WebP, GIF or SVG image." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be smaller than 8 MB." }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const storagePath = await saveMedia(buf, file.name);
    const [inserted] = await db
      .insert(uploadedMedia)
      .values({
        filename: file.name.slice(0, 240) || "upload.jpg",
        mimeType: file.type,
        storagePath,
      })
      .returning({ id: uploadedMedia.id, filename: uploadedMedia.filename });

    return NextResponse.json(
      { ok: true, id: inserted.id, filename: inserted.filename, url: `/api/media/${inserted.id}` },
      { status: 201 },
    );
  } catch (err) {
    console.error("Failed to store uploaded file", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
