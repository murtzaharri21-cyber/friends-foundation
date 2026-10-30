import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { siteCms } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { CMS_KEYS, DEFAULT_CMS_STATE, getSiteCms, isAdminAuthorized, type CmsSectionKey } from "@/lib/cms";

export async function GET() {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const state = await getSiteCms();
  return NextResponse.json({
    state,
    defaults: DEFAULT_CMS_STATE,
    adminUsername: auth.username,
  });
}

export async function PUT(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { section?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const section = body.section as CmsSectionKey | undefined;
  if (!section || !CMS_KEYS.includes(section)) {
    return NextResponse.json({ error: "Invalid CMS section." }, { status: 400 });
  }
  if (body.data === undefined || body.data === null) {
    return NextResponse.json({ error: "Missing section data." }, { status: 400 });
  }

  if (section === "donationWhatsappNumber") {
    if (typeof body.data !== "string") {
      return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
    }
    const rawNumber = body.data.trim();
    if (rawNumber && !/^\+?[\d\s().-]+$/.test(rawNumber)) {
      return NextResponse.json({ error: "Use digits, a country code, and optional phone-number separators only." }, { status: 400 });
    }
    const normalizedNumber = rawNumber.replace(/\D/g, "");
    if (normalizedNumber && !/^\d{7,15}$/.test(normalizedNumber)) {
      return NextResponse.json({ error: "WhatsApp numbers must contain 7 to 15 digits, including the country code." }, { status: 400 });
    }
    body.data = normalizedNumber;
  }

  try {
    const serialized = JSON.stringify(body.data);
    await db
      .insert(siteCms)
      .values({ key: section, value: serialized, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteCms.key,
        set: { value: serialized, updatedAt: new Date() },
      });

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save CMS section", err);
    return NextResponse.json({ error: "Could not save changes to database." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = req.nextUrl.searchParams.get("section");
  try {
    if (section === "all") {
      await db.delete(siteCms).where(inArray(siteCms.key, CMS_KEYS as string[]));
    } else if (section && (CMS_KEYS as string[]).includes(section)) {
      await db.delete(siteCms).where(eq(siteCms.key, section));
    } else {
      return NextResponse.json({ error: "Invalid section parameter." }, { status: 400 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reset CMS section", err);
    return NextResponse.json({ error: "Could not reset section." }, { status: 500 });
  }
}
