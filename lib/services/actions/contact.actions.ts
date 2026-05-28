"use server";

import { contactService } from "@/lib/services/services/contact.service";

export async function submitContact(data: unknown) {
  try {
    return await contactService.submit(data);
  } catch (e) {
    return { success: false, message: e instanceof Error ? e.message : "Something went wrong" };
  }
}
