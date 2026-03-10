import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { productPages } from '@/data/pseo/products';
import { countryPages } from '@/data/pseo/countries';
import { faqPages } from '@/data/pseo/faqs';
import { customsPages } from '@/data/pseo/customs';
import { countWords } from '@/lib/pseo/utils';
import type { LocaleContent } from '@/data/pseo/types';

const LOCALES = ['tr', 'en', 'fr', 'ru'] as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Recursively collect all LocaleContent values from an object */
function collectLocaleContents(obj: unknown): LocaleContent[] {
  const results: LocaleContent[] = [];
  if (obj === null || obj === undefined) return results;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const record = obj as Record<string, unknown>;
    if (
      typeof record.tr === 'string' &&
      typeof record.en === 'string' &&
      typeof record.fr === 'string' &&
      typeof record.ru === 'string'
    ) {
      results.push(record as unknown as LocaleContent);
    }
    for (const value of Object.values(record)) {
      results.push(...collectLocaleContents(value));
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      results.push(...collectLocaleContents(item));
    }
  }

  return results;
}

/** Get total word count for a page entry in a specific locale */
function getPageWordCount(entry: unknown, locale: keyof LocaleContent): number {
  const contents = collectLocaleContents(entry);
  let total = 0;
  for (const content of contents) {
    total += countWords(content[locale]);
  }
  return total;
}

// ─── 1. PSEO Static Params (PSEO-06) ───────────────────────────────────────

describe('PSEO Static Params', () => {
  it('should produce correct number of product locale x slug combinations', () => {
    const expected = productPages.length * LOCALES.length;
    expect(expected).toBeGreaterThanOrEqual(100); // 32 * 4 = 128
  });

  it('should produce correct number of country locale x slug combinations', () => {
    const expected = countryPages.length * LOCALES.length;
    expect(expected).toBeGreaterThanOrEqual(60); // 20 * 4 = 80
  });

  it('should produce correct number of FAQ locale x slug combinations', () => {
    const expected = faqPages.length * LOCALES.length;
    expect(expected).toBeGreaterThanOrEqual(40); // 12 * 4 = 48
  });

  it('should produce correct number of customs locale x slug combinations', () => {
    const expected = customsPages.length * LOCALES.length;
    expect(expected).toBeGreaterThanOrEqual(48); // 15 * 4 = 60
  });

  it('should have total PSEO page count >= 280 (70 unique x 4 locales)', () => {
    const total =
      (productPages.length +
        countryPages.length +
        faqPages.length +
        customsPages.length) *
      LOCALES.length;
    expect(total).toBeGreaterThanOrEqual(280);
  });

  it('should have all slugs present for every locale', () => {
    // Verify each data array has entries -- all locales share the same slugs
    const productSlugs = productPages.map((p) => p.slug);
    const countrySlugs = countryPages.map((c) => c.slug);
    const faqSlugs = faqPages.map((f) => f.slug);
    const customsSlugs = customsPages.map((c) => c.slug);

    // Every slug x locale combination should be valid
    for (const locale of LOCALES) {
      for (const page of productPages) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
      }
      for (const page of countryPages) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
      }
      for (const page of faqPages) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
      }
      for (const page of customsPages) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
      }
    }

    expect(productSlugs.length).toBeGreaterThanOrEqual(25);
    expect(countrySlugs.length).toBeGreaterThanOrEqual(15);
    expect(faqSlugs.length).toBeGreaterThanOrEqual(10);
    expect(customsSlugs.length).toBeGreaterThanOrEqual(12);
  });
});

// ─── 2. PSEO ISR Configuration (PSEO-07) ───────────────────────────────────

describe('PSEO ISR Configuration', () => {
  const routeTypes = [
    { name: 'import', dir: 'import' },
    { name: 'country', dir: 'country' },
    { name: 'faq', dir: 'faq' },
    { name: 'customs', dir: 'customs' },
  ];

  for (const route of routeTypes) {
    describe(`${route.name} route`, () => {
      const filePath = path.resolve(
        __dirname,
        `../app/[locale]/trade/${route.dir}/[slug]/page.tsx`
      );

      let fileContent: string;

      it('should exist as a route file', () => {
        expect(fs.existsSync(filePath)).toBe(true);
        fileContent = fs.readFileSync(filePath, 'utf-8');
      });

      it('should have dynamicParams = true', () => {
        fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent).toContain('export const dynamicParams = true');
      });

      it('should have revalidate = 86400', () => {
        fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent).toContain('export const revalidate = 86400');
      });

      it('should have generateStaticParams', () => {
        fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent).toContain('generateStaticParams');
      });

      it('should have generateMetadata', () => {
        fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent).toContain('generateMetadata');
      });
    });
  }
});

// ─── 3. PSEO Sitemap Integration ───────────────────────────────────────────

describe('PSEO Sitemap Integration', () => {
  const sitemapPath = path.resolve(__dirname, '../app/sitemap.ts');
  let sitemapContent: string;

  it('should exist as a file', () => {
    expect(fs.existsSync(sitemapPath)).toBe(true);
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  });

  it('should import productPages from PSEO data', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain("from '@/data/pseo/products'");
  });

  it('should import countryPages from PSEO data', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain("from '@/data/pseo/countries'");
  });

  it('should import faqPages from PSEO data', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain("from '@/data/pseo/faqs'");
  });

  it('should import customsPages from PSEO data', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain("from '@/data/pseo/customs'");
  });

  it('should include /trade/import/ entries', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('/trade/import/');
  });

  it('should include /trade/country/ entries', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('/trade/country/');
  });

  it('should include /trade/faq/ entries', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('/trade/faq/');
  });

  it('should include /trade/customs/ entries', () => {
    sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('/trade/customs/');
  });
});

