import { Suspense } from "react";
import { cookies } from "next/headers";
import { getText } from "@/lib/i18n/lang";
import { getBySlug } from "@/lib/services/services/page.service";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: `${t.footer.privacy} | Horizon Nepal`,
    description: t.footer.privacy,
    openGraph: {
      title: `${t.footer.privacy} | Horizon Nepal`,
      description: t.footer.privacy,
      url: "/privacy",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
    },
    alternates: { canonical: "/privacy" },
  };
}

async function PrivacyContent() {
  const lang = (await cookies()).get("lang")?.value || "en";
  const page = await getBySlug("privacy");

  if (!page) {
    // Fallback to static content if not in DB
    return (
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-secondary mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-mid-gray leading-relaxed">
          <p>Horizon Nepal values your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
          <h2 className="text-brand-secondary font-semibold text-xl mt-8">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, phone number, and project details when you contact us or request a consultation.</p>
          <h2 className="text-brand-secondary font-semibold text-xl mt-8">How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, provide construction and design services, improve our offerings, and send relevant updates with your consent.</p>
          <h2 className="text-brand-secondary font-semibold text-xl mt-8">Data Protection</h2>
          <p>We implement appropriate security measures to protect your personal data. Your information is never sold or shared with third parties for marketing purposes.</p>
          <h2 className="text-brand-secondary font-semibold text-xl mt-8">Contact</h2>
          <p>For questions about this policy, contact us at hello@horizonnepal.com.np or +977 1 441 1222.</p>
        </div>
      </main>
    );
  }

  const title = page.title;
  const content = lang === "np" ? page.contentNp : page.contentEn;

  return (
    <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-secondary mb-8">{title}</h1>
      <div
        className="prose prose-gray max-w-none text-mid-gray leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-off-white" />}>
      <PrivacyContent />
    </Suspense>
  );
}
