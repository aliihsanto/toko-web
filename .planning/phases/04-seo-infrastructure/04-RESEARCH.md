# Phase 4: SEO Infrastructure - Research

**Researched:** 2026-03-10
**Domain:** SEO, Structured Data, Metadata, Core Web Vitals for Next.js 16 + next-intl multilingual site
**Confidence:** HIGH

## Summary

This phase adds comprehensive SEO infrastructure to the Toko Trading multilingual corporate website. The site already has Next.js 16.1.6, next-intl 4.8.3, and 4 locales (tr, en, fr, ru) with locale-prefixed routing (`localePrefix: 'always'`). The layout already has a basic `generateMetadata` with title template and hreflang alternates for the root, and two detail page types (services/[slug], sectors/[slug]) already export `generateMetadata` with title+description. However, 10+ pages lack per-page metadata, there is no structured data (JSON-LD), no sitemap.ts, no robots.ts, and no OG image generation.

The implementation uses exclusively Next.js built-in APIs: `generateMetadata` for page-level metadata, `<script type="application/ld+json">` for JSON-LD, `sitemap.ts` for multilingual sitemaps with hreflang alternates, `robots.ts` for crawl configuration, and `opengraph-image.tsx` with `ImageResponse` from `next/og` for dynamic OG images. The `schema-dts` package provides TypeScript types for JSON-LD. No third-party SEO libraries are needed.

**Primary recommendation:** Use Next.js built-in metadata APIs throughout. Add `generateMetadata` to every page, create a reusable JSON-LD component, implement `sitemap.ts` with all locale+page combinations, and generate branded OG images with `next/og`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | generateMetadata on all pages with locale-aware title, description, Open Graph tags | Next.js generateMetadata + next-intl getTranslations pattern; metadataBase for URL composition; openGraph fields with locale |
| SEO-02 | JSON-LD structured data: Organization, LocalBusiness, BreadcrumbList on all pages | script tag with dangerouslySetInnerHTML per Next.js official guide; schema-dts for types; reusable JsonLd component |
| SEO-03 | FAQPage and Article structured data on blog and FAQ pages (prep for Phase 5) | Same JSON-LD pattern; FAQPage schema for russia-transit FAQ section; Article schema stub for blog infrastructure |
| SEO-04 | Multilingual sitemap.ts with hreflang alternates for all pages and locales | Next.js MetadataRoute.Sitemap with alternates.languages; enumerate all static + dynamic routes x 4 locales |
| SEO-05 | robots.ts configured for proper crawling | Next.js MetadataRoute.Robots; allow all, disallow /api/, point to sitemap |
| SEO-06 | Core Web Vitals optimized -- green Lighthouse scores | Image priority flags, preconnect hints, font display swap, reduce CLS from animations |
| SEO-07 | Images optimized with next/image, proper alt text in all languages | Audit all Image components for width/height/alt; add locale-aware alt text via translations |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next (built-in metadata) | 16.1.6 | generateMetadata, sitemap.ts, robots.ts, opengraph-image.tsx | Official Next.js API, zero dependencies, type-safe |
| next-intl/server | 4.8.3 | getTranslations for locale-aware metadata | Already in use, provides static rendering eligibility |
| next/og (ImageResponse) | 16.1.6 | Dynamic OG image generation | Built into Next.js, no extra dependency |
| schema-dts | 1.1.x | TypeScript types for JSON-LD Schema.org vocabulary | Google-maintained, zero runtime cost, full Schema.org coverage |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | 16.1.6 | Image optimization with width/height/alt | Already in use across all pages |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| schema-dts | Manual JSON-LD objects | schema-dts adds type safety at zero runtime cost; manual is fine but error-prone |
| next/og ImageResponse | Static OG images | Dynamic is better for locale-specific text on images |
| next-seo (old) | Next.js built-in metadata | next-seo is legacy Pages Router; built-in is the standard for App Router |

**Installation:**
```bash
npm install schema-dts
```

