---
phase: 05-blog-system
plan: 01
subsystem: content
tags: [velite, mdx, shiki, rehype, blog, content-pipeline]

# Dependency graph
requires:
  - phase: 01-foundation-and-i18n
    provides: next-intl routing with 4 locales, tsconfig paths, vitest config
provides:
  - Velite content processing pipeline for MDX blog posts
  - Blog utility functions (getPostsByLocale, getPostBySlug, getPostsByCategory, getCategories, getPaginatedPosts)
  - MDXContent client component for rendering compiled MDX with design system styling
  - "#site/content" TypeScript alias for .velite imports
affects: [05-blog-system]

# Tech tracking
tech-stack:
  added: [velite, "@shikijs/rehype", shiki, rehype-slug, rehype-autolink-headings, remark-gfm]
  patterns: [Velite NODE_ENV integration with Next.js 16 Turbopack, folder-based locale content organization, "#site/content" path alias]

key-files:
  created:
    - velite.config.ts
    - src/lib/blog/utils.ts
    - src/components/blog/mdx-content.tsx
    - content/blog/tr/_placeholder.mdx
    - src/__tests__/blog-utils.test.ts
  modified:
    - next.config.ts
    - tsconfig.json
    - vitest.config.ts
    - .gitignore
    - package.json

key-decisions:
  - "Velite build triggered via NODE_ENV detection in next.config.ts (not process.argv or VeliteWebpackPlugin) for Next.js 16 Turbopack compatibility"
  - "#site/content path alias for .velite imports instead of relative imports or @/ prefix"
  - "MDXContent as client component using new Function() for MDX body hydration"
  - "Folder-based locale organization (content/blog/{locale}/) with s.path() auto-generating locale-aware slugs"

patterns-established:
  - "Velite content pipeline: content/{collection}/{locale}/*.mdx -> .velite -> #site/content import"
  - "Blog utility pattern: filter by slug prefix + published flag, sort by date desc"
  - "MDX rendering: useMDXComponent(code) -> Component with sharedComponents override"

requirements-completed: [BLOG-01]

# Metrics
duration: 7min
completed: 2026-03-10
---

# Phase 5 Plan 01: Blog Infrastructure Summary

**Velite MDX content pipeline with Next.js 16 Turbopack integration, blog utilities, and styled MDX renderer**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-10T17:53:34Z
- **Completed:** 2026-03-10T18:00:41Z
- **Tasks:** 2 (Task 2 was TDD: RED -> GREEN)
- **Files modified:** 13

## Accomplishments
- Velite processes MDX from content/blog/{locale}/ and generates typed output in .velite/
- Next.js 16 build triggers Velite via NODE_ENV detection (no webpack plugin, Turbopack compatible)
- Blog utility functions correctly filter, sort, paginate posts by locale with 18 passing tests
- MDXContent component renders compiled MDX with project design system styling (headings, lists, tables, code, images)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Velite, configure schema, integrate Next.js 16, set up aliases** - `7a39d5c` (feat)
2. **Task 2 RED: Add failing blog utility tests** - `48314b4` (test)
3. **Task 2 GREEN: Implement blog utilities and MDX renderer** - `ac0f600` (feat)

## Files Created/Modified
- `velite.config.ts` - Velite collection schema with Post definition (s.mdx, s.toc, s.metadata, s.excerpt)
- `next.config.ts` - Velite build integration using NODE_ENV detection
- `tsconfig.json` - Added #site/content path alias for .velite imports
- `vitest.config.ts` - Added #site/content alias for test environment
- `.gitignore` - Added .velite to ignored files
- `package.json` - Added velite, shiki, rehype-slug, rehype-autolink-headings, remark-gfm
- `content/blog/tr/_placeholder.mdx` - Placeholder MDX for build validation (published: false)
- `src/lib/blog/utils.ts` - 7 exported functions + POSTS_PER_PAGE constant for blog data access
- `src/components/blog/mdx-content.tsx` - Client component rendering MDX with styled HTML overrides
- `src/__tests__/blog-utils.test.ts` - 18 tests covering all blog utility functions

## Decisions Made
- Used NODE_ENV detection (not process.argv or VeliteWebpackPlugin) for Next.js 16 Turbopack compatibility
- Added #site/content path alias (convention from Velite examples) rather than relative imports
- MDXContent is a client component ('use client') since new Function() runs client-side
- Folder-based locale organization (content/blog/{locale}/) lets s.path() auto-generate locale-aware slugs
- rehype plugin order: rehypeSlug -> rehypeAutolinkHeadings -> rehypeShiki (order matters for heading ID generation)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Velite infrastructure ready for Plan 02 (blog listing + detail pages)
- Blog utilities provide data access layer for page components
- MDXContent component ready for blog detail page rendering
- Placeholder content will be replaced by seed content in Plan 03
- Research flag resolved: Velite 0.3.x works with Next.js 16 using NODE_ENV detection pattern

## Self-Check: PASSED

All 5 created files verified present. All 3 task commits verified in git log.

---
*Phase: 05-blog-system*
*Completed: 2026-03-10*
