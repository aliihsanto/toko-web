# Phase 5: Blog System - Research

**Researched:** 2026-03-10
**Domain:** MDX blog infrastructure with Velite, multi-locale content, Next.js 16 static generation
**Confidence:** HIGH

## Summary

The blog system for Toko Trading requires an MDX-based content pipeline using Velite v0.3.1 as the content processing layer, integrated with Next.js 16.1.6 (which uses Turbopack by default). Velite provides type-safe content schemas via Zod, built-in table of contents generation (`s.toc()`), reading time extraction (`s.metadata()`), and MDX compilation (`s.mdx()`) -- all critical for BLOG-01 through BLOG-05.

The primary integration challenge is that Next.js 16 defaults to Turbopack, which is incompatible with webpack plugins. The standard `VeliteWebpackPlugin` approach will fail. The Velite docs recommend a `process.argv` detection approach, but Next.js 16 changed behavior so that `process.argv` no longer includes `'dev'` during `next dev`. The fix is to use `process.env.NODE_ENV === 'development'` instead, as explicitly recommended in the Next.js 16 upgrade guide.

**Primary recommendation:** Use Velite with the `NODE_ENV` detection pattern in `next.config.ts`, organize content as `content/blog/{locale}/{slug}.mdx`, use `@shikijs/rehype` for code highlighting, and implement pagination via path-based routes (`/blog/page/[page]`) rather than searchParams to preserve static generation.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BLOG-01 | MDX-based blog infrastructure with Velite -- posts organized by locale | Velite v0.3.1 with `s.mdx()`, `s.toc()`, `s.metadata()` schemas; content in `content/blog/{locale}/*.mdx`; NODE_ENV-based integration with next.config.ts |
| BLOG-02 | Blog listing page with pagination, showing post title, excerpt, date, category | Path-based pagination (`/blog/page/[page]`) for static generation; `s.excerpt()` for summaries; `generateStaticParams` for all page/locale combos |
| BLOG-03 | Blog detail page with full MDX content rendering, table of contents, reading time | `s.toc()` generates TOC from headings; `s.metadata()` provides readingTime + wordCount; MDXContent component using `react/jsx-runtime` |
| BLOG-04 | Blog categories/tags for filtering (import, export, customs, regulations, etc.) | Category defined in frontmatter schema; separate Velite collection for categories (YAML); filter posts by category on listing page |
| BLOG-05 | Seed content -- minimum 3-5 blog posts per locale at launch | 4 locales x 4 posts = 16 MDX files minimum; topics: import/export basics, customs regulations, Turkey trade advantages, sector insights |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| velite | 0.3.1 | Content processing (MDX to typed data) | Contentlayer successor, Zod-based schemas, built-in TOC/metadata/excerpt, active maintenance (750+ stars, Dec 2025 release) |
| @shikijs/rehype | 4.0.2 | Syntax highlighting in code blocks | Official Shiki rehype integration, build-time highlighting, VS Code theme ecosystem |
| shiki | 4.0.2 | Syntax highlighting engine | Powers @shikijs/rehype, required peer dependency |
| rehype-slug | 6.0.0 | Add IDs to headings for TOC links | Standard in MDX pipelines, enables anchor navigation |
| rehype-autolink-headings | 7.1.0 | Add clickable links to headings | Pairs with rehype-slug for heading navigation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-gfm | 4.0.1 | GitHub Flavored Markdown (tables, strikethrough, task lists) | Always -- blog content uses tables and formatting |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Velite | next-mdx-remote | next-mdx-remote does not manage content loading or provide type-safe schemas; requires manual file loading, no built-in TOC/metadata |
| Velite | contentlayer2 | Contentlayer2 is a community fork with uncertain maintenance; Velite is actively maintained and has feature parity |
| @shikijs/rehype | rehype-pretty-code | rehype-pretty-code (v0.14.3) wraps Shiki with extra features but adds bundle size; @shikijs/rehype is more direct |
| Path-based pagination | searchParams pagination | searchParams forces dynamic rendering in Next.js; path-based preserves static generation |

**Installation:**
```bash
npm install velite -D
npm install @shikijs/rehype shiki rehype-slug rehype-autolink-headings remark-gfm
```

