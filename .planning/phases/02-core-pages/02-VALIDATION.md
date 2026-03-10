---
phase: 2
slug: core-pages
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-10
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 + jsdom 28.1.0 |
| **Config file** | vitest.config.ts (exists at project root) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run plan-specific test file(s) via `npx vitest run src/__tests__/{test-file} --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-00-01 | 00 | 0 | PAGE-01..04 | stub | `npx vitest run src/__tests__/homepage.test.tsx src/__tests__/about-page.test.tsx src/__tests__/services-page.test.tsx src/__tests__/service-detail.test.tsx --reporter=verbose` | W0 creates | pending |
| 02-00-02 | 00 | 0 | PAGE-05..08 | stub | `npx vitest run src/__tests__/sectors-page.test.tsx src/__tests__/sector-detail.test.tsx src/__tests__/references-page.test.tsx src/__tests__/russia-transit.test.tsx --reporter=verbose` | W0 creates | pending |
| 02-01-01 | 01 | 1 | PAGE-01 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/homepage.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-01-02 | 01 | 1 | PAGE-02 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/about-page.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-02-01 | 02 | 2 | PAGE-03 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/services-page.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-02-02 | 02 | 2 | PAGE-04 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/service-detail.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-03-01 | 03 | 2 | PAGE-05 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/sectors-page.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-03-02 | 03 | 2 | PAGE-06 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/sector-detail.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-04-01 | 04 | 2 | PAGE-07 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/references-page.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-04-02 | 04 | 2 | PAGE-08 | tsc+unit | `npx tsc --noEmit && npx vitest run src/__tests__/russia-transit.test.tsx --reporter=verbose` | yes (W0) | pending |
| 02-05-01 | 05 | 3 | PAGE-01..08 | build | `npx tsc --noEmit && npm run build` | n/a | pending |
| 02-05-02 | 05 | 3 | PAGE-01..08 | visual | checkpoint:human-verify | n/a | pending |

*Status: pending | green | red | flaky*

---

## Wave 0 Requirements

Plan 02-00 creates all 8 test stub files:

- [ ] `src/__tests__/homepage.test.tsx` — stubs for PAGE-01
- [ ] `src/__tests__/about-page.test.tsx` — stubs for PAGE-02
- [ ] `src/__tests__/services-page.test.tsx` — stubs for PAGE-03
- [ ] `src/__tests__/service-detail.test.tsx` — stubs for PAGE-04
- [ ] `src/__tests__/sectors-page.test.tsx` — stubs for PAGE-05
- [ ] `src/__tests__/sector-detail.test.tsx` — stubs for PAGE-06
- [ ] `src/__tests__/references-page.test.tsx` — stubs for PAGE-07
- [ ] `src/__tests__/russia-transit.test.tsx` — stubs for PAGE-08

Note: Existing Phase 1 tests (49 tests across 8 files) must continue to pass. Phase 2 tests should follow the same mocking patterns established in Phase 1.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual design quality and color variety | PAGE-01-08 | Subjective visual assessment | Browse all pages in all locales, verify dark/light mode, check color variety beyond blue/white |
| Responsive layout on real devices | PAGE-01-08 | Device-specific rendering | Test on mobile, tablet, desktop at all breakpoints |
| Translation readability | PAGE-01-08 | Language quality assessment | Native speaker review of all 4 locale translations |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify with plan-specific test paths
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 plan (02-00) covers all MISSING test file references
- [x] No watch-mode flags
- [x] Feedback latency < 15s (tsc + vitest on specific files)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
