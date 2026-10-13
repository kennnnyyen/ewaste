import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !emailPattern.test(email) || !message || message.length > 4000) {
    return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  }

  // Replace this boundary with the chosen transactional email provider before launch.
  console.info("New enquiry received", { service: body?.service, company: body?.company });
  return NextResponse.json({ ok: true }, { status: 202 });
}
