---
phase: 02-core-pages
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, next-intl, i18n, server-components, dynamic-routes, generateStaticParams]

# Dependency graph
requires:
  - phase: 02-core-pages
    provides: PageHero, CTASection, Breadcrumb, services.ts data file with getServiceBySlug/getAllServiceSlugs
provides:
  - Enhanced services overview page with PageHero, alternating service cards, why-choose section, and CTA
  - 4 service detail pages statically generated via generateStaticParams (import, export, sourcing, transit-trade)
  - Service detail pages with 5 sections each (hero, overview, features, process, CTA)
  - Complete ServicesPage translations (hero, breadcrumb, per-service features, whyChoose, cta) in TR/EN/FR/RU
  - Complete ServiceDetail translations for all 4 services in TR/EN/FR/RU with substantive unique content
  - dynamicParams = false for 404 on unknown service slugs
  - generateMetadata for per-service SEO titles and descriptions
affects: [03-seo-infrastructure, 04-contact-form]

# Tech tracking
tech-stack:
  added: []
  patterns: [dynamic-route-with-generateStaticParams, per-service-color-coded-icons, alternating-section-backgrounds]

key-files:
  created:
    - src/app/[locale]/services/[slug]/page.tsx
  modified:
    - src/app/[locale]/services/page.tsx
    - src/messages/tr.json
    - src/messages/en.json
    - src/messages/fr.json
    - src/messages/ru.json

key-decisions:
  - "Services overview uses data from @/data/services with iconMap for dynamic icon rendering instead of inline arrays"
  - "Service detail pages use color-coded feature icons matching each service's accent color (blue/emerald/amber/rose)"
  - "Process section uses amber-50 warm background for visual variety between gray-50 features and dark CTA"
  - "Feature icons mapped via featureIconMap to assign relevant icons per feature key"
  - "Brand token classes (bg-brand-dark) used instead of hard-coded hex colors for dark sections"

patterns-established:
  - "Dynamic route pattern: generateStaticParams + dynamicParams=false + generateMetadata + notFound() guard"
  - "Service detail page structure: PageHero > Breadcrumb > Overview (7/5 grid) > Features grid > Process steps > CTA"
  - "Translation namespace pattern: ServiceDetail.[slug].[section] for per-entity translations"

requirements-completed: [PAGE-03, PAGE-04]

# Metrics
duration: 13min
completed: 2026-03-10
---

# Phase 02 Plan 02: Services Overview and Detail Pages Summary

**Enhanced services overview with PageHero, alternating service cards linking to detail pages, and 4 statically-generated service detail pages (import, export, sourcing, transit-trade) with per-service overview, features, process steps, and CTA in 4 languages**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-10T11:51:30Z
- **Completed:** 2026-03-10T12:04:30Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Enhanced services overview page with PageHero, breadcrumb, 4 alternating service cards (image left/right), "Why Choose Our Services" section with 3 value propositions, and CTA section
- Created dynamic service detail route at /services/[slug] with generateStaticParams for all 4 services, dynamicParams=false for 404 on unknown slugs, and generateMetadata for SEO
- Each service detail page has 5 distinct sections with varied backgrounds: hero, overview (white), features grid (gray-50), process steps (amber-50), CTA (dark navy)
- Complete translations in Turkish, English, French, and Russian for both ServicesPage and ServiceDetail namespaces with substantive per-service content

## Task Commits

Each task was committed atomically:

1. **Task 1: Enhance services overview page with PageHero and detail links** - `cfe56b4` (feat)
2. **Task 2: Create service detail pages with generateStaticParams** - `37f5b8d` (feat)

## Files Created/Modified
- `src/app/[locale]/services/page.tsx` - Enhanced services overview (226 lines) with PageHero, alternating cards, why-choose section, CTA
- `src/app/[locale]/services/[slug]/page.tsx` - Service detail page (250 lines) with generateStaticParams, generateMetadata, 5 content sections
- `src/messages/tr.json` - Added ServicesPage (hero, breadcrumb, per-service features, whyChoose, cta) and ServiceDetail namespace for all 4 services
- `src/messages/en.json` - Added ServicesPage and ServiceDetail namespaces in English
- `src/messages/fr.json` - Added ServicesPage and ServiceDetail namespaces in French
- `src/messages/ru.json` - Added ServicesPage and ServiceDetail namespaces in Russian (proper Cyrillic)

## Decisions Made
- Services overview imports from @/data/services with iconMap for dynamic icon rendering, avoiding inline service arrays for consistency with established data file pattern
- Service detail pages use color-coded feature icons matching each service's accent color for visual coherence
- Process section uses amber-50 warm background (matching about page values section) for visual variety between content sections
- Brand token classes (bg-brand-dark, text-brand-dark-text) used for dark sections instead of hard-coded hex colors

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Service detail pages ready, linking from overview cards
- 4 statically generated routes: /services/import, /services/export, /services/sourcing, /services/transit-trade
- ServiceDetail translation namespace established for consistent per-entity translation patterns
- All existing tests pass (todos skipped, no failures)

## Self-Check: PASSED

All 6 created/modified files verified present. Both task commits (cfe56b4, 37f5b8d) verified in git history.

---
*Phase: 02-core-pages*
*Completed: 2026-03-10*
