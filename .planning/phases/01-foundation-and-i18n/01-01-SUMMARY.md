---
phase: 01-foundation-and-i18n
plan: 01
subsystem: i18n
tags: [next-intl, next.js, i18n, routing, middleware, vitest, tailwind, shadcn]

# Dependency graph
requires: []
provides:
  - 4-locale routing infrastructure (tr/en/fr/ru) with auto-detection middleware
  - Translation message files with 7 namespaces per locale
  - Locale-aware layout with hreflang metadata generation
  - Vitest test infrastructure with jsdom and React testing support
  - shadcn/ui component system with cn() utility
  - Shared type definitions for locales
affects: [01-02, 01-03, 01-04, 01-05, 02-core-pages, 03-forms, 04-seo, 05-blog, 06-pseo]

# Tech tracking
tech-stack:
  added: [next.js 16.1, next-intl 4.8, framer-motion, next-themes, lucide-react, shadcn/ui 4, vitest 4, tailwindcss 4, class-variance-authority, clsx, tailwind-merge]
  patterns: [app-router-i18n, locale-prefix-always, server-components-with-setRequestLocale, message-namespace-per-component]

key-files:
  created:
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - src/i18n/navigation.ts
    - src/middleware.ts
    - src/messages/tr.json
    - src/messages/en.json
    - src/messages/fr.json
    - src/messages/ru.json
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/app/[locale]/not-found.tsx
    - src/app/not-found.tsx
    - src/types/index.ts
    - src/__tests__/i18n-routing.test.ts
    - src/__tests__/middleware.test.ts
    - src/__tests__/translations.test.ts
    - src/__tests__/metadata.test.ts
    - src/__tests__/setup.ts
    - vitest.config.ts
  modified:
    - package.json
    - next.config.ts
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Used next-intl 4.8 with localePrefix: always for consistent URL structure across all locales"
  - "Turkish (tr) set as default locale matching toko.com.tr domain"
  - "Inter font with latin + cyrillic subsets for Russian language support"
  - "Mocked next/server in middleware tests to avoid Next.js Edge runtime dependency in vitest/jsdom"

patterns-established:
  - "Locale routing: all pages under src/app/[locale]/ with setRequestLocale() call"
  - "Translation structure: src/messages/{locale}.json with namespaced keys"
  - "Server components: use getTranslations() for server-side translation access"
  - "Client components: wrapped in NextIntlClientProvider via locale layout"
  - "Metadata: generateMetadata in locale layout with hreflang alternates for all 4 locales"
  - "Testing: vitest with jsdom, path aliases matching tsconfig, mocks for Next.js internals"

requirements-completed: [I18N-01, I18N-02, I18N-04, I18N-05]

# Metrics
duration: 13min
completed: 2026-03-10
---

# Phase 1 Plan 01: Scaffold and i18n Routing Summary

**Next.js 16 project with 4-locale routing (tr/en/fr/ru) via next-intl, auto-detection middleware, translation files with 7 namespaces, hreflang metadata, and 20 passing behavioral tests**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-10T08:56:42Z
- **Completed:** 2026-03-10T09:10:00Z
- **Tasks:** 2/2
- **Files modified:** 24

## Accomplishments
- Next.js 16 project scaffolded with TypeScript, Tailwind CSS 4, shadcn/ui 4, and all Phase 1 dependencies
- 4-locale i18n routing infrastructure with middleware auto-detection and always-prefix URL strategy
- Complete translation files for TR, EN, FR, RU with 7 namespaces (Metadata, Header, Footer, LanguageSwitcher, Common, NotFound, HomePage)
- Locale layout with NextIntlClientProvider, generateStaticParams, and generateMetadata producing hreflang alternates
- Vitest test infrastructure with 20 passing tests across 4 test files

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js project and install all Phase 1 dependencies** - `253de5f` (feat)
2. **Task 2: Set up next-intl routing, middleware, message files, locale layout with hreflang, and behavioral tests** - `cd3fb3d` (feat)

