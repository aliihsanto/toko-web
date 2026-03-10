---
phase: 06-programmatic-seo
plan: 01
subsystem: data
tags: [pseo, multilingual, typescript, vitest, content-generation, seo]

# Dependency graph
requires:
  - phase: 04-seo-infrastructure
    provides: SEO metadata patterns, structured data components
  - phase: 01-foundation-and-i18n
    provides: Locale routing (tr, en, fr, ru), next-intl infrastructure
provides:
  - TypeScript interfaces for all 4 PSEO page data types (ProductPageData, CountryPageData, FAQPageData, CustomsPageData)
  - 32 product page entries across 8 sectors with 730+ words per locale
  - 20 country trade guide entries with 506+ words per locale
  - 12 FAQ page entries with 10 Q&A each and 702+ words per locale
  - 15 customs/regulation guide entries (8 regional + 7 topical) with 1008+ words per locale
  - Utility helpers for locale content resolution and page lookup by slug
  - Validation test suite for data completeness, slug uniqueness, and word count minimums
affects: [06-02-PLAN (template pages), 06-03-PLAN (SEO integration)]

# Tech tracking
tech-stack:
  added: []
  patterns: [LocaleContent locale-keyed content pattern, Node.js generator scripts for data file generation]

key-files:
  created:
    - src/data/pseo/types.ts
    - src/data/pseo/products.ts
    - src/data/pseo/countries.ts
    - src/data/pseo/faqs.ts
    - src/data/pseo/customs.ts
    - src/lib/pseo/utils.ts
    - src/__tests__/pseo-data.test.ts
    - scripts/gen-products.cjs
    - scripts/gen-countries.cjs
    - scripts/gen-faqs.cjs
    - scripts/gen-customs.cjs
  modified: []

key-decisions:
  - "Used Node.js generator scripts (scripts/gen-*.cjs) to produce data files from seed arrays -- enables reproducible regeneration and keeps data files maintainable"
  - "Content stored as LocaleContent objects in separate data files (NOT in next-intl message bundles) to avoid bloating translation files with long-form content"
  - "Product slugs derived from sector + productKey pattern (e.g., food-grains, textile-fabrics) matching sectors.ts productKeys"
  - "Generator scripts use template interpolation with unique seed data per entry (trade volumes, certifications, HS codes) to produce genuinely varied content"

patterns-established:
  - "LocaleContent pattern: { tr: string; en: string; fr: string; ru: string } for all multilingual content fields"
  - "Generator script pattern: Node.js CJS scripts in scripts/ directory that produce TypeScript data files from seed arrays"
  - "PSEO data validation: vitest tests checking locale completeness, slug uniqueness, word count minimums, and cross-file slug uniqueness"

requirements-completed: [PSEO-01, PSEO-02, PSEO-03, PSEO-04, PSEO-05]

# Metrics
duration: 55min
completed: 2026-03-10
---

# Phase 6 Plan 01: PSEO Data Infrastructure Summary

**79 multilingual PSEO page data entries (32 products, 20 countries, 12 FAQs, 15 customs) with 500+ words per locale across all 4 languages, TypeScript interfaces, utility helpers, and validation tests**

## Performance

- **Duration:** 55 min
- **Started:** 2026-03-10T18:51:05Z
- **Completed:** 2026-03-10T19:46:00Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Created TypeScript type system for all 4 PSEO page data types with strict locale-keyed content interfaces
- Generated 79 page data entries totaling ~160,000+ words of multilingual content across Turkish, English, French, and Russian
- Built utility helpers for locale resolution, page lookup by slug, and word counting
- Established validation test suite (27 tests) covering locale completeness, slug uniqueness, word count minimums (500+), and cross-file slug uniqueness
- Created reusable Node.js generator scripts for reproducible content generation

## Task Commits

Each task was committed atomically:

