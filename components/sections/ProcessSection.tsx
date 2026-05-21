const steps = [
  {
    n: 1,
    title: "Share Your Plan",
    body: "Tell us your vision, budget and timeline. We listen, ask sharp questions, and confirm fit before any commitment.",
  },
  {
    n: 2,
    title: "Design & Planning Phase",
    body: "Our architects produce blueprints, 3D renders, BoQ, and permit-ready documents for your review and approval.",
  },
  {
    n: 3,
    title: "Build & Handover",
    body: "Expert teams execute on-site with weekly client updates, third-party inspections, and a clean final handover.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-off-white overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-brand-primary"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[45%] bg-white/10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, oklch(1 0 0) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 py-16 sm:py-28 items-center">
        <div className="lg:col-span-5 text-white pr-0 lg:pr-8 animate-slide-in-left">
          <span className="font-label uppercase tracking-[0.15em] text-white text-xs font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-block">
            How We Work
          </span>
          <h2 className="mt-4 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            The Infinite Construction in 3 Easy Steps
          </h2>
          <p className="mt-5 text-white/90 text-base sm:text-lg leading-relaxed max-w-md">
            A transparent, milestone-based process built around your peace of mind &mdash; from first conversation to keys in hand.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-light-gray p-6 sm:p-10 lg:p-12 relative overflow-hidden animate-reveal-up">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-full pointer-events-none" />

            <div className="animate-stagger">
              {steps.map((s, idx) => (
                <div
                  key={s.n}
                  className="group flex gap-5 sm:gap-6 relative pb-10 last:pb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="size-12 rounded-full border-4 border-brand-primary/10 bg-brand-primary text-white font-display font-bold grid place-items-center shrink-0 shadow-md shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
                      {s.n}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-grow w-[2px] bg-gradient-to-b from-brand-primary to-light-gray my-3.5" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-body font-semibold text-lg sm:text-xl text-brand-secondary group-hover:text-brand-primary transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-mid-gray text-sm sm:text-base leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
