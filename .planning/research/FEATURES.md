# Feature Research

**Domain:** Import/Export Trading Company Corporate Website (B2B Lead Generation)
**Researched:** 2026-03-10
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these means the site feels unprofessional or incomplete, and visitors leave without inquiring.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Multilingual support (TR, EN, FR, RU)** | 76% of users prefer browsing in their native language; 40% will never buy from sites in other languages. International trade audiences demand this. | HIGH | Subdirectory structure (/en/, /tr/, /fr/, /ru/) with hreflang tags. Browser auto-detection with manual override. All UI, navigation, and content must be fully translated -- not just page body text. |
| **Homepage with company intro and service overview** | First impression. Visitors need to understand what Toko does within 5 seconds. | LOW | Hero section with clear value proposition, service cards, sector overview, CTA buttons. |
| **Services pages** | Visitors need to understand exact capabilities: import, export, transit trade, sourcing. Each service should be a distinct page for SEO. | MEDIUM | Individual pages per service type for keyword targeting. Include process descriptions, supported geographies, and clear CTAs. |
| **Contact form** | The primary conversion point. Without it, no leads. | LOW | Name, email, company, country, message. Keep to 3-5 fields. Clear "what happens next" messaging (response within 24h). |
| **Quote request form** | B2B visitors expect to request pricing without a phone call. Distinct from general contact. | LOW | Product/service type, quantity/volume, origin/destination country, timeline. Dedicated page, not buried in contact page. |
| **About page** | Trust signal. Visitors check company legitimacy -- history, team, mission, vision. | LOW | Company story, founding year, team/leadership (real photos, not stock), mission/vision, office locations. |
| **Responsive design** | Mobile traffic is 50%+ globally. Unresponsive sites are immediately abandoned. | MEDIUM | Mobile-first approach. All forms, navigation, and content must work on mobile. Touch-friendly CTAs. |
| **SEO fundamentals** | The site's purpose is organic lead generation. Without SEO basics, the site is invisible. | MEDIUM | Meta tags per page per language, XML sitemap (multilingual), robots.txt, canonical URLs, Open Graph tags. Sitemap must include hreflang alternates. |
| **Structured data (JSON-LD)** | Enhances search appearance, builds entity recognition. Organization schema appears on 25-34% of AI-cited pages. | MEDIUM | Organization schema (critical for entity recognition), LocalBusiness (for physical office), BreadcrumbList, Service schema on service pages, Article schema on blog posts. |
| **Blog/content hub** | Content marketing generates 67% more leads for B2B. Positions Toko as a trade authority. | MEDIUM | MDX-based. Categories/tags. Listing page with pagination. Individual post pages with related posts. Multilingual -- each post in all 4 languages. |
| **Sectors/industries page** | Visitors need to see that Toko works in their industry. Industry relevance is a key trust signal. | MEDIUM | Grid/card layout showing sectors (food, textile, machinery, chemicals, construction, etc.). Each sector links to a detail page. |
| **Navigation and site structure** | Users must find what they need in 2 clicks. Poor IA loses visitors. | LOW | Clear top nav: Home, About, Services, Sectors, Blog, Contact. Language switcher always visible. Footer with full sitemap links. |
| **Performance and Core Web Vitals** | Google ranking factor. 17% conversion rate increase correlates with good CWV in international B2B. | MEDIUM | Static generation (SSG) for all content pages. Image optimization (next/image). Font optimization. Target LCP < 2.5s, CLS < 0.1. |
| **SSL and security indicators** | Basic trust. Chrome marks non-HTTPS as "not secure." | LOW | Vercel provides automatic SSL. Ensure all resources load over HTTPS. |

### Differentiators (Competitive Advantage)

