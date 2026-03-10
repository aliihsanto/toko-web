import { describe, it, expect, vi } from 'vitest';

// Mock next-intl/middleware to avoid importing next/server in test environment
vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => vi.fn()),
}));

// Mock next/server to provide NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn(),
    next: vi.fn(),
    rewrite: vi.fn(),
  },
}));

describe('middleware configuration', () => {
  it('should export a default middleware function', async () => {
    const { default: middleware } = await import('@/middleware');
    expect(typeof middleware).toBe('function');
  });

  it('should export a config object with matcher', async () => {
    const { config } = await import('@/middleware');
    expect(config).toBeDefined();
    expect(config.matcher).toBeDefined();
    expect(Array.isArray(config.matcher)).toBe(true);
  });

  it('should match the root path /', async () => {
    const { config } = await import('@/middleware');
    expect(config.matcher).toContain('/');
  });

  it('should match locale-prefixed paths', async () => {
    const { config } = await import('@/middleware');
    const localePattern = config.matcher.find(
      (pattern: string) => pattern.includes('tr') && pattern.includes('en')
    );
    expect(localePattern).toBeDefined();
    expect(localePattern).toContain('tr');
    expect(localePattern).toContain('en');
    expect(localePattern).toContain('fr');
    expect(localePattern).toContain('ru');
  });

  it('should have exactly 2 matcher patterns', async () => {
    const { config } = await import('@/middleware');
    expect(config.matcher).toHaveLength(2);
  });
});
