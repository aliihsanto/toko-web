---
phase: 2
slug: core-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
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

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | PAGE-01 | unit | `npx vitest run src/__tests__/homepage.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | PAGE-02 | unit | `npx vitest run src/__tests__/about-page.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 1 | PAGE-03 | unit | `npx vitest run src/__tests__/services-page.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 1 | PAGE-04 | unit | `npx vitest run src/__tests__/service-detail.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-04-01 | 04 | 1 | PAGE-05 | unit | `npx vitest run src/__tests__/sectors-page.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-04-02 | 04 | 1 | PAGE-06 | unit | `npx vitest run src/__tests__/sector-detail.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-05-01 | 05 | 2 | PAGE-07 | unit | `npx vitest run src/__tests__/references-page.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-05-02 | 05 | 2 | PAGE-08 | unit | `npx vitest run src/__tests__/russia-transit.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

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
| Visual design quality and color variety | PAGE-01–08 | Subjective visual assessment | Browse all pages in all locales, verify dark/light mode, check color variety beyond blue/white |
| Responsive layout on real devices | PAGE-01–08 | Device-specific rendering | Test on mobile, tablet, desktop at all breakpoints |
| Translation readability | PAGE-01–08 | Language quality assessment | Native speaker review of all 4 locale translations |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
