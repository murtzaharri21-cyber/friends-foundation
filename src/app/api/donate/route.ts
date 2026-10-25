import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donations } from "@/db/schema";
import { getDatabaseFailure } from "@/lib/database-error-response";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS: Record<string, { min: number; max: number }> = {
  PKR: { min: 100, max: 100_000_000 },
  USD: { min: 5, max: 1_000_000 },
  GBP: { min: 5, max: 1_000_000 },
  EUR: { min: 5, max: 1_000_000 },
};

const METHODS = new Set(["bank_transfer", "mobile_wallet", "online_gateway", "pledge_later"]);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const donorName = text(body.donorName, 200);
  const email = text(body.email, 300);
  const phone = text(body.phone, 40);
  const country = text(body.country, 100);
  const city = text(body.city, 100);
  const senderAccountNumber = text(body.senderAccountNumber, 100);
  const purpose = text(body.purpose, 160);
  const note = text(body.message, 2000);
  const currency = text(body.currency, 3).toUpperCase() || "PKR";
  const frequency = text(body.frequency, 20) === "monthly" ? "monthly" : "once";
  const rawMethod = text(body.paymentMethod, 40);
  const paymentMethod = METHODS.has(rawMethod) ? rawMethod : "bank_transfer";
  const bankAccountLabel = text(body.bankAccountLabel, 220);
  const transactionRef = text(body.transactionRef, 160);
  const receiptUrl = text(body.receiptUrl, 500);
  const amount = Math.round(Number(body.amount));

  if (!donorName || !email) {
    return NextResponse.json({ error: "Please enter your name and email address." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!phone || !country || !city || !senderAccountNumber || !transactionRef) {
    return NextResponse.json(
      { error: "Please provide your phone, country, city, sending account number and transaction reference." },
      { status: 400 },
    );
  }
  const limit = LIMITS[currency];
  if (!limit) {
    return NextResponse.json({ error: "Please choose PKR, USD, GBP or EUR." }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount < limit.min || amount > limit.max) {
    return NextResponse.json(
      { error: `Please enter an amount between ${limit.min.toLocaleString()} and ${limit.max.toLocaleString()} ${currency}.` },
      { status: 400 },
    );
  }

  try {
    const [created] = await db
      .insert(donations)
      .values({
        donorName,
        email,
        phone,
        country,
        city,
        senderAccountNumber,
        amount,
        currency,
        purpose: purpose || null,
        frequency,
        paymentMethod,
        bankAccountLabel: bankAccountLabel || null,
        transactionRef: transactionRef || null,
        receiptUrl: receiptUrl || null,
        status: "pending",
        message: note || null,
      })
      .returning({ id: donations.id });

    return NextResponse.json(
      { ok: true, id: created.id, referenceCode: `FFP-${String(created.id).padStart(5, "0")}` },
      { status: 201 },
    );
  } catch (err) {
    console.error("Failed to save donation record", err);
    const failure = getDatabaseFailure(
      err,
      "We couldn’t record your donation just now. Please call or email us.",
    );
    return NextResponse.json(
      { error: failure.message },
      { status: failure.status },
    );
  }
}
