# Project Research Summary

**Project:** Toko Trading Corporate Website
**Domain:** Multilingual B2B corporate website with programmatic SEO (import/export trading)
**Researched:** 2026-03-10
**Confidence:** HIGH

## Executive Summary

Toko Trading needs a multilingual (TR, EN, FR, RU) corporate website designed for organic lead generation through content marketing and programmatic SEO. Experts build this type of site as a statically generated Next.js App Router application with locale-prefixed routing, structured JSON data driving template-based page generation, MDX-powered blog content, and Server Actions handling form-to-email pipelines. The stack is mature and well-documented: Next.js 16 + next-intl for i18n, Velite for MDX processing, Tailwind CSS 4 + shadcn/ui for styling, React Hook Form + Zod v3 for forms, and Resend for transactional email. There are no exotic technology choices -- every piece is an established standard in the Next.js ecosystem.

The recommended approach is to build foundational i18n infrastructure first (this cannot be retrofitted), then layer on static core pages, the form-to-email pipeline, blog system, and finally programmatic SEO pages. The critical ordering insight is that the i18n routing layer and Server Component-first rendering pattern must be locked in from day one -- both have HIGH recovery costs if done wrong. Programmatic SEO pages should be deferred to a later phase because they require substantial unique content data (not just templates) and represent the highest-risk area for Google deindexing.

The three dominant risks are: (1) programmatic pages being flagged as thin/duplicate content by Google's SpamBrain, which requires genuinely unique data per page and at least 500 words of differentiated content; (2) broken i18n routing from using wrong libraries or missing `setRequestLocale` calls, which is prevented by using next-intl exclusively from the start; and (3) form spam flooding the team's inbox, which requires shipping honeypot, rate limiting, and reCAPTCHA v3 from day one. All three risks have clear prevention strategies documented in the research.

## Key Findings

### Recommended Stack

The stack is a standard Next.js App Router configuration with no controversial choices. Every technology has HIGH ecosystem confidence except Velite (MEDIUM -- pre-1.0 but actively maintained and functionally stable). The key constraint is using Zod v3, not v4, due to TypeScript compatibility issues with @hookform/resolvers.

**Core technologies:**
- **Next.js 16.1 + React 19:** App Router with Server Components for SEO-critical rendering. generateStaticParams for programmatic page generation. ISR as escape valve for build timeout at scale.
- **next-intl 4.8:** The only viable i18n library for App Router. ~2KB bundle, native Server Component support, built-in middleware for locale detection. Unanimous community standard.
- **Tailwind CSS 4.2 + shadcn/ui:** Zero-runtime styling with owned, accessible components. No vendor lock-in.
- **Velite 0.3:** MDX content layer with Zod-based schemas. Replaces abandoned ContentLayer. Pre-1.0 but stable API surface.
- **React Hook Form + Zod v3:** Industry-standard form handling. Shared validation schemas between client and server.
- **Resend + React Email:** Purpose-built email API with React component templates. Free tier sufficient for launch.
- **schema-dts:** Google-maintained TypeScript types for JSON-LD structured data. Zero runtime cost.

### Expected Features

**Must have (table stakes -- P1 for launch):**
- Multilingual infrastructure (TR, EN, FR, RU) with hreflang and locale routing
- Homepage, About, Services, Sectors overview -- core trust and information pages
- Contact form and Quote request form -- primary lead capture
- Email notifications for all form submissions
- Russia transit trade dedicated section -- Toko's key differentiator
- SEO fundamentals: meta tags, sitemap, robots.txt, structured data (Organization, BreadcrumbList)
- Responsive mobile-first design
- WhatsApp floating button
- Navigation with language switcher

**Should have (competitive -- P2, add within weeks of launch):**
- Blog system with MDX content and pillar-cluster architecture
- Supply request form and Callback request form
- Sector detail pages with sourcing capability showcase
- Confirmation emails to prospects
- References/partners section

**Defer (v2+ -- requires validated data model and content):**
- Programmatic SEO pages (sectors, countries, FAQ, customs/regulations)
- Language-specific CTAs and value propositions
- Advanced structured data (Service, FAQPage schemas)

