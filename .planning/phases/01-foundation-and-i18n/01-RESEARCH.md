# Phase 1: Foundation and i18n - Research

**Researched:** 2026-03-10
**Domain:** Next.js App Router i18n, Design System, Responsive Layout
**Confidence:** HIGH

## Summary

Phase 1 establishes the entire project foundation: Next.js App Router with 4-language routing (TR/EN/FR/RU), a design system with dark/light themes, responsive header/footer layout, and the component library. This is greenfield -- no existing code. The stack is well-established: **next-intl** for i18n (the dominant App Router i18n library with ~2KB bundle, native Server Component support, built-in middleware routing), **shadcn/ui** with Tailwind CSS for components, **next-themes** for dark/light mode, and **Framer Motion** for animations.

The primary risk is getting the i18n routing structure wrong, since every subsequent phase builds on top of it. next-intl's `[locale]` dynamic segment pattern with middleware-based language detection is the standard approach and is confirmed compatible with Next.js 15+. The Inter variable font covers Latin and Cyrillic scripts, satisfying the Russian language requirement.

**Primary recommendation:** Use next-intl with `[locale]` App Router segment, shadcn/ui with Tailwind CSS v4, next-themes for dark/light mode, and Framer Motion for animations. Establish all i18n patterns (routing, message files, middleware) before building any UI components.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Primary color: dark navy blue -- trust, professionalism, corporate identity
- Dark/light theme toggle -- user can switch, respect system preference
- Text-based logo: "TOKO" -- clean, classy, SVG + PNG, stored in /public/images/logo/
- Primary font: Inter variable font (400, 500, 600, 700 weights) -- supports Latin + Cyrillic
- Header: large on page load, shrinks and becomes sticky on scroll
- CTA button in header: localized "Contact Us" per language
- Mobile: hamburger menu with full-screen or slide-in drawer
- Footer: 4 columns (About, Services, Blog, Contact), social media, address, copyright
- Default language: Turkish; browser Accept-Language auto-detection on first visit
- URL structure: /tr/, /en/, /fr/, /ru/ prefixes
- Cookie persistence for language choice
- Fallback: Turkish if translation missing
- Animations: subtle scroll-triggered fade-in, hover transitions, smooth page transitions
- Use Framer Motion / Motion library

### Claude's Discretion
- Exact menu item count and dropdown structure
- Language switcher visual design (flags/text/icons)
- Exact color palette shades (dark blue primary + complementary accent)
- Component library setup details (shadcn/ui configuration)
- Loading states and skeleton design
- Exact spacing scale and breakpoints
- Footer column arrangement and content balance

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| I18N-01 | 4 languages with URL prefix routing (/tr/, /en/, /fr/, /ru/) | next-intl routing with `[locale]` segment + defineRouting config |
| I18N-02 | Middleware auto-detects browser language and redirects | next-intl createMiddleware with localeDetection, Accept-Language header parsing |
| I18N-03 | Language switcher in header on any page | next-intl useLocale + Link component with locale prop, or useRouter + usePathname |
| I18N-04 | All static UI text translated to all 4 languages | JSON message files per locale, useTranslations hook for client, getTranslations for server |
| I18N-05 | Correct hreflang tags on all pages | next-intl generateMetadata with alternates.languages, or manual hreflang in layout head |
| UX-01 | Modern corporate design | shadcn/ui + Tailwind CSS with custom navy blue theme, Inter font |
| UX-02 | Fully responsive layout | Tailwind responsive utilities (sm/md/lg/xl breakpoints), mobile-first approach |
| UX-03 | Consistent navigation with logo, menu, language switcher, CTA | Shared Header component in `[locale]/layout.tsx` with sticky-on-scroll behavior |
| UX-04 | Footer with company info, links, contact, social | Shared Footer component in `[locale]/layout.tsx`, 4-column responsive grid |
| UX-05 | Dark/light color scheme | next-themes ThemeProvider + shadcn/ui CSS variables, system preference detection |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x | React framework, App Router, SSG/SSR | Project constraint, Vercel-native |
| react / react-dom | 19.x | UI library | Paired with Next.js 15 |
| next-intl | 3.x | i18n routing, messages, middleware | Dominant App Router i18n lib, ~2KB, Server Component native |
| typescript | 5.x | Type safety | Project constraint |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss | 4.x | Utility-first CSS | All styling, responsive design |
| shadcn/ui | latest (CLI) | Component primitives | Buttons, dropdowns, sheets, navigation menu |
| next-themes | 0.4.x | Dark/light mode | Theme toggle, system preference |
| framer-motion | 11.x | Animations | Scroll fade-in, page transitions, hover states |
| @next/font (next/font) | built-in | Font optimization | Inter variable font loading |
| lucide-react | latest | Icons | Menu, theme toggle, social media, language |
| class-variance-authority | latest | Component variants | shadcn/ui dependency, variant styling |
| clsx + tailwind-merge | latest | Class merging | cn() utility for conditional classes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | i18next + react-i18next | i18next is heavier, no built-in App Router routing/middleware |
| shadcn/ui | Radix UI directly | shadcn gives styled defaults + copy-paste ownership |
| Framer Motion | CSS animations | Framer gives declarative API, exit animations, layout animations |
| next-themes | Custom implementation | next-themes handles SSR hydration, flash prevention, system detection |

