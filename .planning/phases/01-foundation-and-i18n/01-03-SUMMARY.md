---
phase: 01-foundation-and-i18n
plan: 03
subsystem: ui
tags: [react, next-intl, header, navigation, i18n, responsive, shadcn, base-ui, scroll]

# Dependency graph
requires:
  - phase: 01-foundation-and-i18n/01-01
    provides: "i18n routing, navigation utilities, translation files"
  - phase: 01-foundation-and-i18n/01-02
    provides: "ThemeToggle, shadcn/ui components (Button, DropdownMenu, Sheet), theme system"
provides:
  - "Header component with shrink-on-scroll, desktop nav, mobile nav"
  - "LanguageSwitcher dropdown component for locale switching"
  - "MobileNav slide-in drawer with full navigation"
  - "Header integrated into locale layout"
affects: [02-homepage-and-about, 03-services-and-sectors, footer]

# Tech tracking
tech-stack:
  added: []
  patterns: [shrink-on-scroll-header, passive-scroll-listener, locale-switching-via-router-replace, base-ui-onClick-not-onSelect]

key-files:
  created:
    - src/components/layout/header.tsx
    - src/components/layout/language-switcher.tsx
    - src/components/layout/mobile-nav.tsx
    - src/__tests__/header.test.tsx
    - src/__tests__/language-switcher.test.tsx
  modified:
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx

key-decisions:
  - "Used onClick instead of onSelect for Base UI DropdownMenuItem (Base UI does not support onSelect)"
  - "Used text-based locale names in language switcher instead of flags (more professional for B2B corporate)"
  - "Inline locale buttons in mobile nav instead of dropdown (better touch UX)"
  - "Passive scroll listener with 50px threshold for header shrink detection"

patterns-established:
  - "Header shrink-on-scroll: useState + useEffect with passive scroll listener, cn() for conditional classes"
  - "Navigation items: const array of {key, href} objects, iterated with Link from @/i18n/navigation"
  - "Component testing: mock child components as simple divs with data-testid for isolation"

requirements-completed: [UX-03, I18N-03, UX-02]

# Metrics
duration: 5min
completed: 2026-03-10
---

# Phase 1 Plan 3: Header and Navigation Summary

**Responsive header with shrink-on-scroll, language switcher dropdown, mobile hamburger drawer, and 7-item navigation using next-intl translations**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-10T09:23:08Z
- **Completed:** 2026-03-10T09:28:03Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Responsive header with desktop navigation (7 items), language switcher, theme toggle, and CTA button
- Shrink-on-scroll behavior with smooth CSS transitions (50px threshold, py-6 to py-2, backdrop blur)
- Language switcher dropdown using Base UI DropdownMenu with locale switching via router.replace
- Mobile hamburger drawer using Sheet component with nav links, inline locale buttons, theme toggle, and CTA
- 14 tests passing (5 language-switcher, 9 header)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create language switcher, mobile navigation, and language-switcher tests** - `6aa9b12` (feat)
2. **Task 2: Create header component with shrink-on-scroll, wire into locale layout, and add header tests** - `d00cb30` (feat)

## Files Created/Modified
- `src/components/layout/header.tsx` - Main header with shrink-on-scroll, desktop nav, language switcher, theme toggle, CTA
- `src/components/layout/language-switcher.tsx` - Locale switching dropdown with Globe icon and active locale check mark
- `src/components/layout/mobile-nav.tsx` - Slide-in Sheet drawer with navigation, inline locale options, theme toggle, CTA
- `src/app/[locale]/layout.tsx` - Added Header inside ThemeProvider, wrapped children in main with pt-24
- `src/app/[locale]/page.tsx` - Removed temporary ThemeToggle, added tall scroll sections
- `src/__tests__/header.test.tsx` - 9 tests for header rendering, accessibility, navigation
- `src/__tests__/language-switcher.test.tsx` - 5 tests for dropdown, locale change, active indicator

## Decisions Made
- Used `onClick` instead of `onSelect` for Base UI DropdownMenuItem -- Base UI Menu.Item does not support `onSelect` prop (unlike Radix). Discovered during test debugging.
- Text-based locale names in switcher (no flag icons) -- more professional for B2B corporate site per plan guidance.
- Inline locale buttons in mobile nav rather than nested dropdown -- better touch UX in a slide-in drawer.
- Passive scroll listener with 50px threshold for header shrink -- avoids blocking main thread during scroll.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used onClick instead of onSelect for DropdownMenuItem**
- **Found during:** Task 1 (language-switcher tests)
- **Issue:** Plan specified `onSelect` for dropdown item selection but Base UI's Menu.Item component uses `onClick` not `onSelect`. Tests showed `router.replace` was never called.
- **Fix:** Changed `onSelect` to `onClick` in LanguageSwitcher component.
- **Files modified:** src/components/layout/language-switcher.tsx
- **Verification:** All 5 language-switcher tests pass, locale switching works correctly.
- **Committed in:** 6aa9b12 (Task 1 commit, fixed before commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Single API compatibility fix for Base UI. No scope creep.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Header and navigation foundation complete for all future pages
- Navigation links to /about, /services, /sectors, /references, /blog, /contact are wired but will 404 until Phase 2+ pages are built (expected)
- Language switching preserves path -- new pages will automatically get locale routing
- Mobile navigation is production-ready for all viewport sizes

## Self-Check: PASSED

- All 7 files verified present on disk
- Both commit hashes (6aa9b12, d00cb30) verified in git log
- All must_have artifact patterns confirmed (scrolled, Sheet, useLocale)
- All key_links patterns confirmed (LanguageSwitcher, MobileNav, ThemeToggle in header; router.replace locale in language-switcher)
- header.tsx is 94 lines (min_lines: 60 requirement met)

---
*Phase: 01-foundation-and-i18n*
*Completed: 2026-03-10*
