# Phase 3: Forms and Lead Capture - Research

**Researched:** 2026-03-10
**Domain:** Form handling, email integration, spam protection, i18n validation
**Confidence:** HIGH

## Summary

Phase 3 transforms the Toko Trading website from an informational site into a lead-generation machine. The core challenge is building four distinct form types (contact, quote request, supply/sourcing, callback) that work across 4 languages with client+server validation, send email notifications via Resend, and resist spam through a layered defense of honeypot fields, rate limiting, and reCAPTCHA v3. A WhatsApp floating button provides an always-available alternative contact channel.

The recommended architecture uses react-hook-form + zod for client-side validation with shared schemas reused on the server inside Next.js Server Actions. Resend handles transactional email delivery. reCAPTCHA v3 runs invisibly via `react-google-recaptcha-v3`. Rate limiting uses a simple in-memory sliding window (no Redis needed for this traffic level). The existing shadcn/ui v4 component library provides Input, Textarea, Field, and Select components that integrate directly with react-hook-form's Controller pattern.

Form validation error messages are translated using next-intl by passing translation keys through zod's contextual error map feature, keeping validation schemas language-agnostic while displaying localized errors to users.

**Primary recommendation:** Use Server Actions for all form submissions with react-hook-form (client validation) + zod (shared schema) + Resend (email) + layered spam protection (honeypot + rate limit + reCAPTCHA v3).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FORM-01 | Contact form with name, email, subject, message -- validated client and server side | react-hook-form + zod shared schema, shadcn/ui Field/Input/Textarea, Server Actions with safeParse |
| FORM-02 | Quote request form with product/service details, quantity, destination country | Same form stack + Select component, form-specific zod schema |
| FORM-03 | Supply/sourcing request form with product name, specifications, quantity, target country | Same form stack, reuses form field components |
| FORM-04 | Callback request form with phone number, preferred time, brief subject | Same form stack, phone validation with zod regex |
| FORM-05 | All form submissions send email notification to Toko team via Resend | Resend SDK + React Email templates in Server Actions |
| FORM-06 | Spam protection with honeypot field, rate limiting, and reCAPTCHA v3 | Honeypot hidden field, in-memory rate limiter, react-google-recaptcha-v3 |
| FORM-07 | WhatsApp floating button on all pages linking to Toko's WhatsApp number | Custom component in locale layout, fixed positioning, WhatsApp API link |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.71 | Client-side form state management | Minimal re-renders, uncontrolled inputs, 25KB gzipped, dominant React form library |
| zod | ^3.24 (v3 import) | Schema validation (client + server) | Shared schemas between client/server, TypeScript-first, stable with @hookform/resolvers |
| @hookform/resolvers | ^5.2 | Bridges react-hook-form with zod | Official integration, zodResolver for automatic validation |
| resend | ^6.9 | Transactional email API | Developer-friendly, clean API, official Next.js support, Server Actions compatible |
| @react-email/components | ^0.0.31 | Email template components | JSX email templates, works with Resend's `react` parameter |
| react-google-recaptcha-v3 | ^1.10 | reCAPTCHA v3 client integration | Provider + hook pattern, invisible verification, TypeScript support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui field | v4 (CLI) | Form field composition | Install via `pnpm dlx shadcn@latest add field input textarea select` |
| next-intl | ^4.8 (existing) | Form validation i18n | Already installed, use `getTranslations` in Server Actions |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-hook-form | useActionState only (React 19) | Simpler but no real-time client validation, worse UX for complex forms |
| Zod v3 | Zod v4 (`zod/v4`) | v4 is faster but has reported @hookform/resolvers compatibility issues; v3 is battle-tested |
| Resend | Nodemailer + SMTP | Resend is simpler, no SMTP config, better DX, free tier sufficient |
| react-google-recaptcha-v3 | next-recaptcha-v3 | next-recaptcha-v3 is smaller but less maintained; react-google-recaptcha-v3 has broader adoption |
| In-memory rate limiter | @upstash/ratelimit + Redis | Redis overkill for a corporate site with <1000 daily visitors; in-memory is sufficient |

