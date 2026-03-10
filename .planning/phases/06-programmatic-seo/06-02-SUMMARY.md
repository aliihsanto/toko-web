---
phase: 06-programmatic-seo
plan: 02
subsystem: pages
tags: [pseo, next.js, ssg, isr, seo, json-ld, multilingual, template-pages]

# Dependency graph
requires:
  - phase: 06-programmatic-seo
    provides: PSEO data files (products, countries, faqs, customs), TypeScript types, utility helpers
  - phase: 04-seo-infrastructure
    provides: getPageMetadata, getBreadcrumbSchema, getFAQSchema, JsonLd component
  - phase: 02-core-pages
    provides: PageHero, CTASection, Breadcrumb, ScrollReveal components, Bold Mediterranean design system
provides:
  - Product import template page at /trade/import/[slug] with 128 SSG pages (32 products x 4 locales)
  - Country trade guide template page at /trade/country/[slug] with 80 SSG pages (20 countries x 4 locales)
  - FAQ template page at /trade/faq/[slug] with 48 SSG pages (12 FAQs x 4 locales) including FAQPage JSON-LD
  - Customs/regulations template page at /trade/customs/[slug] with 60 SSG pages (15 customs x 4 locales)
  - Total: 316 programmatic SEO pages with ISR fallback (dynamicParams=true, revalidate=86400)
affects: [06-03-PLAN (SEO integration, sitemap, internal linking)]

# Tech tracking
tech-stack:
  added: []
  patterns: [PSEO template page pattern with generateStaticParams iterating locales x data entries, ISR fallback for long-tail coverage]

key-files:
  created:
    - src/app/[locale]/trade/import/[slug]/page.tsx
    - src/app/[locale]/trade/country/[slug]/page.tsx
    - src/app/[locale]/trade/faq/[slug]/page.tsx
    - src/app/[locale]/trade/customs/[slug]/page.tsx
  modified: []

key-decisions:
  - "PSEO pages use inline locale labels (breadcrumb, section headings) rather than next-intl translations to keep PSEO content self-contained and avoid adding 100+ translation keys"
  - "FAQ page uses stacked Q&A cards (not accordion) per 02-04 decision, with rotating left border colors for visual variety"
  - "Customs page uses HTML table for HS codes with alternating row colors for readability rather than card grid"
  - "Country page uses flag emoji in PageHero badge prop and floating glass-card overlay on country image"

patterns-established:
  - "PSEO template pattern: dynamicParams=true + revalidate=86400 for ISR fallback, generateStaticParams iterating routing.locales x dataArray, t() helper for locale content resolution"
  - "Color rotation pattern: borderColors/textColors arrays with modulo indexing for consistent Mediterranean palette cycling across variable-length data arrays"

requirements-completed: [PSEO-01, PSEO-02, PSEO-03, PSEO-04, PSEO-06, PSEO-07]

# Metrics
duration: 9min
completed: 2026-03-10
---

# Phase 6 Plan 02: PSEO Template Pages Summary

**4 template route pages under /trade/ rendering 316 programmatic SEO pages across 4 locales with ISR fallback, FAQPage JSON-LD, and Bold Mediterranean design system**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-10T19:50:35Z
- **Completed:** 2026-03-10T19:59:40Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created 4 template page routes under /trade/ that render rich, substantive content from PSEO data files
- Generated 316 static pages at build time (128 product + 80 country + 48 FAQ + 60 customs) across all 4 locales
- Integrated FAQPage JSON-LD schema on FAQ pages via existing getFAQSchema() helper
- All pages use Bold Mediterranean design system with heading-serif, rich-card, ScrollReveal, mesh backgrounds, and color-coded borders
- ISR fallback enabled on all routes (dynamicParams=true, revalidate=86400) for long-tail coverage

## Task Commits

Each task was committed atomically:

1. **Task 1: Product import and country trade guide template pages** - `4978b3f` (feat)
2. **Task 2: FAQ and customs/regulations template pages** - `108895b` (feat)

## Files Created/Modified
- `src/app/[locale]/trade/import/[slug]/page.tsx` - Product import template: hero, overview with image, key facts grid, trade advantages cards, import process steps, quality standards callout, CTA
- `src/app/[locale]/trade/country/[slug]/page.tsx` - Country trade guide template: hero with flag badge, overview with country image, trade statistics grid, key sectors cards, trade agreements prose card, logistics cards, CTA
- `src/app/[locale]/trade/faq/[slug]/page.tsx` - FAQ template: hero, intro paragraph, stacked Q&A cards with colored borders, related links with arrows, CTA, FAQPage JSON-LD
- `src/app/[locale]/trade/customs/[slug]/page.tsx` - Customs/regulations template: hero, overview, numbered procedure steps, required documents grid with FileCheck icons, HS codes table with alternating rows, restrictions warning callout, Toko support card, CTA

## Decisions Made
- Used inline locale labels for breadcrumbs and section headings instead of next-intl translations, keeping PSEO content self-contained without bloating translation files
- FAQ page implements stacked Q&A cards (not accordion) consistent with 02-04 decision
- Customs page uses HTML table for HS codes data for better readability with alternating row colors
- Country page displays flag emoji via PageHero badge prop for quick country identification

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing TypeScript errors in `src/__tests__/json-ld.test.ts` (unrelated to PSEO work, noted in Plan 01 as out of scope) -- no impact on new files

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 4 PSEO template routes are live and rendering content from Plan 01 data files
- 316 pages generated at build time with ISR fallback for any new slugs
- Ready for Plan 03: sitemap integration, internal linking hub pages, and cross-linking between PSEO pages
- FAQ pages already include FAQPage JSON-LD, ready for search engine rich results

## Self-Check: PASSED

- All 4 created files verified present on disk
- Both task commits verified in git log (4978b3f, 108895b)
- Production build succeeds with 316 PSEO pages generated
- No PSEO-related TypeScript errors

---
*Phase: 06-programmatic-seo*
*Completed: 2026-03-10*
