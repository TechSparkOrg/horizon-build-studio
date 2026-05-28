import { cookies } from "next/headers";
import { getText } from "@/lib/lang";

export async function generateMetadata() {
  const t = getText((await cookies()).get("lang")?.value);
  return {
    title: `${t.footer.terms} | Horizon Nepal`,
    description: t.footer.terms,
    openGraph: {
      title: `${t.footer.terms} | Horizon Nepal`,
      description: t.footer.terms,
      url: "/terms",
      siteName: "Horizon Nepal",
      locale: "en_US",
      type: "website",
    },
    alternates: { canonical: "/terms" },
  };
}

export default function TermsPage() {
  return (
    <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-secondary mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-mid-gray leading-relaxed">
        <p>By using Horizon Nepal&apos;s services, you agree to the following terms and conditions.</p>
        <h2 className="text-brand-secondary font-semibold text-xl mt-8">Services</h2>
        <p>Horizon Nepal provides home construction, interior design, and material cost consultation services. Project scope, timeline, and costs are outlined in a formal agreement before work begins.</p>
        <h2 className="text-brand-secondary font-semibold text-xl mt-8">User Responsibilities</h2>
        <p>You agree to provide accurate information for consultations and project planning. You are responsible for reviewing and approving project specifications before work commences.</p>
        <h2 className="text-brand-secondary font-semibold text-xl mt-8">Intellectual Property</h2>
        <p>All designs, plans, and materials provided by Horizon Nepal remain our intellectual property until full payment is received and project ownership is transferred.</p>
        <h2 className="text-brand-secondary font-semibold text-xl mt-8">Limitation of Liability</h2>
        <p>Horizon Nepal is not liable for damages arising from force majeure, site conditions beyond our control, or modifications made after project completion.</p>
        <h2 className="text-brand-secondary font-semibold text-xl mt-8">Contact</h2>
        <p>For questions about these terms, contact us at hello@horizonnepal.com.np or +977 1 441 1222.</p>
      </div>
    </main>
  );
}
