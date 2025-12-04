// app/api/user/verify-otp/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

const OTP_SESSION_TTL = 15 * 60; // seconds (15 minutes)

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { email, otp } = body || {};
    if (!email || !otp) return NextResponse.json({ ok: false, error: "Email and OTP required" }, { status: 400 });

    const res = await db.select().from(users).where(eq(users.email, email));
    if (!res.length) return NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 400 });

    const user = res[0];
    if (!user.otp || !user.otpExpires) return NextResponse.json({ ok: false, error: "No OTP found" }, { status: 400 });
    if (new Date(user.otpExpires) < new Date()) return NextResponse.json({ ok: false, error: "OTP expired" }, { status: 400 });

    if (String(user.otp) !== String(otp)) {
      return NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 400 });
    }

    // create short-lived token allowing password change (no other rights)
    const payload = { id: user.id, email: user.email, purpose: "otp-session" };
    const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { expiresIn: `${OTP_SESSION_TTL}s` });

    // optional: clear OTP in DB to prevent reuse (you can also keep until change)
    await db.update(users).set({ otp: null, otpExpires: null }).where(eq(users.id, user.id));

    return NextResponse.json({ ok: true, otpSessionToken: token });
  } catch (err: any) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
