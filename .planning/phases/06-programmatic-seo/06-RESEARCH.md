# Phase 6: Programmatic SEO - Research

**Researched:** 2026-03-10
**Domain:** Programmatic SEO page generation with Next.js 16 App Router, multi-locale structured data
**Confidence:** HIGH

## Summary

Phase 6 generates hundreds of long-tail SEO pages from structured JSON data across 4 locales. The project already has a proven pattern for dynamic route generation (sectors/[slug], services/[slug], blog/[slug]) using `generateStaticParams`, `generateMetadata`, `next-intl` translations, and `schema-dts` JSON-LD. The programmatic SEO pages extend this exact pattern but with a critical difference: content lives in standalone JSON data files rather than translation files, because each page needs 500+ words of unique, substantive content that would bloat the translation bundles.

The architecture uses 4 new route groups under `src/app/[locale]/trade/`: product import pages, country trade guides, FAQ pages, and customs/regulations pages. Each route reads from its own JSON data file in `src/data/pseo/`, generates static params across all 4 locales, and uses ISR (`dynamicParams = true` + `revalidate = 86400`) as a safety net for any pages not pre-rendered at build time. The existing sitemap.ts is extended to include all programmatic pages, and the existing `getFAQSchema()` from `structured-data.ts` is reused directly for FAQ pages.

**Primary recommendation:** Use `src/data/pseo/` JSON files as the single source of truth for all programmatic content. Each JSON file contains locale-keyed content objects with all text pre-written (not generated at runtime). Build all pages statically via `generateStaticParams` with ISR fallback. Reuse existing SEO infrastructure (`getPageMetadata`, `JsonLd`, `getBreadcrumbSchema`, `getFAQSchema`) without modification.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PSEO-01 | Sector/product template pages from structured JSON data | JSON data model in `src/data/pseo/products.ts`, route at `/trade/import/[slug]`, reuses existing sector data |
| PSEO-02 | Country trade template pages from structured JSON data | JSON data model in `src/data/pseo/countries.ts`, route at `/trade/country/[slug]` |
| PSEO-03 | FAQ template pages per sector/country | JSON data model in `src/data/pseo/faqs.ts`, route at `/trade/faq/[slug]`, uses existing `getFAQSchema()` |
| PSEO-04 | Customs/regulations template pages | JSON data model in `src/data/pseo/customs.ts`, route at `/trade/customs/[slug]` |
| PSEO-05 | Each page has 500+ words of unique, substantive content | Content structure with multiple prose sections, data tables, key facts -- enforced by data validation |
| PSEO-06 | All pages generated across 4 locales via generateStaticParams | Proven pattern from blog/[slug] -- iterate routing.locales x data entries |
| PSEO-07 | ISR strategy for pages exceeding SSG build limits | `dynamicParams = true` + `export const revalidate = 86400` on all PSEO routes |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router SSG + ISR | Already in project, generateStaticParams + revalidate |
| next-intl | 4.8.3 | Locale routing, setRequestLocale | Already in project, handles [locale] segment |
| schema-dts | 1.1.5 | Type-safe JSON-LD structured data | Already in project, FAQPage type already imported |
| TypeScript | 5.x | Type safety for data models | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Existing JsonLd component | n/a | Render structured data | Every programmatic page |
| Existing PageHero component | n/a | Page hero sections | Every programmatic page |
| Existing CTASection component | n/a | Call-to-action sections | Every programmatic page |
| Existing Breadcrumb component | n/a | Navigation breadcrumbs | Every programmatic page |
| Existing ScrollReveal | n/a | Scroll animations | Content sections (not above-fold) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| JSON data files | next-intl translation files | Translation files would grow from 1520 to 10000+ lines per locale; JSON data is cleaner for content-heavy pages |
| JSON data files | MDX/Velite | Velite is for author-written blog posts; pSEO pages are template-generated from structured data, not editorial content |
| JSON data files | Database/CMS | Overkill for a static site with ~100 unique pages; JSON stays in the repo and builds statically |
| Single sitemap | generateSitemaps (split) | ~400 total URLs (100 pages x 4 locales) is well under Google's 50,000 limit; single sitemap is fine |

