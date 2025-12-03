'use client';

import React from 'react';

export default function DashboardPage() {
  const creditsUsed = 30;
  const creditsTotal = 100;
  const percent = Math.round((creditsUsed / creditsTotal) * 100);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, User!</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Quick Start</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-600">
          {['Generate Social Post', 'Write Ad Copy', 'Blog Introduction', 'Email Campaign'].map((template, i) => (
            <button
              key={i}
              className="bg-white/50 backdrop-blur-xl p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/70 border border-white/40"
              aria-label={template}
            >
              <span className="text-gray-900 font-medium">{template}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Recent Activities</h2>

        <ul className="space-y-3 text-gray-600">
          {[
            'Created Social Post: Summer Sale',
            'Saved Blog Draft: AI Trends',
            'Generated Ad Copy: New Product'
          ].map((item, i) => (
            <li key={i} className="bg-white/70 backdrop-blur-md p-3 rounded-lg shadow">
              ✔️ {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 flex flex-col sm:flex-row items-center gap-4">
        <input
          id="search-content"
          name="searchContent"
          type="text"
          placeholder="Search content type..."
          className="flex-1 p-3 rounded-xl shadow bg-white/70 backdrop-blur-md border border-gray-200 placeholder-gray-600 text-gray-900"
        />

        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
          Generate New Content
        </button>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">AI Credit Usage</h2>

        <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-medium">Credits Used</span>
            <span className="text-gray-700 font-medium">{creditsUsed} / {creditsTotal}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full bg-blue-600 transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
