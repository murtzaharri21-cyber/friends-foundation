import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Receipt uploads are no longer supported. Please attach your receipt in WhatsApp." },
    { status: 410 },
  );
}