**Installation:**
```bash
npx create-next-app@latest toko-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install next-intl framer-motion next-themes
npx shadcn@latest init
npx shadcn@latest add button dropdown-menu sheet navigation-menu
npm install lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── [locale]/              # i18n dynamic segment (ALL pages under here)
│   │   ├── layout.tsx         # Root locale layout (ThemeProvider, Header, Footer)
│   │   ├── page.tsx           # Homepage
│   │   └── not-found.tsx      # 404 page
│   ├── layout.tsx             # Root layout (html, body, font loading)
│   └── not-found.tsx          # Root 404
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated)
│   ├── layout/
│   │   ├── header.tsx         # Header with shrink-on-scroll
│   │   ├── mobile-nav.tsx     # Mobile hamburger drawer
│   │   ├── footer.tsx         # 4-column footer
│   │   ├── language-switcher.tsx
│   │   └── theme-toggle.tsx
│   └── common/                # Shared components
├── i18n/
│   ├── routing.ts             # defineRouting config (locales, defaultLocale)
│   ├── request.ts             # getRequestConfig (message loading)
│   └── navigation.ts          # createNavigation (Link, useRouter, usePathname)
├── messages/
│   ├── tr.json                # Turkish translations
│   ├── en.json                # English translations
│   ├── fr.json                # French translations
│   └── ru.json                # Russian translations
├── lib/
│   ├── utils.ts               # cn() helper, shared utilities
│   └── fonts.ts               # Inter font configuration
├── styles/
│   └── globals.css            # Tailwind directives, CSS variables, theme colors
├── middleware.ts               # next-intl middleware (locale detection + routing)
└── types/
    └── index.ts               # Shared TypeScript types
```

### Pattern 1: next-intl Routing Setup
**What:** Define locales, default locale, and create middleware for automatic locale detection and prefix routing.
**When to use:** Foundation -- set up once, used by everything.
**Example:**
```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en', 'fr', 'ru'],
  defaultLocale: 'tr',
  localeDetection: true,  // Auto-detect from Accept-Language
  localePrefix: 'always'  // Always show /tr/, /en/, etc.
});

// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(tr|en|fr|ru)/:path*']
};
```

### Pattern 2: Message Files Structure
**What:** Flat JSON files per locale with nested namespaces for organization.
**When to use:** All UI text.
**Example:**
```json
// messages/tr.json
{
  "Header": {
    "nav": {
      "home": "Ana Sayfa",
      "about": "Hakkimizda",
      "services": "Hizmetler",
      "sectors": "Sektorler",
      "blog": "Blog",
      "contact": "Iletisim"
    },
    "cta": "Iletisime Gec"
  },
  "Footer": {
    "about": "Hakkimizda",
    "services": "Hizmetler",
    "blog": "Blog",
    "contact": "Iletisim",
    "copyright": "2026 Toko Trading. Tum haklari saklidir."
  },
  "LanguageSwitcher": {
    "tr": "Turkce",
    "en": "English",
    "fr": "Francais",
    "ru": "Russkiy"
  }
}
```

