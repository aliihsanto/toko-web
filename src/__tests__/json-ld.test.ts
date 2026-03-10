import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { JsonLd } from '@/lib/seo/json-ld';
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from '@/lib/seo/structured-data';

describe('JsonLd Component', () => {
  it('renders a script tag with type application/ld+json', () => {
    const data = {
      '@context': 'https://schema.org' as const,
      '@type': 'Organization' as const,
      name: 'Test',
    };
    const html = renderToString(createElement(JsonLd, { data: data as any }));
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('<script');
  });

  it('has XSS protection - no raw < characters in JSON output', () => {
    const data = {
      '@context': 'https://schema.org' as const,
      '@type': 'Organization' as const,
      name: '<script>alert("xss")</script>',
    };
    const html = renderToString(createElement(JsonLd, { data: data as any }));
    // The JSON content should not contain raw < (should be escaped to \u003c)
    const jsonContent = html.match(/>([^<]*)</)?.[1] || '';
    expect(jsonContent).not.toContain('<script>');
    expect(jsonContent).toContain('\\u003c');
  });
});

describe('getOrganizationSchema', () => {
  it('returns object with @context, @type Organization, name, url, logo, contactPoint', () => {
    const schema = getOrganizationSchema('tr');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema).toHaveProperty('name');
    expect(schema).toHaveProperty('url');
    expect(schema).toHaveProperty('logo');
    expect(schema).toHaveProperty('contactPoint');
  });

  it('has availableLanguage including Turkish, English, French, Russian', () => {
    const schema = getOrganizationSchema('en');
    const contactPoint = schema.contactPoint as any;
    expect(contactPoint).toBeDefined();
    const languages = contactPoint.availableLanguage;
    expect(languages).toContain('Turkish');
    expect(languages).toContain('English');
    expect(languages).toContain('French');
    expect(languages).toContain('Russian');
  });
});

describe('getLocalBusinessSchema', () => {
  it('returns @type LocalBusiness with address in Istanbul, TR', () => {
    const schema = getLocalBusinessSchema('tr');
    expect(schema['@type']).toBe('LocalBusiness');
    const address = schema.address as any;
    expect(address).toBeDefined();
    expect(address.addressLocality).toBe('Istanbul');
    expect(address.addressCountry).toBe('TR');
  });
});

describe('getBreadcrumbSchema', () => {
  it('returns BreadcrumbList with 2 ListItems, positions 1 and 2', () => {
    const schema = getBreadcrumbSchema([
      { name: 'Home', url: 'https://toko.com.tr/tr' },
      { name: 'About', url: 'https://toko.com.tr/tr/about' },
    ]);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    const items = schema.itemListElement as any[];
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(items[0]['@type']).toBe('ListItem');
    expect(items[1]['@type']).toBe('ListItem');
  });
});

describe('getFAQSchema', () => {
  it('returns FAQPage with mainEntity containing Question+Answer', () => {
    const schema = getFAQSchema([
      { question: 'Q1', answer: 'A1' },
    ]);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    const mainEntity = schema.mainEntity as any[];
    expect(mainEntity).toHaveLength(1);
    expect(mainEntity[0]['@type']).toBe('Question');
    expect(mainEntity[0].name).toBe('Q1');
    expect(mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(mainEntity[0].acceptedAnswer.text).toBe('A1');
  });
});
