---
phase: 04-seo-infrastructure
plan: 01
subsystem: seo
tags: [next-metadata, open-graph, hreflang, canonical-url, seo, i18n]

# Dependency graph
requires:
  - phase: 01-foundation-and-i18n
    provides: next-intl routing config with 4 locales
  - phase: 02-core-pages
    provides: page components for all routes
provides:
  - SEO helper functions (getAlternates, getPageMetadata, LOCALE_TO_OG, BASE_URL)
  - COMPANY_INFO constant for structured data and metadata
  - generateMetadata exports on all 13 page files
  - SEO translation keys (seo.title, seo.description) in all 4 locale files
affects: [04-seo-infrastructure, 05-blog, 06-programmatic-seo]

# Tech tracking
tech-stack:
  added: []
  patterns: [getPageMetadata pattern for consistent page-level SEO, getAlternates for hreflang generation]

key-files:
  created:
    - src/lib/seo/metadata.ts
    - src/lib/seo/company-info.ts
    - src/__tests__/seo-metadata.test.ts
  modified:
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/app/[locale]/about/page.tsx
    - src/app/[locale]/services/page.tsx
    - src/app/[locale]/services/[slug]/page.tsx
    - src/app/[locale]/sectors/page.tsx
    - src/app/[locale]/sectors/[slug]/page.tsx
    - src/app/[locale]/references/page.tsx
    - src/app/[locale]/russia-transit/page.tsx
    - src/app/[locale]/contact/page.tsx
    - src/app/[locale]/quote/page.tsx
    - src/app/[locale]/sourcing/page.tsx
    - src/app/[locale]/callback/page.tsx
    - src/app/[locale]/blog/page.tsx
    - src/messages/tr.json
    - src/messages/en.json
    - src/messages/fr.json
    - src/messages/ru.json

key-decisions:
  - "Homepage generateMetadata returns description and alternates only (title uses layout default template)"
  - "x-default hreflang points to Turkish (/tr) version as default locale"
  - "SEO keys added as seo.title/seo.description under each page namespace rather than reusing hero.title"
  - "getPageMetadata helper wraps common pattern: title, description, alternates, openGraph"

patterns-established:
  - "getPageMetadata pattern: import getPageMetadata, call with locale/path/title/description for consistent SEO"
  - "getAlternates pattern: generates canonical URL + hreflang alternates including x-default for any path"
  - "SEO translation keys: each page namespace has seo.title and seo.description for keyword-optimized meta content"

requirements-completed: [SEO-01]

# Metrics
duration: 10min
completed: 2026-03-10
---

# Phase 4 Plan 1: Page Metadata and SEO Helpers Summary

**Locale-aware generateMetadata on all 13 pages with shared SEO helpers (getAlternates, getPageMetadata), company-info constant, and keyword-optimized meta translations in 4 languages**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-10T17:05:42Z
- **Completed:** 2026-03-10T17:15:53Z
- **Tasks:** 1 (TDD: RED + GREEN)
- **Files modified:** 21

## Accomplishments
- Created reusable SEO helper module (metadata.ts) with BASE_URL, LOCALE_TO_OG, getAlternates(), getPageMetadata()
- Created company-info.ts with COMPANY_INFO constant for structured data reuse
- Added generateMetadata to 11 pages that lacked it and enhanced 2 existing ones with alternates/openGraph
- Added metadataBase, robots directives, and openGraph siteName to root layout
- Added SEO-optimized seo.title and seo.description translation keys for all pages in TR, EN, FR, RU
- 16 unit tests covering all SEO helper functions

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing tests for SEO helpers** - `c41c37b` (test)
2. **Task 1 GREEN: Implement SEO helpers, company-info, and all page metadata** - `0d489b2` (feat)

_TDD task: RED commit (failing tests) followed by GREEN commit (implementation passing all tests)_

## Files Created/Modified
- `src/lib/seo/metadata.ts` - SEO helper functions: BASE_URL, LOCALE_TO_OG, getAlternates(), getPageMetadata()
- `src/lib/seo/company-info.ts` - COMPANY_INFO constant with name, url, phone, address, social, languages
- `src/__tests__/seo-metadata.test.ts` - 16 unit tests for all SEO helper exports
- `src/app/[locale]/layout.tsx` - Added metadataBase, robots, openGraph.siteName, replaced hardcoded alternates
- `src/app/[locale]/page.tsx` - Added generateMetadata with description, alternates, openGraph
- `src/app/[locale]/about/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/services/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/services/[slug]/page.tsx` - Enhanced with alternates and openGraph
- `src/app/[locale]/sectors/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/sectors/[slug]/page.tsx` - Enhanced with alternates and openGraph
- `src/app/[locale]/references/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/russia-transit/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/contact/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/quote/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/sourcing/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/callback/page.tsx` - Added generateMetadata via getPageMetadata
- `src/app/[locale]/blog/page.tsx` - Added generateMetadata via getPageMetadata
- `src/messages/tr.json` - Added seo.title and seo.description to 10 page namespaces
- `src/messages/en.json` - Added seo.title and seo.description to 10 page namespaces
- `src/messages/fr.json` - Added seo.title and seo.description to 10 page namespaces
- `src/messages/ru.json` - Added seo.title and seo.description to 10 page namespaces

## Decisions Made
- Homepage generateMetadata returns description and alternates only (title uses layout template default) to avoid duplication
- x-default hreflang points to Turkish (/tr) version matching defaultLocale in routing config
- Dedicated seo.title/seo.description keys added rather than reusing hero.title (SEO titles should be shorter, keyword-optimized)
- getPageMetadata helper encapsulates the common pattern to reduce boilerplate across pages

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All pages have complete SEO metadata foundation for search engine discovery
- COMPANY_INFO constant ready for structured data (JSON-LD) in plan 04-02
- getAlternates utility available for any future pages

## Self-Check: PASSED

- All 3 created files exist (metadata.ts, company-info.ts, seo-metadata.test.ts)
- Both commits found (c41c37b, 0d489b2)
- 13 page files export generateMetadata
- 16 unit tests pass
- Production build succeeds

---
*Phase: 04-seo-infrastructure*
*Completed: 2026-03-10*
