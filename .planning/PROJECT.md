# Toko Trading

## What This Is

Toko is an import/export and trading company based in Turkey that provides product sourcing and supply services across all sectors for businesses worldwide. The website is a corporate presence and content hub at toko.com.tr — presenting the company's services, building SEO authority through programmatic content generation, and capturing leads through multilingual forms. Special emphasis on Russia transit trade services and technical service infrastructure for Russian companies.

## Core Value

Businesses looking for import/export services or trade information find Toko through search, understand its capabilities, and submit an inquiry — in their own language.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Modern corporate website with Next.js (App Router)
- [ ] 4-language support (TR, EN, FR, RU) with automatic browser language detection
- [ ] MDX/Markdown-based blog system for import/export content
- [ ] Programmatic SEO pages (sector, FAQ, country, customs/regulations)
- [ ] Contact form, quote request, supply request, callback request forms
- [ ] Form submissions sent via email notification (Resend/Nodemailer)
- [ ] Homepage with company intro, services overview, CTA sections
- [ ] About page — company history, vision, mission
- [ ] Services page — import, export, transit trade, sourcing services
- [ ] Sectors page — industries served (food, textile, machinery, etc.)
- [ ] References page — past work, partner logos (limited data, flexible layout)
- [ ] Blog listing and detail pages with SEO optimization
- [ ] Responsive design — mobile, tablet, desktop
- [ ] SEO fundamentals — meta tags, sitemap, robots.txt, structured data

### Out of Scope

- Admin panel — email notifications sufficient for form handling
- E-commerce / online ordering — this is a lead-gen corporate site
- User accounts / authentication — no user login needed
- Real-time chat — not needed for v1
- Mobile app — web only
- Payment processing — no transactions on site

## Context

- **Domain:** toko.com.tr
- **Company focus:** All-sector import/export and product sourcing for B2B clients
- **Special service:** Russia transit trade — providing technical service infrastructure for Russian companies through Turkey
- **Current priority audience:** Russian companies, but site serves all international audiences
- **Content strategy:** Blog answers common import/export questions people search for online; programmatic pages target long-tail keywords across sectors, countries, and trade regulations
- **Programmatic SEO page types:**
  - Sector/product pages: "Import [product] from Turkey", "[sector] products sourcing"
  - FAQ pages: "How to import [X]?", "What are customs duties for [Y]?"
  - Country-based pages: "Turkey-Russia trade", "Turkey-France trade"
  - Customs/regulations pages: HS codes, customs procedures, trade regulations
- **Reference data:** Limited — many past deals done through intermediaries, so references section should be designed flexibly (logos, brief descriptions, stats rather than detailed case studies)
- **Blog management:** MDX files in the codebase, no external CMS needed
- **Hosting:** Vercel preferred (paid plan available); own server as fallback if page count causes issues on Vercel

## Constraints

- **Tech stack**: Next.js (App Router) with TypeScript — non-negotiable
- **Languages**: Must support TR, EN, FR, RU with auto-detection from browser
- **Content**: MDX-based — no external CMS dependency
- **Design**: Modern corporate — clean, professional, trust-building
- **Hosting**: Vercel-first, must be deployable to self-hosted if needed
- **SEO**: Programmatic pages must be statically generated for performance and crawlability

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Best SSG/SSR for SEO-heavy site, Vercel-native | — Pending |
| MDX for blog content | No CMS overhead, developer-friendly, fast, SEO-friendly | — Pending |
| Email-only form handling | No admin panel needed, reduces complexity | — Pending |
| Vercel-first hosting | Paid plan available, best Next.js DX, self-host fallback | — Pending |
| Browser-based language detection | Auto-serve correct language, no manual selection needed | — Pending |
| Programmatic SEO all 4 types | Maximize organic traffic across sectors, countries, regulations | — Pending |

---
*Last updated: 2026-03-10 after initialization*
