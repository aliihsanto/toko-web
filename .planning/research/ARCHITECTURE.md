# Architecture Research

**Domain:** Multilingual corporate website with programmatic SEO (import/export trading)
**Researched:** 2026-03-10
**Confidence:** HIGH

## System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         BROWSER / CRAWLER                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────┐   ┌────────────────┐   ┌──────────────────────┐  │
│  │  Static HTML   │   │   Sitemap.xml  │   │  robots.txt          │  │
│  │  (SSG / ISR)   │   │  (multilingual)│   │                      │  │
│  └───────┬────────┘   └────────────────┘   └──────────────────────┘  │
│          │                                                           │
├──────────┴───────────────────────────────────────────────────────────┤
│                     NEXT.JS APP ROUTER                               │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Middleware (proxy.ts) — locale detection & routing          │    │
│  │  Accept-Language → cookie → default locale                   │    │
│  └──────────────────────────────┬───────────────────────────────┘    │
│                                 │                                    │
│  ┌──────────────────────────────▼───────────────────────────────┐    │
│  │                    app/[locale]/                              │    │
│  │                                                              │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │    │
│  │  │  Static  │  │   Blog   │  │  Prog.   │  │  Forms   │    │    │
│  │  │  Pages   │  │  System  │  │  SEO     │  │  System  │    │    │
│  │  │          │  │          │  │  Pages   │  │          │    │    │
│  │  └─────┬────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │    │
│  │        │             │             │             │           │    │
│  └────────┼─────────────┼─────────────┼─────────────┼───────────┘    │
│           │             │             │             │                 │
│  ┌────────▼─────────────▼─────────────▼─────────────┘                │
│  │                                                                   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐      │
│  │  │  i18n Layer  │  │  Content     │  │  Server Actions    │      │
│  │  │  (next-intl) │  │  Layer       │  │  (form → email)    │      │
│  │  │              │  │  (MDX + JSON)│  │                    │      │
│  │  └──────────────┘  └──────────────┘  └─────────┬──────────┘      │
│  │                                                 │                 │
│  └─────────────────────────────────────────────────┼─────────────────┤
│                                                    │                 │
│  ┌─────────────────────────────────────────────────▼─────────────┐   │
│  │                    EXTERNAL SERVICES                           │   │
│  │  ┌─────────────┐   ┌─────────────┐                            │   │
│  │  │   Resend    │   │   Vercel    │                            │   │
│  │  │   (email)   │   │  (hosting)  │                            │   │
│  │  └─────────────┘   └─────────────┘                            │   │
│  └───────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Middleware (proxy.ts) | Locale detection, redirect to `/{locale}/` prefix, cookie management | `next-intl/middleware` with `createMiddleware(routing)` |
| i18n Layer | Translation loading, locale-aware navigation, static rendering setup | `next-intl` with `routing.ts`, `request.ts`, `navigation.ts` |
| Static Pages | Homepage, About, Services, Sectors, References | Server Components in `app/[locale]/` with `generateStaticParams` |
| Blog System | MDX-based articles per locale, listing + detail pages | MDX files in `content/blog/{locale}/`, parsed with `@next/mdx` or `next-mdx-remote` |
| Programmatic SEO Pages | Data-driven sector, FAQ, country, customs pages across 4 locales | JSON/YAML data files + `generateStaticParams` producing all slug/locale combinations |
| Forms System | Contact, quote request, supply request, callback forms | React Hook Form (client) + Server Actions (server) |
| Email Pipeline | Send form submissions as email notifications | Server Actions calling Resend API with React Email templates |
| SEO Infrastructure | Metadata, JSON-LD, sitemap, robots.txt, hreflang | Next.js Metadata API, `sitemap.ts`, structured data scripts |

## Recommended Project Structure

