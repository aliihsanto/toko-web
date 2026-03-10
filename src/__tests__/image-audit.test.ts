import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Load all 4 locale message files
const locales = ['tr', 'en', 'fr', 'ru'] as const;
const messages: Record<string, Record<string, unknown>> = {};

for (const locale of locales) {
  const filePath = path.resolve(__dirname, `../messages/${locale}.json`);
  messages[locale] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Helper to access nested keys
function getNestedValue(obj: unknown, keyPath: string): unknown {
  return keyPath.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

describe('Image alt text audit', () => {
  const requiredImageAltKeys = [
    'HomePage.images.hero',
    'HomePage.images.istanbul',
    'AboutPage.images.team',
    'RussiaTransitPage.images.trade',
    'BlogPage.images.post',
  ];

  it.each(requiredImageAltKeys)(
    'image alt key "%s" exists in all 4 locale files',
    (key) => {
      for (const locale of locales) {
        const value = getNestedValue(messages[locale], key);
        expect(value, `Missing ${key} in ${locale}.json`).toBeDefined();
        expect(typeof value, `${key} in ${locale}.json should be a string`).toBe('string');
        expect((value as string).length, `${key} in ${locale}.json should not be empty`).toBeGreaterThan(0);
      }
    }
  );

  it('no hardcoded English alt text remains in page files', () => {
    const pagesDir = path.resolve(__dirname, '../app/[locale]');
    const hardcodedPatterns = [
      'alt="International Trade Container Port"',
      'alt="Istanbul - Trade Gateway"',
      'alt="Toko Trading Team"',
      'alt="Turkey-Russia Trade"',
      'alt="Blog post"',
    ];

    // Recursively find all page.tsx files
    function findPageFiles(dir: string): string[] {
      const results: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...findPageFiles(fullPath));
        } else if (entry.name === 'page.tsx') {
          results.push(fullPath);
        }
      }
      return results;
    }

    const pageFiles = findPageFiles(pagesDir);
    expect(pageFiles.length).toBeGreaterThan(0);

    for (const file of pageFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const pattern of hardcodedPatterns) {
        expect(
          content.includes(pattern),
          `Found hardcoded alt text "${pattern}" in ${path.relative(pagesDir, file)}`
        ).toBe(false);
      }
    }
  });

  it('all Image alt values are non-empty strings in all locales', () => {
    for (const key of requiredImageAltKeys) {
      for (const locale of locales) {
        const value = getNestedValue(messages[locale], key) as string;
        expect(value.trim().length, `${key} in ${locale}.json is empty or whitespace`).toBeGreaterThan(0);
      }
    }
  });
});
