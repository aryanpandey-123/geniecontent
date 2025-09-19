// This is the landing page for the application.

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8 font-sans">
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-6xl w-full text-center">
        
        <nav className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:justify-between mb-12">
          {/* <div className="flex-1 flex justify-center md:justify-start space-x-2"> */}
              <div className="text-3xl font-bold text-gray-800 ">Genie Content</div>
          {/* </div> */}
          {/* <div className="hidden md:flex items-center"> */}
            <Link href="/about" className="text-gray-700 font-medium px-4 py-2 hover:bg-gray-200 rounded-md transition cursor-pointer">
                About
            </Link>
          {/* </div> */}
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-16">
          <div className="flex-1 space-y-6 max-w-xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Unlock Your Content's Potential
            </h2>
            <p className="text-lg text-gray-600">
              AI-Powered Marketing Copy in Seconds. Generate. Edit. Publish.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth/signup" 
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 border-2 border-blue-600">
                Sign Up Now
            </Link>
            <Link href="/auth/login" 
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 border-2 border-blue-600">
                Log In
            </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 pt-12 mt-12 border-t border-gray-100 md:flex-row md:space-y-0 md:space-x-4 md:justify-center">
          <div className="flex items-center bg-gray-50 rounded-full py-2 px-6 w-full sm:w-auto text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3 2l-4-4m0 0l-4-4m4 4V4"/>
            </svg>
            Blog Posts
          </div>
          <div className="flex items-center bg-gray-50 rounded-full py-2 px-6 w-full sm:w-auto text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Social Captions
          </div>
          <div className="flex items-center bg-gray-50 rounded-full py-2 px-6 w-full sm:w-auto text-gray-700 font-medium shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M9 18h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Ad Copy
          </div>
        </div>

      </div>
    </div>
  );
}
