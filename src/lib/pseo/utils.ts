/**
 * PSEO Utility Helpers
 *
 * Content accessors and lookup functions for programmatic SEO pages.
 */

import type {
  LocaleContent,
  ProductPageData,
  CountryPageData,
  FAQPageData,
  CustomsPageData,
} from '@/data/pseo/types';

import { productPages } from '@/data/pseo/products';
import { countryPages } from '@/data/pseo/countries';
import { faqPages } from '@/data/pseo/faqs';
import { customsPages } from '@/data/pseo/customs';

/**
 * Resolve a locale string from a LocaleContent object.
 * Falls back to 'en' if the requested locale key is missing.
 */
export function t(content: LocaleContent, locale: string): string {
  const key = locale as keyof LocaleContent;
  return content[key] || content.en;
}

/** Count words in a text string (splits on whitespace) */
export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

// ─── Product Pages ──────────────────────────────────────────────────────────

export function getProductPage(slug: string): ProductPageData | undefined {
  return productPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productPages.map((p) => p.slug);
}

// ─── Country Pages ──────────────────────────────────────────────────────────

export function getCountryPage(slug: string): CountryPageData | undefined {
  return countryPages.find((c) => c.slug === slug);
}

export function getAllCountrySlugs(): string[] {
  return countryPages.map((c) => c.slug);
}

// ─── FAQ Pages ──────────────────────────────────────────────────────────────

export function getFAQPage(slug: string): FAQPageData | undefined {
  return faqPages.find((f) => f.slug === slug);
}

export function getAllFAQSlugs(): string[] {
  return faqPages.map((f) => f.slug);
}

// ─── Customs Pages ──────────────────────────────────────────────────────────

export function getCustomsPage(slug: string): CustomsPageData | undefined {
  return customsPages.find((c) => c.slug === slug);
}

export function getAllCustomsSlugs(): string[] {
  return customsPages.map((c) => c.slug);
}
