export function StreamingFallback({
  label,
  minH = 450,
}: {
  label: string;
  minH?: number;
}) {
  return (
    <div
      className="max-w-[1200px] mx-auto px-4 py-20 flex flex-col items-center justify-center text-mid-gray bg-white rounded-3xl border border-light-gray shadow-[0_8px_30px_rgb(0,0,0,0.02)] my-8"
      style={{ minHeight: minH }}
    >
      <div className="size-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mb-4" />
      <p className="font-semibold text-brand-secondary">{label}</p>
    </div>
  );
}
