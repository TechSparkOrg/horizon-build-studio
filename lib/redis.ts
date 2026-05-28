import "server-only";
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const globalForRedis = globalThis as unknown as { redis: Redis | undefined };

export const redis =
  globalForRedis.redis ??
  new Redis(REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy() {
      return null;
    },
    reconnectOnError() {
      return false;
    },
    lazyConnect: true,
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
