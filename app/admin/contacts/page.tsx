import { prisma } from "@/lib/db";
import { ContactsClient } from "./client";

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ContactsClient contacts={JSON.parse(JSON.stringify(contacts))} />;
}
