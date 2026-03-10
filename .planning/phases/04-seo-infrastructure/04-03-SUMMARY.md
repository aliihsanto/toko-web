---
phase: 04-seo-infrastructure
plan: 03
subsystem: seo
tags: [json-ld, structured-data, schema.org, opengraph, core-web-vitals, image-seo, breadcrumbs]

# Dependency graph
requires:
  - phase: 04-01
    provides: SEO metadata helpers, generateMetadata on all pages, company-info
  - phase: 04-02
    provides: JsonLd component, structured-data builders, sitemap, robots
provides:
  - Organization JSON-LD on every page via layout
  - BreadcrumbList JSON-LD on all 13 inner pages
  - FAQPage JSON-LD on russia-transit page with 5 Q&A pairs
  - Dynamic OG image generation per locale at [locale]/opengraph-image.tsx
  - Locale-aware image alt text across all pages
  - ScrollReveal CLS fix for above-fold content
  - Image audit test suite
affects: [05-blog-content, 06-programmatic-seo]

# Tech tracking
tech-stack:
  added: [next/og ImageResponse]
  patterns: [JSON-LD via layout for site-wide schema, per-page BreadcrumbList pattern, noTransform prop for above-fold fade-only]

key-files:
  created:
    - src/app/[locale]/opengraph-image.tsx
    - src/__tests__/image-audit.test.ts
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
    - src/components/common/scroll-reveal.tsx
    - src/components/common/page-hero.tsx
    - src/messages/en.json
    - src/messages/tr.json
    - src/messages/fr.json
    - src/messages/ru.json

key-decisions:
  - "Organization JSON-LD placed in layout.tsx for automatic site-wide coverage"
  - "Pages without breadcrumb translation keys use Header.nav namespace for breadcrumb names"
  - "ScrollReveal completely removed from all above-fold hero content (not just noTransform) for zero CLS"
  - "OG image uses Satori built-in sans-serif font to avoid custom .ttf complexity"
  - "Blog image alt added as additional locale-aware key beyond original plan scope"

patterns-established:
  - "JSON-LD pattern: Organization in layout, BreadcrumbList in each page, specialized schemas (FAQ) alongside breadcrumbs"
  - "Above-fold content pattern: no animation wrappers on hero elements (badge, h1, subtitle, CTA, stats, hero image)"
  - "Image alt pattern: all Image alt text uses translation keys from page namespace under .images sub-key"

requirements-completed: [SEO-02, SEO-03, SEO-06, SEO-07]

# Metrics
duration: 12min
completed: 2026-03-10
---

# Phase 4 Plan 03: JSON-LD Integration, CWV Fixes, and OG Image Generation Summary

**JSON-LD structured data wired into all pages (Organization site-wide, BreadcrumbList per page, FAQPage on russia-transit), ScrollReveal CLS fixed for above-fold hero content, locale-aware image alt text across all pages, dynamic OG image generation per locale**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-10T17:19:09Z
- **Completed:** 2026-03-10T17:31:46Z
- **Tasks:** 2
- **Files modified:** 22