**Installation:**
```bash
npm install react-hook-form @hookform/resolvers zod resend @react-email/components react-google-recaptcha-v3
pnpm dlx shadcn@latest add field input textarea select label
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── [locale]/
│       ├── contact/page.tsx           # Existing -- replace placeholder with real form
│       ├── quote/page.tsx             # New -- quote request page
│       ├── sourcing/page.tsx          # New -- supply/sourcing request page
│       └── callback/page.tsx          # New -- callback request page
├── components/
│   ├── forms/
│   │   ├── contact-form.tsx           # Client component -- contact form
│   │   ├── quote-form.tsx             # Client component -- quote request form
│   │   ├── sourcing-form.tsx          # Client component -- sourcing request form
│   │   ├── callback-form.tsx          # Client component -- callback request form
│   │   ├── form-field.tsx             # Shared form field wrapper with i18n error display
│   │   ├── submit-button.tsx          # Shared submit button with pending state
│   │   └── form-success.tsx           # Shared success message component
│   ├── common/
│   │   └── whatsapp-button.tsx        # Floating WhatsApp button
│   └── ui/
│       ├── field.tsx                  # shadcn Field (install via CLI)
│       ├── input.tsx                  # shadcn Input (install via CLI)
│       ├── textarea.tsx               # shadcn Textarea (install via CLI)
│       ├── select.tsx                 # shadcn Select (install via CLI)
│       └── label.tsx                  # shadcn Label (install via CLI)
├── lib/
│   ├── schemas/
│   │   ├── contact.ts                # Zod schema for contact form
│   │   ├── quote.ts                  # Zod schema for quote request
│   │   ├── sourcing.ts               # Zod schema for sourcing request
│   │   └── callback.ts               # Zod schema for callback request
│   ├── actions/
│   │   ├── contact.ts                # Server Action for contact form
│   │   ├── quote.ts                  # Server Action for quote request
│   │   ├── sourcing.ts               # Server Action for sourcing request
│   │   └── callback.ts               # Server Action for callback request
│   ├── email/
│   │   ├── resend.ts                 # Resend client instance
│   │   └── templates/
│   │       ├── contact-notification.tsx   # Email template for contact submissions
│   │       ├── quote-notification.tsx     # Email template for quote submissions
│   │       ├── sourcing-notification.tsx  # Email template for sourcing submissions
│   │       └── callback-notification.tsx  # Email template for callback submissions
│   ├── rate-limit.ts                 # In-memory rate limiter
│   └── recaptcha.ts                  # reCAPTCHA v3 server verification
├── providers/
│   └── recaptcha-provider.tsx         # GoogleReCaptchaProvider wrapper
└── messages/
    ├── tr.json                        # Add forms.*, validation.* keys
    ├── en.json                        # Add forms.*, validation.* keys
    ├── fr.json                        # Add forms.*, validation.* keys
    └── ru.json                        # Add forms.*, validation.* keys
```

### Pattern 1: Shared Zod Schema (Client + Server)
**What:** Define validation schemas once, use on both client (react-hook-form) and server (Server Action).
**When to use:** Every form in this phase.
**Example:**
```typescript
// src/lib/schemas/contact.ts
import { z } from 'zod';

// Language-agnostic schema -- error messages come from i18n
export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  // Honeypot field -- must be empty
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Pattern 2: Server Action with Layered Validation
**What:** Server Action receives FormData, validates with zod, checks spam defenses, sends email via Resend.
**When to use:** Every form submission handler.
**Example:**
```typescript
// src/lib/actions/contact.ts
'use server';