## Files Created/Modified
- `src/i18n/routing.ts` - defineRouting config with 4 locales, always-prefix, auto-detection
- `src/i18n/request.ts` - Server-side message loading via getRequestConfig
- `src/i18n/navigation.ts` - Locale-aware Link, useRouter, usePathname, redirect, getPathname
- `src/middleware.ts` - createMiddleware for locale detection and redirect
- `src/messages/tr.json` - Turkish translations (reference locale, 7 namespaces)
- `src/messages/en.json` - English translations
- `src/messages/fr.json` - French translations
- `src/messages/ru.json` - Russian translations with Cyrillic characters
- `src/app/[locale]/layout.tsx` - Locale layout with NextIntlClientProvider, generateMetadata with hreflang
- `src/app/[locale]/page.tsx` - Placeholder homepage with translated content
- `src/app/[locale]/not-found.tsx` - Locale-aware 404 page
- `src/app/not-found.tsx` - Root 404 page
- `src/app/layout.tsx` - Root layout with Inter font (latin + cyrillic)
- `src/types/index.ts` - Shared locale types and constants
- `vitest.config.ts` - Vitest configuration with jsdom, React plugin, path aliases
- `src/__tests__/setup.ts` - Test setup with jest-dom matchers
- `src/__tests__/i18n-routing.test.ts` - 5 tests for routing config validation
- `src/__tests__/middleware.test.ts` - 5 tests for middleware config validation
- `src/__tests__/translations.test.ts` - 5 tests for translation key parity across locales
- `src/__tests__/metadata.test.ts` - 5 tests for hreflang URL structure validation
- `next.config.ts` - Updated with next-intl plugin
- `package.json` - Updated with all dependencies and test scripts

## Decisions Made
- Used next-intl 4.8 with `localePrefix: 'always'` for consistent URL structure -- every URL has a locale prefix
- Turkish (tr) set as default locale, matching the toko.com.tr domain
- Inter font loaded with both latin and cyrillic subsets to support Russian content
- Middleware test uses vi.mock for next-intl/middleware and next/server since Next.js Edge runtime modules cannot be imported directly in vitest/jsdom environment
- shadcn/ui v4 initialized with defaults, providing Button component and cn() utility out of the box

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created temporary directory for create-next-app**
- **Found during:** Task 1
- **Issue:** `npx create-next-app` rejects directory names with spaces and capital letters ("Toko Web")
- **Fix:** Created project in temporary directory `toko-web-temp`, then copied all files to project root
- **Files modified:** All scaffolded files
- **Verification:** Build passes, all files in correct location
- **Committed in:** 253de5f (Task 1 commit)

**2. [Rule 1 - Bug] Mocked Next.js server modules in middleware test**
- **Found during:** Task 2
- **Issue:** Importing `@/middleware` triggers `next-intl/middleware` which imports `next/server` -- not available in vitest/jsdom
- **Fix:** Added vi.mock for `next-intl/middleware` and `next/server` in the middleware test file
- **Files modified:** src/__tests__/middleware.test.ts
- **Verification:** All 5 middleware tests pass
- **Committed in:** cd3fb3d (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for execution. No scope creep.

## Issues Encountered
- None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- i18n routing infrastructure complete and tested, ready for Plan 02 (design system, theme)
- All 4 locale routes statically generated and verified
- Translation file structure established for subsequent plans to extend
- Header/Footer translation keys already present in message files, ready for Plan 03/04 implementation

## Self-Check: PASSED

- All 19 created files verified present on disk
- All 4 translation files exceed 30-line minimum (71 lines each)
- Commit 253de5f (Task 1) verified in git log
- Commit cd3fb3d (Task 2) verified in git log
- Build passes with 4 locale routes generated
- All 20 tests pass across 4 test files

---
*Phase: 01-foundation-and-i18n*
*Completed: 2026-03-10*
