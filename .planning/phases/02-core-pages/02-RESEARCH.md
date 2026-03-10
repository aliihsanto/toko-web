# Phase 2: Core Pages - Research

**Researched:** 2026-03-10
**Domain:** Next.js 16 content pages with next-intl, dynamic routes, image-rich B2B corporate design
**Confidence:** HIGH

## Summary

Phase 2 transforms placeholder pages into full content pages for a Turkish international trade company. The existing codebase from Phase 1 provides a solid foundation: Next.js 16.1 with next-intl 4.8 (locale routing, translation files in `src/messages/`), shadcn/ui v4 with Base UI, Tailwind CSS 4 with oklch color system, Framer Motion scroll-reveal animations, and a complete layout shell (Header + Footer). All placeholder pages already exist at their routes (`/about`, `/services`, `/sectors`, `/references`, `/contact`, `/blog`) and use `getTranslations` + `setRequestLocale` pattern consistently.

The primary challenge is content architecture: defining service types and sector categories as structured data, creating dynamic detail pages for individual services and sectors (`/services/[slug]`, `/sectors/[slug]`), and building the Russia transit trade landing page (`/russia-transit` or similar). All content must exist in 4 languages (TR, EN, FR, RU). The user explicitly wants rich visual design with images (not just text/icons) and more color variety beyond "too much blue/white."

**Primary recommendation:** Use TypeScript data files (`src/data/services.ts`, `src/data/sectors.ts`) to define service/sector content with per-locale translations, combined with `generateStaticParams` for detail page routes. Use Unsplash images initially (already configured in next.config.ts) with `next/image` optimization. Structure each page with distinct visual sections using varied background colors (amber accents, warm grays, green tones) to break the blue/white monotony.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | Homepage with hero, services overview, key differentiators, trust signals, CTAs in 4 languages | Homepage already has rich content from Phase 1 Plan 05 -- needs enhancement with more color variety, better trust signals section, testimonial placeholders, and partner logos |
| PAGE-02 | About page with company history, vision, mission, values | Replace placeholder skeleton with full content sections using ScrollReveal, timeline component for history, value cards |
| PAGE-03 | Services overview page listing all service categories | Services overview exists with 4 service cards -- needs enhancement with richer content, better linking to detail pages |
| PAGE-04 | Individual service detail pages for each service type | NEW: Dynamic route at `/services/[slug]` with generateStaticParams, per-service content from data files |
| PAGE-05 | Sectors overview page showing industries served | Sectors overview exists with 4 image cards -- needs expansion to full sector list with links to detail pages |
| PAGE-06 | Sector detail pages with industry-specific sourcing capabilities | NEW: Dynamic route at `/sectors/[slug]` with generateStaticParams, per-sector content from data files |
| PAGE-07 | References/partners page with flexible layout | Replace placeholder with partner logo grid, industry stats, testimonial cards |
| PAGE-08 | Russia transit trade dedicated landing page with Russian-language priority and specialized CTAs | NEW: Dedicated page at `/russia-transit` with specialized content, Russian-first design approach |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework, App Router, SSG | Already installed, provides generateStaticParams for detail pages |
| next-intl | 4.8.3 | i18n routing and translations | Already installed, established patterns for getTranslations/setRequestLocale |
| react | 19.2.3 | UI library | Already installed |
| framer-motion | 12.35.2 | ScrollReveal animations | Already installed, ScrollReveal component ready to use |
| lucide-react | 0.577.0 | Icons | Already installed, extensive icon library for services/sectors |
| tailwind-merge + clsx + cva | latest | Styling utilities | Already installed via shadcn/ui setup |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui | 4.0.2 (base-nova) | UI components | Button, Separator already used; may need Card, Tabs, Badge components |
| next/image | built-in | Image optimization | All page images -- hero sections, service/sector images, partner logos |

### No New Dependencies Needed
Phase 2 is entirely implementable with the existing stack. No new npm packages required. The data layer is TypeScript files, not a database or CMS.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| TS data files | MDX for content | MDX adds build complexity (Velite) -- reserved for Phase 5 blog. TS files are simpler for structured page content |
| Unsplash images | fal.ai generated images | fal.ai available (API key in memory) but adds build-time dependency. Use Unsplash first, replace with generated images later if desired |
| Static JSON | Headless CMS | Out of scope per PROJECT.md -- no CMS dependency |

