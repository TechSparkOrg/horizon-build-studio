import type { WithTimestamps } from "./shared.types";

export interface ContactItem extends WithTimestamps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  description: string;
  date: string;
  status: string;
}
