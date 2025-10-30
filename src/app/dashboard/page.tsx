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
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { name: "Generate Content", icon: <LuPencilLine size={20} className="text-gray-900" />, href: "/generate" },
    { name: "My Projects", icon: <LuBookmark size={20} className="text-gray-900" />, href: "/projects" },
    { name: "Usage", icon: <LuWallet size={20} className="text-gray-900" />, href: "/usage" },
    { name: "Settings", icon: <LuUsers size={20} className="text-gray-900" />, href: "/settings" },
    { name: "Help", icon: <LuCircleHelp size={20} className="text-gray-900" />, href: "/help" },
  ];



  const Sidebar = ({ isMobile = false }) => (
    <aside
      className={`bg-white/70 backdrop-blur-md border-r p-4 transition-all duration-300 ease-in-out z-50
    ${isMobile
          ? `fixed top-0 left-0 h-screen w-64 shadow-xl flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
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
      {/* Logout at the bottom */}
      <div
        onClick={() => console.log("Logging out...")}
        className="mt-auto flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
      >
        <RxAvatar size={20} className="text-gray-900" />
        {(expanded || isMobile) && <span className="text-gray-800 font-medium">Logout</span>}
      </div>
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
                <LuMenu size={20} className="text-gray-900" />
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

            {/* Quick Start */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Start</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {["Generate Social Post", "Write Ad Copy", "Blog Introduction", "Email Campaign"].map((template, i) => (
                  <button
                    key={i}
                    className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow hover:bg-blue-50 transition w-full text-left font-medium text-gray-900"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Activities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
              <ul className="space-y-3 text-gray-600">
                {["Created Social Post: Summer Sale", "Saved Blog Draft: AI Trends", "Generated Ad Copy: New Product"].map((item, i) => (
                  <li key={i} className="bg-white/70 backdrop-blur-md p-3 rounded-lg shadow">
                    ✔️ {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Generate New Content / Search */}
            <section className="mb-8 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Search content type..."
                className="flex-1 p-3 rounded-xl shadow bg-white/70 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
                Generate New Content
              </button>
            </section>

            {/* AI Credit Usage */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Credit Usage</h2>
              <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">Credits Used</span>
                  <span className="text-gray-700 font-medium">30 / 100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
            </section>
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
