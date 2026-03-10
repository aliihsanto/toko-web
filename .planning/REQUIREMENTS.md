# Requirements: Toko Trading

**Defined:** 2026-03-10
**Core Value:** Businesses looking for import/export services or trade information find Toko through search, understand its capabilities, and submit an inquiry — in their own language.

## v1 Requirements

### i18n Infrastructure

- [x] **I18N-01**: Site supports 4 languages: Turkish, English, French, Russian with URL prefix routing (/tr/, /en/, /fr/, /ru/)
- [x] **I18N-02**: Middleware auto-detects browser language and redirects to matching locale on first visit
- [x] **I18N-03**: User can switch language via header language selector on any page
- [x] **I18N-04**: All static UI text (navigation, buttons, labels, footers) translated to all 4 languages
- [x] **I18N-05**: Each page has correct hreflang tags pointing to all language variants

### Core Pages

- [x] **PAGE-01**: Homepage with hero section, services overview, key differentiators, trust signals, and CTAs in all 4 languages
- [x] **PAGE-02**: About page with company history, vision, mission, and team/company values
- [x] **PAGE-03**: Services overview page listing all service categories (import, export, transit trade, sourcing)
- [x] **PAGE-04**: Individual service detail pages for each service type
- [x] **PAGE-05**: Sectors overview page showing industries served (food, textile, machinery, chemicals, etc.)
- [x] **PAGE-06**: Sector detail pages with industry-specific sourcing capabilities
- [x] **PAGE-07**: References/partners page with flexible layout (logos, brief descriptions, stats)
- [x] **PAGE-08**: Russia transit trade dedicated landing page — Rusca oncelikli, ozel CTA'lar

### Forms & Lead Capture

- [x] **FORM-01**: Contact form with name, email, subject, message fields — validated client and server side
- [x] **FORM-02**: Quote request form with product/service details, quantity, destination country
- [x] **FORM-03**: Supply/sourcing request form with product name, specifications, quantity, target country
- [x] **FORM-04**: Callback request form with phone number, preferred time, brief subject
- [x] **FORM-05**: All form submissions send email notification to Toko team via Resend
- [x] **FORM-06**: Form spam protection with honeypot field, rate limiting, and reCAPTCHA v3
- [x] **FORM-07**: WhatsApp floating button on all pages linking to Toko's WhatsApp number

### Blog System

- [ ] **BLOG-01**: MDX-based blog infrastructure with Velite — posts organized by locale
- [ ] **BLOG-02**: Blog listing page with pagination, showing post title, excerpt, date, category
- [ ] **BLOG-03**: Blog detail page with full MDX content rendering, table of contents, reading time
- [ ] **BLOG-04**: Blog categories/tags for filtering (import, export, customs, regulations, etc.)
- [ ] **BLOG-05**: Seed content — minimum 3-5 blog posts per locale at launch

### Programmatic SEO

- [ ] **PSEO-01**: Sector/product template pages generated from structured JSON data ("Import [product] from Turkey")
- [ ] **PSEO-02**: Country trade template pages generated from structured JSON data ("Turkey-[Country] trade guide")
- [ ] **PSEO-03**: FAQ template pages answering common import/export questions per sector/country
- [ ] **PSEO-04**: Customs/regulations template pages with trade procedures, HS codes, duty information
- [ ] **PSEO-05**: Each programmatic page has 500+ words of unique, substantive content (not thin templates)
- [ ] **PSEO-06**: Programmatic pages generated across all 4 locales via generateStaticParams
- [ ] **PSEO-07**: ISR strategy for pages exceeding SSG build limits — tiered rendering (SSG top pages, ISR long tail)

### SEO & Performance

- [x] **SEO-01**: generateMetadata on all pages with locale-aware title, description, Open Graph tags
- [x] **SEO-02**: JSON-LD structured data: Organization, LocalBusiness, BreadcrumbList on all pages
- [x] **SEO-03**: FAQPage and Article structured data on blog and FAQ pages
- [x] **SEO-04**: Multilingual sitemap.ts with hreflang alternates for all pages and locales
- [x] **SEO-05**: robots.ts configured for proper crawling
- [ ] **SEO-06**: Core Web Vitals optimized — all pages achieve green scores on Lighthouse
- [ ] **SEO-07**: Images optimized with next/image, proper alt text in all languages

