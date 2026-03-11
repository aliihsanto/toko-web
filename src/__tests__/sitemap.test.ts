import { describe, it, expect } from 'vitest';
import { GET } from '@/app/sitemap.xml/route';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';
import { resolveLocalizedPath } from '@/lib/i18n-paths';

describe('sitemap', () => {
  let xml: string;
  let urls: string[];

  // Parse XML response once
  beforeAll(async () => {
    const response = GET();
    xml = await response.text();
    // Extract all <loc> values
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  });

  it('returns valid XML with proper headers', async () => {
    const response = GET();
    expect(response.headers.get('Content-Type')).toContain('application/xml');
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<?xml-stylesheet');
    expect(xml).toContain('<urlset');
    expect(xml).toContain('</urlset>');
  });

  it('returns entries for all static pages (11 total)', () => {
    const staticPaths = [
      '',
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
      const localizedPath = path ? resolveLocalizedPath(path, 'tr') : '';
      const found = urls.some((u) =>
        u.endsWith(`/tr${localizedPath}`) || (path === '' && u.endsWith('/tr'))
      );
      expect(found, `Missing sitemap entry for path: ${path || '/'}`).toBe(true);
    }
  });

  it('returns entries for all 4 service detail pages', () => {
    for (const service of services) {
      const localizedPath = resolveLocalizedPath(`/services/${service.slug}`, 'tr');
      const found = urls.some((u) => u.includes(localizedPath));
      expect(found, `Missing service: ${service.slug}`).toBe(true);
    }
  });

  it('returns entries for all 8 sector detail pages', () => {
    for (const sector of sectors) {
      const localizedPath = resolveLocalizedPath(`/sectors/${sector.slug}`, 'tr');
      const found = urls.some((u) => u.includes(localizedPath));
      expect(found, `Missing sector: ${sector.slug}`).toBe(true);
    }
  });

  it('has at least 23 static entries + PSEO pages', () => {
    const nonBlogUrls = urls.filter((u) => !u.includes('/blog/'));
    expect(nonBlogUrls.length).toBeGreaterThanOrEqual(23);
  });

  it('includes blog post entries (at least 16 for seed content)', () => {
    const blogUrls = urls.filter((u) => u.includes('/blog/'));
    expect(blogUrls.length).toBeGreaterThanOrEqual(16);
  });

  it('static entries have hreflang alternates for tr, en, fr, ru', () => {
    // Check homepage alternates
    const homepageBlock = xml.match(/<url>\s*<loc>[^<]*\/tr<\/loc>[\s\S]*?<\/url>/);
    expect(homepageBlock).not.toBeNull();
    expect(homepageBlock![0]).toContain('hreflang="tr"');
    expect(homepageBlock![0]).toContain('hreflang="en"');
    expect(homepageBlock![0]).toContain('hreflang="fr"');
    expect(homepageBlock![0]).toContain('hreflang="ru"');
  });

  it('each alternate URL contains the correct locale prefix', () => {
    const alternates = [...xml.matchAll(/hreflang="(\w+)" href="([^"]+)"/g)];
    for (const [, locale, href] of alternates) {
      expect(href).toContain(`/${locale}`);
    }
  });

  it('blog entries have locale in URL', () => {
    const blogUrls = urls.filter((u) => u.includes('/blog/'));
    const localePattern = /\/(tr|en|fr|ru)\/blog\//;
    for (const url of blogUrls) {
      expect(url).toMatch(localePattern);
    }
  });

  it('homepage entry has priority 1', () => {
    const homepageBlock = xml.match(/<url>\s*<loc>[^<]*\/tr<\/loc>[\s\S]*?<\/url>/);
    expect(homepageBlock).not.toBeNull();
    expect(homepageBlock![0]).toContain('<priority>1</priority>');
  });

  it('XML is properly formatted with newlines', () => {
    const lines = xml.split('\n');
    expect(lines.length).toBeGreaterThan(100);
  });
});
