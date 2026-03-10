---
phase: 01-foundation-and-i18n
plan: 02
subsystem: ui
tags: [tailwind-v4, oklch, next-themes, shadcn-ui, dark-mode, theme-toggle, inter-font, svg-logo]

# Dependency graph
requires:
  - phase: 01-foundation-and-i18n/01
    provides: "Next.js scaffold, i18n routing, shadcn init, button component"
provides:
  - "Dark navy blue CSS theme with oklch color tokens for light and dark modes"
  - "ThemeProvider integration via next-themes with class attribute strategy"
  - "ThemeToggle component for dark/light mode switching"
  - "Inter font centralized module with latin + cyrillic subsets"
  - "TOKO logo SVGs for light and dark modes"
  - "shadcn/ui components: button, dropdown-menu, sheet, navigation-menu, separator"
affects: [01-foundation-and-i18n/03, 01-foundation-and-i18n/04, 02-homepage, 03-service-pages]

# Tech tracking
tech-stack:
  added: [next-themes, dropdown-menu, sheet, navigation-menu, separator]
  patterns: [oklch-color-tokens, class-based-dark-mode, centralized-font-module, theme-toggle-pattern]

key-files:
  created:
    - src/lib/fonts.ts
    - src/components/layout/theme-toggle.tsx
    - src/__tests__/theme-toggle.test.tsx
    - public/images/logo/toko-logo.svg
    - public/images/logo/toko-logo-dark.svg
    - src/components/ui/dropdown-menu.tsx
    - src/components/ui/navigation-menu.tsx
    - src/components/ui/separator.tsx
    - src/components/ui/sheet.tsx
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx

key-decisions:
  - "Used oklch color space (matching Tailwind v4 + shadcn v4 convention) instead of HSL for all theme tokens"
  - "Kept globals.css at src/app/globals.css matching scaffolded project structure rather than moving to src/styles/"
  - "ThemeProvider placed inside NextIntlClientProvider in locale layout for proper i18n + theme integration"

patterns-established:
  - "oklch color tokens: All theme variables use oklch format for consistency with Tailwind v4"
  - "Centralized font module: Inter font config in src/lib/fonts.ts, imported by root layout"
  - "Theme toggle pattern: Client component using useTheme hook with resolvedTheme for accurate toggle"
  - "Logo theme variants: Separate SVG files for light/dark modes in public/images/logo/"

requirements-completed: [UX-01, UX-05]

# Metrics
duration: 7min
completed: 2026-03-10
---

# Phase 1 Plan 2: Design System and Theming Summary

**Dark navy blue corporate theme with oklch tokens, ThemeProvider integration, theme toggle component, TOKO logo SVGs, and 5 shadcn/ui components installed**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-10T09:14:05Z
- **Completed:** 2026-03-10T09:21:04Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Complete light/dark theme with dark navy blue primary color using oklch color tokens compatible with Tailwind v4
- ThemeProvider wrapping all locale pages with system preference detection and no FOUC
- Theme toggle component with Sun/Moon icon animation and 4 passing tests
- TOKO text logo SVGs generated for both light and dark modes
- Five shadcn/ui components installed and ready for header/footer use in Plans 03-04

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure dark navy blue theme, shadcn/ui components, and generate TOKO logo SVGs** - `e110664` (feat)
2. **Task 2: Create ThemeProvider integration, theme toggle component, and theme toggle tests** - `5154f7e` (feat)

## Files Created/Modified
- `src/app/globals.css` - Navy blue corporate theme with oklch tokens for light and dark modes
- `src/lib/fonts.ts` - Centralized Inter font configuration with latin + cyrillic subsets
- `src/app/layout.tsx` - Updated to use centralized font import
- `src/app/[locale]/layout.tsx` - Added ThemeProvider from next-themes inside NextIntlClientProvider
- `src/app/[locale]/page.tsx` - Added temporary ThemeToggle for verification
- `src/components/layout/theme-toggle.tsx` - Dark/light mode toggle with Sun/Moon icons
- `src/__tests__/theme-toggle.test.tsx` - 4 tests: render, icons present, click dark, click light
- `public/images/logo/toko-logo.svg` - TOKO text logo in dark navy (#1b2a4a) for light backgrounds
- `public/images/logo/toko-logo-dark.svg` - TOKO text logo in light (#f5f7fa) for dark backgrounds
- `src/components/ui/dropdown-menu.tsx` - shadcn dropdown-menu component
- `src/components/ui/navigation-menu.tsx` - shadcn navigation-menu component
- `src/components/ui/separator.tsx` - shadcn separator component
- `src/components/ui/sheet.tsx` - shadcn sheet component

## Decisions Made
- **oklch over HSL:** Plan specified HSL values but existing project (Tailwind v4 + shadcn v4) uses oklch color space. Converted all HSL values to oklch for consistency with the scaffolded setup.
- **Globals.css location:** Kept at `src/app/globals.css` as scaffolded by Plan 01, rather than moving to `src/styles/globals.css` which would break existing imports.
- **ThemeProvider placement:** Placed inside `NextIntlClientProvider` in locale layout per plan, ensuring themes work correctly with i18n routing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Converted HSL color values to oklch format**
- **Found during:** Task 1 (Theme CSS configuration)
- **Issue:** Plan specified HSL color values but existing Tailwind v4 + shadcn v4 project uses oklch color space throughout. Using HSL would be inconsistent and could cause issues with shadcn component styling.
- **Fix:** Computed oklch equivalents for all 19 light-mode and 19 dark-mode HSL values using accurate color space conversion
- **Files modified:** src/app/globals.css
- **Verification:** Build passes, colors render correctly
- **Committed in:** e110664 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Color format conversion was necessary for compatibility. No scope creep. Visual intent of the dark navy blue palette is fully preserved.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Theme system complete with all CSS variables, toggle, and provider ready
- All 5 shadcn/ui components (button, dropdown-menu, sheet, navigation-menu, separator) available for header/footer in Plans 03-04
- TOKO logos ready for header component integration
- Inter font properly configured for all four locale subsets

---
*Phase: 01-foundation-and-i18n*
*Completed: 2026-03-10*

## Self-Check: PASSED

- All 13 files verified present
- Both task commits (e110664, 5154f7e) verified in git log
- Build passes successfully
- All 4 theme-toggle tests pass
