import { routing } from '@/i18n/routing';

export const BASE_URL = 'https://toko.com.tr';

export const LOCALE_TO_OG: Record<string, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  fr: 'fr_FR',
  ru: 'ru_RU',
};

export function getAlternates(locale: string, path: string) {
  const pathSuffix = path ? `/${path.replace(/^\//, '')}` : '';

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}${pathSuffix}`;
  }
  // x-default points to the Turkish (default locale) version
  languages['x-default'] = `${BASE_URL}/${routing.defaultLocale}${pathSuffix}`;

  return {
    canonical: `${BASE_URL}/${locale}${pathSuffix}`,
    languages,
  };
}

export function getPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}) {
  return {
    title,
    description,
    alternates: getAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}${path ? `/${path.replace(/^\//, '')}` : ''}`,
      locale: LOCALE_TO_OG[locale] || locale,
      type: 'website' as const,
    },
  };
}
