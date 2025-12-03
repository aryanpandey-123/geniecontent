'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { LuMenu } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { useRouter, usePathname } from 'next/navigation';

export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

type Props = {
  isMobile?: boolean;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  menuItems: MenuItem[];
};

export default function Sidebar({
  isMobile = false,
  expanded,
  setExpanded,
  sidebarOpen,
  setSidebarOpen,
  menuItems = [],
}: Props) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isMobile) return;
    if (sidebarOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    if (isMobile && sidebarOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    if (!isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, setSidebarOpen]);

  const desktopClasses = `
    hidden lg:flex lg:flex-col h-screen fixed left-0 top-0 z-40 sidebar-slide transition-all duration-300
    ${expanded ? 'w-64' : 'w-16'}
  `;

  const mobileClasses = `
    fixed top-0 left-0 h-screen w-64 shadow-xl transform transition-transform duration-300 z-60
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  const containerClass = isMobile ? mobileClasses : desktopClasses;

  return (
    <>
      <aside
        ref={sidebarRef}
        role={isMobile ? 'dialog' : 'navigation'}
        aria-modal={isMobile ? true : undefined}
        inert={isMobile && !sidebarOpen ? true : undefined}
        className={`bg-white border-r border-white/40 p-4 ${containerClass}`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            ref={closeBtnRef}
            onClick={() => {
              if (isMobile) {
                setSidebarOpen(false);
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
              } else {
                setExpanded(!expanded);
              }
            }}
            aria-label={isMobile ? (sidebarOpen ? 'Close sidebar' : 'Open sidebar') : (expanded ? 'Collapse sidebar' : 'Expand sidebar')}
            aria-expanded={!isMobile ? expanded : undefined}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <LuMenu size={20} className="text-gray-900" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2" aria-label="Main navigation">
          {menuItems.map((item, i) => {
            const compact = !isMobile && !expanded;
            const isActive = pathname === item.href;
            return (
              <Link
                key={`${item.name}-${i}`}
                href={item.href}
                className={`
                  group flex items-center space-x-3 p-2 rounded-md transition-all duration-200
                  ${compact ? 'justify-center' : ''}
                  ${isActive ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-blue-50/70 hover:shadow-sm hover:border-l-4 hover:border-blue-600'}
                `}
                onClick={() => isMobile && setSidebarOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-xl transition-all duration-200 group-hover:scale-110 group-hover:text-blue-600" aria-hidden>
                  {item.icon}
                </span>
                {(isMobile || expanded) && <span className="text-gray-800 font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => router.push('/')}
          className="mt-auto w-full flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Logout"
        >
          <RxAvatar size={20} className="text-gray-900" />
          {(isMobile || expanded) && <span className="text-gray-800 font-medium">Logout</span>}
        </button>
      </aside>

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