## Architecture Patterns

### Recommended Project Structure for Phase 2
```
src/
├── app/[locale]/
│   ├── page.tsx                    # Enhanced homepage (PAGE-01)
│   ├── about/page.tsx              # Full about page (PAGE-02)
│   ├── services/
│   │   ├── page.tsx                # Services overview (PAGE-03)
│   │   └── [slug]/page.tsx         # Service detail (PAGE-04)
│   ├── sectors/
│   │   ├── page.tsx                # Sectors overview (PAGE-05)
│   │   └── [slug]/page.tsx         # Sector detail (PAGE-06)
│   ├── references/page.tsx         # References page (PAGE-07)
│   └── russia-transit/page.tsx     # Russia transit trade (PAGE-08)
├── data/
│   ├── services.ts                 # Service definitions with slugs, icons, images
│   └── sectors.ts                  # Sector definitions with slugs, icons, images
├── components/
│   ├── common/
│   │   ├── scroll-reveal.tsx       # Already exists
│   │   ├── page-transition.tsx     # Already exists
│   │   ├── page-hero.tsx           # NEW: Reusable hero section for content pages
│   │   ├── cta-section.tsx         # NEW: Reusable CTA banner
│   │   └── breadcrumb.tsx          # NEW: Breadcrumb navigation
│   └── sections/
│       ├── trust-signals.tsx       # NEW: Partner logos, stats, certifications
│       └── feature-grid.tsx        # NEW: Reusable feature/benefit grid
└── messages/
    ├── tr.json                     # Expanded with all page content
    ├── en.json
    ├── fr.json
    └── ru.json
```

### Pattern 1: Data-Driven Dynamic Pages
**What:** Define service/sector content as TypeScript objects with slugs, then use `generateStaticParams` to create static pages for each.
**When to use:** Any page type that has a fixed set of items (services, sectors) where each needs its own detail page.
**Example:**
```typescript
// src/data/services.ts
export interface ServiceItem {
  slug: string;
  icon: string; // lucide icon name
  image: string;
  features: string[]; // translation keys
}

export const services: ServiceItem[] = [
  { slug: 'import', icon: 'Ship', image: '/images/services/import.jpg', features: ['customs', 'logistics', 'costOptimization'] },
  { slug: 'export', icon: 'TrendingUp', image: '/images/services/export.jpg', features: ['marketResearch', 'buyerMatching', 'documentation'] },
  { slug: 'sourcing', icon: 'PackageCheck', image: '/images/services/sourcing.jpg', features: ['supplierAudit', 'qualityControl', 'priceNegotiation'] },
  { slug: 'transit-trade', icon: 'BarChart3', image: '/images/services/transit.jpg', features: ['transitRoutes', 'cisExpertise', 'compliance'] },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find(s => s.slug === slug);
}
```

```typescript
// src/app/[locale]/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { services, getServiceBySlug } from '@/data/services';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false; // 404 for unknown slugs

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `ServiceDetail.${slug}` });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const t = await getTranslations(`ServiceDetail.${slug}`);
  // ... render page
}
```

### Pattern 2: Reusable Page Hero Component
**What:** Extract the hero section pattern into a reusable component since every content page needs one.
**When to use:** Every non-homepage content page (about, services, sectors, references, russia-transit).
**Example:**
```typescript
// src/components/common/page-hero.tsx
interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  badge?: string;
}

export function PageHero({ title, subtitle, backgroundImage, badge }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-[#1e3043] dark:bg-[#14202e]">
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image src={backgroundImage} alt="" fill className="object-cover opacity-30" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-amber-500">
            {badge}
          </span>
        )}
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg text-blue-100">{subtitle}</p>
      </div>
    </section>
  );
}
```