That is the only new dependency needed. Everything else is built into Next.js 16 or already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/
    sitemap.ts                          # Multilingual sitemap
    robots.ts                           # Crawl configuration
    [locale]/
      layout.tsx                        # Root metadata with metadataBase, OG defaults
      page.tsx                          # Homepage generateMetadata
      opengraph-image.tsx               # Dynamic OG for homepage
      about/
        page.tsx                        # + generateMetadata
        opengraph-image.tsx             # Dynamic OG
      services/
        page.tsx                        # + generateMetadata
        [slug]/
          page.tsx                      # Already has generateMetadata (enhance)
      sectors/
        page.tsx                        # + generateMetadata
        [slug]/
          page.tsx                      # Already has generateMetadata (enhance)
      contact/page.tsx                  # + generateMetadata
      quote/page.tsx                    # + generateMetadata
      sourcing/page.tsx                 # + generateMetadata
      callback/page.tsx                 # + generateMetadata
      references/page.tsx              # + generateMetadata
      russia-transit/page.tsx          # + generateMetadata
      blog/page.tsx                    # + generateMetadata
  lib/
    seo/
      metadata.ts                      # Shared metadata helpers (base URL, OG defaults)
      json-ld.tsx                       # Reusable JsonLd component + schema builders
      structured-data.ts               # Organization, LocalBusiness, BreadcrumbList builders
```

### Pattern 1: Per-Page generateMetadata with next-intl
**What:** Each page exports generateMetadata that uses getTranslations for locale-aware titles/descriptions
**When to use:** Every page.tsx file

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// + https://next-intl.dev/docs/environments/actions-metadata-route-handlers
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://toko.com.tr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  const path = `/${locale}/about`;

  return {
    title: t('hero.title'),
    description: t('overview.p1'),
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/about`])
      ),
    },
    openGraph: {
      title: t('hero.title'),
      description: t('overview.p1'),
      url: `${BASE_URL}${path}`,
      siteName: 'Toko Trading',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'ru_RU',
      type: 'website',
    },
  };
}
```

**Key insight:** By passing an explicit `locale` to `getTranslations`, the metadata is eligible for static rendering at build time. This is critical for performance.

### Pattern 2: metadataBase in Root Layout
**What:** Set metadataBase once in the root locale layout so all relative URLs resolve correctly
**When to use:** The `[locale]/layout.tsx`

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://toko.com.tr'),
    title: {
      default: t('title'),
      template: `%s | Toko Trading`,
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr': '/tr',
        'en': '/en',
        'fr': '/fr',
        'ru': '/ru',
        'x-default': '/tr',
      },
    },
    openGraph: {
      siteName: 'Toko Trading',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

**Key insight:** `metadataBase` means all OG image URLs, alternates, and canonical URLs can use relative paths and Next.js composes them into absolute URLs. The `x-default` hreflang points to Turkish (the default locale).

### Pattern 3: JSON-LD via Script Tag in Server Components
**What:** Render JSON-LD as a `<script type="application/ld+json">` tag with XSS protection
**When to use:** Every page needs Organization+BreadcrumbList; specific pages get additional schemas

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
import type { WithContext, Organization, BreadcrumbList, LocalBusiness } from 'schema-dts';

interface JsonLdProps {
  data: WithContext<Organization | LocalBusiness | BreadcrumbList | any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

// Organization schema (placed in layout or every page)
export function getOrganizationSchema(locale: string): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Toko Trading',
    url: 'https://toko.com.tr',
    logo: 'https://toko.com.tr/images/logo/toko-logo.svg',
    sameAs: [], // social media URLs when available
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX', // actual phone
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English', 'French', 'Russian'],
    },
  };
}

// BreadcrumbList schema
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

**Key insight:** The `.replace(/</g, '\\u003c')` is required per Next.js official docs to prevent XSS injection. The JsonLd component is a server component (no 'use client') so it has zero client-side cost.

### Pattern 4: Multilingual Sitemap
**What:** Single sitemap.ts enumerating all pages x all locales with hreflang alternates
**When to use:** `app/sitemap.ts`

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';

const BASE_URL = 'https://toko.com.tr';

function makeEntry(path: string, priority: number, changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}/tr${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.9 },
    { path: '/sectors', priority: 0.9 },
    { path: '/references', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/quote', priority: 0.7 },
    { path: '/sourcing', priority: 0.7 },
    { path: '/callback', priority: 0.6 },
    { path: '/russia-transit', priority: 0.8 },
    { path: '/blog', priority: 0.7, freq: 'weekly' as const },
  ];

  const servicePages = services.map((s) => ({
    path: `/services/${s.slug}`, priority: 0.8,
  }));

  const sectorPages = sectors.map((s) => ({
    path: `/sectors/${s.slug}`, priority: 0.8,
  }));

  return [
    ...staticPages.map((p) => makeEntry(p.path, p.priority, p.freq || 'monthly')),
    ...servicePages.map((p) => makeEntry(p.path, p.priority)),
    ...sectorPages.map((p) => makeEntry(p.path, p.priority)),
  ];
}
```

