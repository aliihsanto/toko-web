# Stack Research

**Domain:** Multilingual corporate website with programmatic SEO (import/export trading company)
**Researched:** 2026-03-10
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.x | Full-stack React framework | Latest stable. App Router with generateStaticParams for programmatic SEO. ISR for content freshness without full rebuilds. Vercel-native deployment. Non-negotiable per project constraints. |
| TypeScript | 5.x | Type safety | Non-negotiable per project constraints. Catches i18n key errors, form schema mismatches, and MDX frontmatter issues at compile time. |
| React | 19.x | UI library | Ships with Next.js 16. Server Components reduce client bundle -- critical for an SEO-heavy site where performance = ranking. |

### Internationalization (i18n)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next-intl | 4.8.x | Routing, translations, locale detection | **The** i18n library for App Router in 2025-2026. ~2KB bundle. Native Server Component support -- translations rendered server-side add zero bytes to client bundle. Built-in middleware for browser language detection (Accept-Language header). Supports `[locale]` routing pattern. 4x npm download growth in 12 months. Replaces the deprecated Pages Router i18n config that App Router removed. |

**Confidence:** HIGH -- next-intl is the unanimous community and ecosystem standard for App Router i18n. Every credible 2025-2026 guide recommends it.

**Why not next-i18next:** Not compatible with App Router. Designed for Pages Router. Using it with App Router requires hacks and wrappers. Flat npm download trend confirms the ecosystem has moved on.

**Why not Intlayer:** Newer entrant, smaller community, less battle-tested. No compelling advantage over next-intl for this use case.

### Content Layer (MDX Blog)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Velite | 0.3.x | MDX/content processing, type-safe data layer | Turns MDX files into a typed data layer using Zod schemas. Handles frontmatter parsing, MDX compilation, and static asset copying. Successor to ContentLayer (abandoned). Framework-agnostic output (JSON + TypeScript definitions). Active development. |
| @mdx-js/react | 3.x | MDX React runtime | Required for custom component mapping in MDX content. |

**Confidence:** MEDIUM -- Velite is still v0.3 (pre-1.0), but it is the most actively maintained ContentLayer replacement and is used in production projects. The alternative (raw @next/mdx) requires significantly more manual work for frontmatter, content querying, and type safety. Accept the pre-1.0 risk because the functional stability is good and the API surface is small.

**Known issue:** Velite's Webpack plugin does not work with Turbopack. Use `--turbopack` flag only for dev if needed, but Velite integration requires Webpack mode. This is documented and has a clear workaround (disable Turbopack or use Velite's CLI build separately).

**Why not raw @next/mdx:** No content querying, no frontmatter parsing, no type safety on content collections. You would need to build all of that manually. Velite gives you ContentLayer-like DX without the abandoned project risk.

**Why not ContentLayer:** Abandoned. Maintainer scaled down to ~1 day/month. No Next.js 15/16 compatibility updates. Do not use for new projects.

### Programmatic SEO

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js generateStaticParams | built-in | Static page generation at scale | Core mechanism for programmatic pages. Define data sources (sectors, countries, HS codes, FAQs) and Next.js generates all pages at build time. Combined with `dynamicParams: true`, new pages can be generated on-demand via ISR. |
| Next.js sitemap.ts | built-in | Sitemap generation | Built-in file convention. Use `generateSitemaps()` to split into multiple sitemaps (Google limit: 50,000 URLs per sitemap). No external dependency needed. |
| Next.js robots.ts | built-in | robots.txt generation | Built-in file convention. Programmatically generate robots.txt with sitemap references. |
| schema-dts | 1.x | TypeScript types for JSON-LD | Google-maintained TypeScript definitions for Schema.org vocabulary. Type-safe structured data with zero runtime cost (types only). Use Organization, Article, FAQPage, BreadcrumbList schemas. |

**Confidence:** HIGH -- All built-in Next.js features are stable and well-documented. schema-dts is maintained by Google with 100k+ weekly npm downloads.

**Why not next-sitemap:** Abandoned (last published 3 years ago, v4.2.3). Next.js built-in sitemap.ts does everything next-sitemap did, natively. Do not add this dependency.

**Why not next-seo:** Unnecessary with App Router. Next.js has built-in `metadata` export and `generateMetadata()` function that fully replace next-seo. Adding next-seo on top is redundant abstraction.

