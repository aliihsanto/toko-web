# Roadmap: Toko Trading

## Overview

Toko Trading's corporate website is built in 6 phases that follow a strict dependency chain: multilingual foundation first (every page depends on locale routing), then core content pages, then the lead capture pipeline, then SEO infrastructure to prepare for content-heavy phases, then the blog system, and finally programmatic SEO pages last (highest value, highest risk, requires all supporting systems in place). The journey goes from "site exists in 4 languages" to "site generates organic traffic across hundreds of long-tail keywords."

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and i18n** - Next.js project with 4-language routing, base layout, design system, and responsive navigation (completed 2026-03-10)
- [x] **Phase 2: Core Pages** - All static content pages (homepage, about, services, sectors, references, Russia transit trade) (completed 2026-03-10)
- [ ] **Phase 3: Forms and Lead Capture** - Contact, quote, supply, callback forms with email notifications, spam protection, and WhatsApp button
- [x] **Phase 4: SEO Infrastructure** - Metadata, structured data, sitemap, robots.txt, hreflang, Core Web Vitals optimization across all existing pages (completed 2026-03-10)
- [ ] **Phase 5: Blog System** - MDX-based blog with Velite, listing/detail pages, categories, and seed content in all 4 languages
- [ ] **Phase 6: Programmatic SEO** - Template-driven page generation for sectors, countries, FAQ, and customs/regulations across all locales

## Phase Details

### Phase 1: Foundation and i18n
**Goal**: Visitors can navigate a fully responsive, professionally designed site skeleton in Turkish, English, French, or Russian -- with automatic language detection and manual switching
**Depends on**: Nothing (first phase)
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, UX-01, UX-02, UX-03, UX-04, UX-05
**Success Criteria** (what must be TRUE):
  1. Visiting toko.com.tr auto-redirects to the correct locale prefix (/tr/, /en/, /fr/, /ru/) based on browser language
  2. User can switch between all 4 languages via a header selector and the page content updates accordingly
  3. All navigation items, buttons, labels, and footer text display correctly translated in each language
  4. The site layout renders properly on mobile, tablet, and desktop with consistent header, navigation, and footer
  5. Each page includes correct hreflang tags pointing to all language variants
**Plans**: 5 plans

Plans:
- [x] 01-01-PLAN.md -- Scaffold Next.js project and establish i18n routing infrastructure
- [x] 01-02-PLAN.md -- Design system, dark navy blue theme, and dark/light mode toggle
- [x] 01-03-PLAN.md -- Header with shrink-on-scroll, language switcher, and mobile navigation
- [x] 01-04-PLAN.md -- Footer with 4-column layout, contact info, and social links
- [x] 01-05-PLAN.md -- Framer Motion animations and visual verification checkpoint

### Phase 2: Core Pages
**Goal**: Visitors can learn about Toko's services, sectors, history, and Russia transit trade capabilities through complete, translated content pages
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08
**Success Criteria** (what must be TRUE):
  1. Homepage displays hero section, services overview, key differentiators, trust signals, and CTAs in the visitor's selected language
  2. About page presents company history, vision, mission, and values
  3. Services overview page lists all service categories, and each service type has its own detail page with specific information
  4. Sectors overview page shows all industries served, and each sector has a detail page with sourcing capabilities
  5. Russia transit trade landing page presents dedicated content with Russian-language priority and specialized CTAs
**Plans**: 6 plans

Plans:
- [x] 02-00-PLAN.md -- Wave 0 test stubs for all 8 Phase 2 page requirements
- [x] 02-01-PLAN.md -- Shared components, data files, homepage enhancement, and about page
- [x] 02-02-PLAN.md -- Services overview and service detail pages (4 services)
- [x] 02-03-PLAN.md -- Sectors overview and sector detail pages (8 sectors)
- [x] 02-04-PLAN.md -- References page and Russia transit trade landing page
- [x] 02-05-PLAN.md -- Full build verification and visual checkpoint

