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
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleGetOtp = () => {

        let valid = true;
        if (!email) {
            setEmailError("Email is required");
            valid = false;
            return;
        } else if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            valid = false;
            return;
        } else {
            setEmailError("");
        }
        setStep(2);
    };

    const handleVerifyOtp = () => {
        let otp_present = true;
        if (!otp) {
            setOtpError("OTP is required");
            otp_present = false;
            return;
        } else {
            setOtpError("");
        }
        if (otp_present) {
            router.push("/auth/changepassword");
        }
    };

    const handleWrongEmail = () => {
        setStep(1);
        setOtp("");
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
