import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  computeSessionCookieValue,
  disableAdminCredential,
  getAdminCredentialState,
  hashAdminPassword,
  isAdminAuthorized,
  storeAdminCredential,
  verifyAdminCredentials,
} from "@/lib/cms";

const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

function setSessionCookie(response: NextResponse, username: string, passwordHash: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, computeSessionCookieValue(username, passwordHash), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const action = String(body.action || "login");

  if (action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  }

  if (action === "login") {
    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";
    const result = await verifyAdminCredentials(username, password);
    if (!result.valid || !result.credential) {
      return NextResponse.json(
        { error: "Invalid administrator ID or password." },
        { status: 401 },
      );
    }

    if (result.legacy) {
      await storeAdminCredential(result.credential);
    }
    const response = NextResponse.json({ ok: true });
    setSessionCookie(response, result.credential.username, result.credential.passwordHash);
    return response;
  }

  const auth = await isAdminAuthorized();
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (action === "update-credentials") {
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!/^[a-zA-Z0-9._-]{3,64}$/.test(username)) {
      return NextResponse.json(
        { error: "Admin ID must be 3–64 characters using letters, numbers, dots, underscores or hyphens." },
        { status: 400 },
      );
    }
    if (password && password.length < 12) {
      return NextResponse.json({ error: "Use a password with at least 12 characters." }, { status: 400 });
    }

    const { credential } = await getAdminCredentialState();
    if (!credential) {
      return NextResponse.json({ error: "No active admin account is available to update." }, { status: 409 });
    }

    const updated = password
      ? await hashAdminPassword(username, password)
      : { ...credential, username, disabled: false };
    try {
      await storeAdminCredential(updated);
    } catch (error) {
      console.error("Failed to update admin credentials", error);
      return NextResponse.json({ error: "Could not save admin credentials." }, { status: 500 });
    }

    const response = NextResponse.json({ ok: true, username: updated.username });
    setSessionCookie(response, updated.username, updated.passwordHash);
    return response;
  }

  if (action === "remove-account") {
    try {
      await disableAdminCredential();
    } catch (error) {
      console.error("Failed to remove admin account", error);
      return NextResponse.json({ error: "Could not remove the admin account." }, { status: 500 });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
