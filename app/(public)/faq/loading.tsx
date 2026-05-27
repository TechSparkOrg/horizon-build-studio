import { SectionLabel } from "@/components/ui/SectionLabel";

export default function FAQLoading() {
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="h-5 w-24 bg-white/10 rounded-full animate-pulse" />
          <div className="mt-3 h-12 w-3/4 bg-white/10 rounded-lg animate-pulse" />
          <div className="mt-4 h-6 w-full max-w-[500px] bg-white/10 rounded animate-pulse" />
        </div>
      </section>
      <div className="pb-16 bg-off-white min-h-screen">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-24 rounded-lg bg-white border border-light-gray animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-light-gray/40 bg-white p-5 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-3/4 bg-gray-100 rounded" />
                  <div className="size-5 bg-gray-100 rounded shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
