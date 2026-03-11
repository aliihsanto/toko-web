import { describe, it, expect } from 'vitest';

describe('SEO Metadata Helpers', () => {
  describe('BASE_URL', () => {
    it('should equal https://toko.com.tr', async () => {
      const { BASE_URL } = await import('@/lib/seo/metadata');
      expect(BASE_URL).toBe('https://toko.com.tr');
    });
  });

  describe('LOCALE_TO_OG', () => {
    it('should map tr to tr_TR', async () => {
      const { LOCALE_TO_OG } = await import('@/lib/seo/metadata');
      expect(LOCALE_TO_OG['tr']).toBe('tr_TR');
    });

    it('should map en to en_US', async () => {
      const { LOCALE_TO_OG } = await import('@/lib/seo/metadata');
      expect(LOCALE_TO_OG['en']).toBe('en_US');
    });

    it('should map fr to fr_FR', async () => {
      const { LOCALE_TO_OG } = await import('@/lib/seo/metadata');
      expect(LOCALE_TO_OG['fr']).toBe('fr_FR');
    });

    it('should map ru to ru_RU', async () => {
      const { LOCALE_TO_OG } = await import('@/lib/seo/metadata');
      expect(LOCALE_TO_OG['ru']).toBe('ru_RU');
    });

    it('should have entries for all 4 locales', async () => {
      const { LOCALE_TO_OG } = await import('@/lib/seo/metadata');
      expect(Object.keys(LOCALE_TO_OG).sort()).toEqual(['en', 'fr', 'ru', 'tr']);
    });
  });

  describe('getAlternates', () => {
    it('should return canonical with localized URL for /about path', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('tr', '/about');
      expect(result.canonical).toBe('https://toko.com.tr/tr/hakkimizda');
    });

    it('should return languages object with localized URLs for /about path', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('tr', '/about');
      expect(result.languages).toHaveProperty('tr', 'https://toko.com.tr/tr/hakkimizda');
      expect(result.languages).toHaveProperty('en', 'https://toko.com.tr/en/about');
      expect(result.languages).toHaveProperty('fr', 'https://toko.com.tr/fr/a-propos');
      expect(result.languages).toHaveProperty('ru', 'https://toko.com.tr/ru/o-nas');
    });

    it('should include x-default pointing to /tr with localized path for /about', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('tr', '/about');
      expect(result.languages).toHaveProperty('x-default', 'https://toko.com.tr/tr/hakkimizda');
    });

    it('should return correct root-level alternates for empty path', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('en', '');
      expect(result.canonical).toBe('https://toko.com.tr/en');
      expect(result.languages).toHaveProperty('tr', 'https://toko.com.tr/tr');
      expect(result.languages).toHaveProperty('en', 'https://toko.com.tr/en');
      expect(result.languages).toHaveProperty('x-default', 'https://toko.com.tr/tr');
    });

    it('should handle paths with leading slash correctly', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('fr', '/services');
      expect(result.canonical).toBe('https://toko.com.tr/fr/services');
    });

    it('should localize service paths per locale', async () => {
      const { getAlternates } = await import('@/lib/seo/metadata');
      const result = getAlternates('tr', '/services');
      expect(result.canonical).toBe('https://toko.com.tr/tr/hizmetler');
      expect(result.languages).toHaveProperty('ru', 'https://toko.com.tr/ru/uslugi');
    });
  });

  describe('COMPANY_INFO', () => {
    it('should have name field set to Toko Trading', async () => {
      const { COMPANY_INFO } = await import('@/lib/seo/company-info');
      expect(COMPANY_INFO.name).toBe('Toko Trading');
    });

    it('should have url field set to https://toko.com.tr', async () => {
      const { COMPANY_INFO } = await import('@/lib/seo/company-info');
      expect(COMPANY_INFO.url).toBe('https://toko.com.tr');
    });

    it('should have phone field', async () => {
      const { COMPANY_INFO } = await import('@/lib/seo/company-info');
      expect(COMPANY_INFO.phone).toBeDefined();
      expect(typeof COMPANY_INFO.phone).toBe('string');
    });

    it('should have address with city and country', async () => {
      const { COMPANY_INFO } = await import('@/lib/seo/company-info');
      expect(COMPANY_INFO.address).toBeDefined();
      expect(COMPANY_INFO.address.city).toBe('Başakşehir');
      expect(COMPANY_INFO.address.country).toBe('TR');
    });

    it('should have availableLanguages array', async () => {
      const { COMPANY_INFO } = await import('@/lib/seo/company-info');
      expect(COMPANY_INFO.availableLanguages).toEqual([
        'Turkish',
        'English',
        'French',
        'Russian',
      ]);
    });
  });
});
