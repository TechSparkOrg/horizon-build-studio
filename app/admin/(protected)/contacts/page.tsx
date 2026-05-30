import { getAll } from "@/lib/services/services/contact.service";
import { ContactsClient } from "./client";

export default async function ContactsPage() {
  const { items } = await getAll();
  return <ContactsClient contacts={items as any} />;
}
