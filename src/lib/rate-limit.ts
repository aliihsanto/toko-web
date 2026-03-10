const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 submissions per minute per IP

const requests = new Map<string, number[]>();

export function rateLimit(identifier: string): { success: boolean } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = requests.get(identifier) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    return { success: false };
  }

  recent.push(now);
  requests.set(identifier, recent);

  // Cleanup old entries periodically to prevent memory leaks
  if (requests.size > 10000) {
    for (const [key, times] of requests) {
      const filtered = times.filter((t) => t > windowStart);
      if (filtered.length === 0) requests.delete(key);
      else requests.set(key, filtered);
    }
  }

  return { success: true };
}
