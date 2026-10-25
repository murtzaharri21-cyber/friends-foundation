import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteCms } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_PASSWORD_DB_KEY,
  computeSessionCookieValue,
  getAdminPasscode,
  isAdminAuthorized,
} from "@/lib/cms";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const action = String(body.action || "login");

  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(ADMIN_COOKIE_NAME);
    return res;
  }

  if (action === "login") {
    const passcode = await getAdminPasscode();
    if (!passcode) {
      return NextResponse.json({ ok: true });
    }
    const provided = typeof body.passcode === "string" ? body.passcode.trim() : "";
    if (!provided || provided !== passcode) {
      return NextResponse.json({ error: "Incorrect admin passcode." }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, computeSessionCookieValue(passcode), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    return res;
  }

  if (action === "set-passcode") {
    const auth = await isAdminAuthorized();
    if (!auth.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0) {
      return NextResponse.json(
        { error: "Passcode is managed via the ADMIN_PASSWORD environment variable." },
        { status: 400 },
      );
    }

    const newPasscode = typeof body.newPasscode === "string" ? body.newPasscode.trim() : "";
    if (!newPasscode) {
      await db.delete(siteCms).where(eq(siteCms.key, ADMIN_PASSWORD_DB_KEY));
      const res = NextResponse.json({ ok: true, passwordEnabled: false });
      res.cookies.delete(ADMIN_COOKIE_NAME);
      return res;
    }

    if (newPasscode.length < 4) {
      return NextResponse.json({ error: "Passcode must be at least 4 characters." }, { status: 400 });
    }

    const encoded = JSON.stringify(newPasscode);
    await db
      .insert(siteCms)
      .values({ key: ADMIN_PASSWORD_DB_KEY, value: encoded, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteCms.key,
        set: { value: encoded, updatedAt: new Date() },
      });

    const res = NextResponse.json({ ok: true, passwordEnabled: true });
    res.cookies.set(ADMIN_COOKIE_NAME, computeSessionCookieValue(newPasscode), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    return res;
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
