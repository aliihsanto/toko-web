import { describe, it, expect } from 'vitest';
import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import ru from '@/messages/ru.json';

/**
 * Recursively extract all keys from a nested object as dot-notation paths.
 */
function extractKeys(obj: Record<string, any>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

/**
 * Recursively extract all leaf values from a nested object.
 */
function extractValues(obj: Record<string, any>): string[] {
  const values: string[] = [];
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      values.push(...extractValues(obj[key]));
    } else {
      values.push(obj[key]);
    }
  }
  return values;
}

describe('translation key parity', () => {
  const trKeys = extractKeys(tr);
  const enKeys = extractKeys(en);
  const frKeys = extractKeys(fr);
  const ruKeys = extractKeys(ru);

  it('en.json should have exactly the same keys as tr.json (reference)', () => {
    expect(enKeys).toEqual(trKeys);
  });

  it('fr.json should have exactly the same keys as tr.json (reference)', () => {
    expect(frKeys).toEqual(trKeys);
  });

  it('ru.json should have exactly the same keys as tr.json (reference)', () => {
    expect(ruKeys).toEqual(trKeys);
  });

  it('should have no empty string values in any locale', () => {
    const allLocales = { tr, en, fr, ru };
    for (const [locale, messages] of Object.entries(allLocales)) {
      const values = extractValues(messages);
      for (const value of values) {
        expect(value, `Empty value found in ${locale}`).not.toBe('');
      }
    }
  });

  it('should contain required namespaces: Metadata, Header, Footer, LanguageSwitcher, Common, NotFound, HomePage', () => {
    const requiredNamespaces = [
      'Metadata',
      'Header',
      'Footer',
      'LanguageSwitcher',
      'Common',
      'NotFound',
      'HomePage',
    ];
    for (const namespace of requiredNamespaces) {
      expect(tr, `tr.json missing namespace: ${namespace}`).toHaveProperty(namespace);
      expect(en, `en.json missing namespace: ${namespace}`).toHaveProperty(namespace);
      expect(fr, `fr.json missing namespace: ${namespace}`).toHaveProperty(namespace);
      expect(ru, `ru.json missing namespace: ${namespace}`).toHaveProperty(namespace);
    }
  });
});
