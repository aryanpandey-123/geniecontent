// // The Content Generation Screen (main dashboard page)

'use client';

import Link from "next/link";
import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { name: "Generate Content", icon: <LuPencilLine size={20} className="text-gray-900" />, href: "/generate" },
    { name: "My Saved Content", icon: <LuBookmark size={20} className="text-gray-900" />, href: "/saved" },
    { name: "Usage & Billing", icon: <LuWallet size={20} className="text-gray-900" />, href: "/billing" },
    { name: "Team Settings", icon: <LuUsers size={20} className="text-gray-900" />, href: "/team" },
    { name: "Help & Support", icon: <LuCircleHelp size={20} className="text-gray-900" />, href: "/help" },
  ];


  const Sidebar = ({ isMobile = false }) => (
    <aside
      className={`bg-white/70 backdrop-blur-md border-r p-4 transition-all duration-300 ease-in-out z-50
        ${isMobile
          ? `fixed top-0 left-0 h-screen w-64 shadow-xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          : `hidden lg:flex lg:flex-col h-screen ${expanded ? 'w-64' : 'w-16'}`}`}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => (isMobile ? setSidebarOpen(false) : setExpanded(!expanded))}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isMobile ? "Close sidebar" : "Toggle sidebar"}
        >
          <LuMenu size={20} className="text-gray-900" />
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={item.name + index}
            href={item.href}
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition
              ${!isMobile && !expanded ? 'justify-center' : ''}`}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <span className="text-xl">{item.icon}</span>
            {(isMobile || expanded) && <span className="text-gray-800 font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 font-sans">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <nav className="relative bg-white/70 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="absolute left-4 z-50 lg:hidden p-2 rounded-md bg-white/70 backdrop-blur-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open menu"
              >
                <LuMenu size={20} className="text-gray-900"/>
              </button>
              <Link href="/">
                <span className="ml-10 lg:ml-0 text-3xl font-bold text-gray-800 cursor-pointer">
                  Genie Content
                </span>
              </Link>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <RxAvatar size={22} />
            </button>
          </nav>

          {/* Page */}
          <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, User!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {["Content Generated", "Usage", "Tasks", "Notifications"].map((item, i) => (
                <div
                  key={item + i}
                  className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center"
                >
                  <h2 className="text-lg font-semibold text-gray-700">{item}</h2>
                  <p className="text-2xl font-bold text-gray-900 mt-2">123</p>
                </div>
              ))}
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <ul className="space-y-3 text-gray-600">
                <li>✔️ User signed up</li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar & Overlay */}
      <Sidebar isMobile />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden "
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
