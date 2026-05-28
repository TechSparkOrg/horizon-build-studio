export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-light-gray p-6 space-y-3">
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-8 w-16 bg-gray-100 rounded" />
            <div className="h-3 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-light-gray">
        <div className="p-6">
          <div className="h-5 w-32 bg-gray-100 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 w-64 bg-white rounded-lg border border-light-gray" />
        <div className="h-10 w-32 bg-white rounded-lg border border-light-gray" />
      </div>
      <div className="bg-white rounded-2xl border border-light-gray overflow-hidden">
        <div className="divide-y divide-light-gray/50">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="h-4 w-8 bg-gray-100 rounded" />
              <div className="flex-1 space-y-1">
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-1/3 bg-gray-100 rounded" />
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-white rounded-2xl border border-light-gray p-6">
        <div className="h-6 w-48 bg-gray-100 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-4 w-20 bg-gray-100 rounded" />
              <div className="h-11 w-full bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <div className="h-11 w-24 bg-gray-100 rounded-xl" />
        <div className="h-11 w-32 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}
