import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';

describe('sitemap', () => {
  const entries = sitemap();

  // Blog entries are locale-specific (no cross-locale alternates)
  const staticEntryCount = 11 + services.length + sectors.length; // 11 + 4 + 8 = 23
  const blogEntries = entries.filter((e) => e.url.includes('/blog/'));
  const staticEntries = entries.filter((e) => !e.url.includes('/blog/'));

  it('returns entries for all static pages (11 total)', () => {
    // Static pages: home, about, services, sectors, references, contact, quote, sourcing, callback, russia-transit, blog
    const staticPaths = [
      '', // homepage
      '/about',
      '/services',
      '/sectors',
      '/references',
      '/contact',
      '/quote',
      '/sourcing',
      '/callback',
      '/russia-transit',
      '/blog',
    ];

    for (const path of staticPaths) {
      const found = entries.find((e) =>
        e.url.endsWith(`/tr${path}`) || (path === '' && e.url.endsWith('/tr'))
      );
      expect(found, `Missing sitemap entry for path: ${path || '/'}`).toBeDefined();
    }
  });

  it('returns entries for all 4 service detail pages', () => {
    for (const service of services) {
      const found = entries.find((e) =>
        e.url.includes(`/services/${service.slug}`)
      );
      expect(found, `Missing service: ${service.slug}`).toBeDefined();
    }
  });

  it('returns entries for all 8 sector detail pages', () => {
    for (const sector of sectors) {
      const found = entries.find((e) =>
        e.url.includes(`/sectors/${sector.slug}`)
      );
      expect(found, `Missing sector: ${sector.slug}`).toBeDefined();
    }
  });

  it('has at least 23 static entries (11 + 4 + 8)', () => {
    // Static/service/sector entries use makeEntry with hreflang alternates
    // Blog entries are separate (locale-specific, no cross-locale alternates)
    expect(staticEntries.length).toBe(staticEntryCount);
  });

  it('includes blog post entries (at least 16 for seed content)', () => {
    expect(blogEntries.length).toBeGreaterThanOrEqual(16);
  });

  it('static entries have alternates.languages with keys tr, en, fr, ru', () => {
    for (const entry of staticEntries) {
      const languages = (entry as any).alternates?.languages;
      expect(languages, `Missing alternates for ${entry.url}`).toBeDefined();
      expect(Object.keys(languages)).toContain('tr');
      expect(Object.keys(languages)).toContain('en');
      expect(Object.keys(languages)).toContain('fr');
      expect(Object.keys(languages)).toContain('ru');
    }
  });

  it('each alternate URL contains the correct locale prefix', () => {
    for (const entry of staticEntries) {
      const languages = (entry as any).alternates?.languages;
      if (languages) {
        for (const [locale, url] of Object.entries(languages)) {
          expect(url as string).toContain(`/${locale}`);
        }
      }
    }
  });

  it('blog entries have locale in URL', () => {
    const localePattern = /\/(tr|en|fr|ru)\/blog\//;
    for (const entry of blogEntries) {
      expect(entry.url).toMatch(localePattern);
    }
  });

  it('homepage entry has priority 1.0', () => {
    const homepage = entries.find((e) => e.url.endsWith('/tr'));
    expect(homepage).toBeDefined();
    expect(homepage!.priority).toBe(1.0);
  });
});