1. **Task 1: TypeScript interfaces, utility helpers, and validation test scaffold** - `d78fb6d` (feat)
2. **Task 2: Populate all 4 PSEO data files with substantive multilingual content** - `4d29bdf` (feat)

## Files Created/Modified
- `src/data/pseo/types.ts` - TypeScript interfaces for LocaleContent, PageMeta, ProductPageData, CountryPageData, FAQPageData, CustomsPageData
- `src/data/pseo/products.ts` - 32 product import page entries across 8 sectors (min 730 words/locale)
- `src/data/pseo/countries.ts` - 20 country trade guide entries (min 506 words/locale)
- `src/data/pseo/faqs.ts` - 12 FAQ page entries with 10 Q&A each (min 702 words/locale)
- `src/data/pseo/customs.ts` - 15 customs/regulation guide entries (min 1008 words/locale)
- `src/lib/pseo/utils.ts` - Locale resolution helper (t), page lookup functions, word counter
- `src/__tests__/pseo-data.test.ts` - 27 validation tests across 5 describe blocks
- `scripts/gen-products.cjs` - Generator script for product data from 32 seed entries
- `scripts/gen-countries.cjs` - Generator script for country data from 20 seed entries
- `scripts/gen-faqs.cjs` - Generator script for FAQ data from 12 seed entries
- `scripts/gen-customs.cjs` - Generator script for customs data from 15 seed entries

## Decisions Made
- Used Node.js generator scripts to produce data files from seed arrays -- enables reproducible regeneration and keeps 7000+ line data files maintainable through compact seed definitions
- Content stored in separate `src/data/pseo/` files rather than next-intl message bundles to avoid bloating translation JSON with long-form SEO content
- Product slugs follow `{sector}-{product}` naming pattern derived from sectors.ts productKeys
- Each generator validates minimum 500 word count per locale before writing output, failing early if content is insufficient

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added missing wc() function to gen-products.cjs**
- **Found during:** Task 2 (Product data generation)
- **Issue:** The generator script referenced a `wc()` word count function that was not defined
- **Fix:** Added `function wc(t) { return t.trim().split(/\s+/).filter(w => w.length > 0).length; }` at the top of the script
- **Files modified:** scripts/gen-products.cjs
- **Verification:** Script runs successfully, all products pass 500+ word validation
- **Committed in:** 4d29bdf (Task 2 commit)

**2. [Rule 1 - Bug] Expanded country content paragraphs to meet 500-word minimum**
- **Found during:** Task 2 (Country data generation)
- **Issue:** Initial country content fell below 500 words for some locales (min was 445 words for Israel [ru])
- **Fix:** Expanded all 3 overview paragraphs by 20-40 words per locale across 4 iterations until minimum reached 506 words
- **Files modified:** scripts/gen-countries.cjs
- **Verification:** All 20 countries pass 500+ word count in all 4 locales
- **Committed in:** 4d29bdf (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes were necessary for script execution and content quality requirements. No scope creep.

## Issues Encountered
- Content volume challenge: 79 pages x 4 locales x 500+ words = ~160,000+ words of content. Solved by developing generator scripts that combine unique seed data with structured templates, making each entry genuinely different while keeping the generation process manageable.
- Pre-existing TypeScript errors in `src/__tests__/json-ld.test.ts` (unrelated to PSEO work) -- logged as out of scope.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 4 PSEO data files are ready for consumption by 06-02 template pages (route handlers with generateStaticParams)
- Utility helpers (`getProductPage`, `getCountryPage`, etc.) provide clean API for template components
- All slug arrays available via `getAllProductSlugs()` etc. for static params generation
- Data validated: 27 tests passing, all entries have complete locale coverage and 500+ words

## Self-Check: PASSED

- All 11 created files verified present on disk
- Both task commits verified in git log (d78fb6d, 4d29bdf)
- 27/27 vitest tests passing
- Production build succeeds
- No PSEO-related TypeScript errors

---
*Phase: 06-programmatic-seo*
*Completed: 2026-03-10*
