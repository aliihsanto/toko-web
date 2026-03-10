---
phase: 05-blog-system
plan: 03
subsystem: content
tags: [mdx, velite, seo, json-ld, sitemap, blog, i18n]

requires:
  - phase: 05-01
    provides: Velite blog infrastructure, MDX processing pipeline, content schema
  - phase: 05-02
    provides: Blog listing, detail, and pagination pages with category filtering
  - phase: 04-02
    provides: Structured data utilities (getBreadcrumbSchema, JsonLd component)
provides:
  - 16 seed blog posts (4 per locale) with substantive trade content
  - Article JSON-LD structured data on blog detail pages
  - Blog post entries in sitemap across all 4 locales
  - Content validation test suite
affects: [06-programmatic-seo]

tech-stack:
  added: []
  patterns:
    - "Locale-specific sitemap entries for blog posts (no cross-locale alternates for language-unique slugs)"
    - "Article JSON-LD with Organization author/publisher on blog detail pages"

key-files:
  created:
    - content/blog/tr/turkiye-ithalat-rehberi.mdx
    - content/blog/tr/gumruk-islemleri-2026.mdx
    - content/blog/tr/turkiye-ticaret-avantajlari.mdx
    - content/blog/tr/tekstil-sektoru-kaynak-rehberi.mdx
    - content/blog/en/turkey-import-guide.mdx
    - content/blog/en/customs-procedures-2026.mdx
    - content/blog/en/turkey-trade-advantages.mdx
    - content/blog/en/textile-sourcing-guide.mdx
    - content/blog/fr/guide-importation-turquie.mdx
    - content/blog/fr/procedures-douanieres-2026.mdx
    - content/blog/fr/avantages-commerce-turquie.mdx
    - content/blog/fr/guide-approvisionnement-textile.mdx
    - content/blog/ru/rukovodstvo-po-importu-turtsiya.mdx
    - content/blog/ru/tamozhennye-protsedury-2026.mdx
    - content/blog/ru/preimushchestva-torgovli-turtsiya.mdx
    - content/blog/ru/rukovodstvo-po-zakupkam-tekstil.mdx
    - src/__tests__/blog-content.test.ts
  modified:
    - src/lib/seo/structured-data.ts
    - src/app/[locale]/blog/[slug]/page.tsx
    - src/app/sitemap.ts
    - src/__tests__/sitemap.test.ts
    - src/messages/tr.json
    - src/messages/en.json
    - src/messages/fr.json
    - src/messages/ru.json

key-decisions:
  - "Blog entries use locale-specific sitemap URLs without cross-locale alternates (slugs differ per language)"
  - "Article JSON-LD uses Organization type for author/publisher (company blog, not individual)"

patterns-established:
  - "getArticleSchema pattern for Article JSON-LD on content pages"
  - "Locale-specific sitemap entries for content with unique-per-locale slugs"

requirements-completed: [BLOG-05, BLOG-03]

duration: 20min
completed: 2026-03-10
---

# Phase 5 Plan 3: Blog Seed Content & SEO Summary

**16 seed blog posts across 4 locales (TR/EN/FR/RU) covering import/export trade topics, with Article JSON-LD on detail pages and full sitemap integration**

## Performance

- **Duration:** 20 min
- **Started:** 2026-03-10T18:14:42Z
- **Completed:** 2026-03-10T18:34:57Z
- **Tasks:** 2
- **Files modified:** 26

## Accomplishments

- Created 16 substantive blog posts (4 per locale) covering import guides, customs procedures, trade advantages, and textile sourcing
- Each post has 500+ words of natural, locale-appropriate content (proper Turkish characters, Cyrillic Russian, accented French)
- Added getArticleSchema to structured-data.ts for Article JSON-LD with Organization author/publisher
- Blog detail pages now render both BreadcrumbList and Article JSON-LD structured data
- Sitemap includes all 16 blog post URLs with locale-specific entries
- Content validation test suite validates post counts, frontmatter, excerpts, TOC, reading time, and categories
- All 166 tests pass, full production build succeeds with all blog routes statically generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 16 seed blog posts** - `9dfc587` (feat)
2. **Task 2: Article JSON-LD, sitemap integration, content tests** - `36e5c69` (feat)

## Files Created/Modified

- `content/blog/tr/*.mdx` (4 files) - Turkish blog posts: ithalat rehberi, gumruk islemleri, ticaret avantajlari, tekstil tedarik
- `content/blog/en/*.mdx` (4 files) - English blog posts: import guide, customs procedures, trade advantages, textile sourcing
- `content/blog/fr/*.mdx` (4 files) - French blog posts: guide importation, procedures douanieres, avantages commerce, approvisionnement textile
- `content/blog/ru/*.mdx` (4 files) - Russian blog posts (Cyrillic): import guide, customs, advantages, textile sourcing
- `src/lib/seo/structured-data.ts` - Added getArticleSchema function for Article JSON-LD
- `src/app/[locale]/blog/[slug]/page.tsx` - Added Article JSON-LD rendering after breadcrumb
- `src/app/sitemap.ts` - Added blog post entries with locale-specific URLs
- `src/__tests__/blog-content.test.ts` - New: 10 tests validating seed content structure
- `src/__tests__/sitemap.test.ts` - Updated to account for blog entries
- `src/messages/{tr,en,fr,ru}.json` - Added BlogPage.images.post alt text key

## Decisions Made

- Blog sitemap entries use locale-specific URLs without cross-locale hreflang alternates because blog slugs differ per language (e.g., TR: turkiye-ithalat-rehberi vs EN: turkey-import-guide). These are independent content pieces, not translations of each other.
- Article JSON-LD uses Organization type for author and publisher since this is a company blog, not individual author content.
- Added BlogPage.images.post alt text key to all locale files to satisfy existing image-audit test requirements.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated sitemap test expectations**
- **Found during:** Task 2
- **Issue:** sitemap.test.ts expected exactly 23 entries and all entries to have hreflang alternates; blog entries added 16 more entries without alternates
- **Fix:** Updated test to separate static entries (with alternates) from blog entries (locale-specific, no alternates), and adjusted count assertions
- **Files modified:** src/__tests__/sitemap.test.ts
- **Verification:** All sitemap tests pass
- **Committed in:** 36e5c69 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added BlogPage.images.post to locale files**
- **Found during:** Task 2
- **Issue:** image-audit.test.ts requires BlogPage.images.post key in all 4 locale files, but it was missing
- **Fix:** Added locale-appropriate alt text for blog post images to all 4 message files
- **Files modified:** src/messages/{tr,en,fr,ru}.json
- **Verification:** image-audit tests pass
- **Committed in:** 36e5c69 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 missing critical)
**Impact on plan:** Both auto-fixes necessary for test suite integrity. No scope creep.

## Issues Encountered

None - plan executed smoothly with all 16 posts processed by Velite, full build passing, and all 166 tests green.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 5 (Blog System) is fully complete: infrastructure (05-01), pages (05-02), and seed content (05-03) all delivered
- 16 blog posts provide substantive SEO content across all 4 locales
- Article JSON-LD ensures rich search results for blog pages
- Sitemap covers all blog URLs for search engine indexing
- Ready for Phase 6 (Programmatic SEO) which builds on the blog/content foundation

---
*Phase: 05-blog-system*
*Completed: 2026-03-10*