### Form Handling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React Hook Form | 7.71.x | Form state management | Industry standard. Minimal re-renders, uncontrolled components by default. Works with Server Actions via `action` prop on forms. 8,600+ dependent npm projects. |
| Zod | 3.24.x | Schema validation | Use Zod v3 (not v4) for this project. Shared schemas between client validation and Server Action validation -- single source of truth. |
| @hookform/resolvers | 5.x | Bridges RHF and Zod | Connects React Hook Form to Zod for automatic form validation. zodResolver handles the integration. |

**Confidence:** HIGH -- React Hook Form + Zod is the dominant form handling pattern in the Next.js ecosystem.

**IMPORTANT: Use Zod v3, not v4.** Zod v4 (4.3.x) has documented TypeScript compatibility issues with @hookform/resolvers. While resolvers v5.2.2 claims Zod v4 support, multiple GitHub issues report TypeScript errors when importing from `zod/v4`. Zod v3 (3.24.x) is fully stable, fully compatible, and has no known issues. The performance improvements in v4 are irrelevant for form validation schemas. Migrate to Zod v4 later when the ecosystem stabilizes.

### Email

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Resend | 6.9.x | Email sending API | Purpose-built for developers. Simple API, excellent Next.js integration. Works directly in Server Actions with `use server`. Free tier: 100 emails/day (sufficient for lead-gen forms). Same creator as React Email. Domain verification included. |
| @react-email/components | 0.x | Email template components | Build email templates as React components. Type-safe, preview-able in dev. Renders to cross-client-compatible HTML. Natural fit with Resend (same team). |

**Confidence:** HIGH -- Resend is the standard email API for Next.js projects. Official Vercel template exists. Co-founder created React Email.

**Why not Nodemailer:** Requires SMTP server configuration. More infrastructure to manage. Resend abstracts this away. Only use Nodemailer if you need to self-host email sending (e.g., if you move off Vercel to your own server and want zero external dependencies).

**Fallback plan:** If Resend's free tier is insufficient or you self-host, Nodemailer + an SMTP provider (e.g., Brevo, Mailgun) is the proven fallback. The Server Action pattern stays the same -- only the sending implementation changes.

### Styling & UI

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind CSS | 4.2.x | Utility-first CSS | Latest v4.2 (Feb 2026). 5x faster full builds, 100x faster incremental builds. CSS-first configuration via `@theme` blocks -- no JavaScript config file needed. OKLCH color system for consistent corporate branding. Zero-runtime, works perfectly with Server Components. |
| shadcn/ui | latest (CLI v4) | Pre-built accessible components | Not a dependency -- components are copied into your project and fully owned. Built on Radix UI primitives (accessible by default). March 2026 CLI v4 release with design system presets. Copy what you need: Button, Dialog, Form, Select, Sheet, NavigationMenu, Card, etc. |
| Radix UI | latest | Headless accessible primitives | Installed as peer dependency of shadcn/ui components. Provides keyboard navigation, screen reader support, focus management. Critical for form components and navigation menus. |
| lucide-react | latest | Icon library | Default icon set for shadcn/ui. 1000+ icons, tree-shakable, fully typed React components. Clean, professional aesthetic fits corporate design. |

**Confidence:** HIGH -- Tailwind CSS v4 + shadcn/ui is the dominant styling pattern for Next.js in 2025-2026. This is not a trend -- it is the established standard.

**Why not Chakra UI / MUI / Mantine:** These are full component libraries with their own runtime CSS-in-JS. They add bundle weight, conflict with Server Components, and lock you into their design system. shadcn/ui gives you accessible primitives that you fully own and style with Tailwind -- no vendor lock-in.

### Animation (Optional)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Motion | 12.35.x | Page transitions, scroll animations, micro-interactions | Formerly Framer Motion. 18M+ monthly npm downloads. Declarative API for scroll-triggered animations (useful for corporate landing sections), layout transitions, and page transitions. Hybrid engine uses native browser APIs for 120fps performance. Import from `motion/react`. |