### Pattern 3: Translation Namespace per Page
**What:** Each page (and each service/sector detail) has its own translation namespace in the JSON files.
**When to use:** All page content that needs to be in 4 languages.
**Example structure for service detail translations:**
```json
{
  "ServiceDetail": {
    "import": {
      "metaTitle": "Import Services | Toko Trading",
      "metaDescription": "Professional import services from Turkey...",
      "heroTitle": "Import Services",
      "heroSubtitle": "Sourcing products from around the world...",
      "overview": "Full paragraph of import service description...",
      "features": {
        "customs": { "title": "Customs Procedures", "description": "..." },
        "logistics": { "title": "Logistics Management", "description": "..." }
      },
      "process": { "step1": "...", "step2": "...", "step3": "..." },
      "cta": "Request Import Quote"
    },
    "export": { ... },
    "sourcing": { ... },
    "transit-trade": { ... }
  }
}
```

### Pattern 4: Color Variety Strategy
**What:** Use varied section backgrounds to break the "too much blue/white" monotony per user feedback.
**When to use:** Every page -- alternate section backgrounds.
**Color palette for sections:**
```
Hero sections:     bg-[#1e3043] (dark navy) -- established pattern
Light sections:    bg-white dark:bg-background (default)
Warm sections:     bg-amber-50 dark:bg-amber-950/20 (warm accent)
Gray sections:     bg-gray-50 dark:bg-card (neutral break)
Green accent:      bg-emerald-50 dark:bg-emerald-950/20 (for nature/sourcing)
Dark sections:     bg-[#1e3043] dark:bg-[#14202e] (dark navy -- established)
Gradient sections: bg-gradient-to-br from-primary/5 to-amber-50 dark:from-primary/10 dark:to-amber-950/10
```

### Anti-Patterns to Avoid
- **Hardcoded text in JSX:** ALL visible text must come from translation files via `getTranslations` or `useTranslations`. The current about page has hardcoded strings like "Vision", "Mission", "Professional Approach" -- these must be replaced.
- **Inconsistent page structure:** Every content page should follow the pattern: PageHero -> Content Sections -> CTA Section. Don't create unique layouts for each page.
- **Translation key explosion:** Don't create deeply nested translation keys. Keep nesting to 3 levels max: `ServiceDetail.import.heroTitle`.
- **Unsplash URLs in components:** Currently images use inline Unsplash URLs. For Phase 2, define image URLs in data files or constants, not scattered across components.
- **Missing `setRequestLocale`:** Every page component MUST call `setRequestLocale(locale)` for static rendering to work. The existing pages already do this correctly.
- **Missing `generateStaticParams` on detail pages:** Without this, dynamic routes fall back to server-side rendering. All service/sector detail pages must export generateStaticParams.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Breadcrumb navigation | Custom breadcrumb parser | Simple component with translation keys | Route structure is simple and known; no need for auto-parsing |
| Image optimization | Custom image loader/CDN | next/image with Unsplash remotePatterns (already configured) | Built-in optimization, lazy loading, format conversion |
| Scroll animations | Custom IntersectionObserver | ScrollReveal component (already built) | Already established in Phase 1, works with Framer Motion |
| Page transitions | Custom route transition logic | PageTransition component (already built) | Already wired into locale layout with AnimatePresence |
| Icon rendering | Custom icon components | lucide-react (already installed, extensive library) | 1000+ icons available, tree-shakeable |
| UI components | Custom card/badge/tab components | shadcn/ui `npx shadcn@latest add card badge tabs` | Consistent with existing button/separator/sheet components |

**Key insight:** Phase 2 is a content implementation phase, not an infrastructure phase. The infrastructure from Phase 1 handles routing, i18n, layout, animation, and styling. Phase 2 should focus on creating rich content with the existing tools, not building new infrastructure.

## Common Pitfalls

### Pitfall 1: Translation File Bloat
**What goes wrong:** Translation files become massive and unmaintainable as all page content is added in 4 languages.
**Why it happens:** Each service detail, sector detail, and content page adds hundreds of translation keys.
**How to avoid:** Structure translations with clear namespaces per page. Consider splitting large pages into sub-namespaces. Keep the JSON files well-organized with comments (or use a master key spreadsheet).
**Warning signs:** A single locale file exceeding 500 lines. Duplicate or inconsistent key naming.

