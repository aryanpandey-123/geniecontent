// app/api/user/change-password/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { otpSessionToken, newPassword } = body || {};
    if (!otpSessionToken || !newPassword) return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });

    let decoded: any;
    try {
      decoded = jwt.verify(otpSessionToken, process.env.NEXTAUTH_SECRET!);
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid or expired token" }, { status: 401 });
    }

    if (!decoded || decoded.purpose !== "otp-session" || !decoded.id) {
      return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({
      password: hashed,
      // clear otp fields just in case
      otp: null,
      otpExpires: null,
    }).where(eq(users.id, userId));

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("change-password error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
