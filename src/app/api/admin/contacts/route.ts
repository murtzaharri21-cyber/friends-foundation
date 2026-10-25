import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { isAdminAuthorized } from "@/lib/cms";

const VALID_STATUSES = new Set(["unread", "read", "resolved"]);

export async function GET() {
  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db.select().from(contacts).orderBy(desc(contacts.id)).limit(300);
    return NextResponse.json({ contacts: rows });
  } catch (err) {
    console.error("Failed to list contacts", err);
    return NextResponse.json({ contacts: [] });
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
    return NextResponse.json({ error: "Invalid contact ID or status." }, { status: 400 });
  }

  await db.update(contacts).set({ status }).where(eq(contacts.id, id));
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

  await db.delete(contacts).where(eq(contacts.id, id));
  return NextResponse.json({ ok: true });
}
