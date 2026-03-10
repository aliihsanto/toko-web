---
phase: 1
slug: foundation-and-i18n
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react |
| **Config file** | vitest.config.ts (none — Wave 0 installs) |
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

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | I18N-01 | unit | `npx vitest run src/__tests__/i18n-routing.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 0 | I18N-02 | unit | `npx vitest run src/__tests__/middleware.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 0 | I18N-04 | unit | `npx vitest run src/__tests__/translations.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | UX-03 | smoke | `npx vitest run src/__tests__/header.test.tsx` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | UX-04 | smoke | `npx vitest run src/__tests__/footer.test.tsx` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | UX-05 | integration | `npx vitest run src/__tests__/theme-toggle.test.tsx` | ❌ W0 | ⬜ pending |
| 01-02-04 | 02 | 1 | I18N-03 | integration | `npx vitest run src/__tests__/language-switcher.test.tsx` | ❌ W0 | ⬜ pending |
| 01-02-05 | 02 | 1 | I18N-05 | unit | `npx vitest run src/__tests__/metadata.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest configuration with jsdom environment, path aliases
- [ ] `src/__tests__/setup.ts` — Test setup (testing-library, mocks for next-intl, next-themes)
- [ ] `src/__tests__/middleware.test.ts` — covers I18N-02
- [ ] `src/__tests__/translations.test.ts` — covers I18N-04 (key parity validation)
- [ ] `src/__tests__/header.test.tsx` — covers UX-03
- [ ] `src/__tests__/footer.test.tsx` — covers UX-04
- [ ] `src/__tests__/theme-toggle.test.tsx` — covers UX-05
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Modern corporate design looks correct | UX-01 | Visual design judgment | Open site in browser, verify professional appearance |
| Responsive at all breakpoints | UX-02 | Visual layout verification | Resize browser to mobile/tablet/desktop, verify no breaks |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