import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { contactSchema } from '@/lib/schemas/contact';
import { sendNotificationEmail } from '@/lib/email/resend';
import { rateLimit } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const t = await getTranslations('Forms');

  // 1. Rate limiting
  const headerList = await headers();
  const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const { success: withinLimit } = rateLimit(ip);
  if (!withinLimit) {
    return { success: false, message: t('errors.rateLimited') };
  }

  // 2. Honeypot check
  const honeypot = formData.get('website');
  if (honeypot) {
    // Silently succeed to not reveal the trap
    return { success: true, message: t('success') };
  }

  // 3. reCAPTCHA verification
  const recaptchaToken = formData.get('recaptchaToken') as string;
  const recaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaValid) {
    return { success: false, message: t('errors.recaptchaFailed') };
  }

  // 4. Zod validation
  const rawData = Object.fromEntries(formData);
  const result = contactSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: t('errors.validationFailed'),
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 5. Send email
  try {
    await sendNotificationEmail('contact', result.data);
    return { success: true, message: t('success') };
  } catch {
    return { success: false, message: t('errors.sendFailed') };
  }
}
```

### Pattern 3: Client Form with react-hook-form + i18n Errors
**What:** Client component using react-hook-form with zodResolver, displaying translated error messages.
**When to use:** All form components.
**Example:**
```typescript
// src/components/forms/contact-form.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { submitContactForm, type FormState } from '@/lib/actions/contact';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const t = useTranslations('Forms.contact');
  const tValidation = useTranslations('Validation');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });

  const [state, formAction, pending] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('contact_form');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append('recaptchaToken', token);

    formAction(formData);
  }, [executeRecaptcha, formAction]);

  // ... render form with Controller + Field components
}
```

### Pattern 4: reCAPTCHA Provider in Layout
**What:** Wrap the app in GoogleReCaptchaProvider so all forms can use the hook.
**When to use:** Once, in a client provider component added to the locale layout.
**Example:**
```typescript
// src/providers/recaptcha-provider.tsx
'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useLocale } from 'next-intl';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      language={locale}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
```

### Pattern 5: In-Memory Rate Limiter
**What:** Simple sliding window rate limiter using a Map, no external dependencies.
**When to use:** Server Actions to prevent form abuse.
**Example:**
```typescript
// src/lib/rate-limit.ts
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 submissions per minute per IP

const requests = new Map<string, number[]>();

