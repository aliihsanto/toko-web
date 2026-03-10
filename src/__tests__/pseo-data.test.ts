import { describe, it, expect } from 'vitest';
import { productPages } from '@/data/pseo/products';
import { countryPages } from '@/data/pseo/countries';
import { faqPages } from '@/data/pseo/faqs';
import { customsPages } from '@/data/pseo/customs';
import { sectors } from '@/data/sectors';
import { countWords } from '@/lib/pseo/utils';
import type { LocaleContent } from '@/data/pseo/types';

const LOCALES = ['tr', 'en', 'fr', 'ru'] as const;
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MIN_WORD_COUNT = 500;

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Recursively collect all LocaleContent values from an object */
function collectLocaleContents(obj: unknown): LocaleContent[] {
  const results: LocaleContent[] = [];
  if (obj === null || obj === undefined) return results;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const record = obj as Record<string, unknown>;
    // Check if this object is a LocaleContent (has all 4 locale keys as strings)
    if (
      typeof record.tr === 'string' &&
      typeof record.en === 'string' &&
      typeof record.fr === 'string' &&
      typeof record.ru === 'string'
    ) {
      results.push(record as unknown as LocaleContent);
    }
    // Recurse into all values
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

// ─── Product Pages ──────────────────────────────────────────────────────────

describe('Product Pages', () => {
  it('should have at least 25 entries', () => {
    expect(productPages.length).toBeGreaterThanOrEqual(25);
  });

  it('should have unique slugs', () => {
    const slugs = productPages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should have valid kebab-case slugs', () => {
    for (const page of productPages) {
      expect(page.slug).toMatch(SLUG_PATTERN);
    }
  });

  it('should have valid sectorSlug referencing sectors.ts', () => {
    const validSectorSlugs = sectors.map((s) => s.slug);
    for (const page of productPages) {
      expect(validSectorSlugs).toContain(page.sectorSlug);
    }
  });

  it('should have non-empty meta.title and meta.description for all locales', () => {
    for (const page of productPages) {
      for (const locale of LOCALES) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
        expect(page.meta.description[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('should have complete locale content (no empty strings)', () => {
    for (const page of productPages) {
      const contents = collectLocaleContents(page);
      for (const content of contents) {
        for (const locale of LOCALES) {
          expect(
            content[locale].length,
            `Empty ${locale} content in product "${page.slug}"`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should have 500+ words per page per locale', () => {
    for (const page of productPages) {
      for (const locale of LOCALES) {
        const wordCount = getPageWordCount(page, locale);
        expect(
          wordCount,
          `Product "${page.slug}" [${locale}] has only ${wordCount} words`
        ).toBeGreaterThanOrEqual(MIN_WORD_COUNT);
      }
    }
  });
});

// ─── Country Pages ──────────────────────────────────────────────────────────

describe('Country Pages', () => {
  it('should have at least 15 entries', () => {
    expect(countryPages.length).toBeGreaterThanOrEqual(15);
  });

  it('should have unique slugs', () => {
    const slugs = countryPages.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should have valid kebab-case slugs', () => {
    for (const page of countryPages) {
      expect(page.slug).toMatch(SLUG_PATTERN);
    }
  });

  it('should have non-empty meta.title and meta.description for all locales', () => {
    for (const page of countryPages) {
      for (const locale of LOCALES) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
        expect(page.meta.description[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('should have complete locale content (no empty strings)', () => {
    for (const page of countryPages) {
      const contents = collectLocaleContents(page);
      for (const content of contents) {
        for (const locale of LOCALES) {
          expect(
            content[locale].length,
            `Empty ${locale} content in country "${page.slug}"`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should have 500+ words per page per locale', () => {
    for (const page of countryPages) {
      for (const locale of LOCALES) {
        const wordCount = getPageWordCount(page, locale);
        expect(
          wordCount,
          `Country "${page.slug}" [${locale}] has only ${wordCount} words`
        ).toBeGreaterThanOrEqual(MIN_WORD_COUNT);
      }
    }
  });
});

// ─── FAQ Pages ──────────────────────────────────────────────────────────────

describe('FAQ Pages', () => {
  it('should have at least 10 entries', () => {
    expect(faqPages.length).toBeGreaterThanOrEqual(10);
  });

  it('should have unique slugs', () => {
    const slugs = faqPages.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should have valid kebab-case slugs', () => {
    for (const page of faqPages) {
      expect(page.slug).toMatch(SLUG_PATTERN);
    }
  });

  it('should have at least 8 questions per page', () => {
    for (const page of faqPages) {
      expect(
        page.content.questions.length,
        `FAQ "${page.slug}" has only ${page.content.questions.length} questions`
      ).toBeGreaterThanOrEqual(8);
    }
  });

  it('should have non-empty meta.title and meta.description for all locales', () => {
    for (const page of faqPages) {
      for (const locale of LOCALES) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
        expect(page.meta.description[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('should have complete locale content (no empty strings)', () => {
    for (const page of faqPages) {
      const contents = collectLocaleContents(page);
      for (const content of contents) {
        for (const locale of LOCALES) {
          expect(
            content[locale].length,
            `Empty ${locale} content in FAQ "${page.slug}"`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should have 500+ words per page per locale', () => {
    for (const page of faqPages) {
      for (const locale of LOCALES) {
        const wordCount = getPageWordCount(page, locale);
        expect(
          wordCount,
          `FAQ "${page.slug}" [${locale}] has only ${wordCount} words`
        ).toBeGreaterThanOrEqual(MIN_WORD_COUNT);
      }
    }
  });
});

// ─── Customs Pages ──────────────────────────────────────────────────────────

describe('Customs Pages', () => {
  it('should have at least 12 entries', () => {
    expect(customsPages.length).toBeGreaterThanOrEqual(12);
  });

  it('should have unique slugs', () => {
    const slugs = customsPages.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should have valid kebab-case slugs', () => {
    for (const page of customsPages) {
      expect(page.slug).toMatch(SLUG_PATTERN);
    }
  });

  it('should have non-empty meta.title and meta.description for all locales', () => {
    for (const page of customsPages) {
      for (const locale of LOCALES) {
        expect(page.meta.title[locale].length).toBeGreaterThan(0);
        expect(page.meta.description[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('should have complete locale content (no empty strings)', () => {
    for (const page of customsPages) {
      const contents = collectLocaleContents(page);
      for (const content of contents) {
        for (const locale of LOCALES) {
          expect(
            content[locale].length,
            `Empty ${locale} content in customs "${page.slug}"`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should have 500+ words per page per locale', () => {
    for (const page of customsPages) {
      for (const locale of LOCALES) {
        const wordCount = getPageWordCount(page, locale);
        expect(
          wordCount,
          `Customs "${page.slug}" [${locale}] has only ${wordCount} words`
        ).toBeGreaterThanOrEqual(MIN_WORD_COUNT);
      }
    }
  });
});

// ─── Cross-cutting ──────────────────────────────────────────────────────────

describe('Cross-cutting', () => {
  it('should have no duplicate slugs across all data files', () => {
    const allSlugs = [
      ...productPages.map((p) => p.slug),
      ...countryPages.map((c) => c.slug),
      ...faqPages.map((f) => f.slug),
      ...customsPages.map((c) => c.slug),
    ];
    expect(new Set(allSlugs).size).toBe(allSlugs.length);
  });
});
