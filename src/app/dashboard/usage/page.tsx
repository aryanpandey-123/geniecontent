'use client';

export default function UsagePage() {
  const used = 30;
  const total = 100;
  const percent = (used / total) * 100;

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Usage</h1>

      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Credit Usage</h2>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-medium">Credits Used</span>
          <span className="text-gray-700 font-medium">{used} / {total}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Limit</h3>
          <p className="text-gray-600">100 Credits/month</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Renewal Date</h3>
          <p className="text-gray-600">1st of every month</p>
        </div>
      </section>
    </>
  );
}