export function rateLimit(identifier: string): { success: boolean } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = requests.get(identifier) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    return { success: false };
  }

  recent.push(now);
  requests.set(identifier, recent);

  // Cleanup old entries periodically
  if (requests.size > 10000) {
    for (const [key, times] of requests) {
      const filtered = times.filter((t) => t > windowStart);
      if (filtered.length === 0) requests.delete(key);
      else requests.set(key, filtered);
    }
  }

  return { success: true };
}
```

### Pattern 6: WhatsApp Floating Button
**What:** Fixed-position button linking to WhatsApp with the Toko number.
**When to use:** Added once in the locale layout, appears on every page.
**Example:**
```typescript
// src/components/common/whatsapp-button.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '905XXXXXXXXX'; // Toko's WhatsApp number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
```

### Anti-Patterns to Avoid
- **Building API routes instead of Server Actions:** Server Actions are the standard in Next.js 16. API routes add unnecessary complexity for form handling. Use Server Actions.
- **Storing reCAPTCHA secret key in NEXT_PUBLIC_ env vars:** The secret key MUST only exist server-side. Only the site key is public.
- **Using Zod error messages directly without i18n:** Hard-coded English error messages break the 4-language requirement. Always use translation keys.
- **Putting form validation only on the client:** Server-side validation is mandatory. Client validation can be bypassed.
- **Using `any` type for Server Action state:** Define a proper `FormState` type with success, message, and errors fields.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState for each field | react-hook-form | Handles dirty/touched/error states, re-render optimization, focus management |
| Schema validation | Manual if/else chains | zod | Type inference, composable schemas, shared client/server, error flattening |
| Email delivery | SMTP client / fetch to email API | Resend SDK | Handles retries, rate limits, templates, delivery tracking |
| Email templates | Raw HTML strings | @react-email/components | JSX templating, responsive email layout, tested across clients |
| Bot detection | Custom scoring system | reCAPTCHA v3 | Google's ML model, invisible to users, action-based scoring |
| Form field accessibility | Manual aria attributes | shadcn/ui Field components | Built-in label association, error announcements, invalid states |

**Key insight:** Form handling has massive edge-case surface area (focus management, error display timing, accessibility, email deliverability, spam patterns). Every component in this stack handles specific edge cases that take weeks to discover and fix manually.

## Common Pitfalls

### Pitfall 1: reCAPTCHA Token Expiration
**What goes wrong:** reCAPTCHA v3 tokens expire after 2 minutes. If a user takes time filling a long form, the token obtained at page load will be invalid by submission time.
**Why it happens:** Calling executeRecaptcha too early (on mount) instead of at submission time.
**How to avoid:** Call `executeRecaptcha('action_name')` inside the form's onSubmit handler, not on component mount.
**Warning signs:** Server-side verification returns `timeout-or-duplicate` error code.

### Pitfall 2: Server Action State Shape Mismatch
**What goes wrong:** useActionState expects the Server Action's first parameter to be prevState, but developers pass FormData as first parameter.
**Why it happens:** The Server Action signature changes when used with useActionState vs standalone.
**How to avoid:** Always define Server Actions as `(prevState: FormState, formData: FormData) => Promise<FormState>` when used with useActionState.
**Warning signs:** TypeScript errors about argument types, or state always being undefined.

### Pitfall 3: i18n Error Messages Not Updating on Language Switch
**What goes wrong:** Validation error messages stay in the old language when user switches locale.
**Why it happens:** Zod schemas are created once with hardcoded messages, or the errorMap is not re-evaluated.
**How to avoid:** Keep zod schemas language-agnostic (no custom messages in schema). Map error codes to translation keys in the form component. Alternatively, use zod's contextual error map in the Server Action with `getTranslations`.
**Warning signs:** Error messages appear in wrong language after locale switch.

### Pitfall 4: Honeypot Field Visible to Screen Readers
**What goes wrong:** Accessibility tools expose the honeypot field, causing confusion for users with assistive technology.
**Why it happens:** Using only `display: none` or `visibility: hidden` without proper ARIA attributes.
**How to avoid:** Use `aria-hidden="true"`, `tabIndex={-1}`, and position the field off-screen with CSS. Also add `autoComplete="off"`.
**Warning signs:** Accessibility audit flags unexpected form fields.

### Pitfall 5: Rate Limiter Memory Leak
**What goes wrong:** In-memory rate limiter Map grows unbounded on high-traffic or long-running servers.
**Why it happens:** No cleanup of expired entries.
**How to avoid:** Implement periodic cleanup (on threshold) or use a WeakRef-based approach. The pattern above cleans when map exceeds 10,000 entries.
**Warning signs:** Server memory usage increasing over time.

### Pitfall 6: Resend API Key Missing in Production
**What goes wrong:** Email sending fails silently or throws in production.
**Why it happens:** RESEND_API_KEY not configured in deployment environment variables.
**How to avoid:** Check for the env var at startup and log a warning. Add it to .env.example for documentation.
**Warning signs:** Form submissions appear to succeed but no emails arrive.

### Pitfall 7: react-hook-form + Server Actions Integration
**What goes wrong:** Trying to make react-hook-form submit directly via form action attribute conflicts with its own submission handling.
**Why it happens:** react-hook-form uses `handleSubmit` which prevents default form submission, but Server Actions expect form action submission.
**How to avoid:** Use react-hook-form for client-side validation only, then manually construct FormData and call the Server Action via useActionState's formAction function. Do NOT put the Server Action on the form's `action` attribute when using react-hook-form.
**Warning signs:** Form submits twice, or client validation is bypassed.

## Code Examples

### reCAPTCHA v3 Server-Side Verification
```typescript
// src/lib/recaptcha.ts
// Source: https://developers.google.com/recaptcha/docs/verify

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification');
    return true; // Allow in development
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success && data.score >= SCORE_THRESHOLD;
  } catch {
    console.error('reCAPTCHA verification failed');
    return false;
  }
}
```

### Resend Email Sending
```typescript
// src/lib/email/resend.ts
// Source: https://resend.com/docs/send-with-nextjs

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TOKO_EMAIL = 'info@toko.com.tr';
const FROM_ADDRESS = 'Toko Website <noreply@toko.com.tr>';