### Pattern 5: Dynamic OG Image with Locale
**What:** Generate branded OG images per locale using next/og ImageResponse
**When to use:** Place `opengraph-image.tsx` in `app/[locale]/` for a default, override in specific route segments

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Toko Trading';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // Load font
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/DMSans-Bold.ttf')
  );

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d7377 0%, #0a5c5f 100%)',
        color: 'white', padding: '60px',
      }}>
        <div style={{ fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
          Toko Trading
        </div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.85, textAlign: 'center' }}>
          {t('description')}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'DM Sans', data: fontData, style: 'normal', weight: 700 }],
    }
  );
}
```

**Note on fonts:** The project uses DM Sans and DM Serif Display loaded via next/font. For OG image generation, the font .ttf files need to be available on disk (in `public/fonts/` or an `assets/` directory). The DM Sans font file will need to be downloaded and placed there.

### Anti-Patterns to Avoid
- **Duplicating metadata across layout and page:** Page-level metadata merges shallowly with layout metadata. If a page sets `openGraph`, it REPLACES the layout's `openGraph` entirely. Always spread shared OG fields.
- **Hardcoding locale in metadata:** Always derive locale from params. Never write `locale: 'tr_TR'` without checking the actual route param.
- **Placing sitemap.ts inside [locale]:** The sitemap must be at `app/sitemap.ts` (root), not inside a locale segment. It outputs a single sitemap.xml for the entire site.
- **Using dangerouslySetInnerHTML without XSS protection:** Always use `.replace(/</g, '\\u003c')` in JSON-LD output.
- **Missing width/height on Image components:** This causes CLS. Every `<Image>` must have explicit `width` and `height`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Next.js handles XML serialization, xhtml:link tags, caching |
| robots.txt | Manual text file | `app/robots.ts` with `MetadataRoute.Robots` | Type-safe, composable rules |
| OG image generation | Canvas/Sharp rendering | `next/og` ImageResponse | Built-in, edge-optimized, JSX-based |
| hreflang tags | Manual `<link>` in head | `alternates.languages` in metadata | Automatic dedup, correct format |
| Meta tag management | Custom Head component | `generateMetadata` / `metadata` export | Next.js handles merging, dedup, streaming |
| JSON-LD validation | Manual checking | `schema-dts` types + Rich Results Test | Compile-time type checking + runtime validation tool |

**Key insight:** Next.js 16 has first-class SEO APIs for everything this phase needs. Zero external SEO libraries required.

## Common Pitfalls

### Pitfall 1: OpenGraph metadata shallow merge
**What goes wrong:** Page sets `openGraph: { title }` and loses all parent OG fields (description, siteName, etc.)
**Why it happens:** Next.js metadata merges shallowly -- nested objects are replaced, not deep-merged
**How to avoid:** Create a shared OG defaults object and spread it into every page's openGraph. Or set common OG fields only in the layout and let pages inherit by not setting openGraph at all (only set title/description at page level).
**Warning signs:** OG debug tools show missing og:site_name or og:type on inner pages

### Pitfall 2: Missing x-default hreflang
**What goes wrong:** Google doesn't know which locale to show for unmatched languages
**Why it happens:** Developer includes only the 4 locale URLs, not x-default
**How to avoid:** Add `'x-default': '/tr'` (or `'https://toko.com.tr/tr'`) to alternates.languages in both layout metadata and sitemap entries
**Warning signs:** Google Search Console hreflang warnings

### Pitfall 3: Sitemap placed inside [locale] folder
**What goes wrong:** Sitemap only covers one locale, or generates 4 separate sitemaps at /tr/sitemap.xml etc.
**Why it happens:** Developer places sitemap.ts inside `app/[locale]/`
**How to avoid:** Place `sitemap.ts` at `app/sitemap.ts` (root of app directory). It is NOT a locale-specific file.
**Warning signs:** sitemap.xml 404 or only partial URL coverage

### Pitfall 4: JSON-LD duplicated by hydration
**What goes wrong:** Script tag rendered on server, then re-rendered on client, creating duplicate JSON-LD
**Why it happens:** JSON-LD component is a client component or placed inside a client component tree
**How to avoid:** Keep the JsonLd component as a SERVER component (no 'use client'). Place it directly in page.tsx files which are server components by default.
**Warning signs:** Rich Results Test shows duplicate structured data

### Pitfall 5: CLS from images without dimensions
**What goes wrong:** Layout shift when images load, hurting Core Web Vitals CLS score
**Why it happens:** Using fill mode without proper container sizing, or missing width/height props
**How to avoid:** Every `<Image>` must have explicit `width` and `height` props, or use `fill` with a sized parent container that has `relative` positioning.
**Warning signs:** Lighthouse CLS > 0.1

### Pitfall 6: LCP hurt by non-priority hero images
**What goes wrong:** Hero/above-fold images load lazily, causing poor LCP
**Why it happens:** next/image defaults to `loading="lazy"`; hero images need `priority`
**How to avoid:** Add `priority` prop to the first visible image on each page. Currently only homepage hero and PageHero component use priority -- verify all above-fold images.
**Warning signs:** Lighthouse LCP > 2.5s

### Pitfall 7: Framer Motion ScrollReveal causing CLS
**What goes wrong:** Content starts invisible (opacity: 0) and shifts layout when revealed
**Why it happens:** `initial="hidden"` with `opacity: 0` + `y: 30` means content is invisible at paint time, then animates in
**How to avoid:** For above-fold content, skip ScrollReveal or use `once: true` with no transform (only opacity). For hero sections, avoid wrapping the main heading/CTA in ScrollReveal as it delays LCP element rendering. Consider using CSS `content-visibility` instead for below-fold items.
**Warning signs:** CLS > 0.1 on mobile, LCP element starts hidden

## Code Examples

### robots.ts
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://toko.com.tr/sitemap.xml',
    host: 'https://toko.com.tr',
  };
}
```