### Pattern 3: Layout with Locale
**What:** Root locale layout provides translations, theme, header, and footer to all pages.
**When to use:** The `[locale]/layout.tsx` file.
**Example:**
```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
```

### Pattern 4: Shrink-on-Scroll Header
**What:** Header is large initially, becomes compact and sticky when user scrolls past threshold.
**When to use:** The header component (client component).
**Example:**
```typescript
// src/components/layout/header.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'py-2 bg-background/95 backdrop-blur shadow-sm' : 'py-6 bg-background'
      )}
    >
      {/* Logo, nav, language switcher, theme toggle, CTA */}
    </motion.header>
  );
}
```

### Pattern 5: Language Switcher
**What:** Dropdown that switches locale while preserving current path.
**When to use:** Header and footer.
**Example:**
```typescript
'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    // Cookie is set automatically by next-intl middleware
  }

  return (
    // Dropdown with locale options
  );
}
```

### Pattern 6: Dark/Light Theme with CSS Variables
**What:** shadcn/ui uses CSS variables for theming; next-themes toggles a `class` on `<html>`.
**When to use:** globals.css + ThemeProvider setup.
**Example:**
```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --primary: 222 47% 20%;      /* Dark navy blue */
    --primary-foreground: 210 40% 98%;
    /* ... other shadcn variables */
  }
  .dark {
    --background: 222 47% 5%;
    --foreground: 210 40% 98%;
    --primary: 217 91% 60%;      /* Lighter blue for dark mode contrast */
    --primary-foreground: 222 47% 11%;
    /* ... other shadcn variables */
  }
}
```

### Anti-Patterns to Avoid
- **Hardcoding text strings:** Never put user-visible text directly in components; always use translation keys via `useTranslations()` or `getTranslations()`.
- **Forgetting `setRequestLocale`:** Every page and layout in the `[locale]` segment must call `setRequestLocale(locale)` for static rendering to work.
- **Using `next/link` instead of next-intl Link:** Always import `Link` from `@/i18n/navigation` so locale prefixes are automatically handled.
- **Mixing Server/Client translation patterns:** Use `getTranslations()` in Server Components, `useTranslations()` in Client Components. Don't mix them.
- **Theme flash on load:** Must use `suppressHydrationWarning` on `<html>` element and next-themes script injection to prevent FOUC.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection | Custom Accept-Language parser | next-intl middleware | Handles negotiation, cookie persistence, redirect logic |
| Theme switching | Manual class toggle + localStorage | next-themes | Handles SSR hydration, system preference, flash prevention |
| Responsive drawer | Custom mobile menu | shadcn/ui Sheet component | Accessible, animated, handles focus trap |
| Dropdown menu | Custom dropdown | shadcn/ui DropdownMenu | Accessible, keyboard navigation, portal rendering |
| Font loading | Manual @font-face | next/font/google (Inter) | Automatic optimization, preloading, font-display |
| Class merging | String concatenation | cn() with clsx + tailwind-merge | Handles Tailwind class conflicts correctly |
| Scroll animations | IntersectionObserver boilerplate | Framer Motion whileInView | Declarative, handles cleanup, exit animations |

**Key insight:** This phase establishes patterns for 5 subsequent phases. Using standard solutions ensures consistency and reduces maintenance burden across the entire project lifecycle.

## Common Pitfalls

### Pitfall 1: Middleware Matcher Too Broad
**What goes wrong:** Middleware runs on static assets (_next/static, images), causing unnecessary redirects or broken resources.
**Why it happens:** Default matcher catches everything.
**How to avoid:** Use specific matcher pattern: `['/', '/(tr|en|fr|ru)/:path*']` and exclude `_next`, `api`, and static file extensions.
**Warning signs:** Images not loading, CSS broken, favicon missing.

### Pitfall 2: Static Rendering Breaks with i18n
**What goes wrong:** Pages render dynamically instead of statically, hurting performance.
**Why it happens:** Missing `generateStaticParams` or `setRequestLocale` calls.
**How to avoid:** Every `[locale]` layout and page must: (1) export `generateStaticParams` returning all locales, (2) call `setRequestLocale(locale)` at the top.
**Warning signs:** `next build` output shows "lambda" instead of "static" for pages.

