# Phase 1: Foundation and i18n - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Next.js project with 4-language routing (TR, EN, FR, RU), base layout with responsive header/footer, design system (colors, typography, components), dark/light theme toggle, and language switching. No page content yet — just the skeleton that all subsequent phases build on.

</domain>

<decisions>
## Implementation Decisions

### Brand & Color Palette
- Primary color: dark navy blue — trust, professionalism, corporate identity
- Dark/light theme toggle — user can switch, respect system preference
- Color system must work in both themes (proper contrast ratios)

### Logo
- Text-based logo: "TOKO" — clean, classy, site-consistent font
- Generate as SVG (scalable) and PNG (multiple sizes: favicon, header, OG image)
- Logo font should complement Inter but be distinct — a display/serif weight that feels premium
- Store logo files in /public/images/logo/ with all size variants

### Typography
- Primary font: Inter — clean, readable, supports Latin + Cyrillic (Russian)
- Use Inter variable font for performance
- Font weights: 400 (body), 500 (medium), 600 (semibold), 700 (bold)

### Header & Navigation
- Header behavior: large on page load, shrinks and becomes sticky on scroll — premium feel
- CTA button in header: "İletişime Geç" / "Contact Us" (localized per language)
- Menu items: Claude's discretion on count and structure (5-6 items, dropdown for Hizmetler/Sektörler if needed)
- Mobile: hamburger menu with full-screen or slide-in drawer

### Footer
- Wide/expanded footer: 4 columns (About, Services, Blog, Contact)
- Social media links (icons)
- Company address, phone, email
- Copyright notice
- Language switcher also in footer (secondary)

### Language Experience
- Default language: Turkish (toko.com.tr is a Turkish domain)
- Browser Accept-Language auto-detection on first visit → redirect to matching locale
- URL structure: /tr/, /en/, /fr/, /ru/ prefixes
- Language switcher in header — Claude's discretion on style (flags vs text vs combination — whatever looks best for modern corporate)
- Cookie persistence: remember user's language choice
- If a translation is missing: fall back to Turkish content

### Animations
- Subtle and elegant: scroll-triggered fade-in, hover state transitions
- No parallax or heavy animations — professional, not flashy
- Smooth page transitions between routes
- Use Framer Motion / Motion library for consistency

### Claude's Discretion
- Exact menu item count and dropdown structure
- Language switcher visual design (flags/text/icons)
- Exact color palette shades (dark blue primary + complementary accent)
- Component library setup details (shadcn/ui configuration)
- Loading states and skeleton design
- Exact spacing scale and breakpoints
- Footer column arrangement and content balance

</decisions>

<specifics>
## Specific Ideas

- Logo should be text-only "TOKO" — no icon/symbol, just typography that feels corporate and premium
- Header shrink-on-scroll gives a premium feel (large hero header → compact sticky nav)
- Dark/light toggle is important — site should look equally good in both modes
- Inter font is confirmed — it supports Cyrillic which is essential for Russian

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — patterns will be established in this phase and carried forward

### Integration Points
- This phase establishes the foundation that ALL subsequent phases build on
- i18n routing structure affects every page in Phases 2-6
- Design system (colors, components, layout) is used by all phases
- Header/footer are shared across all pages

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-and-i18n*
*Context gathered: 2026-03-10*
