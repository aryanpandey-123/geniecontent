// This the forgot password page.

'use client';

import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otpError, setOtpError] = useState("");
    const router = useRouter();

    const handleGetOtp = async () => {
  if (!email) { setEmailError("Email is required"); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Enter a valid email"); return; }
  setEmailError("");

  try {
    const res = await fetch("/api/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }

    if (res.ok && data?.ok) {
      setStep(2);
    } else {
      alert(data?.error || "Failed to send OTP");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};



    const handleVerifyOtp = async () => {
  if (!otp) { setOtpError("OTP is required"); return; }
  setOtpError("");

  try {
    const res = await fetch("/api/user/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }

    if (res.ok && data?.ok && data?.otpSessionToken) {
      // pass token to change-password page via query param (safer to store in session/localStorage briefly)
      // we'll redirect with token in query (short-lived)
      router.push(`/auth/changepassword?token=${encodeURIComponent(data.otpSessionToken)}&email=${encodeURIComponent(email)}`);
    } else {
      alert(data?.error || "Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};



    const handleWrongEmail = () => {
        setStep(1);
        setOtp("");
        setOtpError("");
        setEmailError("");
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8 font-sans">
            <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-6xl w-full text-center">
                <nav className="flex items-center justify-between mb-12">
                    <div className="flex-1 flex justify-center md:justify-start space-x-2">
                        <Link href="/">
                            <div className="text-3xl font-bold text-gray-800 ">Genie Content</div>
                        </Link>
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="flex-1 space-y-6 max-w-xl mx-auto">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            Forgot Password?
                        </h2>
                        <h3 className="text-s lg:text-s text-gray-900 leading-tight">
                            Enter your email to get an OTP for password reset.
                        </h3>
                    </div>
                    <div className="mb-4">
                        <div className='relative'>
                            <input
                                id="email"
                                name='email'
                                type="email"
                                placeholder='Email'
                                autoComplete="email"
                                value={email}
                                disabled={step === 2}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {emailError &&
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {emailError}
                                </div>
                            }
                        </div>
                    </div>

                    {step === 1 ? (
                        <button
                            type='button'
                            onClick={handleGetOtp}
                            className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 border-2 border-blue-600 inline-block text-center"
                        >
                            Get OTP
                        </button>
                    ) : (
                        <>
                            <div className="mb-4">
                                <div className='relative'>
                                    <input
                                        id="otp"
                                        name='otp'
                                        type="text"
                                        placeholder='OTP'
                                        autoComplete="one-time-code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                                    />
                                    {otpError &&
                                        <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                            {otpError}
                                        </div>
                                    }
                                </div>
                            </div>
                            <button
                                onClick={handleVerifyOtp}
                                className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 border-2 border-blue-600 inline-block text-center mb-3"
                            >
                                Verify OTP
                            </button>
                            <div className="text-gray-500 text-sm mt-0 leading-none">
                                Entered the wrong Email? {' '}
                                <button
                                    onClick={handleWrongEmail}
                                    className="text-blue-600 text-sm mt-0  hover:underline"
                                >
                                    click here!
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
