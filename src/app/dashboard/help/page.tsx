'use client';

export default function HelpPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Frequently Asked Questions</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• How do I generate content?</li>
            <li>• How do I save content?</li>
            <li>• Where can I view my projects?</li>
            <li>• How does credit usage work?</li>
          </ul>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Support</h3>
          <p className="text-gray-700">Email: support@geniecontent.com</p>
          <p className="text-gray-700 mt-1">Response time: within 24 hours</p>
        </div>

      </section>
    </>
  );
}
