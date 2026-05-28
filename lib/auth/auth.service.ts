"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  signAccessToken,
  createRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  setRefreshCookie,
  setAccessCookie,
  deleteRefreshCookie,
  deleteAccessCookie,
  getRefreshTokenFromCookie,
} from "./ServiceHelper";
import type { LoginResult } from "./types";

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  checkRateLimit(`login:${email}`, 5, 60000);
  if (!email || !password) throw new Error("Email and password required");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.hashedPassword) throw new Error("Invalid email or password");

  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) throw new Error("Invalid email or password");

  const accessToken = await signAccessToken({ id: user.id, role: user.role });
  const refresh = await createRefreshToken(user.id);
  await setRefreshCookie(refresh.token);
  await setAccessCookie(accessToken);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
  };
}

export async function logout(): Promise<void> {
  const token = await getRefreshTokenFromCookie();
  if (token) await revokeRefreshToken(token);
  await deleteRefreshCookie();
  await deleteAccessCookie();
}

export async function refresh(): Promise<{ accessToken: string }> {
  const oldToken = await getRefreshTokenFromCookie();
  if (!oldToken) throw new Error("No refresh token");

  const rotated = await rotateRefreshToken(oldToken);
  if (!rotated) throw new Error("Invalid refresh token");

  const user = await prisma.user.findUnique({
    where: { id: rotated.userId },
    select: { id: true, role: true },
  });
  if (!user) throw new Error("User not found");

  const accessToken = await signAccessToken(user);
  await setRefreshCookie(rotated.token);
  await setAccessCookie(accessToken);

  return { accessToken };
}
