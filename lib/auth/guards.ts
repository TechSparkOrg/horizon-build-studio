import { cache } from "react";
import { getSessionCookie } from "./cookies";
import { getSession } from "./sessions";
import type { AuthUser } from "./types";

async function tryAuthInner(): Promise<AuthUser | null> {
  const sessionId = await getSessionCookie();
  if (!sessionId) return null;
  return getSession(sessionId);
}

export const tryAuth = cache(tryAuthInner);

export const requireAuth = cache(async (): Promise<AuthUser> => {
  const user = await tryAuth();
  if (!user) throw new Error("Unauthorized");
  return user;
});

export async function requireRole(...roles: string[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!roles.includes(user.role)) throw new Error("Forbidden");
  return user;
}

export const requireAuthOrRedirect = cache(async (loginUrl = "/admin/login"): Promise<AuthUser> => {
  const user = await tryAuth();
  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect(loginUrl);
    throw new Error("unreachable");
  }
  return user;
});
