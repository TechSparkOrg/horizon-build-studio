const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type FetchOpts = { next?: { tags?: string[]; revalidate?: number }; cache?: RequestInit['cache'] };

class ApiBuilder {
  private tags: string[] = [];
  private revalidateSecs?: number;
  private cache?: RequestInit['cache'];

  constructor(private path: string) {}

  tag(t: string) { this.tags.push(t); return this; }

  revalidate(secs: number) { this.revalidateSecs = secs; return this; }

  noCache() { this.cache = 'no-store'; return this; }

  private opts(): FetchOpts {
    const o: FetchOpts = {};
    if (this.tags.length || this.revalidateSecs) {
      o.next = {};
      if (this.tags.length) o.next.tags = this.tags;
      if (this.revalidateSecs) o.next.revalidate = this.revalidateSecs;
    }
    if (this.cache) o.cache = this.cache;
    return o;
  }

  async get<T = unknown>() {
    const res = await fetch(`${BASE}${this.path}`, this.opts());
    if (!res.ok) throw new Error(`GET ${this.path}: ${res.status}`);
    return res.json() as T;
  }

  async post<T = unknown>(body?: unknown) {
    const res = await fetch(`${BASE}${this.path}`, {
      method: 'POST',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      ...this.opts(),
    });
    if (!res.ok) throw new Error(`POST ${this.path}: ${res.status}`);
    return res.json() as T;
  }
}

export const api = (path: string) => new ApiBuilder(path);