**Confidence:** HIGH -- Motion is the industry standard for React animation. Use sparingly for a corporate site -- subtle entrance animations, smooth scroll reveals, and page transitions. Not a core dependency; add when building the UI layer.

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.x | Conditional class merging | Used by shadcn/ui internally. Compose Tailwind classes conditionally. |
| tailwind-merge | 3.x | Tailwind class conflict resolution | Used by shadcn/ui's `cn()` utility. Prevents class conflicts (e.g., `p-4 p-2` resolves to `p-2`). |
| class-variance-authority | 0.7.x | Component variant management | Used by shadcn/ui for component variants (size, color, state). Create typed component APIs. |
| sharp | 0.33.x | Image optimization | Next.js Image component uses sharp for server-side image optimization. Installed automatically but verify it is present for production builds. |
| rehype-pretty-code | 0.14.x | Code syntax highlighting in MDX | If blog posts contain code examples. Uses Shiki under the hood. Add as rehype plugin to Velite's MDX config. |
| reading-time | 1.5.x | Blog reading time estimation | Calculate "5 min read" for blog posts. Integrate into Velite's content processing. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code linting | Next.js includes eslint-config-next. Add @typescript-eslint for stricter checks. |
| Prettier | Code formatting | Use prettier-plugin-tailwindcss for automatic Tailwind class sorting. |
| next-intl CLI / VS Code extension | i18n key management | Helps detect missing translation keys across locales. |

## Installation

