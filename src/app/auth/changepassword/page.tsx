// This is the change password page.

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from "next/navigation";

export default function ChangePassword() {
    const [shownewpassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [newpasswordError, setNewPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const params = useSearchParams();
    const token = params.get("token");
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newpassword) { setNewPasswordError("New Password is required"); return; }
        if (!confirmpassword) { setConfirmPasswordError("Confirm Password is required"); return; }
        if (newpassword !== confirmpassword) { setConfirmPasswordError("Passwords do not match"); return; }

        if (!token) {
            alert("Missing token. Please restart the reset flow.");
            return;
        }

        try {
            const res = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otpSessionToken: token, newPassword: newpassword }),
            });
            const text = await res.text();
            let data;
            try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }

            if (res.ok && data?.ok) {
                setShowMessage(true);
                setTimeout(() => router.push("/auth/login"), 1500);
            } else {
                alert(data?.error || "Reset failed");
            }
        } catch (err) {
            console.error(err);
            alert("Network error");
        }
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
                            Change Password
                        </h2>
                    </div>
                    <form className='space-y-5'>
                        <div className='relative'>
                            <input
                                id="newpassword"
                                name="newpassword"
                                type={shownewpassword ? 'text' : 'password'}
                                placeholder='New Password'
                                autoComplete="new-password"
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-5 py-3 pr-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
                            />
                            {newpasswordError &&
                                <div className="absolute top-full left-0 mt-1 bg-white text-red-600 text-sm rounded-md px-3 py-1 shadow-lg z-10">
                                    {newpasswordError}
                                </div>
                            }
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!shownewpassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {shownewpassword ? (
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
                    <form onSubmit={handleChangePassword}>
                        <button
                            type="submit"
                            disabled={showMessage}
                            className={`bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg transition duration-300 transform border-2 border-blue-600 inline-block text-center 
                            ${showMessage ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"}`}
                        >
                            Change Password
                        </button>
                        {showMessage && (
                            <div className="mt-4 text-green-700 bg-green-100 px-4 py-2 rounded-md shadow-sm">
                                Password Changed Successfully!
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}