### Pitfall 2: Inconsistent Image Handling
**What goes wrong:** Some images use remote URLs, others use local paths, sizes aren't consistent, alt text is missing or not translated.
**Why it happens:** Copy-pasting from Phase 1 which used inline Unsplash URLs.
**How to avoid:** Define all images in data files with consistent dimensions. Always provide translated alt text via translation keys. Use `next/image` with explicit `width`/`height` or `fill` with container sizing.
**Warning signs:** CLS (Cumulative Layout Shift) on page load, missing alt text warnings.

### Pitfall 3: Dynamic Route + next-intl Locale Conflict
**What goes wrong:** `generateStaticParams` for service/sector detail pages doesn't account for the parent `[locale]` segment, causing build failures or missing pages.
**Why it happens:** The `[locale]` segment has its own `generateStaticParams` in the layout. Child dynamic segments only need to return their own params (slug), not locale.
**How to avoid:** The locale layout already exports `generateStaticParams` returning all locales. Child pages at `[locale]/services/[slug]` only need to return slug params. Next.js combines parent + child params automatically.
**Warning signs:** Build errors mentioning missing params, or 404s on valid service/sector URLs.

### Pitfall 4: Russia Transit Page Not Feeling Russian-Priority
**What goes wrong:** The Russia transit trade page looks the same as other pages, just with different content.
**Why it happens:** Not thinking about the unique audience (Russian companies) and their expectations.
**How to avoid:** Design the page with Russian-language content as the primary showcase. Consider Cyrillic-first visual hierarchy. Use different imagery (Russia-Turkey trade corridor). Include Russian-specific CTAs (WhatsApp with Russian text, direct phone for Russian speakers).
**Warning signs:** The page feels generic rather than targeted.

### Pitfall 5: Homepage Rework Conflicts
**What goes wrong:** Phase 2 enhances the homepage but the existing homepage already has substantial content from Phase 1 Plan 05, causing merge conflicts or lost work.
**Why it happens:** Not carefully diffing what exists vs. what needs to change.
**How to avoid:** The existing homepage is quite complete. Phase 2 should ENHANCE, not rebuild. Focus on: (1) adding more color variety to existing sections, (2) linking service cards to detail pages, (3) adding a sectors preview section, (4) adding trust signals/partner section. Keep the existing hero, services, why-us, global reach, and CTA sections.
**Warning signs:** Rewriting sections that already work.

### Pitfall 6: Missing `export const dynamicParams = false`
**What goes wrong:** Unknown slugs render as empty pages instead of 404s.
**Why it happens:** Forgetting to add `dynamicParams = false` to detail page routes.
**How to avoid:** Always add `export const dynamicParams = false` to service/sector detail pages since the slug set is finite and known.
**Warning signs:** Random URLs like `/services/anything` returning 200 instead of 404.

## Code Examples

### Service Data File Pattern
```typescript
// src/data/services.ts
// Source: Project-specific pattern for Toko Trading

export interface ServiceItem {
  slug: string;
  iconName: string; // Maps to lucide-react icon
  image: string;
  featureKeys: string[]; // Translation keys for features
  color: string; // Accent color for visual variety
}

export const services: ServiceItem[] = [
  {
    slug: 'import',
    iconName: 'Ship',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200',
    featureKeys: ['customs', 'logistics', 'costOptimization', 'supplierSelection', 'qualityInspection'],
    color: 'blue',
  },
  {
    slug: 'export',
    iconName: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    featureKeys: ['marketResearch', 'buyerMatching', 'documentation', 'tradeFinance', 'regulatoryCompliance'],
    color: 'emerald',
  },
  {
    slug: 'sourcing',
    iconName: 'PackageCheck',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200',
    featureKeys: ['supplierAudit', 'qualityControl', 'priceNegotiation', 'sampleManagement', 'factoryVisits'],
    color: 'amber',
  },
  {
    slug: 'transit-trade',
    iconName: 'BarChart3',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
    featureKeys: ['transitRoutes', 'cisExpertise', 'compliance', 'warehousing', 'reExport'],
    color: 'rose',
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
```