```
toko-web/
├── public/
│   ├── images/                  # Static images, logos, partner logos
│   ├── fonts/                   # Self-hosted fonts (if any)
│   └── robots.txt               # Or generated via app/robots.ts
│
├── content/
│   ├── blog/
│   │   ├── tr/                  # Turkish blog posts
│   │   │   ├── turkiye-ihracat-rehberi.mdx
│   │   │   └── ...
│   │   ├── en/                  # English blog posts
│   │   │   ├── turkey-export-guide.mdx
│   │   │   └── ...
│   │   ├── fr/                  # French blog posts
│   │   └── ru/                  # Russian blog posts
│   │
│   └── data/
│       ├── sectors.json         # Sector definitions (id, slug per locale, template data)
│       ├── countries.json       # Country trade pair definitions
│       ├── faqs.json            # FAQ entries per locale
│       └── customs.json         # Customs/regulations data per locale
│
├── messages/
│   ├── tr.json                  # Turkish UI translations
│   ├── en.json                  # English UI translations
│   ├── fr.json                  # French UI translations
│   └── ru.json                  # Russian UI translations
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Root locale layout (html lang, NextIntlClientProvider)
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── sectors/
│   │   │   │   ├── page.tsx             # Sectors listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Programmatic sector detail
│   │   │   ├── countries/
│   │   │   │   ├── page.tsx             # Countries listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Programmatic country detail
│   │   │   ├── faq/
│   │   │   │   ├── page.tsx             # FAQ listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Programmatic FAQ detail
│   │   │   ├── customs/
│   │   │   │   ├── page.tsx             # Customs/regulations listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Programmatic customs detail
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Blog post detail
│   │   │   ├── references/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx             # Contact + all forms
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── sitemap.ts                   # Dynamic multilingual sitemap generation
│   │   ├── robots.ts                    # Robots.txt generation
│   │   └── layout.tsx                   # Bare root layout (no locale context)
│   │
│   ├── components/
│   │   ├── ui/                          # Primitive UI components (Button, Input, Card)
│   │   ├── layout/                      # Header, Footer, Navigation, LanguageSwitcher
│   │   ├── forms/                       # ContactForm, QuoteForm, SupplyForm, CallbackForm
│   │   ├── seo/                         # JsonLd, Breadcrumbs components
│   │   └── sections/                    # Homepage hero, services grid, CTA blocks
│   │
│   ├── lib/
│   │   ├── content.ts                   # MDX loading, blog post parsing, frontmatter
│   │   ├── data.ts                      # JSON data loading for programmatic pages
│   │   ├── email.ts                     # Resend client initialization
│   │   └── utils.ts                     # Shared utilities
│   │
│   ├── actions/
│   │   ├── contact.ts                   # Server Action: contact form -> email
│   │   ├── quote.ts                     # Server Action: quote request -> email
│   │   ├── supply.ts                    # Server Action: supply request -> email
│   │   └── callback.ts                  # Server Action: callback request -> email
│   │
│   ├── emails/
│   │   ├── ContactEmail.tsx             # React Email template for contact submissions
│   │   ├── QuoteEmail.tsx               # React Email template for quote requests
│   │   ├── SupplyEmail.tsx              # React Email template for supply requests
│   │   └── CallbackEmail.tsx            # React Email template for callback requests
│   │
│   ├── i18n/
│   │   ├── routing.ts                   # defineRouting({locales, defaultLocale})
│   │   ├── request.ts                   # getRequestConfig for Server Components
│   │   └── navigation.ts               # createNavigation({Link, redirect, useRouter})
│   │
│   └── types/
│       ├── content.ts                   # Blog post, MDX frontmatter types
│       ├── data.ts                      # Sector, Country, FAQ, Customs types
│       └── forms.ts                     # Form submission types
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Structure Rationale

- **`content/` at project root:** Keeps authored content (MDX blog posts, JSON data) separate from application code. Content authors touch `content/`, developers touch `src/`. The locale-subfolder pattern (`content/blog/tr/`, `content/blog/en/`) makes it obvious which language a file belongs to and mirrors the URL structure.

- **`messages/` at project root:** next-intl convention. These are UI string translations (button labels, headings, navigation text), not long-form content. One JSON file per locale keeps translations manageable.

- **`content/data/*.json` for programmatic pages:** Sector, country, FAQ, and customs data lives in structured JSON files. Each file contains entries for all locales within a single object (keyed by locale), allowing `generateStaticParams` to iterate and produce all slug/locale combinations at build time. This avoids a database dependency while keeping the data source centralized.

- **`src/actions/` for Server Actions:** Separating server actions from components enforces a clean boundary. Each form type gets its own action file, making the email pipeline traceable: form component -> action -> Resend.

- **`src/emails/` for React Email templates:** Email templates are React components rendered server-side by Resend. Keeping them in their own directory makes them easy to preview and test independently.

- **`src/i18n/` for internationalization config:** The three-file convention (`routing.ts`, `request.ts`, `navigation.ts`) is the next-intl standard. All locale-aware routing and translation loading originates here.

- **`app/[locale]/` as the single dynamic segment:** Every page nests under `[locale]`, meaning the middleware handles locale detection once and the entire app tree receives the locale via params. No page escapes the i18n context.

## Architectural Patterns

### Pattern 1: Locale-Prefixed Routing with Middleware Detection

**What:** All routes live under `app/[locale]/`. Middleware intercepts every request, checks for a locale prefix, and redirects if missing. Detection order: URL prefix, cookie, Accept-Language header, default locale (TR).

**When to use:** Always. This is the foundational pattern for the entire site.

**Trade-offs:** Every URL carries a locale prefix (e.g., `/en/services`). The default locale (TR) can optionally omit the prefix, but keeping it consistent across all locales simplifies sitemap generation and hreflang tags.

**Example:**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en', 'fr', 'ru'],
  defaultLocale: 'tr',
  localePrefix: 'always'  // /tr/about, /en/about, /fr/about, /ru/about
});
```

```typescript
// src/proxy.ts (called middleware.ts before Next.js 16)
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### Pattern 2: Data-Driven Programmatic Page Generation

**What:** Structured JSON data files define all programmatic page variants (sectors, countries, FAQs, customs). Each entry contains locale-specific slugs, titles, and template content. `generateStaticParams` reads these files and produces all combinations of `[locale]` x `[slug]` at build time.

**When to use:** For all four programmatic SEO page types. This is how the site scales to hundreds or thousands of pages without a database.

**Trade-offs:** Adding new pages means editing JSON files and redeploying. This is acceptable for a corporate site where content changes are infrequent. If content velocity becomes high, migrate JSON to a headless CMS later.

**Example:**

```typescript
// content/data/sectors.json (simplified)
{
  "sectors": [
    {
      "id": "food",
      "slugs": {
        "tr": "gida-sektoru",
        "en": "food-sector",
        "fr": "secteur-alimentaire",
        "ru": "prodovolstvennyj-sektor"
      },
      "titles": {
        "tr": "Gida Sektoru - Turkiye'den Gida Ithalat ve Ihracat",
        "en": "Food Sector - Import & Export Food Products from Turkey",
        "fr": "Secteur Alimentaire - Import & Export depuis la Turquie",
        "ru": "Продовольственный сектор - Импорт и экспорт из Турции"
      },
      "description": { "tr": "...", "en": "...", "fr": "...", "ru": "..." },
      "products": ["olive-oil", "dried-fruits", "confectionery"],
      "hsCodePrefix": "0401-2106"
    }
  ]
}
```

```typescript
// src/app/[locale]/sectors/[slug]/page.tsx
import { routing } from '@/i18n/routing';
import { getSectors } from '@/lib/data';
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const sectors = await getSectors();
  const params = [];

  for (const locale of routing.locales) {
    for (const sector of sectors) {
      params.push({
        locale,
        slug: sector.slugs[locale]
      });
    }
  }
  return params;
}

export default async function SectorPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const sector = await getSectorBySlug(slug, locale);
  // Render sector template with data
}
```

### Pattern 3: Server Actions as Form-to-Email Pipeline

**What:** Each form type has a dedicated Server Action that validates input (with Zod), sends email via Resend using a React Email template, and returns a result. The client component uses `useActionState` to manage pending/success/error states.

**When to use:** For all four form types (contact, quote, supply, callback). No API routes needed.

**Trade-offs:** Server Actions are simpler than API routes for this use case. Rate limiting must be handled at the middleware or Vercel level since there is no backend service layer.

**Example:**

```typescript
// src/actions/contact.ts
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { ContactEmail } from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  locale: z.enum(['tr', 'en', 'fr', 'ru']),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { data, error } = await resend.emails.send({
    from: 'Toko Website <noreply@toko.com.tr>',
    to: ['info@toko.com.tr'],
    subject: `New Contact: ${parsed.data.name}`,
    react: ContactEmail({ ...parsed.data }),
  });

  if (error) {
    return { success: false, errors: { _form: ['Email send failed'] } };
  }

  return { success: true, errors: {} };
}
```

### Pattern 4: MDX Blog with Locale-Scoped Content Directories

**What:** Blog posts are MDX files organized in `content/blog/{locale}/` directories. Each locale has its own set of posts -- they are not 1:1 translations of each other (some posts may exist only in TR and RU, for example). A content utility module reads MDX files, parses frontmatter, and provides typed data to blog listing and detail pages.

**When to use:** For the blog system. MDX is the right choice because it allows rich content (components embedded in markdown) without a CMS dependency.

**Trade-offs:** Posts are not automatically linked across locales. If a post exists in all four languages, an explicit `translations` frontmatter field should map to the equivalent slugs in other locales for hreflang tags. This is manual but appropriate for a corporate blog with moderate publishing frequency.

**Example:**

```mdx
---
title: "How to Import Food Products from Turkey"
slug: "import-food-products-turkey"
date: "2026-02-15"
description: "Complete guide to importing food products from Turkey..."
tags: ["import", "food", "turkey"]
translations:
  tr: "turkiyeden-gida-urunleri-ithalati"
  ru: "import-prodovolstvennykh-tovarov-iz-turtsii"
---

# How to Import Food Products from Turkey

Content here with optional embedded React components...
```

```typescript
// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(locale: string) {
  const dir = path.join(CONTENT_DIR, locale);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    return { ...data, content, slug: data.slug };
  });
}
```

## Data Flow

### Request Flow (Page Visit)

```
User visits toko.com.tr/en/sectors/food-sector
    |
    v
Middleware (proxy.ts)
    |-- Checks URL: has /en/ prefix? YES
    |-- Sets locale cookie for future visits
    |-- Passes through to App Router
    |
    v
app/[locale]/sectors/[slug]/page.tsx
    |-- params: { locale: 'en', slug: 'food-sector' }
    |-- setRequestLocale('en')
    |-- Loads sector data from content/data/sectors.json
    |-- Loads translations from messages/en.json via getTranslations()
    |-- Renders page with sector data + translated UI strings
    |-- Injects JSON-LD structured data
    |-- Generates metadata (title, description, hreflang alternates)
    |
    v
Static HTML served from Vercel CDN (pre-built at deploy time)
```

### Request Flow (First Visit -- No Locale in URL)

```
User visits toko.com.tr/services
    |
    v
Middleware (proxy.ts)
    |-- Checks URL: has locale prefix? NO
    |-- Checks cookie: none
    |-- Reads Accept-Language header: "ru-RU,ru;q=0.9,en;q=0.8"
    |-- Matches 'ru' from supported locales
    |-- 307 Redirect to /ru/services
    |
    v
Browser follows redirect to toko.com.tr/ru/services
    |-- Middleware sets locale cookie: 'ru'
    |-- Serves Russian version of services page
```

### Form Submission Flow

```
User fills out Quote Request form on /en/contact
    |
    v
Client Component (QuoteForm)
    |-- React Hook Form validates fields client-side
    |-- useActionState calls submitQuoteForm Server Action
    |-- Shows pending spinner
    |
    v
Server Action (src/actions/quote.ts)
    |-- Zod validates server-side (never trust client)
    |-- If invalid: returns { success: false, errors: {...} }
    |-- If valid: calls Resend API
    |
    v
Resend API
    |-- Renders QuoteEmail React component to HTML
    |-- Sends email to info@toko.com.tr
    |-- Returns success/error
    |
    v
Server Action returns result to client
    |-- QuoteForm shows success message or error
    |-- No page reload needed
```

### Build-Time Content Flow

```
JSON Data Files (content/data/*.json)
    |
    v
generateStaticParams() in each programmatic page
    |-- Reads all entries from JSON
    |-- Produces [{locale, slug}, ...] for every combination
    |-- 4 locales x N entries = 4N pages per type
    |
    v
Next.js Build
    |-- Calls each page component with each param set
    |-- Renders Server Components
    |-- Loads translations via next-intl
    |-- Generates metadata and JSON-LD
    |-- Outputs static HTML + JSON for each page
    |
    v
Vercel Deployment
    |-- Uploads all static assets to CDN
    |-- Pages served at edge with zero server processing

MDX Blog Files (content/blog/{locale}/*.mdx)
    |
    v
generateStaticParams() in blog/[slug]/page.tsx
    |-- Reads directory listing per locale
    |-- Produces [{locale, slug}, ...] for each post
    |
    v
Same Next.js build pipeline as above
```

### Sitemap Generation Flow

```
app/sitemap.ts
    |
    v
Reads all content sources:
    |-- Static pages: hardcoded list (/, /about, /services, etc.)
    |-- Blog posts: reads content/blog/{locale}/ directories
    |-- Sectors: reads content/data/sectors.json
    |-- Countries: reads content/data/countries.json
    |-- FAQs: reads content/data/faqs.json
    |-- Customs: reads content/data/customs.json
    |
    v
For each page, generates entry with alternates:
    {
      url: 'https://toko.com.tr/en/sectors/food-sector',
      lastModified: '2026-03-10',
      alternates: {
        languages: {
          'tr': 'https://toko.com.tr/tr/sektorler/gida-sektoru',
          'en': 'https://toko.com.tr/en/sectors/food-sector',
          'fr': 'https://toko.com.tr/fr/secteurs/secteur-alimentaire',
          'ru': 'https://toko.com.tr/ru/sektory/prodovolstvennyj-sektor'
        }
      }
    }
    |
    v
Next.js serves as /sitemap.xml
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Launch (~200 pages: 4 locales x ~50 unique pages) | Full SSG at build time. All pages statically generated. Build time under 5 minutes. Vercel free/pro tier handles this easily. |
| Growth (~2,000 pages: expanded sectors, countries, content) | Still full SSG. Build time ~10-15 minutes. Vercel paid plan handles 16,000 build output files. No architecture changes needed. |
| Ambitious (~10,000+ pages: deep long-tail SEO) | Consider ISR for programmatic pages: pre-build top 500 pages, generate rest on-demand with `dynamicParams: true`. Or split sitemap using `generateSitemaps()`. If Vercel costs become prohibitive, self-host with `next start` on a VPS. |

### Scaling Priorities

1. **First bottleneck: Build time.** At ~5,000+ pages, builds may exceed 10 minutes. Mitigation: move to ISR for programmatic pages, only pre-build the most important ones (high-traffic sectors, key countries). The rest generate on first request and cache.

2. **Second bottleneck: Content management.** If the business wants non-developers to add blog posts or programmatic page data, JSON files become unwieldy. Mitigation: migrate data layer to a headless CMS (Contentful, Sanity) or a simple SQLite/Turso database. The page components stay the same -- only the data source changes.

3. **Third bottleneck: Sitemap size.** Google has a 50,000 URL limit per sitemap. With 4 locales, you hit this at ~12,500 unique pages. Mitigation: use `generateSitemaps()` to split into multiple sitemap index files.

## Anti-Patterns

### Anti-Pattern 1: Duplicating Page Files Per Locale

**What people do:** Create `app/tr/services/page.tsx`, `app/en/services/page.tsx`, `app/fr/services/page.tsx` -- separate page files for each language.

**Why it is wrong:** Quadruples maintenance burden. Every layout change, component update, or bug fix must be applied in four places. Guaranteed to drift out of sync.

**Do this instead:** Single `app/[locale]/services/page.tsx` that receives `locale` via params and loads the correct translations from `messages/{locale}.json` and content from locale-scoped data.

### Anti-Pattern 2: Putting All Translations in One Giant JSON

**What people do:** Create a single `translations.json` with every string for every page nested deeply.

**Why it is wrong:** File becomes unmanageable at scale. Merge conflicts when multiple people edit. Hard to find which strings belong to which page.

**Do this instead:** Use next-intl's namespace pattern. One JSON file per locale (e.g., `messages/en.json`) but organized by page/component namespace: `{ "HomePage": {...}, "Services": {...}, "ContactForm": {...} }`. Load only the namespace you need with `useTranslations('ContactForm')`.

### Anti-Pattern 3: Client-Side Data Fetching for Static Content

**What people do:** Use `useEffect` + `fetch` to load sector data, blog posts, or translations on the client side.

**Why it is wrong:** Crawlers see empty pages. SEO value is zero. Content flickers on load. Unnecessary network requests for data that never changes.

**Do this instead:** All content loading happens in Server Components at build time. `generateStaticParams` + Server Component data fetching = fully rendered HTML that crawlers index immediately.

### Anti-Pattern 4: Using API Routes for Form Submission

**What people do:** Create `app/api/contact/route.ts` and call it from the client with `fetch`.

**Why it is wrong:** Unnecessary indirection. Server Actions are simpler, type-safe, and integrate with React's form handling (`useActionState`, progressive enhancement).

**Do this instead:** Server Actions with `'use server'` directive. Direct form `action={submitContactForm}`. No API route needed.

### Anti-Pattern 5: Mixing Programmatic and Editorial Content Storage

**What people do:** Store blog posts and programmatic SEO data in the same format or location.

**Why it is wrong:** Blog posts are long-form, authored content that benefits from MDX (rich formatting, embedded components). Programmatic pages are templated content filled from structured data. Treating them the same creates friction in both workflows.

**Do this instead:** Blog posts in MDX files (`content/blog/`). Programmatic page data in JSON files (`content/data/`). Different authoring workflows, different storage, same rendering pipeline.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend | Server Actions call `resend.emails.send()` | API key in env var. React Email templates for rich HTML emails. Free tier: 100 emails/day, sufficient for launch. Paid tier for growth. |
| Vercel | Deploy via `git push` to connected repo | Automatic builds on push. Preview deployments on PRs. Environment variables for `RESEND_API_KEY`. Custom domain `toko.com.tr` configured in Vercel dashboard. |
| Google Search Console | Submit sitemap URL after deploy | Monitor indexing of programmatic pages. Watch for crawl issues with locale routing. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| i18n Layer <-> Page Components | `getTranslations(namespace)` in Server Components, `useTranslations(namespace)` in Client Components | Always go through next-intl API, never read message files directly. |
| Content Layer <-> Page Components | `getBlogPosts(locale)`, `getSectors()`, `getSectorBySlug(slug, locale)` from `src/lib/` | Content utility functions are the only interface to the filesystem. Pages never read files directly. |
| Form Components <-> Server Actions | `useActionState(action, initialState)` | Client components declare which Server Action to call. Action returns typed result. No shared mutable state. |
| Server Actions <-> Email Service | `resend.emails.send({ react: EmailTemplate(props) })` | Each action imports its own email template. Templates are pure React components with no side effects. |
| SEO Components <-> Page Data | JSON-LD components receive typed props from page components | `<JsonLd type="Organization" data={...} />` or inline `<script>` tags. Schema types from `schema-dts` for type safety. |

## Build Order (Dependencies Between Components)

Understanding the dependency chain is critical for phasing the implementation:

```
Phase 1: Foundation (nothing depends on anything yet)
    ├── Project setup (Next.js, TypeScript, Tailwind)
    ├── i18n configuration (routing.ts, request.ts, navigation.ts, proxy.ts)
    ├── Base layout (app/[locale]/layout.tsx with NextIntlClientProvider)
    └── UI component library (Button, Input, Card, etc.)

Phase 2: Static Pages (depends on Phase 1)
    ├── Homepage
    ├── About
    ├── Services
    ├── Sectors (static listing only)
    ├── References
    └── Header/Footer/Navigation with LanguageSwitcher

Phase 3: Content System (depends on Phase 1)
    ├── MDX parsing utilities (src/lib/content.ts)
    ├── Blog listing and detail pages
    └── Blog MDX content files (at least a few seed posts)

Phase 4: Programmatic SEO Pages (depends on Phase 1)
    ├── JSON data structure design (content/data/*.json)
    ├── Data loading utilities (src/lib/data.ts)
    ├── Sector detail pages with generateStaticParams
    ├── Country detail pages
    ├── FAQ detail pages
    └── Customs detail pages

Phase 5: Forms & Email (depends on Phase 1 + Phase 2 for page placement)
    ├── React Email templates (src/emails/)
    ├── Server Actions (src/actions/)
    ├── Form components (src/components/forms/)
    └── Resend integration + env configuration

Phase 6: SEO Infrastructure (depends on Phases 2-4 for content)
    ├── Metadata generation for all page types
    ├── JSON-LD structured data (Organization, Article, FAQPage, BreadcrumbList)
    ├── Multilingual sitemap.ts
    ├── robots.ts
    └── hreflang alternate links in metadata
```

**Key dependency insight:** Phases 3, 4, and 5 can be worked on in parallel after Phase 1 and 2 are complete. Phase 6 should come last because it needs to reference all content sources for the sitemap and structured data.

## Sources

- [Next.js Official i18n Guide](https://nextjs.org/docs/app/guides/internationalization) -- Official, verified 2026-02-27
- [next-intl App Router Getting Started](https://next-intl.dev/docs/getting-started/app-router) -- Official library docs
- [next-intl Routing Setup](https://next-intl.dev/docs/routing/setup) -- Routing configuration and middleware
- [Next.js generateStaticParams Reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- Official API docs
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- Official, verified 2026-02-27
- [Resend Next.js Integration](https://resend.com/nextjs) -- Official Resend docs
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- Official docs
- [Vercel Build Output Limits](https://vercel.com/docs/limits) -- Deployment constraints
- [MDX + i18n Discussion](https://github.com/vercel/next.js/discussions/68374) -- Community patterns
- [Multilingual Sitemap with next-intl](https://dev.to/oikon/implementing-multilingual-sitemap-with-next-intl-in-nextjs-app-router-1354) -- Implementation reference

---
*Architecture research for: Multilingual import/export corporate website with programmatic SEO*
*Researched: 2026-03-10*
