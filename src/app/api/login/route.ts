import { db } from "@/db";
import { users } from "@/db/schema/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existing = await db.select().from(users).where(eq(users.email, email));

  if (!existing.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = existing[0];

  if (!user.password) {
    return NextResponse.json({ error: "User registered via Google" }, { status: 400 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ token });
}
