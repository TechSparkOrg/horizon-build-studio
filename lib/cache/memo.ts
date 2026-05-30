type CacheEntry<T> = { data: T; expiresAt: number };
type CacheKey = string;

const store = new Map<CacheKey, CacheEntry<unknown>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function memo<T>(
  key: CacheKey,
  fetcher: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL,
): Promise<T> {
  const now = Date.now();
  const existing = store.get(key);
  if (existing && existing.expiresAt > now) {
    return Promise.resolve(existing.data as T);
  }
  return fetcher().then((data) => {
    store.set(key, { data, expiresAt: now + ttlMs });
    return data;
  });
}

export function memoInvalidate(pattern?: string): void {
  if (!pattern) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(pattern)) store.delete(key);
  }
}

export function memoCacheSize(): number {
  return store.size;
}
