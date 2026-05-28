import { cookies } from "next/headers";
import { getText } from "@/lib/lang";
import { NavbarInner } from "./NavbarInner";

export async function Navbar() {
  const lang = (await cookies()).get("lang")?.value;
  const t = getText(lang);
  return <NavbarInner nav={t.nav} />;
}
