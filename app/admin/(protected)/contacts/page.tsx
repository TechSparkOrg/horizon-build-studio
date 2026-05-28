import { cacheTag } from "next/cache";
import { contactService } from "@/lib/services/services/contact.service";
import { ContactsClient } from "./client";

export default async function ContactsPage() {
  'use cache'
  cacheTag("contacts")
  const contacts = await contactService.getAll();
  return <ContactsClient contacts={contacts as any} />;
}
