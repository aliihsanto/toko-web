---
phase: 03-forms-and-lead-capture
plan: 01
subsystem: forms
tags: [zod, react-hook-form, resend, react-email, recaptcha, rate-limiting, server-actions, whatsapp]

# Dependency graph
requires:
  - phase: 01-foundation-and-i18n
    provides: next-intl i18n framework, locale layout, shadcn/ui button component
  - phase: 02-core-pages
    provides: page structure, header/footer layout, Framer Motion patterns
provides:
  - Zod validation schemas for 4 form types (contact, quote, sourcing, callback)
  - Server Actions with full validation, spam protection, and email pipeline
  - In-memory rate limiter (5 req/min/IP sliding window)
  - reCAPTCHA v3 server-side verifier with dev-mode fallback
  - Resend email client with 4 React Email notification templates
  - Shared form UI primitives (SubmitButton, FormSuccess, HoneypotField)
  - WhatsApp floating button on every page
  - RecaptchaProvider wrapping the app
  - FormState type for server action responses
affects: [03-forms-and-lead-capture plan-02, 04-seo-infrastructure]

# Tech tracking
tech-stack:
  added: [react-hook-form, @hookform/resolvers, zod, resend, @react-email/components, react-google-recaptcha-v3]
  patterns: [shared zod schema client+server, server action validation pipeline, layered spam protection, react email templates]

key-files:
  created:
    - src/lib/schemas/contact.ts
    - src/lib/schemas/quote.ts
    - src/lib/schemas/sourcing.ts
    - src/lib/schemas/callback.ts
    - src/lib/actions/types.ts
    - src/lib/actions/contact.ts
    - src/lib/actions/quote.ts
    - src/lib/actions/sourcing.ts
    - src/lib/actions/callback.ts
    - src/lib/rate-limit.ts
    - src/lib/recaptcha.ts
    - src/lib/email/resend.ts
    - src/lib/email/templates/contact-notification.tsx
    - src/lib/email/templates/quote-notification.tsx
    - src/lib/email/templates/sourcing-notification.tsx
    - src/lib/email/templates/callback-notification.tsx
    - src/components/forms/submit-button.tsx
    - src/components/forms/form-success.tsx
    - src/components/forms/honeypot-field.tsx
    - src/components/common/whatsapp-button.tsx
    - src/providers/recaptcha-provider.tsx
    - src/__tests__/spam-protection.test.ts
    - src/__tests__/whatsapp-button.test.tsx
    - .env.example
  modified:
    - src/app/[locale]/layout.tsx
    - package.json
    - .gitignore
    - src/messages/en.json
    - src/messages/tr.json
    - src/messages/fr.json
    - src/messages/ru.json

key-decisions:
  - "RecaptchaProvider renders children without wrapper when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set (dev-mode passthrough)"
  - "Resend email client skips sending when RESEND_API_KEY is not set (dev-mode logging only)"
  - "Email templates use typed component props matching Zod schema inferred types for full type safety"
  - "Added .env.example exception to .gitignore which had a blanket .env* ignore pattern"

patterns-established:
  - "Server Action pipeline: rate limit -> honeypot check -> reCAPTCHA verify -> zod validate -> send email"
  - "Zod schemas are language-agnostic; error messages come from next-intl getTranslations in Server Actions"
  - "Dev-mode fallbacks: skip reCAPTCHA when no secret key, skip email when no Resend key"
  - "Honeypot field returns fake success to avoid revealing the trap to bots"

requirements-completed: [FORM-05, FORM-06, FORM-07]

# Metrics
duration: 7min
completed: 2026-03-10
---

# Phase 3 Plan 01: Form Infrastructure Summary

**Zod validation schemas, Server Actions with layered spam protection (honeypot + rate limit + reCAPTCHA v3), Resend email pipeline with React Email templates, and WhatsApp floating button integrated into layout**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-10T16:14:43Z
- **Completed:** 2026-03-10T16:22:33Z
- **Tasks:** 2
- **Files modified:** 31

## Accomplishments
- Built complete form backend infrastructure: 4 Zod schemas, 4 Server Actions, rate limiter, reCAPTCHA verifier, and Resend email client
- Created 4 professional React Email notification templates with Toko brand styling
- Added WhatsApp floating button and RecaptchaProvider to locale layout (visible on all pages)
- 13 tests passing: 9 spam protection tests (rate limiter + reCAPTCHA) and 4 WhatsApp button tests
- TypeScript compiles cleanly, production build succeeds with all 84+ static pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, create schemas, spam protection, email pipeline, and shared form primitives** - `0326a73` (feat)
2. **Task 2: Add WhatsApp button and reCAPTCHA provider to layout, create tests** - `301548f` (feat)