### Phase 3: Forms and Lead Capture
**Goal**: Visitors can submit inquiries through multiple form types and Toko receives email notifications for every submission, with spam kept out
**Depends on**: Phase 1
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07
**Success Criteria** (what must be TRUE):
  1. User can submit a contact form, quote request, supply/sourcing request, or callback request -- each with appropriate fields and client+server validation
  2. Every form submission triggers an email notification to the Toko team via Resend with all submitted details
  3. Spam is blocked by honeypot fields, rate limiting, and reCAPTCHA v3 -- legitimate submissions pass through reliably
  4. A WhatsApp floating button appears on every page and links to Toko's WhatsApp number
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md -- Form infrastructure: schemas, server actions, email pipeline, spam protection, WhatsApp button
- [ ] 03-02-PLAN.md -- Form UI components: contact, quote, sourcing, callback forms with page routes
- [ ] 03-03-PLAN.md -- i18n translations for all forms, navigation updates, server action tests

### Phase 4: SEO Infrastructure
**Goal**: Every existing page is discoverable by search engines with correct metadata, structured data, hreflang alternates, and optimized performance
**Depends on**: Phase 2
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07
**Success Criteria** (what must be TRUE):
  1. Every page has locale-aware title, description, and Open Graph tags generated via generateMetadata
  2. JSON-LD structured data (Organization, LocalBusiness, BreadcrumbList) is present on all pages and validates in Google's Rich Results Test
  3. A multilingual sitemap includes all pages with hreflang alternates for all locales, and robots.txt is properly configured
  4. All pages achieve green Lighthouse scores for Core Web Vitals (LCP, CLS, FID/INP)
  5. Images use next/image with proper dimensions, formats, and alt text in all 4 languages
**Plans**: 3 plans

Plans:
- [ ] 04-01-PLAN.md -- SEO metadata fundamentals: generateMetadata on all pages, shared SEO helpers, company info constants
- [ ] 04-02-PLAN.md -- JSON-LD structured data components, multilingual sitemap.ts, robots.ts
- [ ] 04-03-PLAN.md -- Wire JSON-LD into pages, Core Web Vitals optimization, image alt text audit, OG image generation

### Phase 5: Blog System
**Goal**: Toko publishes import/export content that ranks in search, with a fully functional MDX blog in all 4 languages
**Depends on**: Phase 4
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05
**Success Criteria** (what must be TRUE):
  1. Blog listing page shows posts with title, excerpt, date, and category -- with pagination for large sets
  2. Blog detail page renders full MDX content with table of contents and reading time estimate
  3. User can filter blog posts by category/tag (import, export, customs, regulations, etc.)
  4. At least 3-5 blog posts per locale are published and accessible at launch
  5. Blog pages include Article structured data and integrate with the sitemap
**Plans**: 3 plans

Plans:
- [ ] 05-01-PLAN.md -- Blog infrastructure: Velite config, MDX schema, build integration, blog utilities, MDX renderer
- [ ] 05-02-PLAN.md -- Blog pages: listing with pagination, detail with TOC/reading time, category filtering, i18n
- [ ] 05-03-PLAN.md -- Seed content (4 posts x 4 locales), Article JSON-LD, sitemap integration

### Phase 6: Programmatic SEO
**Goal**: Toko captures long-tail search traffic through hundreds of auto-generated, substantive pages covering sectors, countries, FAQs, and customs/regulations in all 4 languages
**Depends on**: Phase 4, Phase 5
**Requirements**: PSEO-01, PSEO-02, PSEO-03, PSEO-04, PSEO-05, PSEO-06, PSEO-07
**Success Criteria** (what must be TRUE):
  1. Sector/product pages are generated from structured JSON data with unique, substantive content (500+ words per page)
  2. Country trade guide pages, FAQ pages, and customs/regulations pages are each generated from their own data templates
  3. All programmatic page types are generated across all 4 locales via generateStaticParams
  4. High-traffic pages are statically generated at build time; long-tail pages use ISR to avoid build timeout
  5. Each programmatic page has proper metadata, structured data (FAQPage where applicable), and appears in the sitemap
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and i18n | 5/5 | Complete   | 2026-03-10 |
| 2. Core Pages | 6/6 | Complete   | 2026-03-10 |
| 3. Forms and Lead Capture | 1/3 | In Progress|  |
| 4. SEO Infrastructure | 3/3 | Complete   | 2026-03-10 |
| 5. Blog System | 0/3 | Not started | - |
| 6. Programmatic SEO | 0/? | Not started | - |
