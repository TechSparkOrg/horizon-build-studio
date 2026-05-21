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

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  if (!resend) {
    console.log("No RESEND_API_KEY configured. Skipping email send.");
    console.log("Contact form data:", data);
    return;
  }

  const toEmail =
    process.env["CONTACT_EMAIL_TO"] ?? "hello@horizonnepal.com.np";

  await resend.emails.send({
    from: "Horizon Nepal <noreply@horizonnepal.com.np>",
    to: toEmail,
    subject: `New Consultation Request from ${data.name}`,
    html: `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Service Type</td><td style="padding:8px;border:1px solid #ddd;">${data.serviceType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Preferred Date</td><td style="padding:8px;border:1px solid #ddd;">${data.preferredDate}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Description</td><td style="padding:8px;border:1px solid #ddd;">${data.description}</td></tr>
      </table>
    `,
  });
}
