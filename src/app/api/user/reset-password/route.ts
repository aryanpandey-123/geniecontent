// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, token, password } = await req.json();
    if (!email || !token || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const res = await db.select().from(users).where(and(eq(users.email, email), eq(users.resetToken, token)));
    if (!res.length) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    const user = res[0];
    if (!user.resetTokenExpires || new Date(user.resetTokenExpires) < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.update(users).set({
      password: hashed,
      resetToken: null,
      resetTokenExpires: null,
    }).where(eq(users.id, user.id));

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
