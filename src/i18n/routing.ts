import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en', 'fr', 'ru'],
  defaultLocale: 'tr',
  localeDetection: true,
  localePrefix: 'always',
});
