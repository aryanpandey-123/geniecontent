// This is the about page.

import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8 font-sans">
            <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-6xl w-full text-center">
                <nav className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:justify-between mb-5">
                    <div className="flex-1 flex justify-center md:justify-start space-x-2">
                        <Link href="/">
                            <div className="text-3xl font-bold text-gray-800 ">Genie Content</div>
                        </Link>
                    </div>
                </nav>
                <div className="relative mt-3 mb-8">
                    <div className="h-px bg-gray-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"></div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-8">About Our Platform</h1>
                <h2 className="text-xl lg:text-2xl font-bold text-left text-gray-900 mb-2">Our Mission</h2>
                <div className="text-gray-900">
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        At <strong>Genie Content</strong>, we believe that powerful ideas deserve powerful words. Our platform harnesses the latest in AI technology to help individuals, teams, and businesses create content that inspires, informs, and converts — faster and easier than ever.
                    </p>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        Whether you're writing blog posts, marketing copy, social media content, or even product descriptions, Genie Content acts like your personal content assistant. It’s like having a creative partner available 24/7 — no burnout, no writer’s block.
                    </p>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        We're committed to making content creation more accessible, efficient, and fun. With intuitive tools, customizable templates, and smart suggestions, Genie Content empowers you to focus on what really matters: sharing your ideas with the world.
                    </p>
                    <p className="text-lg leading-relaxed">
                        ✨ Let Genie Content take care of the words — so you can focus on the vision.
                    </p>
                </div>
            </div>
        </div>
    );
}
