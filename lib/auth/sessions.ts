import { randomUUID } from "crypto";

const SESSION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

export async function createSession(userId: string) {
  const { prisma } = await import("@/lib/db/db");
  const id = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS);
  await prisma.session.create({ data: { id, userId, expiresAt } });
  return { id, expiresAt };
}

export async function getSession(sessionId: string) {
  const { prisma } = await import("@/lib/db/db");
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: { select: { id: true, email: true, name: true, role: true } } },
  });
  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }
  return session.user;
}

export async function deleteSession(sessionId: string) {
  const { prisma } = await import("@/lib/db/db");
  await prisma.session.deleteMany({ where: { id: sessionId } });
}

export async function deleteUserSessions(userId: string) {
  const { prisma } = await import("@/lib/db/db");
  await prisma.session.deleteMany({ where: { userId } });
}

export async function cleanupExpiredSessions() {
  const { prisma } = await import("@/lib/db/db");
  await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
}
