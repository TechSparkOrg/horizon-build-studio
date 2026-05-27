export default function Loading() {
  return (
    <article className="font-serif bg-white min-h-screen">
      <div className="relative h-[60vh] sm:h-[65vh] overflow-hidden bg-gray-200 animate-pulse flex items-end">
        <div className="max-w-5xl mx-auto px-6 w-full pb-14">
          <div className="max-w-2xl space-y-4">
            <div className="h-5 w-24 bg-gray-300 rounded-sm" />
            <div className="h-12 w-3/4 bg-gray-300 rounded" />
            <div className="h-8 w-1/2 bg-gray-300 rounded" />
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-gray-300 rounded-sm" />
              <div className="h-6 w-32 bg-gray-300 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <div className="space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded" />
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 space-y-4">
            <div className="h-6 w-full bg-gray-200 rounded" />
            <div className="h-6 w-5/6 bg-gray-200 rounded" />
            <div className="h-6 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}
