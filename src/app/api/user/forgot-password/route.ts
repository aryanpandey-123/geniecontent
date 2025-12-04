// app/api/user/forgot-password/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

const OTP_LENGTH = 6;
const OTP_TTL_MS = 15 * 60 * 1000; 

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const email = body?.email;
    if (!email) return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });

    const existing = await db.select().from(users).where(eq(users.email, email));
    if (!existing.length) {
      
      return NextResponse.json({ ok: true });
    }

    
    const otp = (Math.floor(Math.random() * Math.pow(10, OTP_LENGTH))).toString().padStart(OTP_LENGTH, "0");
    const expires = new Date(Date.now() + OTP_TTL_MS);

    await db.update(users).set({
      otp,
      otpExpires: expires,
    }).where(eq(users.id, existing[0].id));

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 2525),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Genie Content OTP",
      html: `
        <p>Hi,</p>
        <p>Your Genie Content password reset OTP is:</p>
        <h2 style="font-family: monospace; letter-spacing: 2px;">${otp}</h2>
        <p>This code will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mail);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("forgot-password error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