### Sector Data File Pattern
```typescript
// src/data/sectors.ts

export interface SectorItem {
  slug: string;
  iconName: string;
  image: string;
  productKeys: string[]; // Translation keys for example products
}

export const sectors: SectorItem[] = [
  { slug: 'food', iconName: 'Wheat', image: '...', productKeys: ['grains', 'oils', 'dairy', 'spices'] },
  { slug: 'textile', iconName: 'Shirt', image: '...', productKeys: ['cotton', 'fabrics', 'garments', 'homeTextile'] },
  { slug: 'machinery', iconName: 'Cog', image: '...', productKeys: ['industrial', 'agricultural', 'construction', 'packaging'] },
  { slug: 'chemicals', iconName: 'FlaskConical', image: '...', productKeys: ['industrial', 'agricultural', 'cosmetic', 'cleaning'] },
  { slug: 'construction', iconName: 'Building2', image: '...', productKeys: ['steel', 'cement', 'ceramics', 'fittings'] },
  { slug: 'raw-materials', iconName: 'Mountain', image: '...', productKeys: ['metals', 'minerals', 'polymers', 'lumber'] },
  { slug: 'electronics', iconName: 'Cpu', image: '...', productKeys: ['components', 'consumer', 'industrial', 'telecom'] },
  { slug: 'automotive', iconName: 'Car', image: '...', productKeys: ['parts', 'accessories', 'tires', 'fluids'] },
];

export function getSectorBySlug(slug: string): SectorItem | undefined {
  return sectors.find((s) => s.slug === slug);
}
```

### Dynamic Route with next-intl Pattern
```typescript
// src/app/[locale]/services/[slug]/page.tsx
// Source: Next.js 16 docs + next-intl 4.8 patterns

import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { services, getServiceBySlug } from '@/data/services';
import { PageHero } from '@/components/common/page-hero';
import { ScrollReveal } from '@/components/common/scroll-reveal';

// Only generate pages for known service slugs
// Locale params come from parent [locale]/layout.tsx generateStaticParams
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `ServiceDetail` });
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.metaDescription`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations('ServiceDetail');

  return (
    <>
      <PageHero
        title={t(`${slug}.title`)}
        subtitle={t(`${slug}.subtitle`)}
        backgroundImage={service.image}
      />
      {/* Content sections... */}
    </>
  );
}
```

### Breadcrumb Component Pattern
```typescript
// src/components/common/breadcrumb.tsx
import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop on next/image | `preload` prop on next/image | Next.js 16 | Use `preload` for above-fold hero images |
| HSL color space | oklch color space | Tailwind v4 + shadcn v4 | Already implemented in Phase 1 globals.css |
| `unstable_setRequestLocale` | `setRequestLocale` | next-intl 4.x | Already using stable API in existing pages |
| Nested getTranslations per component | Single getTranslations per page, pass props | next-intl best practice | Reduces waterfall server requests |
| getStaticPaths (Pages Router) | generateStaticParams (App Router) | Next.js 13+ | Already using App Router pattern |

**Deprecated/outdated:**
- `priority` prop on next/image: Replaced by `preload` in Next.js 16. Use `preload` for hero images.
- `unstable_setRequestLocale`: Now stable as `setRequestLocale` in next-intl 4.x (already used correctly in the codebase).

## Open Questions

1. **Service/sector count and content depth**
   - What we know: Phase 1 established 4 services (import, export, sourcing, transit trade) and 4 sectors (construction, machinery, food, raw materials)
   - What's unclear: Are 4 sectors enough, or should we expand? The requirements say "food, textile, machinery, chemicals, etc." suggesting more
   - Recommendation: Expand to 6-8 sectors to match business reality. The planner should define the exact list. Include at minimum: food, textile, machinery, chemicals, construction, raw materials (6 core sectors)

2. **Image sourcing strategy**
   - What we know: fal.ai API key is available. Unsplash is already configured in next.config.ts
   - What's unclear: Should we generate custom images now or use Unsplash placeholders?
   - Recommendation: Use high-quality Unsplash images for Phase 2 (faster, no API dependency). fal.ai can be used in a later pass to generate custom branded imagery if desired

