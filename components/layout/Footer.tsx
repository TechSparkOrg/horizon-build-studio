import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/lang";
import { FooterInner } from "./FooterInner";

async function FooterContent() {
  const lang = (await cookies()).get("lang")?.value;
  const t = getText(lang);
  return (
    <FooterInner
      footer={t.footer}
      newsLabel={t.nav.news}
      hours={t.location.hours}
    />
  );
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
