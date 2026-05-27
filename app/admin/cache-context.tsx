"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useTransition,
  useOptimistic,
} from "react";
import { toast } from "sonner";

// Define standard types for our cache system
interface CacheEntry<T = any> {
  data: T;
  tags: string[];
  timestamp: number;
}

interface CacheContextType {
  cache: Record<string, CacheEntry>;
  setCacheValue: (key: string, data: any, tags: string[]) => void;
  getCacheValue: (key: string) => CacheEntry | null;
  invalidateTags: (tags: string[]) => Promise<void>;
  registerSubscriber: (tag: string, callback: () => void) => () => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
  optimisticUpdate: (tag: string, updateFn: (data: any) => any) => void;
}

const CacheContext = createContext<CacheContextType | null>(null);

export function AdminCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<Record<string, CacheEntry>>({});
  const subscribersRef = useRef<Record<string, Set<() => void>>>({});
  const [isPending, startTransition] = useTransition();

  // Set cache value and track tags
  const setCacheValue = (key: string, data: any, tags: string[]) => {
    setCache((prev) => ({
      ...prev,
      [key]: {
        data,
        tags,
        timestamp: Date.now(),
      },
    }));
  };

  // Get from cache
  const getCacheValue = (key: string) => {
    const entry = cache[key];
    if (!entry) return null;
    return entry;
  };

  // Register a component callback to a cache tag
  const registerSubscriber = (tag: string, callback: () => void) => {
    if (!subscribersRef.current[tag]) {
      subscribersRef.current[tag] = new Set();
    }
    subscribersRef.current[tag].add(callback);

    return () => {
      subscribersRef.current[tag]?.delete(callback);
      if (subscribersRef.current[tag]?.size === 0) {
        delete subscribersRef.current[tag];
      }
    };
  };

  // Invalidate cache entries by tags and trigger subscribers
  const invalidateTags = async (tags: string[]) => {
    // 1. Identify which cache keys have matching tags and clear/mark them
    setCache((prev) => {
      const next = { ...prev };
      let affected = false;
      Object.keys(next).forEach((key) => {
        const hasMatchingTag = next[key].tags.some((tag) => tags.includes(tag));
        if (hasMatchingTag) {
          delete next[key];
          affected = true;
        }
      });
      return affected ? next : prev;
    });

    // 2. Trigger all callbacks registered for these tags in a transition
    startTransition(() => {
      tags.forEach((tag) => {
        const callbacks = subscribersRef.current[tag];
        if (callbacks) {
          callbacks.forEach((cb) => {
            try {
              cb();
            } catch (e) {
              console.error(`Error in cache subscriber for tag "${tag}":`, e);
            }
          });
        }
      });
    });

    // Optional background revalidation notification for premium UX
    toast.success(`Cache refreshed for: ${tags.join(", ")}`, {
      description: "Data synchronized across dashboard smoothly.",
      duration: 2000,
    });
  };

  // Allow optimistic updates to the cache directly
  const optimisticUpdate = (tag: string, updateFn: (data: any) => any) => {
    setCache((prev) => {
      const next = { ...prev };
      let updated = false;
      Object.keys(next).forEach((key) => {
        const entry = next[key];
        if (entry.tags.includes(tag)) {
          next[key] = {
            ...entry,
            data: updateFn(entry.data),
            timestamp: Date.now(),
          };
          updated = true;
        }
      });
      return updated ? next : prev;
    });
  };

  return (
    <CacheContext.Provider
      value={{
        cache,
        setCacheValue,
        getCacheValue,
        invalidateTags,
        registerSubscriber,
        isPending,
        startTransition,
        optimisticUpdate,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}

// 1. useCache Hook for declarative caching
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: { tags?: string[]; ttl?: number } = {}
) {
  const context = useContext(CacheContext);
  if (!context) throw new Error("useCache must be used within an AdminCacheProvider");

  const { getCacheValue, setCacheValue, registerSubscriber } = context;
  const [data, setData] = useState<T | null>(() => {
    const entry = getCacheValue(key);
    return entry ? (entry.data as T) : null;
  });
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<Error | null>(null);
  const tags = options.tags || [];
  const ttl = options.ttl || 60000; // default 1 min TTL

  const loadData = async (force = false) => {
    const cached = getCacheValue(key);
    if (!force && cached && Date.now() - cached.timestamp < ttl) {
      setData(cached.data as T);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const freshData = await fetcher();
      setCacheValue(key, freshData, tags);
      setData(freshData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch"));
      // fallback to cached data if error
      if (cached) {
        setData(cached.data as T);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount or when key changes
  useEffect(() => {
    loadData();
  }, [key]);

  // Subscribe to tags so we reload when tags are invalidated
  useEffect(() => {
    if (tags.length === 0) return;

    const unsubscribers = tags.map((tag) =>
      registerSubscriber(tag, () => {
        // Trigger a background refresh
        loadData(true);
      })
    );

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [key, JSON.stringify(tags)]);

  return {
    data,
    loading,
    error,
    refresh: () => loadData(true),
  };
}

// 2. useCacheTag Hook to register interest in a tag (reactive revalidation trigger)
export function useCacheTag(tag: string, onInvalidate: () => void) {
  const context = useContext(CacheContext);
  if (!context) throw new Error("useCacheTag must be used within an AdminCacheProvider");

  useEffect(() => {
    return context.registerSubscriber(tag, onInvalidate);
  }, [tag, onInvalidate]);
}

// 3. useGlobalControl Hook for invalidation, optimistic updates, and global indicators
export function useGlobalControl() {
  const context = useContext(CacheContext);
  if (!context) throw new Error("useGlobalControl must be used within an AdminCacheProvider");

  return {
    isPending: context.isPending,
    startTransition: context.startTransition,
    cacheUpdate: context.invalidateTags,
    optimisticUpdate: context.optimisticUpdate,
    // Provide general cache stats/dump
    getCacheStats: () => {
      const keys = Object.keys(context.cache);
      return {
        size: keys.length,
        keys,
      };
    },
  };
}
