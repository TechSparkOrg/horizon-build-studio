const SESSION_COOKIE = "session_id" as const;

export async function getSessionCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function setSessionCookie(sessionId: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
}

export async function deleteSessionCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
