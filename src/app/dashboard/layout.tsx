'use client';

import React, { useMemo, useState } from 'react';
import Sidebar, { MenuItem } from '@/app/components/sidebar';
import Navbar from '@/app/components/navbar';
import { LuHouse, LuPencilLine, LuBookmark, LuWallet, LuUsers, LuCircleHelp } from 'react-icons/lu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { name: 'Dashboard', icon: <LuHouse size={20} className="text-gray-900" />, href: '/dashboard' },
      { name: 'Generate Content', icon: <LuPencilLine size={20} className="text-gray-900" />, href: '/dashboard/generate' },
      { name: 'My Projects', icon: <LuBookmark size={20} className="text-gray-900" />, href: '/dashboard/projects' },
      { name: 'Usage', icon: <LuWallet size={20} className="text-gray-900" />, href: '/dashboard/usage' },
      { name: 'Settings', icon: <LuUsers size={20} className="text-gray-900" />, href: '/dashboard/settings' },
      { name: 'Help', icon: <LuCircleHelp size={20} className="text-gray-900" />, href: '/dashboard/help' },
    ],
    []
  );

  const navbarLeftClass = expanded ? 'left-0 lg:left-64' : 'left-0 lg:left-16';
  const contentLeftClass = expanded ? 'lg:ml-64' : 'lg:ml-16';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 font-sans">

      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navbarLeftClass={navbarLeftClass}
      />

      <Sidebar
        isMobile={false}
        expanded={expanded}
        setExpanded={setExpanded}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
      />

      <Sidebar
        isMobile={true}
        expanded={expanded}
        setExpanded={setExpanded}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItems}
      />


      <main className={`pt-24 px-4 sm:px-8 ${contentLeftClass}`}>
        <div className="max-w-full h-[calc(100vh-6rem)] overflow-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