**Explicitly excluded (anti-features):**
- Admin panel / CMS -- MDX editing is sufficient for a small, developer-capable team
- E-commerce / product catalog with pricing -- Toko is a sourcing company, not a retailer
- User accounts / login system -- overkill for lead-gen
- Live chat / chatbot -- WhatsApp button is the right channel
- Newsletter popups -- unprofessional for B2B audience

### Architecture Approach

The architecture is a statically generated Next.js App Router application with all routes nested under `app/[locale]/`. Middleware handles locale detection (Accept-Language header, cookie, URL prefix). Content lives in two separate stores: MDX files for blog posts (organized by locale subdirectory) and JSON files for programmatic page data. Forms use Server Actions that validate with Zod and send email via Resend. No database, no CMS, no API routes needed.

**Major components:**
1. **Middleware (proxy.ts)** -- locale detection, redirect to `/{locale}/` prefix, cookie persistence
2. **i18n Layer (next-intl)** -- translation loading, locale-aware navigation, Server Component integration
3. **Static Pages** -- Server Components with generateStaticParams producing all locale variants
4. **Blog System** -- MDX files in `content/blog/{locale}/`, parsed at build time, with cross-locale translation links
5. **Programmatic SEO Engine** -- JSON data files + generateStaticParams producing all slug/locale combinations
6. **Forms Pipeline** -- React Hook Form (client validation) to Server Actions (server validation + Resend email)
7. **SEO Infrastructure** -- Metadata API, JSON-LD components, multilingual sitemap.ts, hreflang alternates

### Critical Pitfalls

1. **Programmatic pages deindexed for thin content** -- Each page needs 500+ unique words and 30-40% differentiation from siblings. Build the content data layer with substantive, unique data BEFORE generating templates. Monitor Google Search Console weekly after launch. Recovery takes 2-6 months if this goes wrong.

2. **Broken i18n routing** -- Use next-intl exclusively. Call `setRequestLocale(locale)` in every page and layout. Import Link/useRouter from next-intl navigation, never from `next/navigation`. Recovery cost is a full rewrite of the routing layer.

3. **Missing hreflang and canonical tags** -- Configure `alternates.canonical` and `alternates.languages` in every page's generateMetadata. Include hreflang alternates in sitemap.ts. Must be bidirectional. Omitting these causes Google to treat 4-language pages as duplicates.

4. **Vercel build timeout at scale** -- Use tiered rendering: SSG for core + top-traffic pages, ISR for the long tail. Decide the split before implementing programmatic pages. The ISR escape valve makes self-hosting unnecessary.

5. **Form spam flooding inbox** -- Ship three-layer defense from day one: honeypot field, IP-based rate limiting (3-5/hour), reCAPTCHA v3 with server-side verification. Adding this after spam starts is easy but the damage (buried leads) is already done.

6. **Client-rendered SEO content** -- All page content must render in Server Components. Reserve `"use client"` for interactive elements only. Test with JavaScript disabled. This must be the default pattern from the foundation phase.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and i18n Infrastructure
**Rationale:** i18n routing is the dependency root -- every page, component, and content system builds on it. Getting this wrong has the highest recovery cost (full rewrite). Architecture research confirms Phase 1 has zero dependencies.
**Delivers:** Working Next.js 16 project with locale-prefixed routing, middleware detection, translation loading, base layout, and shadcn/ui component primitives.
**Addresses:** Multilingual infrastructure (P1), navigation/language switcher foundation, responsive design foundation.
**Avoids:** Broken i18n routing (Pitfall 2), client-rendered SEO content (Pitfall 5).
**Stack:** Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, next-intl, Radix UI, lucide-react.

### Phase 2: Core Static Pages and Design System
**Rationale:** Core pages validate the design system and component library before scaling to programmatic content. These are the trust-building pages visitors check first.
**Delivers:** Homepage, About, Services (individual pages per service type), Sectors overview, Russia transit trade landing page.
**Addresses:** Homepage (P1), About (P1), Services pages (P1), Sectors overview (P1), Russia transit trade section (P1).
**Avoids:** Client-rendered SEO content (Pitfall 5) -- established Server Component patterns carry forward.
**Stack:** shadcn/ui components, Motion (subtle animations for hero sections), next-intl translations.

