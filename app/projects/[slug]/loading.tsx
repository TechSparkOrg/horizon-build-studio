import { StreamingFallback } from "@/components/ui/StreamingFallback";

export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <StreamingFallback label="Loading Project Details..." minH={500} />
    </div>
  );
}
