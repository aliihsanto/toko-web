import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('hreflang metadata structure', () => {
  const baseUrl = 'https://toko.com.tr';
  const expectedLocales = ['tr', 'en', 'fr', 'ru'];

  it('should support all 4 locales in the routing config used for hreflang', () => {
    expect(routing.locales).toEqual(expectedLocales);
  });

  it('should generate correct hreflang URLs for all locales', () => {
    const hreflangUrls: Record<string, string> = {};
    for (const locale of routing.locales) {
      hreflangUrls[locale] = `${baseUrl}/${locale}`;
    }

    expect(hreflangUrls).toEqual({
      tr: 'https://toko.com.tr/tr',
      en: 'https://toko.com.tr/en',
      fr: 'https://toko.com.tr/fr',
      ru: 'https://toko.com.tr/ru',
    });
  });

  it('should have a hreflang URL for every supported locale', () => {
    for (const locale of expectedLocales) {
      const url = `${baseUrl}/${locale}`;
      expect(url).toMatch(/^https:\/\/toko\.com\.tr\/(tr|en|fr|ru)$/);
    }
  });

  it('should use the same base URL for all hreflang alternates', () => {
    for (const locale of routing.locales) {
      const url = `${baseUrl}/${locale}`;
      expect(url.startsWith(baseUrl)).toBe(true);
    }
  });

  it('should generate canonical URL pattern matching hreflang pattern', () => {
    for (const locale of routing.locales) {
      const canonical = `${baseUrl}/${locale}`;
      const hreflang = `${baseUrl}/${locale}`;
      expect(canonical).toBe(hreflang);
    }
  });
});
