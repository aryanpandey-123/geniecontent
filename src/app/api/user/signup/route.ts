// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";                      // your drizzle db import
import { users } from "@/db/schema/user";      // adjust path if needed
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1) parse JSON safely
    let body: any;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, password, name } = body || {};

    // 2) validate inputs
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required" }, { status: 400 });
    }
    // optional: validate email pattern, password length etc.
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid input types" }, { status: 400 });
    }

    // 3) check existing user
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    // 4) hash password and insert
    const hashed = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      name: name ?? null,
      password: hashed,
    });

    return NextResponse.json({ ok: true, message: "Account created" }, { status: 201 });
  } catch (err: any) {
    console.error("signup route error:", err);
    // 5) catch-all error -> always JSON
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
