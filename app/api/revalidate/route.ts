import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { default: Redis } = await import("ioredis");
    const url = process.env.REDIS_URL || "redis://localhost:6379";
    const redis = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 1 });
    const keys = await redis.keys("homepage:*");
    if (keys.length > 0) await redis.del(...keys);
    const refKeys = await redis.keys("ref:*");
    if (refKeys.length > 0) await redis.del(...refKeys);
    redis.disconnect();

    const { revalidateTag } = await import("next/cache");
    revalidateTag("homepage", "max");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
