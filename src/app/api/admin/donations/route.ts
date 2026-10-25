import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { isAdminAuthorized } from "@/lib/cms";

const VALID_STATUSES = new Set(["pending", "confirmed", "completed"]);

export async function GET() {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db.select().from(donations).orderBy(desc(donations.id)).limit(300);
    return NextResponse.json({ donations: rows });
  } catch (err) {
    console.error("Failed to list donations", err);
    return NextResponse.json({ error: "Could not load donation records." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const donorName = String(body.donorName || "").trim().slice(0, 200);
  const email = String(body.email || "offline@ffpak.org").trim().slice(0, 300);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const currency = String(body.currency || "PKR").trim().toUpperCase().slice(0, 3);
  const purpose = String(body.purpose || "Where it is needed most").trim().slice(0, 160);
  const frequency = body.frequency === "monthly" ? "monthly" : "once";
  const paymentMethod = String(body.paymentMethod || "bank_transfer").trim().slice(0, 40);
  const bankAccountLabel = String(body.bankAccountLabel || "").trim().slice(0, 220);
  const transactionRef = String(body.transactionRef || "").trim().slice(0, 160);
  const status = VALID_STATUSES.has(String(body.status)) ? String(body.status) : "confirmed";
  const message = String(body.message || "").trim().slice(0, 2000);
  const amount = Math.round(Number(body.amount));

  if (!donorName || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Please provide donor name and valid amount." }, { status: 400 });
  }

  try {
    const [created] = await db
      .insert(donations)
      .values({
        donorName,
        email,
        phone: phone || null,
        amount,
        currency,
        purpose,
        frequency,
        paymentMethod,
        bankAccountLabel: bankAccountLabel || null,
        transactionRef: transactionRef || null,
        status,
        message: message || null,
      })
      .returning();

    return NextResponse.json({ ok: true, donation: created }, { status: 201 });
  } catch (err) {
    console.error("Failed to record offline donation", err);
    return NextResponse.json({ error: "Could not save donation." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: number; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const id = Number(body.id);
  const status = String(body.status || "");
  if (!Number.isInteger(id) || id <= 0 || !VALID_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid donation ID or status." }, { status: 400 });
  }

  await db.update(donations).set({ status }).where(eq(donations.id, id));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  await db.delete(donations).where(eq(donations.id, id));
  return NextResponse.json({ ok: true });
}
