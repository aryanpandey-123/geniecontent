// The Content Generation Screen (main dashboard page)

'use client';

import Link from "next/link";
import { useState } from 'react';
import {
  LuMenu,
  LuPencilLine,
  LuBookmark,
  LuWallet,
  LuUsers,
  LuCircleHelp,
} from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";



export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const menuItems = [
    { name: "Generate Content", icon: <LuPencilLine size={20} className="text-gray-900" />, href: "/generate" },
    { name: "My Saved Content", icon: <LuBookmark size={20} className="text-gray-900"/>, href: "/saved" },
    { name: "Usage & Billing", icon: <LuWallet size={20} className="text-gray-900"/>, href: "/billing" },
    { name: "Team Settings", icon: <LuUsers size={20} className="text-gray-900"/>, href: "/team" },
    { name: "Help & Support", icon: <LuCircleHelp size={20} className="text-gray-900"/>, href: "/help" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex flex-col font-sans">
      <div className="flex h-screen font-sans ">
        <div
          className={`bg-white/70 backdrop-blur-md p-4 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"
            }`}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 p-2 hover:bg-gray-100 rounded"
          >
            {sidebarOpen ? <LuMenu size={24} className="text-gray-900" /> : <LuMenu size={24} className="text-gray-900" />}
          </button>
          <nav className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-gray-800 font-medium">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>
        </div>
        <div className="flex-1 flex flex-col">
          <nav className="bg-white/70 backdrop-blur-md px-4 py-4 flex items-center justify-between space-x-5">
            <div className="flex-1 flex items-center md:justify-start space-x-2">
              <Link href="/">
                <div className="text-3xl font-bold text-gray-800 ">Genie Content</div>
              </Link>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <RxAvatar size={22} className="text-gray-900" />
            </button>
            <div>
            </div>
          </nav>
          <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, User!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["Content Generated", "Usage", "Tasks", "Notifications"].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-700">{item}</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">123</p>
            </div>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔️ User signed up</li>
          </ul>
        </div>
      </main>
        </div>
      </div>
    </div>
  );
}  