### Design & UX

- [x] **UX-01**: Modern corporate design — clean, professional, trust-building aesthetic
- [x] **UX-02**: Fully responsive layout — mobile, tablet, desktop breakpoints
- [x] **UX-03**: Consistent navigation with logo, main menu, language switcher, CTA button
- [x] **UX-04**: Footer with company info, quick links, contact details, social media links
- [x] **UX-05**: Dark/light color scheme appropriate for B2B corporate identity

## v2 Requirements

### Enhanced Content

- **ECNT-01**: Language-specific CTAs and value propositions tailored per locale audience
- **ECNT-02**: Translated URL slugs for programmatic pages (e.g., /fr/importation-alimentaire)
- **ECNT-03**: Newsletter subscription system
- **ECNT-04**: Case studies / success stories section

### Advanced Features

- **ADV-01**: Advanced structured data (Service schema, Product schema)
- **ADV-02**: Confirmation emails to form submitters
- **ADV-03**: Analytics dashboard integration (Google Analytics 4, Search Console)
- **ADV-04**: A/B testing for landing pages and CTAs

## Out of Scope

| Feature | Reason |
|---------|--------|
| Admin panel / CMS | MDX editing sufficient, no non-technical editors |
| E-commerce / product catalog | Toko is a sourcing company, not a retailer |
| User accounts / login | Overkill for lead-gen corporate site |
| Live chat / chatbot | WhatsApp button is the right channel for TR/RU markets |
| Newsletter popups | Unprofessional for B2B audience |
| Mobile app | Web-first, web-only for foreseeable future |
| Payment processing | No transactions on site |
| Video hosting | Use YouTube embeds if needed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| I18N-01 | Phase 1 | Complete (01-01) |
| I18N-02 | Phase 1 | Complete (01-01) |
| I18N-03 | Phase 1 | Complete |
| I18N-04 | Phase 1 | Complete (01-01) |
| I18N-05 | Phase 1 | Complete (01-01) |
| PAGE-01 | Phase 2 | Complete |
| PAGE-02 | Phase 2 | Complete |
| PAGE-03 | Phase 2 | Complete |
| PAGE-04 | Phase 2 | Complete |
| PAGE-05 | Phase 2 | Complete |
| PAGE-06 | Phase 2 | Complete |
| PAGE-07 | Phase 2 | Complete |
| PAGE-08 | Phase 2 | Complete |
| FORM-01 | Phase 3 | Complete |
| FORM-02 | Phase 3 | Complete |
| FORM-03 | Phase 3 | Complete |
| FORM-04 | Phase 3 | Complete |
| FORM-05 | Phase 3 | Complete |
| FORM-06 | Phase 3 | Complete |
| FORM-07 | Phase 3 | Complete |
| BLOG-01 | Phase 5 | Pending |
| BLOG-02 | Phase 5 | Pending |
| BLOG-03 | Phase 5 | Pending |
| BLOG-04 | Phase 5 | Pending |
| BLOG-05 | Phase 5 | Pending |
| PSEO-01 | Phase 6 | Pending |
| PSEO-02 | Phase 6 | Pending |
| PSEO-03 | Phase 6 | Pending |
| PSEO-04 | Phase 6 | Pending |
| PSEO-05 | Phase 6 | Pending |
| PSEO-06 | Phase 6 | Pending |
| PSEO-07 | Phase 6 | Pending |
| SEO-01 | Phase 4 | Complete |
| SEO-02 | Phase 4 | Complete |
| SEO-03 | Phase 4 | Complete |
| SEO-04 | Phase 4 | Complete |
| SEO-05 | Phase 4 | Complete |
| SEO-06 | Phase 4 | Pending |
| SEO-07 | Phase 4 | Pending |
| UX-01 | Phase 1 | Complete |
| UX-02 | Phase 1 | Complete |
| UX-03 | Phase 1 | Complete |
| UX-04 | Phase 1 | Complete |
| UX-05 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 after roadmap creation*
