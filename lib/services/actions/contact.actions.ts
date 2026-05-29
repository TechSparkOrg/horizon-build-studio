"use server";

import { submit as submitContactService } from "@/lib/services/services/contact.service";

export async function submitContact(data: unknown) {
  try {
    return await submitContactService(data);
  } catch (e) {
    return { success: false, message: e instanceof Error ? e.message : "Something went wrong" };
  }
}
