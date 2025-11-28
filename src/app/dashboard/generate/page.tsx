
'use client';

import React, { useMemo, useState } from 'react';
import { LuCopy, LuRefreshCw, LuSave } from 'react-icons/lu';

export default function GeneratePage() {
  const templates = useMemo(
    () => [
      { name: 'Social Post', desc: 'Short engaging social caption' },
      { name: 'Ad Copy', desc: 'High-converting promotional text' },
      { name: 'Blog Intro', desc: 'Strong introductory blog paragraph' },
      { name: 'Email', desc: 'Warm and clear email copy' }
    ],
    []
  );

  const tones = ['Friendly', 'Professional', 'Casual', 'Bold'];
  const lengths = ['Short', 'Medium', 'Long'];

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Friendly');
  const [length, setLength] = useState('Short');
  const [keywords, setKeywords] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!selectedTemplate || !title) return;

    setLoading(true);
    setOutput('');

    setTimeout(() => {
      setOutput(
        `Generated (${selectedTemplate})

Title: ${title}
Audience: ${audience}
Tone: ${tone}
Length: ${length}
Keywords: ${keywords || 'none'}

Sample Output:
${sampleText(selectedTemplate, title, tone, length, keywords)}`
      );
      setLoading(false);
    }, 900);
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  const saveOutput = () => {
    if (!output) return;

    const key = 'genie_projects';
    const existing = localStorage.getItem(key);
    const arr = existing ? JSON.parse(existing) : [];

    arr.unshift({
      id: Date.now(),
      template: selectedTemplate,
      output,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(key, JSON.stringify(arr));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Generate Content</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelectedTemplate(t.name)}
              className={`p-4 rounded-2xl shadow bg-white/70 backdrop-blur-md text-left hover:bg-blue-50 transition 
                ${selectedTemplate === t.name ? 'border-2 border-blue-600' : ''}`}
            >
              <div className="font-semibold text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-600">{t.desc}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Customize Output</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-700 text-sm font-medium">Title / Topic</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white/70"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">Audience</label>
            <input
              value={audience}
              onChange={e => setAudience(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white/70"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">Tone</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white/70"
            >
              {tones.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">Length</label>
            <select
              value={length}
              onChange={e => setLength(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white/70"
            >
              {lengths.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-gray-700 text-sm font-medium">Keywords (optional)</label>
            <input
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white/70"
            />
          </div>

        </div>
      </section>

      <section className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        <button
          onClick={copyOutput}
          disabled={!output}
          className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <LuCopy /> Copy
        </button>

        <button
          onClick={saveOutput}
          disabled={!output}
          className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <LuSave /> Save
        </button>

        <button
          onClick={handleGenerate}
          disabled={!output}
          className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <LuRefreshCw /> Regenerate
        </button>
      </section>

      {output && (
        <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow whitespace-pre-wrap">
          {output}
        </section>
      )}
    </>
  );
}

function sampleText(template: string, title: string, tone: string, length: string, keywords: string) {
  return `${title} presented in a ${tone.toLowerCase()} tone. (${length} length). Keywords: ${keywords || 'none'}.`;
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
//   LuCopy,
//   LuRefreshCw,
//   LuSave
// } from 'react-icons/lu';
// import { RxAvatar } from 'react-icons/rx';
// import Sidebar, { MenuItem } from '@/app/components/sidebar';

// export default function GenerateAdvanced() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const menuItems: MenuItem[] = useMemo(() => [
//     { name: 'Generate Content', icon: <LuPencilLine size={20} className="text-gray-900" />, href: '/dashboard/generate' },
//     { name: 'My Projects', icon: <LuBookmark size={20} className="text-gray-900" />, href: '/projects' },
//     { name: 'Usage', icon: <LuWallet size={20} className="text-gray-900" />, href: '/usage' },
//     { name: 'Settings', icon: <LuUsers size={20} className="text-gray-900" />, href: '/settings' },
//     { name: 'Help', icon: <LuCircleHelp size={20} className="text-gray-900" />, href: '/help' },
//   ], []);

//   const navbarLeftClass = expanded ? 'lg:left-64' : 'lg:left-16';
//   const contentLeftClass = expanded ? 'lg:ml-64' : 'lg:ml-16';

//   const templates = [
//     { name: 'Social Post', desc: 'Short engaging social caption' },
//     { name: 'Ad Copy', desc: 'High-converting promotional text' },
//     { name: 'Blog Intro', desc: 'Strong introductory blog paragraph' },
//     { name: 'Email', desc: 'Warm and clear email copy' }
//   ];

//   const tones = ['Friendly', 'Professional', 'Casual', 'Bold'];
//   const lengths = ['Short', 'Medium', 'Long'];

//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [title, setTitle] = useState('');
//   const [audience, setAudience] = useState('');
//   const [tone, setTone] = useState('Friendly');
//   const [length, setLength] = useState('Short');
//   const [keywords, setKeywords] = useState('');
//   const [output, setOutput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = () => {
//     if (!selectedTemplate || !title) return;
//     setLoading(true);
//     setOutput('');

//     setTimeout(() => {
//       setOutput(
//         `Generated (${selectedTemplate})

// Title: ${title}
// Audience: ${audience}
// Tone: ${tone}
// Length: ${length}
// Keywords: ${keywords}

// Sample Output:
// ${mockText(selectedTemplate, title, tone, length, keywords)}`
//       );
//       setLoading(false);
//     }, 1000);
//   };

//   const handleCopy = async () => {
//     if (!output) return;
//     await navigator.clipboard.writeText(output);
//   };

//   const handleSave = () => {
//     const storageKey = 'genie_projects';
//     const existing = localStorage.getItem(storageKey);
//     const arr = existing ? JSON.parse(existing) : [];
//     arr.unshift({
//       id: Date.now(),
//       template: selectedTemplate,
//       output,
//       createdAt: new Date().toISOString()
//     });
//     localStorage.setItem(storageKey, JSON.stringify(arr));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 font-sans">

//       {/* SIDEBARS */}
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

//       {/* NAVBAR */}
//       <nav
//         className={`
//           fixed top-0 left-0 right-0 z-40
//           bg-white/70 backdrop-blur-md border-b 
//           px-4 py-4 flex items-center justify-between 
//           w-full ${navbarLeftClass}
//         `}
//       >
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="lg:hidden p-2 rounded-md bg-white/70 hover:bg-white"
//         >
//           <LuMenu size={20} className="text-gray-900" />
//         </button>

//         <Link href="/">
//           <span className="text-3xl font-bold text-gray-800 cursor-pointer">
//             Genie Content
//           </span>
//         </Link>

//         <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
//           <RxAvatar size={22} />
//         </button>
//       </nav>

//       {/* PAGE CONTENT */}
//       <main className={`pt-24 px-4 sm:px-8 ${contentLeftClass}`}>
//         <div className="max-w-full h-[calc(100vh-6rem)] overflow-auto pb-20">

//           {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
//             Generate Content
//           </h1> */}

//           {/* TEMPLATE GRID */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Template</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {templates.map((t, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedTemplate(t.name)}
//                   className={`
//                     p-4 rounded-2xl shadow bg-white/70 backdrop-blur-md text-left 
//                     transition hover:bg-blue-50
//                     ${selectedTemplate === t.name ? 'border-2 border-blue-600' : ''}
//                   `}
//                 >
//                   <div className="font-semibold text-gray-900">{t.name}</div>
//                   <div className="text-sm text-gray-600">{t.desc}</div>
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* ADVANCED OPTIONS */}
//           <section className="mb-8 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Customize Output
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-gray-700 font-medium text-sm">Title / Topic</label>
//                 <input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full p-3 rounded-xl border bg-white/70"
//                   placeholder="E.g., Summer Sale"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-700 font-medium text-sm">Audience</label>
//                 <input
//                   value={audience}
//                   onChange={(e) => setAudience(e.target.value)}
//                   className="w-full p-3 rounded-xl border bg-white/70"
//                   placeholder="E.g., young shoppers"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-700 font-medium text-sm">Tone</label>
//                 <select
//                   value={tone}
//                   onChange={(e) => setTone(e.target.value)}
//                   className="w-full p-3 rounded-xl border bg-white/70"
//                 >
//                   {tones.map((t) => <option key={t}>{t}</option>)}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-gray-700 font-medium text-sm">Length</label>
//                 <select
//                   value={length}
//                   onChange={(e) => setLength(e.target.value)}
//                   className="w-full p-3 rounded-xl border bg-white/70"
//                 >
//                   {lengths.map((l) => <option key={l}>{l}</option>)}
//                 </select>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="text-gray-700 font-medium text-sm">Keywords (optional)</label>
//                 <input
//                   value={keywords}
//                   onChange={(e) => setKeywords(e.target.value)}
//                   className="w-full p-3 rounded-xl border bg-white/70"
//                   placeholder="E.g., discount, trending, limited offer"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* BUTTONS */}
//           <section className="mb-8 flex gap-4">
//             <button
//               onClick={handleGenerate}
//               className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
//             >
//               {loading ? 'Generating...' : 'Generate'}
//             </button>

//             <button
//               onClick={handleCopy}
//               disabled={!output}
//               className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
//             >
//               <LuCopy /> Copy
//             </button>

//             <button
//               onClick={handleSave}
//               disabled={!output}
//               className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
//             >
//               <LuSave /> Save
//             </button>

//             <button
//               onClick={handleGenerate}
//               disabled={!title}
//               className="bg-white/70 border px-6 py-3 rounded-xl flex items-center gap-2"
//             >
//               <LuRefreshCw /> Regenerate
//             </button>
//           </section>

//           {/* OUTPUT */}
//           {output && (
//             <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow whitespace-pre-wrap">
//               {output}
//             </section>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function mockText(t: string, title: string, tone: string, length: string, kw: string) {
//   return `${title} delivered in a ${tone.toLowerCase()} tone. This is a ${length.toLowerCase()} preview. Keywords included: ${kw || 'none'}.`;
// }

