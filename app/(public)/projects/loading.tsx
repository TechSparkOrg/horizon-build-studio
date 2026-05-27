export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-off-white">
      <section className="relative pt-36 pb-12 sm:pb-16 bg-brand-dark overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-5 w-24 bg-white/10 rounded" />
          <div className="mt-3 h-10 w-1/2 bg-white/10 rounded" />
          <div className="mt-4 h-6 w-2/3 bg-white/10 rounded" />
        </div>
      </section>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-20 rounded-lg bg-white border border-light-gray" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-light-gray">
              <div className="h-56 bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-5 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