```bash
# Core framework
npx create-next-app@latest toko-web --typescript --tailwind --app --src-dir

# i18n
npm install next-intl

# Content / MDX
npm install velite @mdx-js/react

# Form handling
npm install react-hook-form zod@^3.24.0 @hookform/resolvers

# Email
npm install resend @react-email/components

# UI (shadcn/ui -- installs components via CLI, not npm)
npx shadcn@latest init
npx shadcn@latest add button card dialog form input select sheet navigation-menu textarea

# Icons (installed with shadcn/ui, but explicit for clarity)
npm install lucide-react

# Animation (add when building UI layer)
npm install motion

# SEO
npm install schema-dts

# Supporting
npm install clsx tailwind-merge class-variance-authority

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss @types/mdx
npm install -D rehype-pretty-code reading-time
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| next-intl | react-i18next + next-i18next | Never for App Router. Only if maintaining a Pages Router legacy project. |
| Velite | Raw @next/mdx | If you have fewer than 10 blog posts and do not need content querying, frontmatter parsing, or type safety. Velite adds ~5 min setup and saves hours of manual content infrastructure. |
| Resend | Nodemailer | If self-hosting on your own server and want zero external API dependencies. Requires SMTP provider configuration. |
| Tailwind CSS | CSS Modules | If the team has strong objections to utility-first CSS. CSS Modules work well with App Router but require more CSS authoring effort for responsive design. |
| shadcn/ui | Radix Themes | If you want a pre-styled component library without customization. Radix Themes provides opinionated defaults. shadcn/ui is better when you want full design control for a unique corporate brand. |
| Motion | CSS animations only | If animation needs are truly minimal (hover effects, simple transitions). Native CSS transitions + Tailwind's animate utilities may suffice. Motion is worth adding for scroll-triggered sections and page transitions. |
| Zod v3 | Zod v4 | When @hookform/resolvers TypeScript issues are fully resolved. Monitor the GitHub issue tracker. v4 offers better performance but the compatibility risk is not worth it today. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-i18next | Not compatible with App Router. Designed for Pages Router. | next-intl |
| ContentLayer | Abandoned. No maintainer. No Next.js 15/16 support. | Velite |
| next-sitemap | Abandoned (3 years since last publish). | Next.js built-in sitemap.ts + generateSitemaps() |
| next-seo | Redundant. App Router has built-in metadata API (generateMetadata, metadata export). | Next.js built-in metadata |
| Zod v4 | TypeScript compatibility issues with @hookform/resolvers. Multiple open GitHub issues. | Zod v3 (3.24.x) |
| styled-components / Emotion | CSS-in-JS libraries require client-side runtime. Incompatible with Server Components without workarounds. Adds bundle weight. | Tailwind CSS |
| Chakra UI / MUI | Heavy runtime, vendor lock-in, conflicts with Server Components. | shadcn/ui + Tailwind CSS |
| i18next (standalone) | Framework-agnostic, requires manual App Router integration. | next-intl (Next.js-native) |
| Nodemailer (as primary) | Requires SMTP config, more moving parts. | Resend (API-based, simpler) |

## Stack Patterns by Variant

**If page count grows beyond Vercel's build output limits (16,000 files):**
- Switch from full SSG to ISR with `dynamicParams: true`
- Pre-generate top traffic pages via `generateStaticParams()`
- Let remaining pages generate on-demand and cache via ISR
- This is the documented Vercel-recommended pattern for large sites

**If you need to self-host (fallback from Vercel):**
- Use `next start` on a Node.js server (e.g., Docker on VPS)
- ISR works but is limited to single-region without Vercel's edge cache
- Replace Resend with Nodemailer + SMTP provider
- All other stack choices remain the same

**If blog content volume grows significantly:**
- Velite handles hundreds of MDX files efficiently
- For 1000+ posts, consider adding a search library (e.g., Fuse.js for client-side, or Algolia for production-grade search)
- Content remains in MDX files -- no CMS migration needed

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 16.1.x | React 19.x | Ships together. Do not use React 18 with Next.js 16. |
| next-intl 4.8.x | Next.js 15.x, 16.x | Confirmed Next.js 16 compatibility. Uses middleware API. |
| Velite 0.3.x | Next.js 15.x, 16.x | Works via custom Webpack plugin. Does NOT work with Turbopack. |
| Tailwind CSS 4.2.x | Next.js 16.x | Uses @tailwindcss/postcss plugin. CSS-first config (no tailwind.config.js). |
| shadcn/ui CLI v4 | Tailwind CSS 4.x | Updated for v4 CSS-first config. Run `shadcn init` after Tailwind is configured. |
| Zod 3.24.x | @hookform/resolvers 5.x | Fully compatible. No known issues. |
| Zod 4.3.x | @hookform/resolvers 5.2.x | TypeScript issues reported. Functional but type errors may occur. Avoid for now. |
| Resend 6.9.x | Next.js 16.x | Works in Server Actions and API routes. |
| Motion 12.35.x | React 19.x | Import from `motion/react` (not `framer-motion`). |

## Sources

- [next-intl official docs (App Router)](https://next-intl.dev/docs/getting-started/app-router) -- i18n setup, middleware, routing (HIGH confidence)
- [Next.js official MDX guide](https://nextjs.org/docs/app/guides/mdx) -- @next/mdx setup and patterns (HIGH confidence)
- [Next.js generateSitemaps docs](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- built-in sitemap splitting (HIGH confidence)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) -- structured data implementation (HIGH confidence)
- [Next.js ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) -- ISR for programmatic pages (HIGH confidence)
- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- static page generation (HIGH confidence)
- [Velite introduction](https://velite.js.org/guide/introduction) -- MDX content layer setup (MEDIUM confidence -- pre-1.0)
- [Velite Next.js integration](https://velite.js.org/examples/nextjs) -- Webpack plugin config (MEDIUM confidence)
- [Resend Next.js docs](https://resend.com/docs/send-with-nextjs) -- email sending with Server Actions (HIGH confidence)
- [React Email](https://react.email) -- email template components (HIGH confidence)
- [Tailwind CSS v4.0 blog post](https://tailwindcss.com/blog/tailwindcss-v4) -- v4 features and config changes (HIGH confidence)
- [shadcn/ui changelog March 2026](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) -- CLI v4 features (HIGH confidence)
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) -- Google-maintained JSON-LD types (HIGH confidence)
- [Motion for React docs](https://motion.dev/docs/react) -- animation library setup (HIGH confidence)
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) -- form handling (HIGH confidence)
- [@hookform/resolvers Zod v4 issue](https://github.com/react-hook-form/resolvers/issues/813) -- TypeScript compatibility (HIGH confidence -- verified via GitHub issues)
- [Zod v4 release notes](https://zod.dev/v4) -- Zod v4 features and changes (HIGH confidence)
- [ContentLayer abandonment](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives) -- why to avoid ContentLayer (HIGH confidence)
- [next-sitemap npm](https://www.npmjs.com/package/next-sitemap) -- last published 3 years ago, abandoned (HIGH confidence)
- [Vercel Next.js deployment docs](https://vercel.com/docs/frameworks/full-stack/nextjs) -- deployment limits and ISR behavior (HIGH confidence)

---
*Stack research for: Toko Trading multilingual corporate website*
*Researched: 2026-03-10*