### Phase 3: Forms, Email, and Lead Capture
**Rationale:** Forms are the conversion mechanism. The form infrastructure (validation, Server Actions, email templates) is shared across all form types. WhatsApp button adds a zero-friction lead channel.
**Delivers:** Contact form, Quote request form, email notifications to team, WhatsApp floating button. Spam protection (honeypot + rate limiting + reCAPTCHA v3).
**Addresses:** Contact form (P1), Quote request form (P1), Email notifications (P1), WhatsApp button (P1).
**Avoids:** Form spam flooding (Pitfall 6). Email deliverability issues (Resend domain verification + SPF/DKIM/DMARC setup early).
**Stack:** React Hook Form, Zod v3, @hookform/resolvers, Resend, @react-email/components, reCAPTCHA v3.

### Phase 4: SEO Infrastructure
**Rationale:** SEO metadata, structured data, and sitemap generation must be in place before programmatic pages are added. Building this after content exists means retroactive metadata auditing.
**Delivers:** generateMetadata on all existing pages with locale-aware title/description, JSON-LD structured data (Organization, LocalBusiness, BreadcrumbList), multilingual sitemap.ts with hreflang alternates, robots.ts, Open Graph tags.
**Addresses:** SEO fundamentals (P1), Structured data (P1), Performance/Core Web Vitals (P1).
**Avoids:** Missing hreflang/canonical tags (Pitfall 3), sitemap missing pages (Pitfall checklist item).
**Stack:** Next.js Metadata API, schema-dts, built-in sitemap.ts/robots.ts.

### Phase 5: Blog System
**Rationale:** Content marketing generates 67% more B2B leads. The blog system depends on i18n (Phase 1) and SEO infrastructure (Phase 4) but is independent of programmatic pages. Publishing early builds domain authority before programmatic pages launch.
**Delivers:** MDX blog infrastructure, blog listing with pagination, blog detail pages, Article structured data, seed content (3-5 posts per locale).
**Addresses:** Blog/content hub (P2), Content pillar-cluster architecture (P2).
**Avoids:** MDX compilation performance issues -- Velite pre-compiles at build time.
**Stack:** Velite, @mdx-js/react, rehype-pretty-code, reading-time.

### Phase 6: Extended Forms and Content
**Rationale:** Additional form types and content pages build on the validated infrastructure from Phases 2-4. These are incremental additions, not new systems.
**Delivers:** Supply request form, Callback request form, Sector detail pages with sourcing CTAs, confirmation emails to prospects, References/partners section.
**Addresses:** Supply request form (P2), Callback request form (P2), Sector detail pages (P2), Confirmation emails (P2), References section (P2).
**Avoids:** No new pitfalls -- reuses established patterns.

### Phase 7: Programmatic SEO Pages
**Rationale:** Programmatic pages are the highest-value but highest-risk feature. They require: (a) validated data model with substantive, unique content per page; (b) working SEO infrastructure; (c) ISR strategy for build time management. Deferring until other phases prove the rendering and SEO patterns reduces the risk of generating hundreds of thin pages that get deindexed.
**Delivers:** Sector/product pages, country trade pages, FAQ pages, customs/regulations pages -- all generated from structured JSON data across 4 locales. Tiered rendering (SSG for top pages, ISR for the rest).
**Addresses:** Programmatic SEO: sectors (P3), countries (P3), FAQ (P3), customs (P3), Language-specific CTAs (P3).
**Avoids:** Thin content deindexing (Pitfall 1), Vercel build timeout (Pitfall 4).
**Stack:** generateStaticParams, ISR with dynamicParams, generateSitemaps for sitemap splitting.

### Phase Ordering Rationale

- **i18n first (Phase 1):** Every page depends on locale routing. Architecture research shows this has zero dependencies and the highest recovery cost if wrong. Non-negotiable first phase.
- **Core pages before specialized content (Phase 2 before 5-7):** Core pages validate the design system, establish Server Component patterns, and provide the navigation structure that all other pages plug into.
- **Forms independent of content (Phase 3 parallel-ready with Phase 2):** The form pipeline has its own dependency chain (RHF, Zod, Resend) and does not depend on content pages being complete. Can overlap with Phase 2.
- **SEO infrastructure before programmatic pages (Phase 4 before 7):** Programmatic pages without metadata, hreflang, and sitemap generation are pointless. The SEO layer must be proven on static pages first.
- **Blog before programmatic SEO (Phase 5 before 7):** Blog content builds domain authority and tests the MDX pipeline. Programmatic pages benefit from an already-crawled, trusted domain.
- **Programmatic SEO last (Phase 7):** Highest complexity, highest risk, requires the most content preparation. Every supporting system must be working before generating hundreds of pages.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Foundation):** next-intl 4.8 + Next.js 16 proxy.ts (formerly middleware.ts) integration needs careful verification. The renaming from middleware.ts to proxy.ts in Next.js 16 may affect next-intl setup.
- **Phase 5 (Blog):** Velite 0.3 + Next.js 16 Webpack plugin compatibility needs testing. Velite does NOT work with Turbopack -- confirm Webpack mode configuration.
- **Phase 7 (Programmatic SEO):** Content data model design, ISR threshold tuning, and sitemap splitting strategy all need phase-specific research. This phase has the most unknowns.

