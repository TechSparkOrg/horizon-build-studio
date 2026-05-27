import { api } from "@/lib/api";
import { ContactsClient } from "./client";

export default async function ContactsPage() {
  const contacts = await api("/api/contacts").get();
  return <ContactsClient contacts={contacts as any} />;
}
