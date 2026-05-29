import { Resend } from "resend";

const resendApiKey = process.env["RESEND_API_KEY"];
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  preferredDate: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  if (!resend) {
    console.log("No RESEND_API_KEY configured. Skipping email send.");
    console.log("Contact form data:", data);
    return;
  }

  const toEmail =
    process.env["CONTACT_EMAIL_TO"] ?? "hello@horizonnepal.com.np";

  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    serviceType: escapeHtml(data.serviceType),
    preferredDate: escapeHtml(data.preferredDate),
    description: escapeHtml(data.description),
  };

  await resend.emails.send({
    from: "Horizon Nepal <noreply@horizonnepal.com.np>",
    to: toEmail,
    subject: `New Consultation Request from ${data.name}`,
    html: `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${safe.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${safe.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${safe.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Service Type</td><td style="padding:8px;border:1px solid #ddd;">${safe.serviceType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Preferred Date</td><td style="padding:8px;border:1px solid #ddd;">${safe.preferredDate}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Description</td><td style="padding:8px;border:1px solid #ddd;">${safe.description}</td></tr>
      </table>
    `,
  });
}
