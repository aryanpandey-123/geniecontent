'use client';

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Projects</h1>

      <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Saved Creations</h2>
        <p className="text-gray-600">
          Here you will find all the content you saved from the Generate page.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800">Project #{n}</h3>
            <p className="text-gray-600 mt-2">
              This is a sample project card. Saved content will appear here.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
