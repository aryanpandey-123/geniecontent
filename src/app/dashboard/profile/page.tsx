'use client';

import { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';

export default function ProfilePage() {
  const [name, setName] = useState('Aryan');
  const [email, setEmail] = useState('aryan@example.com');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <RxAvatar size={40} className="text-gray-700" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </section>

      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow space-y-6">

        <div>
          <label className="text-gray-700 text-sm font-medium">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border bg-white/70"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border bg-white/70"
            placeholder="Enter your email"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
          Save Profile
        </button>
      </section>
    </>
  );
}
