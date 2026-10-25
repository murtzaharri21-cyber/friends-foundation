import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { uploadedMedia } from "@/db/schema";
import { getDatabaseFailure } from "@/lib/database-error-response";

const ALLOWED_RECEIPT_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const MAX_RECEIPT_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please select a payment screenshot or slip image." }, { status: 400 });
    }
    if (!ALLOWED_RECEIPT_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Please upload a JPG, PNG or WebP screenshot." }, { status: 400 });
    }
    if (file.size > MAX_RECEIPT_BYTES) {
      return NextResponse.json({ error: "Receipt image must be smaller than 5 MB." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const [inserted] = await db
      .insert(uploadedMedia)
      .values({
        filename: `receipt-${file.name.slice(0, 200) || "slip.jpg"}`,
        mimeType: file.type,
        dataBase64: bytes.toString("base64"),
      })
      .returning({ id: uploadedMedia.id, filename: uploadedMedia.filename });

    return NextResponse.json(
      { ok: true, id: inserted.id, url: `/api/media/${inserted.id}` },
      { status: 201 },
    );
  } catch (err) {
    console.error("Failed to upload donor receipt", err);
    const failure = getDatabaseFailure(err, "Could not upload receipt image. Please try again.");
    return NextResponse.json({ error: failure.message }, { status: failure.status });
  }
}
