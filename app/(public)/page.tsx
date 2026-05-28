import { Suspense } from "react";
import { cookies } from "next/headers";
import { getHomeSections } from "@/lib/cache-home";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BelowFoldContent } from "@/components/sections/home/BelowFoldContent";

function BelowFallback() {
  return (
    <div className="h-screen bg-off-white animate-pulse rounded-3xl mx-4 sm:mx-6 lg:mx-8" />
  );
}

function AboveFoldFallback() {
  return (
    <div className="min-h-screen animate-pulse bg-off-white" />
  );
}

async function HomeContent() {
  const lang = (await cookies()).get("lang")?.value;
  const { sections } = await getHomeSections(lang);

  return (
    <>
      <HeroSection content={sections.hero} />
      <ServicesSection content={sections.services} />
      <Suspense fallback={<BelowFallback />}>
        <BelowFoldContent lang={lang} sections={sections} />
      </Suspense>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<AboveFoldFallback />}>
      <HomeContent />
    </Suspense>
  );
}
