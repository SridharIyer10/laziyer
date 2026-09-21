interface Record {
  count: number;
  resetAt: number;
}

const store = new Map<string, Record>();

// Prune expired entries every minute to prevent unbounded memory growth
const pruner = setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of store) {
    if (now > rec.resetAt) store.delete(key);
  }
}, 60_000);

// Prevent the interval from keeping the process alive in scripts
if (typeof pruner.unref === "function") pruner.unref();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Sliding-window in-memory rate limiter.
 * Works for serverless (each cold start resets the window, which is acceptable
 * for a personal site). Upgrade to Upstash Redis for cross-instance limits.
 */
export function ratelimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const rec = store.get(key);

  if (!rec || now > rec.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (rec.count >= limit) {
    return { success: false, remaining: 0, resetAt: rec.resetAt };
  }

  rec.count++;
  return { success: true, remaining: limit - rec.count, resetAt: rec.resetAt };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
