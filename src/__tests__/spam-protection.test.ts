import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { rateLimit } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';

describe('rateLimit', () => {
  const originalDateNow = Date.now;

  afterEach(() => {
    Date.now = originalDateNow;
  });

  it('allows up to 5 requests within the window', () => {
    const ip = 'test-ip-allow-5';
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(ip).success).toBe(true);
    }
  });

  it('blocks the 6th request within the window', () => {
    const ip = 'test-ip-block-6th';
    for (let i = 0; i < 5; i++) {
      rateLimit(ip);
    }
    expect(rateLimit(ip).success).toBe(false);
  });

  it('allows requests again after the window passes', () => {
    const ip = 'test-ip-window-pass';
    let now = 1000000;
    Date.now = () => now;

    for (let i = 0; i < 5; i++) {
      rateLimit(ip);
    }
    expect(rateLimit(ip).success).toBe(false);

    // Advance past the 1-minute window
    now += 61000;
    expect(rateLimit(ip).success).toBe(true);
  });

  it('tracks different IPs independently', () => {
    const ip1 = 'test-ip-independent-1';
    const ip2 = 'test-ip-independent-2';

    for (let i = 0; i < 5; i++) {
      rateLimit(ip1);
    }
    expect(rateLimit(ip1).success).toBe(false);
    expect(rateLimit(ip2).success).toBe(true);
  });
});

describe('verifyRecaptcha', () => {
  const originalEnv = process.env.RECAPTCHA_SECRET_KEY;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    delete process.env.RECAPTCHA_SECRET_KEY;
  });

  afterEach(() => {
    if (originalEnv) {
      process.env.RECAPTCHA_SECRET_KEY = originalEnv;
    } else {
      delete process.env.RECAPTCHA_SECRET_KEY;
    }
    globalThis.fetch = originalFetch;
  });

  it('returns true when RECAPTCHA_SECRET_KEY is not set (dev mode)', async () => {
    const result = await verifyRecaptcha('any-token');
    expect(result).toBe(true);
  });

  it('returns true for valid token with score >= 0.5', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, score: 0.7 }),
    }) as unknown as typeof fetch;

    const result = await verifyRecaptcha('valid-token');
    expect(result).toBe(true);
  });

  it('returns false for score < 0.5', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, score: 0.3 }),
    }) as unknown as typeof fetch;

    const result = await verifyRecaptcha('low-score-token');
    expect(result).toBe(false);
  });

  it('returns false when success is false', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, score: 0.9 }),
    }) as unknown as typeof fetch;

    const result = await verifyRecaptcha('failed-token');
    expect(result).toBe(false);
  });

  it('returns false on network error', async () => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    globalThis.fetch = vi.fn().mockRejectedValue(
      new Error('Network error')
    ) as unknown as typeof fetch;

    const result = await verifyRecaptcha('error-token');
    expect(result).toBe(false);
  });
});