## Files Created/Modified
- `src/lib/schemas/contact.ts` - Contact form Zod schema with honeypot field
- `src/lib/schemas/quote.ts` - Quote request Zod schema
- `src/lib/schemas/sourcing.ts` - Sourcing request Zod schema
- `src/lib/schemas/callback.ts` - Callback request Zod schema with phone regex
- `src/lib/actions/types.ts` - Shared FormState type for all server actions
- `src/lib/actions/contact.ts` - Contact form Server Action (rate limit + honeypot + reCAPTCHA + zod + email)
- `src/lib/actions/quote.ts` - Quote form Server Action
- `src/lib/actions/sourcing.ts` - Sourcing form Server Action
- `src/lib/actions/callback.ts` - Callback form Server Action
- `src/lib/rate-limit.ts` - In-memory sliding window rate limiter (5 req/min, 10K entry cleanup)
- `src/lib/recaptcha.ts` - reCAPTCHA v3 server-side verification (score threshold 0.5)
- `src/lib/email/resend.ts` - Resend client with typed template dispatch
- `src/lib/email/templates/contact-notification.tsx` - Contact email template
- `src/lib/email/templates/quote-notification.tsx` - Quote email template
- `src/lib/email/templates/sourcing-notification.tsx` - Sourcing email template
- `src/lib/email/templates/callback-notification.tsx` - Callback email template
- `src/components/forms/submit-button.tsx` - Reusable submit button with loading spinner
- `src/components/forms/form-success.tsx` - Success message with Framer Motion animation
- `src/components/forms/honeypot-field.tsx` - Hidden honeypot input for bot detection
- `src/components/common/whatsapp-button.tsx` - Floating WhatsApp button (fixed, bottom-right, green)
- `src/providers/recaptcha-provider.tsx` - GoogleReCaptchaProvider wrapper with dev-mode passthrough
- `src/app/[locale]/layout.tsx` - Added RecaptchaProvider and WhatsAppButton
- `src/components/ui/input.tsx` - shadcn Input component
- `src/components/ui/textarea.tsx` - shadcn Textarea component
- `src/components/ui/select.tsx` - shadcn Select component
- `src/components/ui/label.tsx` - shadcn Label component
- `.env.example` - Documents RESEND_API_KEY, reCAPTCHA keys, WhatsApp number
- `.gitignore` - Added !.env.example exception
- `src/messages/*.json` - Added Forms namespace and Common.whatsappChat to all 4 locales
- `src/__tests__/spam-protection.test.ts` - Rate limiter and reCAPTCHA verifier tests (9 tests)
- `src/__tests__/whatsapp-button.test.tsx` - WhatsApp button rendering and accessibility tests (4 tests)

## Decisions Made
- RecaptchaProvider renders children directly (no wrapper) when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set, enabling development without Google reCAPTCHA keys
- Resend email client logs a warning and returns early when RESEND_API_KEY is not set, allowing local development without email credentials
- Email templates use explicit TypeScript interfaces matching Zod-inferred types (not generic Record) for compile-time safety
- Added `!.env.example` exception to `.gitignore` which had a blanket `.env*` ignore pattern that was blocking .env.example from being tracked

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added .env.example exception to .gitignore**
- **Found during:** Task 1 (git add .env.example)
- **Issue:** .gitignore had `.env*` pattern which blocked `.env.example` from being committed
- **Fix:** Added `!.env.example` exception line after the `.env*` pattern
- **Files modified:** .gitignore
- **Verification:** `git add .env.example` succeeded after fix
- **Committed in:** 0326a73 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed type safety in email template dispatch**
- **Found during:** Task 1 (TypeScript check)
- **Issue:** `Record<string, string>` cast in getEmailTemplate was not assignable to typed template props (ContactNotificationProps etc.)
- **Fix:** Imported Zod-inferred types from schemas and used proper generic type mapping with `EmailDataMap`
- **Files modified:** src/lib/email/resend.ts
- **Verification:** `npx tsc --noEmit` passed with zero errors
- **Committed in:** 0326a73 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for correctness. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations documented above.

## User Setup Required

Before production deployment, the following environment variables must be configured:
- `RESEND_API_KEY` - Resend transactional email service API key
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key
- `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA v3 secret key
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - Toko's WhatsApp business number

All services have dev-mode fallbacks (skip verification/email sending) so development works without keys.

## Next Phase Readiness
- All form infrastructure is ready for Plan 02 to build form UI components
- Schemas, server actions, and shared primitives can be imported directly
- Forms namespace in locale files ready for form-specific labels and validation messages
- RecaptchaProvider wraps the app, enabling `useGoogleReCaptcha` hook in form components

## Self-Check: PASSED

All 24 created files verified present. Both task commits (0326a73, 301548f) verified in git log.

---
*Phase: 03-forms-and-lead-capture*
*Completed: 2026-03-10*