export async function sendNotificationEmail(
  type: 'contact' | 'quote' | 'sourcing' | 'callback',
  data: Record<string, unknown>
) {
  const subject = {
    contact: `New Contact Form: ${data.subject}`,
    quote: `New Quote Request: ${data.product}`,
    sourcing: `New Sourcing Request: ${data.product}`,
    callback: `Callback Request: ${data.subject}`,
  }[type];

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [TOKO_EMAIL],
    subject,
    react: getEmailTemplate(type, data), // React Email template component
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }
}
```

### i18n Validation Message Pattern
```typescript
// In the form component, map zod error codes to translation keys:
// Source: https://github.com/amannn/next-intl/discussions/437

// Option A: Simple approach -- translate in form component
function getFieldError(fieldName: string, errors: FieldErrors) {
  const error = errors[fieldName];
  if (!error?.message) return undefined;

  // Zod returns built-in messages like "Required", "String must contain at least 2 character(s)"
  // Map the error type to a translation key
  const errorType = error.type; // 'too_small', 'invalid_string', etc.
  return tValidation(`${fieldName}.${errorType}`, {
    // Pass constraint values as params
    minimum: (error as any)?.minimum,
    maximum: (error as any)?.maximum,
  });
}

// Option B: Server-side approach -- use getTranslations in Server Action
// Pass a contextual error map to safeParse:
const result = contactSchema.safeParse(rawData, {
  errorMap: (issue) => {
    const path = issue.path.join('.');
    const key = `${path}.${issue.code}`;
    return { message: t(`validation.${key}`) };
  },
});
```

### Honeypot Field Implementation
```typescript
// Hidden honeypot field -- bots fill this, humans don't see it
<div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
  <label htmlFor="website">Website</label>
  <input
    type="text"
    id="website"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    {...register('website')}
  />
</div>
```

### Environment Variables Required
```bash
# .env.local (create this file)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TOKO_WHATSAPP_NUMBER=905XXXXXXXXX
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API routes for form handling | Server Actions with `'use server'` | Next.js 14+ (stable) | No separate API layer needed, simpler architecture |
| useFormState (react-dom) | useActionState (react) | React 19 | Hook moved to react package, adds `pending` boolean |
| Manual FormData extraction | react-hook-form + zodResolver | 2023+ | Type-safe validation, real-time error feedback |
| Nodemailer + SMTP | Resend SDK | 2023+ | Simpler DX, no SMTP configuration, JSX email templates |
| reCAPTCHA v2 (checkbox) | reCAPTCHA v3 (invisible scoring) | 2018+ | No user interaction required, score-based bot detection |
| Custom form components | shadcn/ui Field + Controller | October 2025 | Built-in accessibility, composable, works with any form library |

**Deprecated/outdated:**
- `useFormState` from react-dom: Replaced by `useActionState` from react in React 19
- reCAPTCHA v2 checkbox: v3 is invisible and provides better UX
- `shadcn/ui Form` component (from older shadcn versions): Replaced by `Field` component in shadcn v4 base-nova style

## Open Questions