### Pitfall 3: Translation File Structure Mismatch
**What goes wrong:** Runtime error "Could not resolve [key]" in production.
**Why it happens:** Translation keys exist in one locale file but are missing in another.
**How to avoid:** Use Turkish as the reference file; create all other locale files with identical key structure. Consider a lint script to validate key parity.
**Warning signs:** Console warnings about missing translations.

### Pitfall 4: Theme Color Flash (FOUC)
**What goes wrong:** Page briefly flashes in wrong theme before JS hydrates.
**Why it happens:** Server renders with no theme class; client adds it after hydration.
**How to avoid:** next-themes injects a blocking script that reads localStorage/system preference before paint. Ensure `suppressHydrationWarning` is on `<html>` and ThemeProvider has `attribute="class"`.
**Warning signs:** Brief white flash when loading dark-themed page.

### Pitfall 5: Header Scroll Jank
**What goes wrong:** Header shrink animation is janky or causes layout shift.
**Why it happens:** Changing header height without reserving space pushes content.
**How to avoid:** Use `fixed` positioning for header, add `pt-[header-height]` spacer to main content. Use CSS transitions (not JS-driven height changes) for smooth animation. Use `will-change: transform` sparingly.
**Warning signs:** Content jumps when scrolling past threshold.

### Pitfall 6: Cyrillic Font Not Loading
**What goes wrong:** Russian text renders in system fallback font.
**Why it happens:** Font subset doesn't include Cyrillic characters.
**How to avoid:** Inter variable font includes Cyrillic by default when loaded via `next/font/google` with `subsets: ['latin', 'cyrillic']`.
**Warning signs:** Russian page text looks different from other languages.

## Code Examples

### Root Layout (font loading + html setup)
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### hreflang Tags via generateMetadata
```typescript
// src/app/[locale]/layout.tsx (metadata export)
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://toko.com.tr/${locale}`,
      languages: {
        'tr': 'https://toko.com.tr/tr',
        'en': 'https://toko.com.tr/en',
        'fr': 'https://toko.com.tr/fr',
        'ru': 'https://toko.com.tr/ru',
      },
    },
  };
}
```

### Theme Toggle Component
```typescript
'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-i18next (Pages Router) | next-intl (App Router) | 2023-2024 | next-i18next does not support App Router; next-intl is the standard |
| Manual locale detection | next-intl middleware | 2023+ | Built-in Accept-Language negotiation + cookie persistence |
| CSS Modules for theming | Tailwind CSS v4 + CSS variables | 2024-2025 | Simpler theme system, better DX, smaller bundle |
| Custom component library | shadcn/ui (copy-paste) | 2023+ | Accessible defaults, full ownership, no version lock-in |
| React Spring / CSS animations | Framer Motion | 2022+ | Dominant React animation library, declarative API |
| next/font separate package | Built into next/font | Next.js 13+ | No extra install needed |

**Deprecated/outdated:**
- **next-i18next:** Does not work with App Router. Do not use.
- **@next/font:** Merged into `next/font` (built-in). No separate package needed.
- **Tailwind CSS v3 config:** v4 uses CSS-based configuration, not tailwind.config.js (though JS config still works).

## Open Questions

1. **next-intl cookie name and persistence**
   - What we know: next-intl middleware sets a cookie (NEXT_LOCALE) automatically when locale is detected or switched
   - What's unclear: Exact cookie configuration options (expiry, path, SameSite) in latest version
   - Recommendation: Default behavior is sufficient; verify cookie name during implementation

2. **Tailwind CSS v4 vs v3 with create-next-app**
   - What we know: Tailwind v4 uses CSS-based config; v3 uses JS config. create-next-app may scaffold either.
   - What's unclear: Which version create-next-app@latest scaffolds in March 2026
   - Recommendation: Accept whichever version is scaffolded; both work. If v3, use tailwind.config.ts. If v4, use @theme in CSS.