**No new dependencies required.** Everything needed is already in the project.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   └── pseo/
│       ├── types.ts            # TypeScript interfaces for all PSEO data
│       ├── products.ts         # Sector/product import page data (PSEO-01)
│       ├── countries.ts        # Country trade guide data (PSEO-02)
│       ├── faqs.ts             # FAQ page data (PSEO-03)
│       └── customs.ts          # Customs/regulations data (PSEO-04)
├── lib/
│   └── pseo/
│       └── utils.ts            # Helper functions for PSEO data access
├── app/
│   └── [locale]/
│       └── trade/
│           ├── import/
│           │   └── [slug]/
│           │       └── page.tsx    # "Import [product] from Turkey"
│           ├── country/
│           │   └── [slug]/
│           │       └── page.tsx    # "Turkey-[Country] trade guide"
│           ├── faq/
│           │   └── [slug]/
│           │       └── page.tsx    # FAQ pages per sector/country
│           └── customs/
│               └── [slug]/
│                   └── page.tsx    # Customs/regulations pages
└── app/
    └── sitemap.ts                  # Extended with PSEO entries
```

### Pattern 1: Structured JSON Data with Locale Keys
**What:** Each data file exports an array of page definitions with content keyed by locale.
**When to use:** All 4 PSEO page types.
**Example:**
```typescript
// src/data/pseo/types.ts
export interface LocaleContent {
  tr: string;
  en: string;
  fr: string;
  ru: string;
}

export interface ProductPageData {
  slug: string;              // URL slug: "food-grains", "textile-fabrics"
  sectorSlug: string;        // Links back to existing sector: "food"
  image: string;             // Hero/OG image
  meta: {
    title: LocaleContent;    // "Import Grains from Turkey | Toko Trading"
    description: LocaleContent;
  };
  content: {
    title: LocaleContent;    // H1: "Import Grains from Turkey"
    subtitle: LocaleContent;
    overview: LocaleContent[];  // Array of paragraphs (3-4 for 500+ words)
    keyFacts: {
      label: LocaleContent;
      value: LocaleContent;
    }[];
    tradeAdvantages: {
      title: LocaleContent;
      description: LocaleContent;
    }[];
    process: {
      title: LocaleContent;
      description: LocaleContent;
    }[];
    cta: {
      title: LocaleContent;
      description: LocaleContent;
      buttonText: LocaleContent;
    };
  };
}
```

### Pattern 2: generateStaticParams with Locale Iteration
**What:** Generate params for all locale x slug combinations.
**When to use:** Every PSEO route.
**Example:**
```typescript
// Source: Existing pattern from blog/[slug]/page.tsx
import { routing } from '@/i18n/routing';
import { productPages } from '@/data/pseo/products';

// Allow ISR for pages not in generateStaticParams
export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of productPages) {
      params.push({ locale, slug: page.slug });
    }
  }
  return params;
}
```

### Pattern 3: Content Accessor with Locale Resolution
**What:** Helper function that retrieves locale-specific content from the data.
**When to use:** Every PSEO page component to access translated content.
**Example:**
```typescript
// src/lib/pseo/utils.ts
import type { LocaleContent } from '@/data/pseo/types';

export function t(content: LocaleContent, locale: string): string {
  return content[locale as keyof LocaleContent] || content.en;
}

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}
```

### Pattern 4: Template Page Component
**What:** Server component that renders structured data content with existing design system.
**When to use:** All PSEO page types follow this template.
**Example:**
```typescript
// src/app/[locale]/trade/import/[slug]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { getProductPage } from '@/lib/pseo/utils';
import { t } from '@/lib/pseo/utils';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getProductPage(slug);
  if (!page) return {};

  return getPageMetadata({
    locale,
    path: `/trade/import/${slug}`,
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
  });
}