1. **Toko's actual WhatsApp number**
   - What we know: FORM-07 requires a WhatsApp floating button
   - What's unclear: The actual phone number to use
   - Recommendation: Use an environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` with a placeholder; update before production deployment

2. **Resend domain verification**
   - What we know: Resend requires domain verification for production sends
   - What's unclear: Whether toko.com.tr domain is already configured in Resend
   - Recommendation: Use `onboarding@resend.dev` for development/testing, configure toko.com.tr domain in Resend dashboard before going live

3. **reCAPTCHA site key provisioning**
   - What we know: Need to register at Google reCAPTCHA admin console
   - What's unclear: Whether keys have been created yet
   - Recommendation: Create keys for toko.com.tr domain; use test keys during development (Google provides test keys that always pass)

4. **Form submission storage**
   - What we know: Requirements specify email notification only
   - What's unclear: Whether submissions should also be stored in a database
   - Recommendation: Email-only for v1 (per requirements). Database storage is a v2 enhancement if needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x + @testing-library/react 16.x |
| Config file | vitest.config.ts (exists) |
| Quick run command | `npm test -- --reporter=verbose` |
| Full suite command | `npm test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FORM-01 | Contact form renders with all fields, validates, shows errors | unit | `npx vitest run src/__tests__/contact-form.test.tsx -x` | No -- Wave 0 |
| FORM-02 | Quote form renders with product/quantity/destination fields | unit | `npx vitest run src/__tests__/quote-form.test.tsx -x` | No -- Wave 0 |
| FORM-03 | Sourcing form renders with product/specs/quantity/country fields | unit | `npx vitest run src/__tests__/sourcing-form.test.tsx -x` | No -- Wave 0 |
| FORM-04 | Callback form renders with phone/time/subject fields | unit | `npx vitest run src/__tests__/callback-form.test.tsx -x` | No -- Wave 0 |
| FORM-05 | Server Action calls Resend with correct data | unit | `npx vitest run src/__tests__/form-actions.test.ts -x` | No -- Wave 0 |
| FORM-06 | Honeypot rejects bot submissions, rate limiter blocks excess | unit | `npx vitest run src/__tests__/spam-protection.test.ts -x` | No -- Wave 0 |
| FORM-07 | WhatsApp button renders with correct href | unit | `npx vitest run src/__tests__/whatsapp-button.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test -- --reporter=verbose`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/contact-form.test.tsx` -- covers FORM-01
- [ ] `src/__tests__/quote-form.test.tsx` -- covers FORM-02
- [ ] `src/__tests__/sourcing-form.test.tsx` -- covers FORM-03
- [ ] `src/__tests__/callback-form.test.tsx` -- covers FORM-04
- [ ] `src/__tests__/form-actions.test.ts` -- covers FORM-05 (mocked Resend)
- [ ] `src/__tests__/spam-protection.test.ts` -- covers FORM-06
- [ ] `src/__tests__/whatsapp-button.test.tsx` -- covers FORM-07

## Sources

### Primary (HIGH confidence)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) - Server Actions, useActionState, Zod validation patterns (official docs, verified Feb 2026)
- [Resend Next.js Integration](https://resend.com/docs/send-with-nextjs) - Email sending with Server Actions, API key setup, email templates
- [shadcn/ui React Hook Form](https://ui.shadcn.com/docs/forms/react-hook-form) - Field/Controller pattern, zodResolver integration, shadcn v4 base-nova
- [Google reCAPTCHA v3 Docs](https://developers.google.com/recaptcha/docs/v3) - Score-based verification, server-side validation endpoint
- [react-google-recaptcha-v3 GitHub](https://github.com/t49tran/react-google-recaptcha-v3) - Provider setup, useGoogleReCaptcha hook

### Secondary (MEDIUM confidence)
- [next-intl Server Actions](https://next-intl.dev/docs/environments/actions-metadata-route-handlers) - getTranslations in Server Actions, locale handling
- [Translating Zod Errors with next-intl](https://www.gcasc.io/blog/next-intl-zod) - makeZodI18nMap pattern, ICU message syntax for validation
- [next-intl Zod Discussion #437](https://github.com/amannn/next-intl/discussions/437) - Contextual error map approach
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) - Version 7.71.2 confirmed
- [resend npm](https://www.npmjs.com/package/resend) - Version 6.9.3 confirmed
- [@hookform/resolvers npm](https://www.npmjs.com/package/@hookform/resolvers) - Version 5.2.2 confirmed

### Tertiary (LOW confidence)
- [Rate-Limiting Server Actions](https://nextjsweekly.com/blog/rate-limiting-server-actions) - IP-based rate limiting pattern for Server Actions
- [FreeCodeCamp In-Memory Rate Limiter](https://www.freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs/) - Sliding window implementation reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via npm/official docs, versions confirmed, patterns tested in Next.js 16
- Architecture: HIGH - Server Actions + react-hook-form + zod is the documented Next.js pattern, shadcn/ui v4 Field component is current
- Pitfalls: HIGH - Drawn from official docs, GitHub discussions, and verified community patterns
- i18n integration: MEDIUM - next-intl + zod error translation has community solutions but no first-class official pattern
- Rate limiting: MEDIUM - In-memory approach is simple and sufficient but loses state on server restart (acceptable for this use case)

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable ecosystem, 30-day validity)
