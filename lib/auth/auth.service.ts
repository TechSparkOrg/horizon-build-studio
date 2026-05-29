"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { createSession, deleteSession } from "./sessions";
import { setSessionCookie, deleteSessionCookie, getSessionCookie } from "./cookies";
import type { LoginResult } from "./types";

export async function login(email: string, password: string): Promise<LoginResult> {
  checkRateLimit(`login:${email}`, 5, 60000);
  if (!email || !password) throw new Error("Email and password required");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.hashedPassword) throw new Error("Invalid email or password");

  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) throw new Error("Invalid email or password");

  const session = await createSession(user.id);
  await setSessionCookie(session.id);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export async function logout(): Promise<void> {
  const sessionId = await getSessionCookie();
  if (sessionId) await deleteSession(sessionId);
  await deleteSessionCookie();
}
