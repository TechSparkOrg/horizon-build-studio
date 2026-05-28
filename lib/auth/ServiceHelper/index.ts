import { cache } from "react";
import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "crypto";
import { getEnv } from "@/lib/env";
import type { AuthUser, TokenPayload } from "../types";

function getSecret() {
  return new TextEncoder().encode(getEnv().AUTH_SECRET);
}

export const ACCESS_TOKEN_EXPIRY = "24h" as const;
export const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;
export const REFRESH_COOKIE = "refresh_token" as const;
export const ACCESS_COOKIE = "access_token" as const;

export async function signAccessToken(user: { id: string; role: string }): Promise<string> {
  return new SignJWT({ userId: user.id, role: user.role, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(getSecret());
}

export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (payload.type !== "access") return null;
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashToken(token: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createRefreshToken(userId: string) {
  const { prisma } = await import("@/lib/db");
  const token = randomUUID();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
  const record = await prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt } });
  return { id: record.id, token, userId };
}

export async function rotateRefreshToken(oldToken: string) {
  const { prisma } = await import("@/lib/db");
  const oldHash = await hashToken(oldToken);
  const record = await prisma.refreshToken.findUnique({ where: { tokenHash: oldHash } });
  if (!record || record.revokedAt || record.expiresAt < new Date()) return null;
  await prisma.refreshToken.update({ where: { id: record.id }, data: { revokedAt: new Date() } });
  return createRefreshToken(record.userId);
}

export async function revokeRefreshToken(token: string) {
  const { prisma } = await import("@/lib/db");
  const tokenHash = await hashToken(token);
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function getRefreshTokenFromCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE)?.value ?? null;
}

export async function setRefreshCookie(token: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_EXPIRY_MS / 1000,
  });
}

export async function deleteRefreshCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_COOKIE);
}

export async function getAccessTokenFromCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_COOKIE)?.value ?? null;
}

export async function setAccessCookie(token: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60,
  });
}

export async function deleteAccessCookie() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
}

async function tryAuthInner(): Promise<AuthUser | null> {
  // First try: verify the access token JWT (no DB query)
  const accessToken = await getAccessTokenFromCookie();
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload && payload.userId) {
      return { id: payload.userId, email: "", name: "", role: payload.role ?? "" };
    }
  }

  // Fallback: refresh token DB lookup
  try {
    const token = await getRefreshTokenFromCookie();
    if (!token) return null;

    const { prisma } = await import("@/lib/db");
    const tokenHash = await hashToken(token);
    const record = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        user: { select: { id: true, email: true, name: true, role: true } },
      },
    });

    if (!record || record.revokedAt || record.expiresAt < new Date()) return null;

    // Rotate refresh token and issue new access token
    await prisma.refreshToken.update({ where: { id: record.id }, data: { revokedAt: new Date() } });
    const newRefresh = await createRefreshToken(record.userId);
    const newAccess = await signAccessToken({ id: record.user.id, role: record.user.role });
    await setRefreshCookie(newRefresh.token);
    await setAccessCookie(newAccess);

    return record.user;
  } catch {
    return null;
  }
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