Features that set Toko apart from the many generic Turkish trade company websites. These create competitive advantage and increase conversion.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Programmatic SEO: sector/product pages** | Captures long-tail keywords like "import [product] from Turkey", "[sector] sourcing Turkey". Hundreds of pages from templates, each targeting specific search queries. Competitors do not do this. | HIGH | Template-based page generation from structured data (CSV/JSON). Each page needs unique intro text, relevant stats, CTA. Must avoid thin content -- Google penalizes template pages with no unique value. Generate in all 4 languages. |
| **Programmatic SEO: country trade pages** | Targets queries like "Turkey-Russia trade", "Turkey-France import export". Country-specific landing pages capture geo-intent searches. | HIGH | Template with bilateral trade data, common products traded, regulatory notes, Toko's services for that corridor. hreflang per language. |
| **Programmatic SEO: FAQ pages** | Targets "how to import [X]?", "customs duties for [Y]?" queries. FAQ content captures informational intent and builds authority. | MEDIUM | Question/answer format. Grouped by topic. Even though Google limits FAQ rich results to government/health sites, the content itself still ranks well for question-based queries. |
| **Programmatic SEO: customs/regulations pages** | HS code information, customs procedures, trade regulations by product or country. Extremely high search volume in trade sector. Positions Toko as a knowledge authority. | HIGH | Must be accurate and maintained. Include disclaimers that regulations change. Link to official sources. This is the highest-value programmatic content type for trade websites. |
| **Russia transit trade dedicated section** | Toko's special niche. No competitor has a well-structured, multilingual section specifically for Russian companies needing Turkish technical service infrastructure. Turkey is Russia's second-largest trading partner. | MEDIUM | Dedicated landing page (especially strong in RU). Explain transit trade services, technical service infrastructure, regulatory compliance. This is a key differentiator -- build it prominently. |
| **Supply request form** | Beyond generic contact -- lets prospects specify exactly what they need sourced. Structured data collection means better lead qualification. | MEDIUM | Product type, specifications, quantity, target price range, delivery timeline, destination. Multi-step form to reduce abandonment. Distinct from quote request (supply request = "find me this product"). |
| **Callback request form** | Reduces friction for prospects who prefer phone. Common in Turkish/Russian business culture where phone relationships matter. | LOW | Phone number, preferred time, timezone, brief topic. Simple 3-field form. |
| **WhatsApp floating button** | WhatsApp messages have 98% open rates. Dominant communication channel in Turkey, Russia, and many international markets. Eliminates friction for mobile visitors. | LOW | Floating button that opens WhatsApp chat with pre-filled message. Different numbers possible per language (Turkish number for TR, etc.). No chatbot needed -- just direct contact. |
| **Sector detail pages with sourcing capability showcase** | Each sector page shows specific products Toko can source, with example images, typical specifications, and a direct "request sourcing" CTA. Goes beyond listing sectors to demonstrating depth. | MEDIUM | Individual pages per sector. Product examples, capability description, relevant certifications, and embedded supply request form. |
| **Content pillar-cluster architecture** | Blog organized in hub-and-spoke model: pillar pages (e.g., "Complete Guide to Importing from Turkey") linking to cluster posts (specific topics). Improves topical authority and internal linking. | MEDIUM | Define 4-6 pillar topics. Each pillar page links to 5-10 cluster articles. Internal linking strategy is critical. |
| **Email notification system for form submissions** | All form submissions trigger email notifications to the Toko team. No admin panel needed, but reliable delivery is essential. | MEDIUM | Use Resend API (or Nodemailer as fallback). Template emails per form type. Include all submitted data. Send confirmation email to the prospect. |
| **Language-specific CTAs and value propositions** | Not just translation -- localization. Russian visitors see Russia-specific services prominently. French visitors see Francophone Africa trade emphasis. | MEDIUM | Conditional content blocks per locale. Hero section and CTA text adapted per language/market, not just translated. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Explicitly exclude these.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Admin panel / CMS dashboard** | "We need to edit content easily" | Massive complexity increase. Requires auth, RBAC, WYSIWYG editor, database. The team is small and developer-capable. MDX editing is fast enough. | MDX files in codebase. Edit locally or via GitHub. Deploy on push. |
| **E-commerce / product catalog with pricing** | "Show our products with prices" | Toko is a sourcing company, not a retailer. Prices change per deal. A catalog with prices sets wrong expectations and becomes outdated immediately. | Sector pages with product categories and "request quote" CTAs. No public pricing. |
| **User accounts / login system** | "Let clients track their requests" | Requires auth infrastructure, user management, security, GDPR compliance. Overkill for a lead-gen site. Very few visitors would create accounts. | Email-based communication. Send confirmation emails with reference numbers for tracking. |
| **Live chat / chatbot** | "Instant responses increase conversion" | Requires 24/7 staffing or AI chatbot setup. Small team cannot staff live chat. Chatbots in B2B trade give generic answers that frustrate serious buyers. | WhatsApp button (async, personal, no staffing pressure). Callback request form. Clear response time promises on forms. |
| **Product comparison tools** | "Let users compare products side by side" | Toko sources products, it does not sell standardized SKUs. Comparison implies commodity trading. | Consultation-based approach: "Tell us what you need, we find the best option." |
| **Machine translation for content** | "Auto-translate to save time" | Produces poor quality in technical/trade content. Damages credibility. Russian and French audiences are particularly sensitive to bad translations. | Human translation for all content. Invest upfront, maintain quality. Professional translation is a one-time cost per piece of content. |
| **Newsletter popup / aggressive lead capture** | "Capture emails from all visitors" | Popups annoy B2B visitors. They are researching, not subscribing. Trade professionals find popups unprofessional. | Subtle newsletter signup in footer or blog sidebar. Value-driven: "Get weekly trade insights." No popups. |
| **Animated backgrounds / heavy visual effects** | "Make the site look modern and dynamic" | Hurts Core Web Vitals, increases CLS, slows LCP. B2B visitors want information, not animation. Trade professionals often browse on slow connections from warehouses/offices. | Clean, professional design. Subtle micro-interactions. Fast loading. Let the content speak. |
| **Social media feed integration** | "Show our social activity on the site" | Adds external JS, slows page load, often looks empty or stale. Social feeds rarely add value on B2B corporate sites. | Simple social media icon links in footer. Blog content is the site's own "feed." |
| **Multi-step wizard for service selection** | "Guide users through finding the right service" | Over-engineers what should be simple. Toko has 4 core services. A wizard for 4 options is patronizing. | Clear services page with descriptions and "get started" CTAs per service. |