3. **shadcn/ui dark navy blue preset**
   - What we know: shadcn/ui ships default themes; custom colors require editing CSS variables
   - What's unclear: Exact HSL values for ideal dark navy blue that meets WCAG AA contrast in both light and dark modes
   - Recommendation: Start with shadcn "slate" or "zinc" base theme, customize --primary to navy blue HSL values. Test contrast ratios during implementation.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + @testing-library/react |
| Config file | vitest.config.ts (none -- see Wave 0) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --coverage` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-01 | 4 locales route correctly | integration | `npx vitest run src/__tests__/i18n-routing.test.ts -t "routing"` | No -- Wave 0 |
| I18N-02 | Middleware redirects based on Accept-Language | unit | `npx vitest run src/__tests__/middleware.test.ts` | No -- Wave 0 |
| I18N-03 | Language switcher changes locale | integration | `npx vitest run src/__tests__/language-switcher.test.tsx` | No -- Wave 0 |
| I18N-04 | All UI text translated in all 4 locales | unit | `npx vitest run src/__tests__/translations.test.ts` | No -- Wave 0 |
| I18N-05 | hreflang tags present for all locales | unit | `npx vitest run src/__tests__/metadata.test.ts` | No -- Wave 0 |
| UX-01 | Visual design renders correctly | manual-only | Manual browser inspection | N/A |
| UX-02 | Responsive at all breakpoints | manual-only | Manual browser resize / dev tools | N/A |
| UX-03 | Header has logo, nav, switcher, CTA | smoke | `npx vitest run src/__tests__/header.test.tsx` | No -- Wave 0 |
| UX-04 | Footer has all 4 columns | smoke | `npx vitest run src/__tests__/footer.test.tsx` | No -- Wave 0 |
| UX-05 | Dark/light toggle works | integration | `npx vitest run src/__tests__/theme-toggle.test.tsx` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --coverage`
- **Phase gate:** Full suite green before /gsd:verify-work

### Wave 0 Gaps
- [ ] `vitest.config.ts` -- Vitest configuration with jsdom environment, path aliases
- [ ] `src/__tests__/setup.ts` -- Test setup file (testing-library, mocks for next-intl, next-themes)
- [ ] `src/__tests__/middleware.test.ts` -- covers I18N-02
- [ ] `src/__tests__/translations.test.ts` -- covers I18N-04 (validates key parity across locale files)
- [ ] `src/__tests__/header.test.tsx` -- covers UX-03
- [ ] `src/__tests__/footer.test.tsx` -- covers UX-04
- [ ] `src/__tests__/theme-toggle.test.tsx` -- covers UX-05
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`

## Sources

### Primary (HIGH confidence)
- [next-intl official docs - App Router setup](https://next-intl.dev/docs/getting-started/app-router) -- routing, middleware, message loading
- [next-intl routing setup](https://next-intl.dev/docs/routing/setup) -- defineRouting, createMiddleware, createNavigation
- [shadcn/ui dark mode docs](https://ui.shadcn.com/docs/dark-mode/next) -- next-themes integration pattern
- [shadcn/ui dark mode overview](https://ui.shadcn.com/docs/dark-mode) -- ThemeProvider setup

### Secondary (MEDIUM confidence)
- [Next.js 15 + shadcn + Tailwind CSS v4 setup guide (2025)](https://dev.to/darshan_bajgain/setting-up-2025-nextjs-15-with-shadcn-tailwind-css-v4-no-config-needed-dark-mode-5kl)
- [next-intl App Router i18n Guide (2026)](https://nextjslaunchpad.com/article/nextjs-internationalization-next-intl-app-router-i18n-guide)
- [next-intl guide for Next.js 15](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)

### Tertiary (LOW confidence)
- None -- all findings verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- next-intl, shadcn/ui, next-themes, Framer Motion are all well-documented, widely adopted, and confirmed compatible
- Architecture: HIGH -- `[locale]` segment pattern is the official next-intl recommendation and standard practice
- Pitfalls: HIGH -- documented in official next-intl troubleshooting and community guides
- Validation: MEDIUM -- test patterns are standard but greenfield project has no existing test infrastructure

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable ecosystem, 30-day validity)