### LocalBusiness JSON-LD
```typescript
// For a trading company based in Turkey
import type { WithContext, LocalBusiness } from 'schema-dts';

export function getLocalBusinessSchema(locale: string): WithContext<LocalBusiness> {
  const nameByLocale: Record<string, string> = {
    tr: 'Toko Trading - Uluslararasi Ticaret',
    en: 'Toko Trading - International Trade',
    fr: 'Toko Trading - Commerce International',
    ru: 'Toko Trading - Международная Торговля',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: nameByLocale[locale] || nameByLocale.tr,
    url: `https://toko.com.tr/${locale}`,
    logo: 'https://toko.com.tr/images/logo/toko-logo.svg',
    image: 'https://toko.com.tr/images/logo/toko-logo.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0082,
      longitude: 28.9784,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}
```

### FAQPage JSON-LD (for russia-transit page)
```typescript
import type { WithContext, FAQPage } from 'schema-dts';

export function getFAQSchema(
  questions: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
```

### Metadata Helper for Consistent Patterns
```typescript
// src/lib/seo/metadata.ts
import { routing } from '@/i18n/routing';

export const BASE_URL = 'https://toko.com.tr';

export const LOCALE_TO_OG: Record<string, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  fr: 'fr_FR',
  ru: 'ru_RU',
};

export function getAlternates(locale: string, path: string) {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
      'x-default': `${BASE_URL}/tr${path}`,
    },
  };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-seo package | Built-in generateMetadata | Next.js 13.2+ (2023) | No external dependency needed |
| Manual `<Head>` component | Metadata API in layout/page | Next.js 13+ | Automatic dedup, streaming |
| next-sitemap package | Built-in sitemap.ts | Next.js 13.3+ (2023) | Native support, typed API |
| react-helmet | Not needed | N/A | App Router handles all metadata |
| Static OG images only | ImageResponse from next/og | Next.js 13.3+ | Dynamic, locale-aware, edge-generated |
| INP not measured | INP replaces FID as Core Web Vital | March 2024 | Must optimize interaction responsiveness |
| params as sync object | params as Promise | Next.js 16.0 | All generateMetadata must await params |

**Deprecated/outdated:**
- `next-seo`: Designed for Pages Router, unnecessary with App Router metadata API
- `next-sitemap`: Replaced by built-in sitemap.ts file convention
- `viewport` and `themeColor` in metadata: Deprecated in Next.js 14, use `generateViewport` instead
- FID (First Input Delay): Replaced by INP (Interaction to Next Paint) as Core Web Vital in March 2024

## Open Questions

1. **Company contact details for structured data**
   - What we know: JSON-LD LocalBusiness needs phone, address, coordinates
   - What's unclear: Exact phone number, full address, GPS coordinates for Toko Trading
   - Recommendation: Use placeholder values that the team fills in. Create a `src/lib/seo/company-info.ts` constants file for easy updating.