export default async function ProductImportPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getProductPage(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([...])} />
      <PageHero
        title={t(page.content.title, locale)}
        subtitle={t(page.content.subtitle, locale)}
        backgroundImage={page.image}
      />
      {/* Content sections rendering 500+ words */}
    </>
  );
}
```

### Anti-Patterns to Avoid
- **Thin content / mad-libs templates:** Do NOT generate content by just swapping a single word in a template sentence. Each page must have genuinely different prose paragraphs, facts, statistics, and trade-specific information. Google penalizes thin/duplicate programmatic pages.
- **All content in next-intl translation files:** The translation JSON files are loaded for every page. Putting 500+ words x 100 pages of content into them would bloat every page's bundle. PSEO content must live in separate data files imported only by the routes that need them.
- **Runtime content generation:** Do NOT generate content at request time using AI or string templates. All content must be pre-written in the JSON data files and built statically.
- **Deep nesting of dynamic segments:** Do NOT create routes like `/trade/[type]/[sector]/[product]`. Flat slug-based routes (`/trade/import/[slug]`) are simpler, more SEO-friendly, and match the existing project pattern.
- **Putting all PSEO pages under existing /services or /sectors routes:** This would conflict with the existing `dynamicParams = false` on those routes and mix editorial content with programmatic content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD structured data | Custom script tag rendering | Existing `JsonLd` component + `getFAQSchema()` | Already handles XSS escaping, type safety via schema-dts |
| Breadcrumb structured data | Custom breadcrumb schema | Existing `getBreadcrumbSchema()` | Already tested and working |
| Page metadata | Manual meta tag assembly | Existing `getPageMetadata()` helper | Already handles alternates, OG, canonical |
| hreflang alternates | Manual alternate generation | Existing `getAlternates()` | Already handles all 4 locales + x-default |
| Hero sections | Custom hero components | Existing `PageHero` component | Consistent design system |
| CTA sections | Custom CTA components | Existing `CTASection` component | Consistent design system |
| Word count validation | Manual counting | Simple test utility that counts words in data files | Catches thin content before build |

**Key insight:** The project already has a complete SEO infrastructure (Phase 4) and design system (Phase 2). Programmatic SEO pages are just new data + new routes that plug into existing infrastructure. Zero new libraries needed.

## Common Pitfalls

### Pitfall 1: Thin/Duplicate Content Penalty
**What goes wrong:** Google de-indexes programmatic pages that are too similar to each other or have fewer than 300 words of unique content.
**Why it happens:** Templates that only swap a product name or country name produce near-identical pages.
**How to avoid:** Each page data entry must include 3-4 unique overview paragraphs, unique key facts/statistics, unique trade advantages, and a unique process section. Target 500-700 words per page. Include a word count validation test.
**Warning signs:** Multiple pages sharing the same paragraph text, pages with fewer than 400 words.

### Pitfall 2: Translation File Bloat
**What goes wrong:** Adding 100 pages x 500 words x 4 locales to the next-intl translation files makes every page load slower because next-intl loads all messages for the locale.
**Why it happens:** Following the existing pattern of putting all text in `messages/{locale}.json`.
**How to avoid:** PSEO content lives in `src/data/pseo/*.ts` files, NOT in translation files. Only static UI labels (breadcrumb names, section headers) go in translations. The locale-specific content is accessed directly from the data files using the `t()` helper.
**Warning signs:** Translation files exceeding 3000 lines, slow page loads.

### Pitfall 3: Build Timeout with Too Many Static Pages
**What goes wrong:** `next build` times out or takes excessively long when generating 400+ static pages.
**Why it happens:** All pages generated at build time with no ISR fallback.
**How to avoid:** Use `dynamicParams = true` (default) with `revalidate = 86400` on all PSEO routes. This allows pages not in `generateStaticParams` to be generated on first request. For this project (~400 pages), full SSG should still be fast enough, but ISR is the safety net per PSEO-07.
**Warning signs:** Build time exceeding 5 minutes, memory errors during build.

### Pitfall 4: Sitemap Growing Beyond Google's Limit
**What goes wrong:** A single sitemap.xml exceeds 50,000 URLs and Google ignores it.
**Why it happens:** Rapid growth of programmatic pages.
**How to avoid:** Current estimate is ~400 URLs total (100 pages x 4 locales) + ~80 existing pages = ~480. Well under 50,000. No need for `generateSitemaps` splitting. Monitor as pages grow.
**Warning signs:** Approaching 10,000+ URLs (then consider splitting).

### Pitfall 5: Missing Internal Links
**What goes wrong:** Programmatic pages are orphaned -- no other page links to them, so Google never discovers them.
**Why it happens:** Pages exist in sitemap but have no internal link equity.
**How to avoid:** Add related product/country links on each PSEO page. Add "Related Trade Guides" sections. Link from sector detail pages to their product import pages. Link from the services overview to country trade guides.
**Warning signs:** Pages not being indexed after 4-6 weeks.

### Pitfall 6: FAQPage Schema Restrictions
**What goes wrong:** FAQ rich results don't appear in Google search.
**Why it happens:** Since 2023, Google restricts FAQPage rich results to well-known authoritative government and health sites. For commercial sites, FAQ schema still provides structural benefits for AI search engines and knowledge graphs, but won't produce Google FAQ rich snippets.
**How to avoid:** Still implement FAQPage schema for AI search optimization (ChatGPT, Perplexity, etc.) and content structure, but don't expect Google FAQ rich results. The schema remains valid and beneficial for non-Google surfaces.
**Warning signs:** None -- this is expected behavior, not a bug.

## Code Examples

Verified patterns from the existing codebase:

### Existing generateStaticParams with Locale Iteration (from blog/[slug])
```typescript
// Source: src/app/[locale]/blog/[slug]/page.tsx (existing)
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = getPostsByLocale(locale);
    for (const post of posts) {
      params.push({ locale, slug: getPostSlug(post) });
    }
  }
  return params;
}
```

### Existing getFAQSchema (from structured-data.ts)
```typescript
// Source: src/lib/seo/structured-data.ts (existing, ready to use)
export function getFAQSchema(
  questions: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question' as const,
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer,
      },
    })),
  };
}
```

### ISR Configuration Pattern (from Next.js 16 docs)
```typescript
// Source: https://nextjs.org/docs/app/guides/incremental-static-regeneration
export const dynamicParams = true;    // Allow on-demand rendering for unknown slugs
export const revalidate = 86400;      // Revalidate cached pages every 24 hours

export function generateStaticParams() {
  // Return all known slugs -- these are built at build time
  // Unknown slugs are rendered on first request and cached
  return productPages.map((p) => ({ slug: p.slug }));
}
```

### Data File Structure Example
```typescript
// src/data/pseo/products.ts
import type { ProductPageData } from './types';

export const productPages: ProductPageData[] = [
  {
    slug: 'food-grains',
    sectorSlug: 'food',
    image: 'https://images.unsplash.com/photo-...',
    meta: {
      title: {
        tr: 'Turkiye\'den Tahil Ithalati | Toko Trading',
        en: 'Import Grains from Turkey | Toko Trading',
        fr: 'Importation de Cereales de Turquie | Toko Trading',
        ru: 'Импорт зерновых из Турции | Toko Trading',
      },
      description: {
        tr: 'Turkiye\'den bugday, arpa, misir ve diger tahil urunleri ithalati...',
        en: 'Import wheat, barley, corn and other grain products from Turkey...',
        fr: 'Importation de ble, orge, mais et autres cereales de Turquie...',
        ru: 'Импорт пшеницы, ячменя, кукурузы и других зерновых из Турции...',
      },
    },
    content: {
      title: {
        tr: 'Turkiye\'den Tahil Ithalati',
        en: 'Import Grains from Turkey',
        fr: 'Importation de Cereales de Turquie',
        ru: 'Импорт зерновых из Турции',
      },
      subtitle: { /* ... */ },
      overview: [
        { tr: '...paragraph 1...', en: '...', fr: '...', ru: '...' },
        { tr: '...paragraph 2...', en: '...', fr: '...', ru: '...' },
        { tr: '...paragraph 3...', en: '...', fr: '...', ru: '...' },
      ],
      keyFacts: [
        {
          label: { tr: 'Yillik Uretim', en: 'Annual Production', fr: 'Production Annuelle', ru: 'Годовое производство' },
          value: { tr: '38 milyon ton', en: '38 million tons', fr: '38 millions de tonnes', ru: '38 миллионов тонн' },
        },
        // ... 4-6 key facts
      ],
      tradeAdvantages: [ /* 4 items with title + description */ ],
      process: [ /* 4-5 step process */ ],
      cta: { /* ... */ },
    },
  },
  // ... more product pages
];
```

## Content Strategy for 500+ Words

### Content Sections per Page Type

**Product Import Pages (PSEO-01):**
1. Overview (3-4 paragraphs, ~200 words) -- Turkey's position as a producer/exporter of this product
2. Key Facts table (6 rows, ~60 words) -- production volume, export value, key markets, HS codes
3. Trade Advantages (4 items, ~120 words) -- why import this product from Turkey
4. Import Process (4-5 steps, ~100 words) -- how Toko facilitates the import
5. Quality Standards (~50 words) -- certifications, testing, compliance
6. CTA section (~30 words)
**Total: ~560 words per page**

**Country Trade Guide Pages (PSEO-02):**
1. Overview (3-4 paragraphs, ~200 words) -- bilateral trade relationship
2. Trade Statistics table (6 rows, ~60 words) -- trade volume, top exports/imports
3. Key Sectors (4-5 items, ~120 words) -- top traded product categories
4. Trade Agreements & Regulations (~80 words) -- FTAs, customs unions
5. Logistics & Shipping (~60 words) -- routes, transit times, ports
6. CTA section (~30 words)
**Total: ~550 words per page**

**FAQ Pages (PSEO-03):**
1. Page intro (1 paragraph, ~50 words)
2. 8-10 FAQ items (question + 40-60 word answer each, ~400-500 words)
3. Related links section (~30 words)
**Total: ~500 words per page**

**Customs/Regulations Pages (PSEO-04):**
1. Overview (2-3 paragraphs, ~150 words)
2. Customs Procedures (4-5 items, ~120 words)
3. Required Documents list (~80 words)
4. HS Codes & Duty Rates table (~60 words)
5. Prohibited/Restricted items (~50 words)
6. Toko's Customs Support (~60 words)
7. CTA section (~30 words)
**Total: ~550 words per page**

### Page Count Estimate

| Type | Unique Slugs | Description | x4 Locales |
|------|-------------|-------------|------------|
| Product Import | ~30 | 8 sectors x ~4 products each | 120 |
| Country Trade | ~20 | Top 20 trade partner countries | 80 |
| FAQ | ~12 | Per sector (8) + general topics (4) | 48 |
| Customs/Regs | ~15 | Per major country/region | 60 |
| **Total** | **~77** | | **~308** |

This is well within SSG limits. ISR is the safety net, not the primary strategy.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| getStaticPaths + fallback | generateStaticParams + dynamicParams | Next.js 13+ | Cleaner API, same behavior |
| ISR via revalidate in getStaticProps | export const revalidate at route segment level | Next.js 13+ | No separate function needed |
| next-seo for metadata | Built-in generateMetadata | Next.js 13.2+ | No extra dependency |
| next-sitemap package | Built-in sitemap.ts | Next.js 13.3+ | No extra dependency |
| FAQPage rich results for all sites | FAQPage restricted to gov/health sites | Google Aug 2023 | Still useful for AI search, just no Google rich results |

**Deprecated/outdated:**
- `getStaticPaths` / `getStaticProps` -- replaced by App Router equivalents
- `next-seo` package -- replaced by built-in Metadata API
- Expecting FAQPage rich results on commercial sites -- Google restricted in 2023

## Open Questions

1. **Exact product/country/FAQ slugs and content**
   - What we know: 8 sectors with 4 product keys each, ~20 target countries, standard import/export FAQ topics
   - What's unclear: The exact list of countries, exact product granularity, specific HS codes and trade statistics to include
   - Recommendation: Define a starter set in Wave 1 data files (e.g., 10 products, 10 countries, 8 FAQs, 8 customs pages) then expand. The architecture supports adding more entries by simply appending to the data arrays.

2. **Content writing at scale**
   - What we know: Each page needs 500+ words in 4 languages, all pre-written
   - What's unclear: Who writes this content? AI-assisted? Human?
   - Recommendation: The planner should create data files with substantive English content first, then create translations. Content can be AI-assisted but must be reviewed for accuracy. Trade statistics should reference real data where possible.

3. **URL structure for programmatic pages**
   - What we know: Need to be distinct from existing /services/[slug] and /sectors/[slug]
   - What's unclear: Whether /trade/ is the best prefix
   - Recommendation: Use `/trade/import/[slug]`, `/trade/country/[slug]`, `/trade/faq/[slug]`, `/trade/customs/[slug]`. The `/trade/` prefix groups all programmatic SEO pages logically and keeps them separate from editorial content. Alternative: `/guides/` prefix.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 |
| Config file | `vitest.config.ts` (exists) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PSEO-01 | Product import pages have valid data, slugs, all locales | unit | `npx vitest run src/__tests__/pseo-products.test.ts -x` | Wave 0 |
| PSEO-02 | Country trade pages have valid data, slugs, all locales | unit | `npx vitest run src/__tests__/pseo-countries.test.ts -x` | Wave 0 |
| PSEO-03 | FAQ pages have valid data, getFAQSchema integration | unit | `npx vitest run src/__tests__/pseo-faqs.test.ts -x` | Wave 0 |
| PSEO-04 | Customs pages have valid data, slugs, all locales | unit | `npx vitest run src/__tests__/pseo-customs.test.ts -x` | Wave 0 |
| PSEO-05 | Each page has 500+ words per locale | unit | `npx vitest run src/__tests__/pseo-word-count.test.ts -x` | Wave 0 |
| PSEO-06 | generateStaticParams produces correct locale x slug combos | unit | `npx vitest run src/__tests__/pseo-static-params.test.ts -x` | Wave 0 |
| PSEO-07 | ISR config exports are present on PSEO routes | unit | `npx vitest run src/__tests__/pseo-isr.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose && npm run build`
- **Phase gate:** Full suite green + successful build before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/pseo-data.test.ts` -- covers PSEO-01 through PSEO-05 (data validation, word count, locale completeness)
- [ ] `src/__tests__/pseo-sitemap.test.ts` -- covers sitemap inclusion of PSEO pages
- [ ] `src/data/pseo/types.ts` -- TypeScript interfaces (needed before data files)

