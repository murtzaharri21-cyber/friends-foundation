import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(body.name, 200);
  const email = text(body.email, 300);
  const phone = text(body.phone, 40);
  const topic = text(body.topic, 120) || "General enquiry";
  const message = text(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email address and message." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await db.insert(contacts).values({
      name,
      email,
      subject: topic,
      message: phone ? `${message}\n\nPhone: ${phone}` : message,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save contact message", err);
    return NextResponse.json({ error: "We couldn’t save your message just now." }, { status: 500 });
  }
}