2. **Font files for OG image generation**
   - What we know: OG image generation needs .ttf font files on disk
   - What's unclear: Whether DM Sans/DM Serif Display .ttf files are available in the project
   - Recommendation: Download and place in `public/fonts/` or `assets/` directory. Google Fonts provides .ttf downloads.

3. **Social media URLs for Organization schema**
   - What we know: Organization schema supports `sameAs` for social profiles
   - What's unclear: Which social media accounts Toko Trading has
   - Recommendation: Leave sameAs as empty array, add when social accounts are known.

4. **Google Search Console / Yandex verification**
   - What we know: metadata API supports `verification` field for google, yandex, yahoo
   - What's unclear: Whether verification codes exist yet
   - Recommendation: Add verification field structure; leave values for when site is registered with search engines. Yandex is important for the Russian audience.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + Testing Library |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | generateMetadata returns locale-aware title, description, OG for all pages | unit | `npx vitest run src/__tests__/seo-metadata.test.ts -x` | No -- Wave 0 |
| SEO-02 | JSON-LD Organization, LocalBusiness, BreadcrumbList render correctly | unit | `npx vitest run src/__tests__/json-ld.test.ts -x` | No -- Wave 0 |
| SEO-03 | FAQPage schema generated for russia-transit page | unit | `npx vitest run src/__tests__/json-ld.test.ts -x` | No -- Wave 0 |
| SEO-04 | Sitemap includes all pages x 4 locales with alternates | unit | `npx vitest run src/__tests__/sitemap.test.ts -x` | No -- Wave 0 |
| SEO-05 | robots.ts returns proper rules | unit | `npx vitest run src/__tests__/robots.test.ts -x` | No -- Wave 0 |
| SEO-06 | Core Web Vitals optimized | manual-only | Lighthouse audit after deployment | N/A -- manual Lighthouse run |
| SEO-07 | All Image components have width, height, locale-aware alt | unit | `npx vitest run src/__tests__/image-audit.test.ts -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/seo-metadata.test.ts` -- covers SEO-01 (verifies generateMetadata output)
- [ ] `src/__tests__/json-ld.test.ts` -- covers SEO-02, SEO-03 (verifies JSON-LD schemas)
- [ ] `src/__tests__/sitemap.test.ts` -- covers SEO-04 (verifies sitemap entries and alternates)
- [ ] `src/__tests__/robots.test.ts` -- covers SEO-05 (verifies robots rules)
- Note: Existing `src/__tests__/metadata.test.ts` tests hreflang URL structure -- keep and extend

## Sources

### Primary (HIGH confidence)
- [Next.js generateMetadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - v16.1.6, full metadata fields, alternates, openGraph, merging behavior
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official script tag pattern with XSS protection
- [Next.js sitemap.ts Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - MetadataRoute.Sitemap type, alternates.languages, localized sitemap
- [Next.js robots.ts Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - MetadataRoute.Robots type, rules array
- [Next.js opengraph-image Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - ImageResponse API, file conventions, config exports
- [next-intl Metadata/Route Handlers docs](https://next-intl.dev/docs/environments/actions-metadata-route-handlers) - getTranslations in generateMetadata, static rendering eligibility

### Secondary (MEDIUM confidence)
- [schema-dts npm package (Google)](https://www.npmjs.com/package/schema-dts) - TypeScript types for Schema.org
- [Build with Matija - Next.js 16 Canonical/Hreflang](https://www.buildwithmatija.com/blog/nextjs-advanced-seo-multilingual-canonical-tags) - Practical patterns verified against official docs
- [DEV Community - Multilingual Sitemap with next-intl](https://dev.to/oikon/implementing-multilingual-sitemap-with-next-intl-in-nextjs-app-router-1354) - Community pattern cross-verified

### Tertiary (LOW confidence)
- Core Web Vitals 2026 thresholds (INP < 200ms, LCP < 2.5s, CLS < 0.1) - general web knowledge, varies by measurement tool

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All based on Next.js official docs for v16.1.6, directly verified
- Architecture: HIGH - Patterns follow official Next.js and next-intl documentation
- Pitfalls: HIGH - Based on official merging behavior docs and community-reported issues
- JSON-LD: HIGH - Official Next.js guide + Google's schema-dts package
- Core Web Vitals: MEDIUM - General best practices; specific impact depends on actual measurement

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable -- Next.js metadata API is mature)