## Accomplishments
- Organization JSON-LD renders on every page via layout, BreadcrumbList JSON-LD renders on all 13 inner pages, FAQPage JSON-LD on russia-transit with 5 translated Q&A pairs
- ScrollReveal removed from all above-fold hero content across homepage, PageHero, russia-transit, contact, quote, sourcing, callback pages -- zero CLS from hero animations
- Dynamic OG image generation with branded teal gradient design, locale-specific description text from Metadata translations
- All hardcoded English alt text replaced with locale-aware translation keys across 4 locale files
- Image audit test suite with 7 tests verifying alt key completeness and no hardcoded English alt text

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire JSON-LD into all pages and fix ScrollReveal CLS** - `4743920` (feat)
2. **Task 2: OG image generation and image alt text audit** - `8133342` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `src/app/[locale]/layout.tsx` - Added Organization JSON-LD via JsonLd component
- `src/app/[locale]/page.tsx` - Removed ScrollReveal from hero, locale-aware image alt text
- `src/app/[locale]/about/page.tsx` - BreadcrumbList JSON-LD, locale-aware team image alt
- `src/app/[locale]/services/page.tsx` - BreadcrumbList JSON-LD
- `src/app/[locale]/services/[slug]/page.tsx` - 3-level BreadcrumbList JSON-LD
- `src/app/[locale]/sectors/page.tsx` - BreadcrumbList JSON-LD
- `src/app/[locale]/sectors/[slug]/page.tsx` - 3-level BreadcrumbList JSON-LD
- `src/app/[locale]/references/page.tsx` - BreadcrumbList JSON-LD
- `src/app/[locale]/russia-transit/page.tsx` - BreadcrumbList + FAQPage JSON-LD, removed hero ScrollReveal, locale-aware trade image alt
- `src/app/[locale]/contact/page.tsx` - BreadcrumbList JSON-LD, removed hero ScrollReveal
- `src/app/[locale]/quote/page.tsx` - BreadcrumbList JSON-LD, removed hero ScrollReveal
- `src/app/[locale]/sourcing/page.tsx` - BreadcrumbList JSON-LD, removed hero ScrollReveal
- `src/app/[locale]/callback/page.tsx` - BreadcrumbList JSON-LD, removed hero ScrollReveal
- `src/app/[locale]/blog/page.tsx` - BreadcrumbList JSON-LD, locale-aware post image alt
- `src/app/[locale]/opengraph-image.tsx` - Dynamic OG image generation with Satori
- `src/components/common/scroll-reveal.tsx` - Added noTransform prop for fade-only animation
- `src/components/common/page-hero.tsx` - Removed all ScrollReveal wrappers from above-fold content
- `src/messages/{tr,en,fr,ru}.json` - Added image alt translation keys
- `src/__tests__/image-audit.test.ts` - Static analysis tests for image alt coverage

## Decisions Made
- Organization JSON-LD placed in layout.tsx (not individual pages) for automatic site-wide coverage on every route
- Pages without breadcrumb translation keys (contact, quote, sourcing, callback, blog) use Header.nav namespace for Home/page name breadcrumb labels
- ScrollReveal completely removed from above-fold hero content rather than using noTransform -- direct rendering gives best LCP and zero CLS
- OG image uses Satori built-in sans-serif font to avoid complexity of loading custom .ttf files
- Added BlogPage.images.post translation key beyond original plan scope (Rule 2: hardcoded "Blog post" alt was a locale-awareness gap)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added blog image alt locale-awareness**
- **Found during:** Task 2 (image alt text audit)
- **Issue:** Blog page had hardcoded `alt="Blog post"` which was not in the plan's list of images to fix
- **Fix:** Added BlogPage.images.post translation key to all 4 locale files and replaced hardcoded alt
- **Files modified:** src/app/[locale]/blog/page.tsx, src/messages/{tr,en,fr,ru}.json
- **Verification:** Image audit test verifies key exists in all locales
- **Committed in:** 8133342 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for complete locale-aware image alt coverage. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All SEO infrastructure for Phase 4 is complete (metadata, structured data, sitemap, robots, JSON-LD, OG images, CWV fixes)
- Phase 5 (Blog Content) can use established JSON-LD patterns and OG image generation
- Phase 6 (Programmatic SEO) has full structured data foundation to build on

## Self-Check: PASSED

- [x] src/app/[locale]/opengraph-image.tsx exists
- [x] src/__tests__/image-audit.test.ts exists
- [x] .planning/phases/04-seo-infrastructure/04-03-SUMMARY.md exists
- [x] Commit 4743920 exists (Task 1)
- [x] Commit 8133342 exists (Task 2)
- [x] 14 tests pass (7 json-ld + 7 image-audit)
- [x] Build succeeds

---
*Phase: 04-seo-infrastructure*
*Completed: 2026-03-10*
