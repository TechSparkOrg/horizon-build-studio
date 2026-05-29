import { getAll } from "@/lib/services/services/contact.service";
import { ContactsClient } from "./client";

export default async function ContactsPage() {
  const contacts = await getAll();
  return <ContactsClient contacts={contacts as any} />;
}