## Sources

### Primary (HIGH confidence)
- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Full API, dynamicParams interaction, multiple segments, ISR integration
- [Next.js ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) - Time-based revalidation, on-demand revalidation, dynamicParams config
- [Next.js generateSitemaps docs](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) - Sitemap splitting for large sites (not needed for ~400 URLs)
- Existing codebase: `src/app/[locale]/blog/[slug]/page.tsx`, `src/app/[locale]/sectors/[slug]/page.tsx` - Proven patterns for locale x slug generation
- Existing codebase: `src/lib/seo/structured-data.ts` - getFAQSchema, getBreadcrumbSchema already implemented and tested

### Secondary (MEDIUM confidence)
- [Google FAQPage structured data docs](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - Requirements and eligibility (restricted to gov/health for rich results, still valid for AI search)
- [Programmatic SEO best practices - Semrush](https://www.semrush.com/blog/programmatic-seo/) - Content quality requirements, 500+ words, uniqueness
- [Programmatic SEO guide - Search Engine Land](https://searchengineland.com/guide/programmatic-seo) - Template strategy, head terms + modifiers pattern

### Tertiary (LOW confidence)
- Build time estimates for 300-400 static pages (need real measurement during implementation)
- Exact timeline for Google indexing of new programmatic pages (typically 2-8 weeks)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new libraries needed, all existing infrastructure reused
- Architecture: HIGH - Follows exact patterns already proven in the codebase (blog, sectors, services)
- Pitfalls: HIGH - Well-documented in SEO community, Google's official guidelines clear
- Content strategy: MEDIUM - Word counts and section structures are recommendations, actual content quality depends on writing
- ISR strategy: HIGH - Official Next.js 16 docs verified, API is stable

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable -- no fast-moving dependencies)
