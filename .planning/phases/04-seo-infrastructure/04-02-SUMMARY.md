---
phase: 04-seo-infrastructure
plan: 02
subsystem: seo
tags: [json-ld, schema-dts, structured-data, sitemap, robots, seo]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: i18n routing with 4 locales (tr, en, fr, ru)
  - phase: 02-core-pages
    provides: services and sectors data arrays for sitemap generation
provides:
  - JsonLd server component with XSS protection for embedding structured data
  - Schema builder functions (Organization, LocalBusiness, BreadcrumbList, FAQPage)
  - Multilingual sitemap.xml covering 23 pages x 4 locales with hreflang alternates
  - robots.txt with proper crawler directives and sitemap pointer
  - company-info.ts with extended business information (geo, hours, contact)
affects: [04-seo-infrastructure-plan-03, programmatic-seo]

# Tech tracking
tech-stack:
  added: [schema-dts]
  patterns: [server-component-json-ld, xss-safe-structured-data, multilingual-sitemap-alternates]

key-files:
  created:
    - src/lib/seo/json-ld.tsx
    - src/lib/seo/structured-data.ts
    - src/app/sitemap.ts
    - src/app/robots.ts
    - src/__tests__/json-ld.test.ts
    - src/__tests__/sitemap.test.ts
    - src/__tests__/robots.test.ts
  modified:
    - src/lib/seo/company-info.ts
    - package.json

key-decisions:
  - "Used schema-dts for type-safe structured data with full schema.org type coverage"
  - "JsonLd as server component with zero client JS cost and XSS protection via \\u003c escaping"
  - "Sitemap uses Turkish (/tr) as canonical URL with hreflang alternates for all 4 locales"
  - "Enhanced company-info.ts with geo coordinates, email, opening hours for LocalBusiness schema"

patterns-established:
  - "JsonLd component pattern: server-rendered script tag with dangerouslySetInnerHTML and XSS escaping"
  - "Schema builder pattern: locale-aware functions returning WithContext<SchemaType> from schema-dts"
  - "Sitemap entry pattern: makeEntry helper generating URL + alternates for all routing locales"

requirements-completed: [SEO-02, SEO-03, SEO-04, SEO-05]

# Metrics
duration: 5min
completed: 2026-03-10
---

# Phase 4 Plan 2: Structured Data and Sitemap Summary

**Type-safe JSON-LD component with schema-dts, 4 schema builders (Organization, LocalBusiness, BreadcrumbList, FAQPage), multilingual sitemap covering 23 pages x 4 locales, and robots.txt configuration**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-10T17:05:51Z
- **Completed:** 2026-03-10T17:10:24Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- JsonLd server component with XSS protection (zero client JS cost)
- 4 schema builder functions: Organization, LocalBusiness, BreadcrumbList, FAQPage with locale awareness
- Multilingual sitemap.xml with 23 entries, each having hreflang alternates for tr/en/fr/ru
- robots.txt allowing crawlers, blocking /api/, pointing to sitemap.xml
- 17 passing tests across 3 test files

## Task Commits

Each task was committed atomically (TDD: RED then GREEN):

1. **Task 1: JSON-LD component and structured data builders**
   - RED: `444c837` (test: failing tests for JSON-LD and structured data)
   - GREEN: `b4a5a94` (feat: implement JSON-LD component and structured data builders)
2. **Task 2: Sitemap and robots configuration**
   - RED: `46fcd36` (test: failing tests for sitemap and robots)
   - GREEN: `32db32a` (feat: implement multilingual sitemap and robots)

## Files Created/Modified
- `src/lib/seo/json-ld.tsx` - Server component rendering JSON-LD script tags with XSS protection
- `src/lib/seo/structured-data.ts` - Schema builder functions for Organization, LocalBusiness, BreadcrumbList, FAQPage
- `src/lib/seo/company-info.ts` - Enhanced with geo coordinates, email, region, opening hours
- `src/app/sitemap.ts` - Multilingual sitemap with 23 entries and hreflang alternates
- `src/app/robots.ts` - Crawler rules (allow /, disallow /api/) with sitemap pointer
- `src/__tests__/json-ld.test.ts` - 7 tests for JsonLd component and schema builders
- `src/__tests__/sitemap.test.ts` - 7 tests for sitemap entries, alternates, priorities
- `src/__tests__/robots.test.ts` - 3 tests for robots rules and sitemap URL
- `package.json` - Added schema-dts dependency

## Decisions Made
- Used schema-dts for type-safe structured data instead of raw objects -- provides full schema.org type coverage and IDE autocomplete
- JsonLd is a server component (no 'use client') with zero client JS cost, using dangerouslySetInnerHTML with `<` to `\u003c` escaping per Next.js docs
- Turkish (/tr) used as canonical URL in sitemap entries since it's the default locale
- Enhanced company-info.ts (originally from plan 01) with geo coordinates (41.0082, 28.9784), email, region, and opening hours for LocalBusiness schema compliance

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Enhanced company-info.ts with additional fields**
- **Found during:** Task 1 (structured data builders)
- **Issue:** company-info.ts from plan 01 lacked geo, email, region, and openingHours fields needed by LocalBusiness schema
- **Fix:** Added geo coordinates, email, region, and openingHours to existing COMPANY_INFO constant
- **Files modified:** src/lib/seo/company-info.ts
- **Verification:** getLocalBusinessSchema tests pass with Istanbul address and coordinates
- **Committed in:** b4a5a94 (Task 1 GREEN commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for LocalBusiness schema completeness. No scope creep.

## Issues Encountered
None - all tasks executed cleanly with TDD flow.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- JsonLd component and schema builders ready for plan 03 to wire into page layouts
- Sitemap and robots.txt will be served automatically by Next.js at /sitemap.xml and /robots.txt
- No blockers for plan 03 integration

## Self-Check: PASSED

All 8 created/modified files verified present. All 4 commit hashes (444c837, b4a5a94, 46fcd36, 32db32a) confirmed in git log. 17/17 tests pass. Build succeeds with sitemap.xml and robots.txt generated.

---
*Phase: 04-seo-infrastructure*
*Completed: 2026-03-10*
