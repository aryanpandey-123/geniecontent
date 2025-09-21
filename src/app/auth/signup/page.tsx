// This is signup page for the application.

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [showpassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = (e: React.FormEvent) => {
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

        if (!confirmpassword) {
            setConfirmPasswordError("Confirm Password is required");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (valid) {
            // router.push("/dashboard");
            alert("Sign Up Successfull!!")
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8 font-sans">
            <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-6xl w-full text-center">
                <nav className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex justify-center md:justify-start space-x-2">
                        <Link href="/">
                            <div className="text-3xl font-bold text-gray-800 ">Genie Content</div>
                        </Link>
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="flex-1 space-y-6 max-w-xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            Sign Up
                        </h2>
                    </div>
                    <form className='space-y-5'>
                        <div className='relative'>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Email'
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {emailError && 
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {emailError}
                                </div>
                            }
                        </div>
                        <div className='relative'>
                            <input
                                id="password"
                                name="password"
                                type={showpassword ? 'text' : 'password'}
                                placeholder='Password'
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {passwordError && 
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {passwordError}
                                </div>
                            }
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showpassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showpassword ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <div className='relative'>
                            <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                autoComplete="new-password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {confirmpasswordError && 
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {confirmpasswordError}
                                </div>
                            }
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </form>
                    <form onSubmit={handleLogin}>
                        <button
                            className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 border-2 border-blue-600 inline-block text-center"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-gray-500 text-sm mt-1">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-blue-600 hover:underline cursor-pointer font-medium">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}