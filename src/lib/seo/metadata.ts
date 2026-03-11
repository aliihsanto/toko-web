import { getLocalizedAlternates, getLocalizedUrl } from '@/lib/i18n-paths';

export const BASE_URL = 'https://toko.com.tr';

export const LOCALE_TO_OG: Record<string, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  fr: 'fr_FR',
  ru: 'ru_RU',
};

export function getAlternates(locale: string, path: string) {
  const internalPath = path ? `/${path.replace(/^\//, '')}` : '';
  return getLocalizedAlternates(internalPath, locale);
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
  const internalPath = path ? `/${path.replace(/^\//, '')}` : '';
  return {
    title,
    description,
    alternates: getLocalizedAlternates(internalPath, locale),
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(internalPath, locale),
      locale: LOCALE_TO_OG[locale] || locale,
      type: 'website' as const,
    },
  };
}
