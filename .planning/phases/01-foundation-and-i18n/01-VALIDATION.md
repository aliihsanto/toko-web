---
phase: 1
slug: foundation-and-i18n
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-10
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react |
| **Config file** | vitest.config.ts (created in Plan 01, Task 1) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --coverage` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --coverage`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Requirement | Test File | Automated Command | Status |
|---------|------|-------------|-----------|-------------------|--------|
| 01-01-02 | 01 | I18N-01 | `src/__tests__/i18n-routing.test.ts` | `npx vitest run src/__tests__/i18n-routing.test.ts` | ⬜ pending |
| 01-01-02 | 01 | I18N-02 | `src/__tests__/middleware.test.ts` | `npx vitest run src/__tests__/middleware.test.ts` | ⬜ pending |
| 01-01-02 | 01 | I18N-04 | `src/__tests__/translations.test.ts` | `npx vitest run src/__tests__/translations.test.ts` | ⬜ pending |
| 01-01-02 | 01 | I18N-05 | `src/__tests__/metadata.test.ts` | `npx vitest run src/__tests__/metadata.test.ts` | ⬜ pending |
| 01-02-02 | 02 | UX-05 | `src/__tests__/theme-toggle.test.tsx` | `npx vitest run src/__tests__/theme-toggle.test.tsx` | ⬜ pending |
| 01-03-01 | 03 | I18N-03 | `src/__tests__/language-switcher.test.tsx` | `npx vitest run src/__tests__/language-switcher.test.tsx` | ⬜ pending |
| 01-03-02 | 03 | UX-03 | `src/__tests__/header.test.tsx` | `npx vitest run src/__tests__/header.test.tsx` | ⬜ pending |
| 01-04-01 | 04 | UX-04 | `src/__tests__/footer.test.tsx` | `npx vitest run src/__tests__/footer.test.tsx` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Test File Distribution Across Plans

Each implementing plan creates the tests for the features it builds:

| Plan | Test Files Created | Requirements Covered |
|------|-------------------|---------------------|
| 01 (i18n foundation) | `i18n-routing.test.ts`, `middleware.test.ts`, `translations.test.ts`, `metadata.test.ts` | I18N-01, I18N-02, I18N-04, I18N-05 |
| 02 (design system) | `theme-toggle.test.tsx` | UX-05 |
| 03 (header) | `header.test.tsx`, `language-switcher.test.tsx` | UX-03, I18N-03 |
| 04 (footer) | `footer.test.tsx` | UX-04 |

---

## Wave 0 Requirements

All wave 0 infrastructure is created in Plan 01, Task 1:
- [x] `vitest.config.ts` — Vitest configuration with jsdom environment, path aliases
- [x] `src/__tests__/setup.ts` — Test setup (testing-library/jest-dom)
- [x] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`

Test files are created by each implementing plan (not a separate wave 0):
- [ ] `src/__tests__/i18n-routing.test.ts` — created in Plan 01, Task 2
- [ ] `src/__tests__/middleware.test.ts` — created in Plan 01, Task 2
- [ ] `src/__tests__/translations.test.ts` — created in Plan 01, Task 2
- [ ] `src/__tests__/metadata.test.ts` — created in Plan 01, Task 2
- [ ] `src/__tests__/theme-toggle.test.tsx` — created in Plan 02, Task 2
- [ ] `src/__tests__/language-switcher.test.tsx` — created in Plan 03, Task 1
- [ ] `src/__tests__/header.test.tsx` — created in Plan 03, Task 2
- [ ] `src/__tests__/footer.test.tsx` — created in Plan 04, Task 1

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Modern corporate design looks correct | UX-01 | Visual design judgment | Open site in browser, verify professional appearance |
| Responsive at all breakpoints | UX-02 | Visual layout verification | Resize browser to mobile/tablet/desktop, verify no breaks |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify with vitest commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 infrastructure in Plan 01; test files distributed across implementing plans
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
