// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";                      
import { users } from "@/db/schema/user";      
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, password, name } = body || {};

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required" }, { status: 400 });
    }
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid input types" }, { status: 400 });
    }
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      name: name ?? null,
      password: hashed,
    });

    return NextResponse.json({ ok: true, message: "Account created" }, { status: 201 });
  } catch (err: any) {
    console.error("signup route error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