## Feature Dependencies

```
[Multilingual i18n System]
    |-- required by --> [All Content Pages]
    |-- required by --> [Programmatic SEO Pages]
    |-- required by --> [Blog System]
    |-- required by --> [Forms (localized labels/validation)]
    |-- required by --> [Language-Specific CTAs]

[Content/Data Model]
    |-- required by --> [Programmatic SEO: Sector Pages]
    |-- required by --> [Programmatic SEO: Country Pages]
    |-- required by --> [Programmatic SEO: FAQ Pages]
    |-- required by --> [Programmatic SEO: Customs Pages]

[MDX Blog Infrastructure]
    |-- required by --> [Blog Listing Page]
    |-- required by --> [Blog Detail Pages]
    |-- required by --> [Content Pillar-Cluster Architecture]
    |-- required by --> [SEO: Article Schema]

[Form Infrastructure (validation, submission, email)]
    |-- required by --> [Contact Form]
    |-- required by --> [Quote Request Form]
    |-- required by --> [Supply Request Form]
    |-- required by --> [Callback Request Form]

[Email Notification System]
    |-- required by --> [All Form Submissions]
    |-- enhances --> [Prospect Confirmation Emails]

[SEO Fundamentals (meta, sitemap, structured data)]
    |-- enhances --> [All Pages]
    |-- required by --> [Programmatic SEO Pages] (these are pointless without SEO infra)

[Core Pages (Home, About, Services, Contact)]
    |-- required by --> [Trust Building] (without core pages, nothing to trust)
    |-- required by --> [Navigation Structure]

[Sector Overview Page]
    |-- required by --> [Sector Detail Pages]
    |-- required by --> [Programmatic Sector/Product Pages]

[Russia Transit Trade Section]
    |-- enhances --> [Russian Language Content]
    |-- requires --> [Services Pages] (it is a specialized service)
```

### Dependency Notes