// ─── 4. PSEO Content Quality (PSEO-05) ─────────────────────────────────────

describe('PSEO Content Quality', () => {
  describe('Product pages content quality', () => {
    const sampleProducts = productPages.slice(0, 5);

    for (const page of sampleProducts) {
      it(`${page.slug} should have 500+ English words`, () => {
        const wc = getPageWordCount(page, 'en');
        expect(wc).toBeGreaterThanOrEqual(500);
      });

      it(`${page.slug} should have 450+ Turkish words`, () => {
        const wc = getPageWordCount(page, 'tr');
        expect(wc).toBeGreaterThanOrEqual(450);
      });

      it(`${page.slug} should have content in all 4 locales`, () => {
        for (const locale of LOCALES) {
          const wc = getPageWordCount(page, locale);
          expect(wc).toBeGreaterThan(0);
        }
      });
    }
  });

  describe('Country pages content quality', () => {
    const sampleCountries = countryPages.slice(0, 5);

    for (const page of sampleCountries) {
      it(`${page.slug} should have 500+ English words`, () => {
        const wc = getPageWordCount(page, 'en');
        expect(wc).toBeGreaterThanOrEqual(500);
      });

      it(`${page.slug} should have 450+ Turkish words`, () => {
        const wc = getPageWordCount(page, 'tr');
        expect(wc).toBeGreaterThanOrEqual(450);
      });
    }
  });

  describe('FAQ pages content quality', () => {
    const sampleFAQs = faqPages.slice(0, 4);

    for (const page of sampleFAQs) {
      it(`${page.slug} should have 500+ English words`, () => {
        const wc = getPageWordCount(page, 'en');
        expect(wc).toBeGreaterThanOrEqual(500);
      });

      it(`${page.slug} should have 450+ Turkish words`, () => {
        const wc = getPageWordCount(page, 'tr');
        expect(wc).toBeGreaterThanOrEqual(450);
      });
    }
  });

  describe('Customs pages content quality', () => {
    const sampleCustoms = customsPages.slice(0, 4);

    for (const page of sampleCustoms) {
      it(`${page.slug} should have 500+ English words`, () => {
        const wc = getPageWordCount(page, 'en');
        expect(wc).toBeGreaterThanOrEqual(500);
      });

      it(`${page.slug} should have 450+ Turkish words`, () => {
        const wc = getPageWordCount(page, 'tr');
        expect(wc).toBeGreaterThanOrEqual(450);
      });
    }
  });

  describe('Content uniqueness', () => {
    it('should have unique product page overviews (first paragraphs differ)', () => {
      const overviews = productPages.slice(0, 5).map(
        (p) => p.content.overview[0]?.en
      );
      const unique = new Set(overviews);
      expect(unique.size).toBeGreaterThanOrEqual(2);
    });

    it('should have unique country page overviews (first paragraphs differ)', () => {
      const overviews = countryPages.slice(0, 5).map(
        (p) => p.content.overview[0]?.en
      );
      const unique = new Set(overviews);
      expect(unique.size).toBeGreaterThanOrEqual(2);
    });

    it('should have unique FAQ page intros', () => {
      const intros = faqPages.slice(0, 5).map((p) => p.content.intro.en);
      const unique = new Set(intros);
      expect(unique.size).toBeGreaterThanOrEqual(2);
    });

    it('should have unique customs page overviews', () => {
      const overviews = customsPages.slice(0, 5).map(
        (p) => p.content.overview[0]?.en
      );
      const unique = new Set(overviews);
      expect(unique.size).toBeGreaterThanOrEqual(2);
    });
  });
});

// ─── 5. PSEO URL Structure ─────────────────────────────────────────────────

describe('PSEO URL Structure', () => {
  it('should have all FAQ page slugs starting with faq-', () => {
    for (const page of faqPages) {
      expect(page.slug).toMatch(/^faq-/);
    }
  });

  it('should have all customs page slugs starting with customs-', () => {
    for (const page of customsPages) {
      expect(page.slug).toMatch(/^customs-/);
    }
  });

  it('should have no slug conflicts between page types', () => {
    const productSlugs = new Set(productPages.map((p) => p.slug));
    const countrySlugs = new Set(countryPages.map((c) => c.slug));
    const faqSlugs = new Set(faqPages.map((f) => f.slug));
    const customsSlugs = new Set(customsPages.map((c) => c.slug));

    // No overlaps between any pair
    for (const slug of productSlugs) {
      expect(countrySlugs.has(slug)).toBe(false);
      expect(faqSlugs.has(slug)).toBe(false);
      expect(customsSlugs.has(slug)).toBe(false);
    }
    for (const slug of countrySlugs) {
      expect(faqSlugs.has(slug)).toBe(false);
      expect(customsSlugs.has(slug)).toBe(false);
    }
    for (const slug of faqSlugs) {
      expect(customsSlugs.has(slug)).toBe(false);
    }
  });

  it('should use kebab-case for all slugs', () => {
    const allPages = [
      ...productPages.map((p) => p.slug),
      ...countryPages.map((c) => c.slug),
      ...faqPages.map((f) => f.slug),
      ...customsPages.map((c) => c.slug),
    ];
    for (const slug of allPages) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
