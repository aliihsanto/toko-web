import { routing } from '@/i18n/routing';

const BASE_URL = 'https://toko.com.tr';

type Locale = (typeof routing.locales)[number];
type PathnameEntry = string | Partial<Record<Locale, string>>;

const pathnames = routing.pathnames as Record<string, PathnameEntry>;

// Virtual paths for breadcrumb hierarchy (no actual pages)
const virtualPaths: Record<string, Record<string, string>> = {
  '/trade': {
    tr: '/ticaret',
    en: '/trade',
    fr: '/commerce',
    ru: '/torgovlya',
  },
};

/**
 * Resolve the localized external path for a given internal path and locale.
 * Handles static paths ('/about'), dynamic paths ('/services/import'),
 * and intermediate breadcrumb paths ('/trade', '/trade/import').
 */
export function resolveLocalizedPath(internalPath: string, locale: string): string {
  // Direct match (static paths like '/about')
  if (pathnames[internalPath]) {
    const entry = pathnames[internalPath];
    if (typeof entry === 'string') return entry;
    return (entry as Record<string, string>)[locale] || internalPath;
  }

  // Virtual path match (intermediate breadcrumb paths like '/trade')
  if (virtualPaths[internalPath]) {
    return virtualPaths[internalPath][locale] || internalPath;
  }

  // Dynamic match (paths like '/services/import' against template '/services/[slug]')
  for (const [template, localized] of Object.entries(pathnames)) {
    if (!template.includes('[')) continue;

    const templateParts = template.split('/');
    const pathParts = internalPath.split('/');

    if (templateParts.length !== pathParts.length) continue;

    const params: Record<string, string> = {};
    let matches = true;

    for (let i = 0; i < templateParts.length; i++) {
      const tpl = templateParts[i];
      if (tpl.startsWith('[') && tpl.endsWith(']')) {
        params[tpl.slice(1, -1)] = pathParts[i];
      } else if (tpl !== pathParts[i]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      let localizedPath: string;
      if (typeof localized === 'string') {
        localizedPath = localized;
      } else {
        localizedPath = (localized as Record<string, string>)[locale] || template;
      }

      for (const [key, value] of Object.entries(params)) {
        localizedPath = localizedPath.replace(`[${key}]`, value);
      }

      return localizedPath;
    }
  }

  // Prefix match: intermediate paths like '/trade/import' derived from '/trade/import/[slug]'
  for (const [template, localized] of Object.entries(pathnames)) {
    if (!template.includes('[')) continue;

    const staticPrefix = template.substring(0, template.lastIndexOf('/'));
    if (internalPath === staticPrefix) {
      let localizedTemplate: string;
      if (typeof localized === 'string') {
        localizedTemplate = localized;
      } else {
        localizedTemplate = (localized as Record<string, string>)[locale] || template;
      }
      return localizedTemplate.substring(0, localizedTemplate.lastIndexOf('/'));
    }
  }

  return internalPath;
}

/**
 * Get the full absolute URL for an internal path in a specific locale.
 */
export function getLocalizedUrl(internalPath: string, locale: string): string {
  const localizedPath = resolveLocalizedPath(internalPath, locale);
  return `${BASE_URL}/${locale}${localizedPath}`;
}

/**
 * Get alternates (canonical + hreflang) for a given internal path and locale.
 */
export function getLocalizedAlternates(internalPath: string, locale: string) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocalizedUrl(internalPath, loc);
  }
  languages['x-default'] = getLocalizedUrl(internalPath, routing.defaultLocale);

  return {
    canonical: getLocalizedUrl(internalPath, locale),
    languages,
  };
}
