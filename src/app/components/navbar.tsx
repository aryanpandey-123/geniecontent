'use client';

import Link from 'next/link';
import { LuMenu } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  navbarLeftClass: string;
}

export default function Navbar({ sidebarOpen, setSidebarOpen, navbarLeftClass }: NavbarProps) {
  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40 
        bg-white/70 backdrop-blur-md border-b 
        px-4 py-4 flex items-center justify-between 
        w{800} ${navbarLeftClass}
      `}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-md bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open menu"
      >
        <LuMenu size={20} className="text-gray-900" />
      </button>

      <Link href="/">
        <span className="text-3xl font-bold text-gray-800 cursor-pointer select-none">
          Genie Content
        </span>
      </Link>

      <Link
        href="/dashboard/profile"
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        aria-label="Account"
      >
        <RxAvatar size={22} className="text-gray-900" />
      </Link>

    </nav>
  );
}
