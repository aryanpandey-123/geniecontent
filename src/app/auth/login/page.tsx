'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;

        if (!email) {
            setEmailError("Email is required");
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) return;

        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                data = { error: text };
            }


            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                router.push("/dashboard");
            } else {
                alert(data?.error || "Login failed");
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8 font-sans">
            <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-6xl w-full text-center">
                <nav className="flex items-center justify-between mb-10">
                    <div className="flex-1 flex justify-center md:justify-start space-x-2">
                        <Link href="/">
                            <div className="text-3xl font-bold text-gray-800">Genie Content</div>
                        </Link>
                    </div>
                </nav>

                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="flex-1 space-y-6 max-w-xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            Welcome Back
                        </h2>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {emailError && (
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {emailError}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {passwordError && (
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {passwordError}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 border-2 border-blue-600 inline-block text-center"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 w-full max-w-md mt-4">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center gap-3 w-full max-w-md bg-white border border-gray-300 text-gray-700 py-2.5 rounded-full shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-[1.02]"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google Icon"
                            className="h-5 w-5"
                        />
                        Continue with Google
                    </button>

                    <p className="text-gray-500 text-sm mt-0 leading-none">
                        <Link href="/auth/forgotpassword" className="text-blue-600 hover:underline cursor-pointer font-medium">
                            Forgot Password?
                        </Link>
                    </p>

                    <p className="text-gray-500 text-sm mt-0 leading-none">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-blue-600 hover:underline cursor-pointer font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