- **Multilingual i18n must be built first:** Every other feature depends on the ability to serve content in 4 languages. This is foundational infrastructure, not an afterthought.
- **Content/data model before programmatic pages:** The templates for programmatic SEO pages need structured data (sectors, countries, products, HS codes) to generate from. Define the data model first.
- **Form infrastructure is shared:** All 4 form types use the same validation, submission, and email notification pipeline. Build once, reuse.
- **SEO infrastructure before programmatic pages:** Sitemap generation, structured data helpers, and meta tag management must be in place before generating hundreds of pages.
- **Core pages validate design system:** Homepage, About, Services, and Contact establish the visual language and component library that all other pages reuse.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what is needed to start generating leads.

- [ ] **Multilingual infrastructure (TR, EN, FR, RU)** -- foundational; cannot retrofit
- [ ] **Homepage** -- first impression, value proposition, service overview
- [ ] **About page** -- trust signal, company legitimacy
- [ ] **Services pages (import, export, transit trade, sourcing)** -- explain what Toko does
- [ ] **Sectors overview page** -- show industry breadth
- [ ] **Contact form + Quote request form** -- primary lead capture
- [ ] **Email notifications for form submissions** -- ensure leads are received
- [ ] **Russia transit trade landing page** -- key differentiator, serve priority audience
- [ ] **SEO fundamentals** -- meta tags, sitemap, robots.txt, structured data
- [ ] **Responsive design** -- mobile visitors must convert
- [ ] **WhatsApp floating button** -- low-effort, high-impact lead channel
- [ ] **Navigation and footer** -- site structure and language switching

### Add After Validation (v1.x)

Features to add once core site is live and generating initial traffic.

- [ ] **Blog system (MDX)** -- start publishing trade content for organic traffic growth
- [ ] **Supply request form** -- specialized lead capture once basic forms are validated
- [ ] **Callback request form** -- additional conversion path
- [ ] **Sector detail pages** -- expand from overview to individual sector pages
- [ ] **References/partners section** -- add as client logos and data become available
- [ ] **Content pillar-cluster architecture** -- organize blog content for topical authority
- [ ] **Confirmation emails to prospects** -- improve lead experience

### Future Consideration (v2+)

Features to defer until organic traffic is flowing and content model is proven.

- [ ] **Programmatic SEO: sector/product pages** -- requires validated data model and content templates
- [ ] **Programmatic SEO: country trade pages** -- requires bilateral trade data collection
- [ ] **Programmatic SEO: FAQ pages** -- requires identified question patterns from search data
- [ ] **Programmatic SEO: customs/regulations pages** -- requires accurate regulatory data, legal review
- [ ] **Language-specific CTAs and value propositions** -- optimize after seeing which markets convert
- [ ] **Advanced structured data (Service, FAQ schemas)** -- enhance after core schema is in place

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Multilingual i18n system | HIGH | HIGH | P1 |
| Homepage | HIGH | LOW | P1 |
| About page | MEDIUM | LOW | P1 |
| Services pages | HIGH | MEDIUM | P1 |
| Contact form | HIGH | LOW | P1 |
| Quote request form | HIGH | LOW | P1 |
| Email notifications | HIGH | MEDIUM | P1 |
| SEO fundamentals | HIGH | MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Russia transit trade section | HIGH | MEDIUM | P1 |
| WhatsApp button | MEDIUM | LOW | P1 |
| Sectors overview page | MEDIUM | LOW | P1 |
| Navigation + language switcher | HIGH | LOW | P1 |
| Structured data (JSON-LD) | MEDIUM | MEDIUM | P1 |
| Blog system (MDX) | HIGH | MEDIUM | P2 |
| Supply request form | MEDIUM | LOW | P2 |
| Callback request form | LOW | LOW | P2 |
| Sector detail pages | MEDIUM | MEDIUM | P2 |
| References/partners section | MEDIUM | LOW | P2 |
| Confirmation emails | LOW | LOW | P2 |
| Content pillar-cluster | MEDIUM | MEDIUM | P2 |
| Programmatic SEO: sectors | HIGH | HIGH | P3 |
| Programmatic SEO: countries | HIGH | HIGH | P3 |
| Programmatic SEO: FAQ | MEDIUM | MEDIUM | P3 |
| Programmatic SEO: customs | HIGH | HIGH | P3 |
| Language-specific CTAs | MEDIUM | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- site is non-functional or non-credible without these
- P2: Should have, add within weeks of launch -- enhance lead generation and content strategy
- P3: Scale play, add when content model is proven -- high-value but requires data and validation