Phases with standard patterns (skip phase research):
- **Phase 2 (Core Pages):** Static Server Component pages are the most documented Next.js pattern. No research needed.
- **Phase 3 (Forms):** React Hook Form + Zod + Server Actions + Resend is thoroughly documented with official examples.
- **Phase 4 (SEO):** Next.js Metadata API and sitemap.ts are built-in features with official documentation.
- **Phase 6 (Extended Content):** Incremental additions using established patterns from earlier phases.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are ecosystem standards with official documentation. Only Velite is pre-1.0, but it has a small API surface and active maintenance. Zod v3 constraint is well-documented. |
| Features | HIGH | Feature landscape is based on B2B website best practices, competitor analysis, and the project's specific domain (Turkish import/export). Anti-features are clearly justified. |
| Architecture | HIGH | App Router + next-intl + locale-prefixed routing is the documented standard. Data flow patterns (Server Components, Server Actions) are official Next.js patterns. |
| Pitfalls | HIGH | All pitfalls sourced from official Vercel blog, documented Google algorithm updates, and verified community post-mortems. Prevention strategies are concrete and actionable. |

**Overall confidence:** HIGH

### Gaps to Address

- **Velite + Next.js 16 compatibility:** Velite 0.3 is confirmed for Next.js 15. Explicit Next.js 16 testing has not been verified in sources. Test early in Phase 5. Fallback: use raw @next/mdx with manual frontmatter parsing.
- **next-intl proxy.ts naming:** Next.js 16 renamed middleware.ts to proxy.ts. Verify that next-intl's `createMiddleware` works correctly in a file named `proxy.ts`. The next-intl docs may still reference `middleware.ts`.
- **Programmatic content uniqueness:** The research establishes that 500+ unique words and 30-40% differentiation are needed, but the actual content data (trade statistics, HS codes, sector-specific regulations) has not been sourced yet. This is a content production gap, not a technical gap.
- **Resend free tier limits:** 100 emails/day is sufficient for launch but may be exceeded quickly if the site generates significant lead volume. Plan for paid tier upgrade.
- **Translated slug strategy:** Architecture research notes a UX tradeoff between translated slugs (better SEO) and untranslated slugs (simpler implementation). Recommendation: use untranslated (English) slugs for v1, evaluate translated slugs for v2 based on search data.

## Sources

### Primary (HIGH confidence)
- Next.js Official Documentation (i18n, generateStaticParams, Metadata API, MDX, ISR, JSON-LD) -- framework patterns and API reference
- next-intl Official Documentation -- App Router i18n setup, middleware, routing configuration
- Vercel Blog and Documentation -- App Router patterns, build limits, common mistakes
- Resend Official Documentation -- Next.js integration, domain verification
- Tailwind CSS v4 Blog -- configuration and feature changes
- shadcn/ui Documentation -- CLI v4, component patterns
- Google schema-dts npm -- JSON-LD TypeScript types

### Secondary (MEDIUM confidence)
- Backlinko / Semrush -- programmatic SEO strategy and content marketing statistics
- Velite Documentation -- MDX content layer setup (pre-1.0 library)
- Community articles on multilingual sitemap implementation
- B2B website trust signal research (Trajectory Web Design, Red Evolution)

### Tertiary (needs validation)
- Velite + Next.js 16 compatibility -- inferred from Next.js 15 compatibility, not explicitly verified
- next-intl proxy.ts naming convention -- Next.js 16 specific, may require documentation updates

---
*Research completed: 2026-03-10*
*Ready for roadmap: yes*