3. **Russia transit trade page URL slug**
   - What we know: Must be a dedicated landing page with Russian-language priority
   - What's unclear: Best URL structure -- `/russia-transit`, `/transit-trade-russia`, or localized slugs?
   - Recommendation: Use `/russia-transit` as the URL slug across all locales (consistent, SEO-friendly). Localized URL slugs are a v2 feature (ECNT-02)

4. **References page data**
   - What we know: Per PROJECT.md, reference data is limited -- "many past deals done through intermediaries"
   - What's unclear: What actual reference data exists to display
   - Recommendation: Design the references page as flexible: industry sector icons, aggregate stats (countries, transactions), testimonial-style quotes (can be anonymized). Use placeholder data that the business owner can replace

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 + jsdom 28.1.0 |
| Config file | vitest.config.ts (exists at project root) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PAGE-01 | Homepage renders all sections with translations | unit | `npx vitest run src/__tests__/homepage.test.tsx -x` | No -- Wave 0 |
| PAGE-02 | About page renders history, vision, mission, values | unit | `npx vitest run src/__tests__/about-page.test.tsx -x` | No -- Wave 0 |
| PAGE-03 | Services overview lists all service categories | unit | `npx vitest run src/__tests__/services-page.test.tsx -x` | No -- Wave 0 |
| PAGE-04 | Service detail pages render for each slug | unit | `npx vitest run src/__tests__/service-detail.test.tsx -x` | No -- Wave 0 |
| PAGE-05 | Sectors overview shows all industries | unit | `npx vitest run src/__tests__/sectors-page.test.tsx -x` | No -- Wave 0 |
| PAGE-06 | Sector detail pages render for each slug | unit | `npx vitest run src/__tests__/sector-detail.test.tsx -x` | No -- Wave 0 |
| PAGE-07 | References page renders flexible layout | unit | `npx vitest run src/__tests__/references-page.test.tsx -x` | No -- Wave 0 |
| PAGE-08 | Russia transit page renders with specialized content | unit | `npx vitest run src/__tests__/russia-transit.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/homepage.test.tsx` -- covers PAGE-01
- [ ] `src/__tests__/about-page.test.tsx` -- covers PAGE-02
- [ ] `src/__tests__/services-page.test.tsx` -- covers PAGE-03
- [ ] `src/__tests__/service-detail.test.tsx` -- covers PAGE-04
- [ ] `src/__tests__/sectors-page.test.tsx` -- covers PAGE-05
- [ ] `src/__tests__/sector-detail.test.tsx` -- covers PAGE-06
- [ ] `src/__tests__/references-page.test.tsx` -- covers PAGE-07
- [ ] `src/__tests__/russia-transit.test.tsx` -- covers PAGE-08

Note: Existing Phase 1 tests (49 tests across 8 files) must continue to pass. Phase 2 tests should follow the same mocking patterns established in Phase 1 (mock next/server, next-intl, next/navigation).

## Sources

### Primary (HIGH confidence)
- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Dynamic route static generation, multiple segment patterns, dynamicParams config
- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Per-page metadata for SEO
- [Next.js Image Component docs](https://nextjs.org/docs/app/api-reference/components/image) - Image optimization, preload (replaces priority), blur placeholder
- [next-intl routing setup](https://next-intl.dev/docs/routing/setup) - Locale routing with dynamic segments
- Project codebase analysis - All existing files examined for patterns, conventions, and current state

### Secondary (MEDIUM confidence)
- [B2B Website Design Best Practices 2025](https://www.trajectorywebdesign.com/blog/b2b-website-design-best-practices) - Service page section structure, trust signals, CTA placement
- [fal.ai API documentation](https://fal.ai/) - Image generation capabilities for future enhancement

### Tertiary (LOW confidence)
- None -- all findings verified against official docs or codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Already installed and verified in Phase 1, no new dependencies needed
- Architecture: HIGH - Patterns directly derived from Next.js 16 and next-intl 4.8 official docs, verified against existing codebase
- Pitfalls: HIGH - Identified from codebase analysis (hardcoded strings, inconsistent images) and Next.js dynamic route documentation
- Content structure: MEDIUM - Service/sector list and page sections are based on requirements and B2B best practices, but exact content depth depends on business input

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable -- no rapidly evolving dependencies)
