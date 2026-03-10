import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('i18n routing configuration', () => {
  it('should have exactly 4 locales: tr, en, fr, ru', () => {
    expect(routing.locales).toEqual(['tr', 'en', 'fr', 'ru']);
  });

  it('should have tr as the default locale', () => {
    expect(routing.defaultLocale).toBe('tr');
  });

  it('should have localePrefix set to always', () => {
    expect(routing.localePrefix).toBe('always');
  });

  it('should have locale detection enabled', () => {
    expect(routing.localeDetection).toBe(true);
  });

  it('should include all expected locales and no extras', () => {
    expect(routing.locales).toHaveLength(4);
    expect(routing.locales).toContain('tr');
    expect(routing.locales).toContain('en');
    expect(routing.locales).toContain('fr');
    expect(routing.locales).toContain('ru');
  });
});