## Architecture Patterns

### Recommended Project Structure
```
content/
  blog/
    tr/
      turkiye-ithalat-rehberi.mdx
      gumruk-islemleri-2026.mdx
      ...
    en/
      turkey-import-guide.mdx
      customs-procedures-2026.mdx
      ...
    fr/
      guide-importation-turquie.mdx
      procedures-douanieres-2026.mdx
      ...
    ru/
      rukovodstvo-po-importu-turtsiya.mdx
      tamozhennye-protsedury-2026.mdx
      ...
  categories/
    tr.yml
    en.yml
    fr.yml
    ru.yml
src/
  app/[locale]/
    blog/
      page.tsx              # Listing page (redirects to /blog/page/1 or shows page 1)
      [slug]/
        page.tsx            # Blog detail page
      page/
        [page]/
          page.tsx          # Paginated listing
  components/
    blog/
      mdx-content.tsx       # MDX renderer with custom components
      blog-card.tsx         # Post card for listing
      table-of-contents.tsx # Sticky TOC sidebar
      blog-pagination.tsx   # Pagination controls
      category-filter.tsx   # Category filter chips
  lib/
    blog/
      utils.ts             # getPostsByLocale, getPostBySlug, reading time helpers
```

### Pattern 1: Velite Configuration for Multi-Locale Blog
**What:** Define Velite collections with locale awareness via file path
**When to use:** Always -- this is the core content pipeline
**Example:**
```typescript
// velite.config.ts (project root)
import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    title: s.string().max(120),
    description: s.string().max(300),
    date: s.isodate(),
    published: s.boolean().default(true),
    category: s.string(),
    tags: s.array(s.string()).optional(),
    image: s.string().optional(),      // cover image URL
    imageAlt: s.string().optional(),
    slug: s.path(),                    // auto-generates from file path e.g. "blog/tr/my-post"
    body: s.mdx(),                     // compiled MDX function body
    toc: s.toc(),                      // auto-extracted table of contents
    metadata: s.metadata(),            // readingTime + wordCount
    excerpt: s.excerpt({ length: 200 }),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeShiki, { theme: 'github-light' }],
    ],
  },
});
```
Source: [Velite docs - Quick Start](https://velite.js.org/guide/quick-start), [Velite docs - MDX Support](https://velite.js.org/guide/using-mdx), [Velite docs - Code Highlighting](https://velite.js.org/guide/code-highlighting)

### Pattern 2: Next.js 16 Integration (Critical -- Turbopack Compatible)
**What:** Trigger Velite build from next.config.ts without webpack plugin
**When to use:** Required -- Next.js 16 uses Turbopack by default
**Example:**
```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// CRITICAL: Next.js 16 no longer exposes 'dev' in process.argv during next dev.
// Use NODE_ENV instead (recommended by Next.js 16 upgrade guide).
const isDev = process.env.NODE_ENV === 'development';
const isBuild = process.argv.includes('build');

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
```
Source: [Velite docs - With Next.js](https://velite.js.org/guide/with-nextjs), [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)

### Pattern 3: MDX Content Rendering Component
**What:** Client component that hydrates compiled MDX function body
**When to use:** Blog detail page for rendering post content
**Example:**
```typescript
// src/components/blog/mdx-content.tsx
import * as runtime from 'react/jsx-runtime';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

// Custom components injected into all MDX content
const sharedComponents = {
  // Override default HTML elements with styled versions
  h2: (props: any) => <h2 className="heading-serif text-2xl mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="heading-serif text-xl mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-4 text-muted-foreground" {...props} />,
  a: (props: any) => <a className="text-primary underline hover:no-underline" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  // Code blocks are already styled by @shikijs/rehype at build time
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
```
Source: [Velite docs - Using MDX](https://velite.js.org/guide/using-mdx)

### Pattern 4: Multi-Locale Post Retrieval
**What:** Helper functions to filter posts by locale from Velite output
**When to use:** All blog pages -- listing, detail, category filter
**Example:**
```typescript
// src/lib/blog/utils.ts
import { posts } from '@/.velite';

// Velite s.path() generates slugs like "blog/tr/my-post"
// Extract locale and slug from the path
export function getPostsByLocale(locale: string) {
  return posts
    .filter((post) => post.slug.startsWith(`blog/${locale}/`) && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(locale: string, slug: string) {
  return posts.find(
    (post) => post.slug === `blog/${locale}/${slug}` && post.published
  );
}

export function getPostSlug(post: { slug: string }) {
  // "blog/tr/my-post" -> "my-post"
  return post.slug.split('/').slice(2).join('/');
}

export function getPostsByCategory(locale: string, category: string) {
  return getPostsByLocale(locale).filter((post) => post.category === category);
}

export function getCategories(locale: string): string[] {
  const localePosts = getPostsByLocale(locale);
  return [...new Set(localePosts.map((p) => p.category))];
}

const POSTS_PER_PAGE = 9;

export function getPaginatedPosts(locale: string, page: number, category?: string) {
  let filtered = category
    ? getPostsByCategory(locale, category)
    : getPostsByLocale(locale);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: filtered.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: page,
  };
}
```

### Pattern 5: Path-Based Pagination with Static Generation
**What:** Use `[page]` dynamic route instead of searchParams for pagination
**When to use:** Blog listing page -- preserves static generation
**Example:**
```typescript
// src/app/[locale]/blog/page/[page]/page.tsx
import { routing } from '@/i18n/routing';
import { getPostsByLocale, getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/blog/utils';

export function generateStaticParams() {
  const params: { locale: string; page: string }[] = [];
  for (const locale of routing.locales) {
    const posts = getPostsByLocale(locale);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let i = 1; i <= Math.max(totalPages, 1); i++) {
      params.push({ locale, page: String(i) });
    }
  }
  return params;
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  const { posts, totalPages, currentPage } = getPaginatedPosts(locale, Number(page));
  // render listing...
}
```

### Pattern 6: Article Structured Data (extends existing JSON-LD infra)
**What:** Add `getArticleSchema` to the existing `structured-data.ts`
**When to use:** Blog detail page
**Example:**
```typescript
// Add to src/lib/seo/structured-data.ts
import type { WithContext, Article } from 'schema-dts';

export function getArticleSchema(opts: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  locale: string;
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    url: opts.url,
    image: opts.image,
    author: {
      '@type': 'Organization',
      name: 'Toko Trading',
      url: 'https://toko.com.tr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Toko Trading',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toko.com.tr/logo.png',
      },
    },
    inLanguage: opts.locale,
  };
}
```

### Anti-Patterns to Avoid
- **Using searchParams for pagination:** Forces dynamic rendering. Use path-based routes (`/blog/page/[page]`) instead.
- **Using VeliteWebpackPlugin with Next.js 16:** Turbopack is default; webpack plugins do not work. Use the `process.env.NODE_ENV` detection pattern.
- **Using `process.argv.includes('dev')` for Velite detection:** Broken in Next.js 16 -- `'dev'` is no longer in process.argv during `next dev`.
- **Importing MDX components inside MDX files:** Velite's `s.mdx()` does not bundle components at build time. Inject components at render time via the MDXContent component.
- **Storing locale in frontmatter instead of folder structure:** Folder-based locale (`content/blog/{locale}/`) is cleaner and lets `s.path()` auto-generate locale-aware slugs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| MDX compilation | Custom remark/rehype pipeline | Velite `s.mdx()` | Handles compilation, caching, incremental builds |
| Table of contents | Manual heading extraction with regex | Velite `s.toc()` | Uses mdast-util-toc, handles nesting correctly |
| Reading time | Manual word count / WPM calculation | Velite `s.metadata()` | Returns `{ readingTime, wordCount }` automatically |
| Excerpt generation | String slicing frontmatter | Velite `s.excerpt()` | Respects markdown, strips formatting, configurable length |
| Code highlighting | Prism.js or runtime highlighting | `@shikijs/rehype` at build time | Zero runtime JS, VS Code-quality highlighting |
| Content type safety | Manual TypeScript interfaces | Velite Zod schemas | Auto-generates types, validates at build time |
| Slug generation | Manual slugify utils | Velite `s.path()` | Auto-generates from file path, validates uniqueness |

**Key insight:** Velite handles the five hardest parts of a blog pipeline (MDX compilation, TOC, metadata, excerpts, type safety) through its schema system. Do not reimplement any of these.

## Common Pitfalls

### Pitfall 1: Next.js 16 Turbopack Breaks Webpack Plugins
**What goes wrong:** Build fails or Velite never runs because VeliteWebpackPlugin is silently ignored by Turbopack.
**Why it happens:** Next.js 16 defaults to Turbopack for both `next dev` and `next build`. Webpack plugins are not loaded.
**How to avoid:** Use the `process.env.NODE_ENV` detection pattern in `next.config.ts` (see Pattern 2 above). Do NOT use VeliteWebpackPlugin.
**Warning signs:** Content is empty, `.velite` directory not generated, import errors from `.velite`.

### Pitfall 2: process.argv 'dev' Not Detected in Next.js 16
**What goes wrong:** Velite does not start in development mode because `process.argv.includes('dev')` returns false.
**Why it happens:** Next.js 16 changed config loading -- config file is no longer loaded during the `next dev` CLI command phase. The `'dev'` string is not in `process.argv` when the config is evaluated.
**How to avoid:** Use `process.env.NODE_ENV === 'development'` instead. This is explicitly recommended in the [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).
**Warning signs:** Blog works in production build but not in development.

### Pitfall 3: .velite Directory Not in .gitignore
**What goes wrong:** Generated files pollute git history, merge conflicts.
**Why it happens:** Velite outputs to `.velite/` and `public/static/` -- both must be gitignored.
**How to avoid:** Add `.velite` and `public/static` to `.gitignore` immediately.
**Warning signs:** Large file changes in git status after build.

### Pitfall 4: TypeScript Cannot Find .velite Module
**What goes wrong:** `import { posts } from '@/.velite'` fails with "Cannot find module" error.
**Why it happens:** `.velite` is a generated directory -- TypeScript needs to know about it.
**How to avoid:** Velite generates `.velite/index.d.ts` automatically. The existing `@/*` path alias in tsconfig.json maps to `./src/*`, so the import should be `import { posts } from '#site/content'` or you need to add a specific path alias like `"#site/content": ["./.velite"]` to tsconfig.json paths. Alternatively, use a relative import or add `.velite` to the tsconfig paths.
**Warning signs:** TypeScript errors on import, no IntelliSense for post types.

### Pitfall 5: Pagination with searchParams Kills Static Generation
**What goes wrong:** Blog listing page becomes dynamically rendered, slower TTFB, no static HTML.
**Why it happens:** Using `searchParams` (e.g., `?page=2`) in a page component forces Next.js to render dynamically.
**How to avoid:** Use path-based pagination: `/blog/page/[page]` with `generateStaticParams`. The initial `/blog` page can show page 1 or redirect to `/blog/page/1`.
**Warning signs:** Blog listing shows "Dynamic" in `next build` output instead of "Static".

### Pitfall 6: Velite ESM-Only Requirement
**What goes wrong:** Build error related to module format.
**Why it happens:** Velite is ESM-only. The project must support ESM imports.
**How to avoid:** The project already uses `next.config.ts` (TypeScript, ESM compatible) and Next.js handles ESM. Use dynamic `import('velite')` in the config file to avoid static import issues.
**Warning signs:** "require is not defined" or "cannot use import statement" errors.

### Pitfall 7: rehype Plugin Order Matters
**What goes wrong:** TOC links don't work, heading IDs missing.
**Why it happens:** `rehype-autolink-headings` depends on IDs from `rehype-slug`. Order matters.
**How to avoid:** Always order: `rehypeSlug` first, then `rehypeAutolinkHeadings`, then `rehypeShiki`.
**Warning signs:** Headings have no `id` attribute, TOC links navigate to nowhere.

## Code Examples

### MDX Frontmatter Template
```mdx
---
title: "Turkey Import Guide 2026: Everything You Need to Know"
description: "Complete guide to importing goods from Turkey including customs procedures, documentation, and cost optimization strategies."
date: 2026-03-10
published: true
category: import
tags:
  - import
  - customs
  - turkey
image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=1200"
imageAlt: "Container ships at Istanbul port"
---

## Introduction

Turkey's strategic position between Europe and Asia...
```

### Table of Contents Component
```typescript
// src/components/blog/table-of-contents.tsx
// Velite s.toc() returns: { title: string; url: string; items: TocEntry[] }[]
interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (!toc.length) return null;
  return (
    <nav className="sticky top-24 space-y-2">
      <h4 className="heading-serif text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Table of Contents
      </h4>
      <ul className="space-y-1 text-sm">
        {toc.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <ul className="ml-4 mt-1 space-y-1">
                {item.items.map((sub) => (
                  <li key={sub.url}>
                    <a href={sub.url} className="text-muted-foreground/70 hover:text-primary text-xs transition-colors">
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Sitemap Integration for Blog Posts
```typescript
// Addition to existing src/app/sitemap.ts
import { posts } from '@/.velite'; // or '#site/content' with alias

// Inside sitemap() function, add:
const blogEntries = posts
  .filter((p) => p.published)
  .map((post) => {
    const slug = post.slug.split('/').slice(2).join('/'); // remove "blog/{locale}/"
    const locale = post.slug.split('/')[1]; // extract locale
    return makeEntry(`/blog/${slug}`, 0.7, 'weekly');
  });
// Note: since posts exist per locale, we need deduplication logic
// Only create one sitemap entry per unique slug (with hreflang alternates)
```

### TypeScript Path Alias for .velite
```json
// tsconfig.json -- add to compilerOptions.paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "#site/content": ["./.velite"]
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Contentlayer | Velite | 2024 (Contentlayer abandoned) | Velite is the direct successor with Zod schemas |
| next-mdx-remote manual loading | Velite auto-processing | 2024 | No manual file loading, type-safe by default |
| process.argv detection | NODE_ENV detection | Next.js 16 (Feb 2026) | process.argv.includes('dev') broken in Next.js 16 |
| VeliteWebpackPlugin | Programmatic Velite build | Next.js 16 (Feb 2026) | Turbopack default means webpack plugins don't run |
| middleware.ts | proxy.ts | Next.js 16 (Feb 2026) | Project still uses middleware.ts (deprecated, but still works) |
| searchParams pagination | Path-based pagination | Next.js 15+ (2024) | searchParams forces dynamic rendering |

**Deprecated/outdated:**
- Contentlayer: Abandoned, no longer maintained. Velite is the replacement.
- `process.argv.includes('dev')` in next.config: Broken in Next.js 16.
- `middleware.ts`: Deprecated in Next.js 16 (renamed to `proxy.ts`), but still functional. Not blocking for Phase 5.

## Open Questions

1. **Velite .velite import path alias**
   - What we know: Velite generates `.velite/index.js` and `.velite/index.d.ts`. The `@/*` alias maps to `./src/*`, not root.
   - What's unclear: Whether `import { posts } from '.velite'` works without an alias, or if we need a dedicated tsconfig path.
   - Recommendation: Add `"#site/content": ["./.velite"]` to tsconfig paths. This is a common convention from Velite examples. If that causes issues, use relative imports.

2. **Category localization strategy**
   - What we know: Categories like "import", "export", "customs" need display names in 4 languages.
   - What's unclear: Whether to store category display names in YAML collections or in the existing i18n message files.
   - Recommendation: Use the existing i18n message system (`src/messages/{locale}.json`) for category display names, and keep category slugs as language-neutral identifiers in frontmatter (e.g., `category: import`). This aligns with the existing project pattern where data uses slugs and display text comes from translations.

3. **Blog post cross-locale linking**
   - What we know: Each locale has its own posts with different slugs.
   - What's unclear: Whether a Turkish post and its English equivalent should be linked (e.g., for hreflang alternates on blog posts).
   - Recommendation: For v1, posts are independent per locale (no cross-linking). This simplifies content creation. Cross-locale linking can be added in v2 via an optional `translations` field in frontmatter.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | vitest.config.ts (exists, configured with jsdom + @/ alias) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements --> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BLOG-01 | Velite generates typed post data; posts importable from .velite | unit | `npx vitest run src/__tests__/blog-utils.test.ts -x` | Wave 0 |
| BLOG-02 | Blog listing shows posts with title, excerpt, date, category; pagination works | unit | `npx vitest run src/__tests__/blog-listing.test.ts -x` | Wave 0 |
| BLOG-03 | Blog detail renders MDX, shows TOC and reading time | unit | `npx vitest run src/__tests__/blog-detail.test.ts -x` | Wave 0 |
| BLOG-04 | Category filtering returns correct posts | unit | `npx vitest run src/__tests__/blog-categories.test.ts -x` | Wave 0 |
| BLOG-05 | Seed content exists: >= 3 posts per locale, all published | unit | `npx vitest run src/__tests__/blog-content.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test`
- **Per wave merge:** `npm test && npm run build`
- **Phase gate:** Full suite green + build passes before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/blog-utils.test.ts` -- covers BLOG-01 (Velite post utilities)
- [ ] `src/__tests__/blog-listing.test.ts` -- covers BLOG-02 (listing + pagination)
- [ ] `src/__tests__/blog-detail.test.ts` -- covers BLOG-03 (MDX rendering, TOC, reading time)
- [ ] `src/__tests__/blog-categories.test.ts` -- covers BLOG-04 (category filtering)
- [ ] `src/__tests__/blog-content.test.ts` -- covers BLOG-05 (seed content validation)
- [ ] Mock setup for `.velite` imports in test environment

## Sources

### Primary (HIGH confidence)
- [Velite docs - Quick Start](https://velite.js.org/guide/quick-start) -- installation, schema types, CLI
- [Velite docs - With Next.js](https://velite.js.org/guide/with-nextjs) -- integration patterns, webpack plugin, process.argv approach
- [Velite docs - Using MDX](https://velite.js.org/guide/using-mdx) -- MDX schema, rendering component, custom components
- [Velite docs - Velite Schemas](https://velite.js.org/guide/velite-schemas) -- s.toc(), s.metadata(), s.excerpt(), s.path(), s.mdx() full API
- [Velite docs - Code Highlighting](https://velite.js.org/guide/code-highlighting) -- @shikijs/rehype integration, theme config
- [Velite docs - Configuration Reference](https://velite.js.org/reference/config) -- defineConfig options, output, MDX plugins
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- Turbopack default, process.argv change, NODE_ENV recommendation
- [Velite GitHub](https://github.com/zce/velite) -- v0.3.1, 750+ stars, active maintenance (Dec 2025)
- npm registry -- verified versions: velite 0.3.1, @shikijs/rehype 4.0.2, shiki 4.0.2, rehype-slug 6.0.0, rehype-autolink-headings 7.1.0, remark-gfm 4.0.1

### Secondary (MEDIUM confidence)
- [Velite Next.js Example](https://velite.js.org/examples/nextjs) -- reference implementation
- [Velite GitHub Discussion #274](https://github.com/zce/velite/discussions/274) -- Next.js 15/16 compatibility discussion
- [Velite integration blog post](https://nooc.me/en/posts/integrate-a-blog-in-nextjs-with-velite) -- practical guide with categories and TOC
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) -- Article/BlogPosting types for structured data
- [rehype-pretty-code docs](https://rehype-pretty.pages.dev/) -- alternative code highlighting reference

### Tertiary (LOW confidence)
- [Contentlayer alternatives comparison](https://www.wisp.blog/blog/contentlayer-has-been-abandoned-what-are-the-alternatives) -- ecosystem comparison (community blog, 2024)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified via npm, versions confirmed, Velite docs thoroughly reviewed
- Architecture: HIGH -- patterns derived from official Velite examples and Next.js docs; Next.js 16 Turbopack caveat verified directly from official upgrade guide
- Pitfalls: HIGH -- Next.js 16 process.argv issue confirmed in official docs; Turbopack/webpack incompatibility confirmed by build test showing "Next.js 16.1.6 (Turbopack)"

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (Velite stable, Next.js 16 stable; 30-day validity)