## Competitor Feature Analysis

| Feature | Generic Turkish Trade Sites | B2B Marketplaces (Alibaba, TurkishExporter) | Toko's Approach |
|---------|---------------------------|---------------------------------------------|-----------------|
| Multilingual | Usually TR + EN only | Platform handles translation | Full 4-language with localized content, not just translation |
| Service pages | Generic, one page | N/A (platform model) | Individual pages per service with process details |
| Contact forms | Single generic form | Platform messaging | Multiple specialized forms (contact, quote, supply, callback) |
| Sector coverage | Listed but not detailed | Category-based browsing | Individual sector pages with sourcing capability showcase |
| Blog/content | Rarely maintained | Platform blog, not company-specific | MDX content hub with pillar-cluster SEO strategy |
| Programmatic SEO | Not done | Platform does this at scale | Template-generated pages for sectors, countries, FAQ, customs |
| Russia transit trade | Mentioned in services | Not a focus | Dedicated section with RU-language emphasis |
| Trust signals | Basic "about" page | Platform trust badges | Company history, team photos, partner logos, certifications |
| Mobile optimization | Often poor | Good (platform investment) | Mobile-first responsive design |
| Structured data | Rarely implemented | Platform handles SEO | Organization, LocalBusiness, Service, Article, Breadcrumb schemas |
| WhatsApp integration | Sometimes | Platform messaging | Floating button, locale-aware |

## Sources

- [Motionpoint: 2025 Multilingual SEO Guide](https://www.motionpoint.com/blog/2025-multilingual-seo-guide-key-tactics-to-boost-your-websites-global-reach/) -- multilingual best practices, hreflang implementation
- [Brixon Group: International SEO for B2B](https://brixongroup.com/en/international-seo-how-to-properly-structure-country-specific-subpages-for-b2b-companies/) -- subdirectory structure, 27% ranking advantage, 21% CTR increase with hreflang
- [Trajectory Web Design: B2B Website Trust Signals](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals) -- client logos, team photos, certifications, case studies
- [Backlinko: Programmatic SEO](https://backlinko.com/programmatic-seo) -- template-based page generation strategy and examples
- [Semrush: Programmatic SEO Guide](https://www.semrush.com/blog/programmatic-seo/) -- implementation methodology, keyword research approach
- [Backlinko: B2B Content Marketing](https://backlinko.com/hub/content/b2b) -- 67% more leads with blogging, pillar-cluster model
- [Scribendi: Schema Markup Checklist 2026](https://www.scribendi.net/blog/website-design/schema-markup-checklist-2026/) -- essential schema types for B2B
- [Passion Digital: Schema for B2B](https://passion.digital/blog/schema-markup-for-b2b-businesses/) -- Organization schema appears on 25-34% of AI-cited pages
- [12Grids: WhatsApp for B2B](https://www.12grids.com/articles/whatsapp-for-b2b-lead-conversion) -- 98% open rates, conversion benefits
- [Red Evolution: B2B Contact Form Anatomy](https://www.redevolution.com/blog/the-anatomy-of-a-successful-contact-form) -- 3-5 fields, clear next steps
- [Unbounce: Lead Gen Form Best Practices](https://unbounce.com/conversion-rate-optimization/optimize-lead-gen-forms/) -- progressive profiling, multi-step forms
- [OEC: Russia-Turkey Trade Data](https://oec.world/en/profile/bilateral-country/rus/partner/tur) -- bilateral trade relationship context
- [Turkish Minute: Turkey-Russia Trade Partnership](https://turkishminute.com/2025/09/09/turkey-has-become-russias-second-largest-trading-partner-minister-says/) -- Turkey as Russia's second-largest trading partner

---
*Feature research for: Import/Export Trading Company Corporate Website (Toko Trading)*
*Researched: 2026-03-10*
