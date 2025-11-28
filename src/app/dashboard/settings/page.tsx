'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@example.com');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow space-y-6">

        <div>
          <label className="text-gray-700 text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border bg-white/70"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border bg-white/70"
            placeholder="Your email"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">
          Save Changes
        </button>
      </section>
    </>
  );
}
