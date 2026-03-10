import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('robots', () => {
  const config = robots();

  it('has rules allowing /', () => {
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const mainRule = rules.find(
      (r: any) => r.userAgent === '*'
    );
    expect(mainRule).toBeDefined();
    expect(mainRule!.allow).toBe('/');
  });

  it('has rules disallowing /api/', () => {
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const mainRule = rules.find(
      (r: any) => r.userAgent === '*'
    );
    expect(mainRule).toBeDefined();
    const disallow = Array.isArray(mainRule!.disallow)
      ? mainRule!.disallow
      : [mainRule!.disallow];
    expect(disallow).toContain('/api/');
  });

  it('includes sitemap URL pointing to https://toko.com.tr/sitemap.xml', () => {
    expect(config.sitemap).toBe('https://toko.com.tr/sitemap.xml');
  });
});
