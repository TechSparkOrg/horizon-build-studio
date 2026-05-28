export async function dbQuery<T>(fn: () => Promise<T>): Promise<T> {
  return fn();
}

export async function dbMutate<T>(fn: () => Promise<T>): Promise<T> {
  const { requireAuth } = await import("@/lib/auth");
  const user = await requireAuth();
  try {
    const result = await fn();

    if (process.env.NODE_ENV !== "production") {
      console.log(`[dbMutate] user=${user.id} role=${user.role}`);
    }

    // Fire-and-forget: purge Redis caches
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/revalidate`,
      { method: "POST", headers: { "content-type": "application/json" } },
    ).catch(() => {});

    return result;
  } catch (error) {
    throw error;
  }
}
