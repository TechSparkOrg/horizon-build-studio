import { Suspense } from "react";
import { getSettings } from "@/lib/content/settings";
import { FooterInner } from "./FooterInner";

async function FooterContent() {
  const settings = await getSettings();
  return <FooterInner settings={settings} />;
}

function FooterFallback() {
  return <div className="bg-brand-dark h-96 animate-pulse" />;
}

export function Footer() {
  return (
    <Suspense fallback={<FooterFallback />}>
      <FooterContent />
    </Suspense>
  );
}
