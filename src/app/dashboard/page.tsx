// // The Content Generation Screen (main dashboard page)


'use client';

import React from 'react';

export default function DashboardPage() {
  const creditsUsed = 30;
  const creditsTotal = 100;
  const percent = Math.round((creditsUsed / creditsTotal) * 100);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, User!</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Start</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-600">
            {['Generate Social Post', 'Write Ad Copy', 'Blog Introduction', 'Email Campaign'].map((template, i) => (
              <button
                key={i}
                className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow hover:bg-blue-50 transition font-medium"
              >
                {template}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>

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
            type="text"
            placeholder="Search content type..."
            className="flex-1 p-3 rounded-xl shadow bg-white/70 backdrop-blur-md border border-gray-200"
          />

          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700">
            Generate New Content
          </button>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Credit Usage</h2>

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
    </>
  );
}



// 'use client';

// import React, { useMemo, useState } from 'react';
// import Link from 'next/link';
// import {
//   LuMenu,
//   LuPencilLine,
//   LuBookmark,
//   LuWallet,
//   LuUsers,
//   LuCircleHelp,
// } from 'react-icons/lu';
// import { RxAvatar } from 'react-icons/rx';
// import Sidebar, { MenuItem } from '@/app/components/sidebar';

// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false); 
//   const [expanded, setExpanded] = useState(false);       

//   const menuItems: MenuItem[] = useMemo(() => [
//     { name: 'Generate Content', icon: <LuPencilLine size={20} className="text-gray-900" />, href: '/dashboard/generate' },
//     { name: 'My Projects', icon: <LuBookmark size={20} className="text-gray-900" />, href: '/projects' },
//     { name: 'Usage', icon: <LuWallet size={20} className="text-gray-900" />, href: '/usage' },
//     { name: 'Settings', icon: <LuUsers size={20} className="text-gray-900" />, href: '/settings' },
//     { name: 'Help', icon: <LuCircleHelp size={20} className="text-gray-900" />, href: '/help' },
//   ], []);

//   const creditsUsed = 30;
//   const creditsTotal = 100;
//   const percent = Math.round((creditsUsed / creditsTotal) * 100);

//   const navbarLeftClass = expanded ? 'lg:left-64' : 'lg:left-16';
//   const contentLeftClass = expanded ? 'lg:ml-64' : 'lg:ml-16';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 font-sans">

//       <Sidebar
//         isMobile={false}
//         expanded={expanded}
//         setExpanded={setExpanded}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         menuItems={menuItems}
//       />

//       <Sidebar
//         isMobile={true}
//         expanded={expanded}
//         setExpanded={setExpanded}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         menuItems={menuItems}
//       />

//       <nav
//         className={`
//           fixed top-0 left-0 right-0 z-40 
//           bg-white/70 backdrop-blur-md 
//           px-4 py-4 
//           flex items-center justify-between 
//           border-b 
//           w-full
//           ${navbarLeftClass}
//         `}
//       >

//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="lg:hidden p-2 rounded-md bg-white/70 hover:bg-white"
//           aria-label="Open menu"
//         >
//           <LuMenu size={20} className="text-gray-900" />
//         </button>

//         <Link href="/">
//           <span className="text-3xl font-bold text-gray-800 cursor-pointer">Genie Content</span>
//         </Link>

//         <button
//           className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//           aria-label="Account"
//         >
//           <RxAvatar size={22} className="text-gray-900" />
//         </button>
//       </nav>

//       <main className={`pt-24 px-4 sm:px-8 ${contentLeftClass}`}>
//         <div className="max-w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] overflow-auto pb-20">

//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, User!</h1>

//           <section className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Start</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-600">
//               {['Generate Social Post', 'Write Ad Copy', 'Blog Introduction', 'Email Campaign'].map((template, i) => (
//                 <button
//                   key={i}
//                   className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow hover:bg-blue-50 transition font-medium"
//                 >
//                   {template}
//                 </button>
//               ))}
//             </div>
//           </section>

//           <section className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>

//             <ul className="space-y-3 text-gray-600">
//               {[
//                 'Created Social Post: Summer Sale',
//                 'Saved Blog Draft: AI Trends',
//                 'Generated Ad Copy: New Product'
//               ].map((item, i) => (
//                 <li key={i} className="bg-white/70 backdrop-blur-md p-3 rounded-lg shadow">
//                   ✔️ {item}
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <section className="mb-8 flex flex-col sm:flex-row items-center gap-4">
//             <input
//               type="text"
//               placeholder="Search content type..."
//               className="flex-1 p-3 rounded-xl shadow bg-white/70 backdrop-blur-md border border-gray-200"
//             />

//             <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700">
//               Generate New Content
//             </button>
//           </section>

//           <section className="mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Credit Usage</h2>

//             <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow">
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700 font-medium">Credits Used</span>
//                 <span className="text-gray-700 font-medium">{creditsUsed} / {creditsTotal}</span>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//                 <div
//                   className="h-4 rounded-full bg-blue-600 transition-[width] duration-500"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>
//             </div>
//           </section>

//         </div>
//       </main>
//     </div>
//   );
// }



