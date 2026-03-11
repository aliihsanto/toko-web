import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en', 'fr', 'ru'],
  defaultLocale: 'tr',
  localeDetection: true,
  localePrefix: 'always',
  pathnames: {
    '/': '/',

    // --- Static pages ---
    '/about': {
      tr: '/hakkimizda',
      en: '/about',
      fr: '/a-propos',
      ru: '/o-nas',
    },
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
      fr: '/contact',
      ru: '/kontakty',
    },
    '/services': {
      tr: '/hizmetler',
      en: '/services',
      fr: '/services',
      ru: '/uslugi',
    },
    '/sectors': {
      tr: '/sektorler',
      en: '/sectors',
      fr: '/secteurs',
      ru: '/sektory',
    },
    '/references': {
      tr: '/referanslar',
      en: '/references',
      fr: '/references',
      ru: '/rekomendatsii',
    },
    '/quote': {
      tr: '/teklif',
      en: '/quote',
      fr: '/devis',
      ru: '/zapros',
    },
    '/sourcing': {
      tr: '/tedarik',
      en: '/sourcing',
      fr: '/approvisionnement',
      ru: '/snabzhenie',
    },
    '/russia-transit': {
      tr: '/rusya-transit',
      en: '/russia-transit',
      fr: '/transit-russie',
      ru: '/tranzit-rossiya',
    },
    '/callback': {
      tr: '/geri-arama',
      en: '/callback',
      fr: '/rappel',
      ru: '/obratnyy-zvonok',
    },

    // --- Blog (same across all locales) ---
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/blog/page/[page]': '/blog/page/[page]',

    // --- Dynamic service & sector pages ---
    '/services/[slug]': {
      tr: '/hizmetler/[slug]',
      en: '/services/[slug]',
      fr: '/services/[slug]',
      ru: '/uslugi/[slug]',
    },
    '/sectors/[slug]': {
      tr: '/sektorler/[slug]',
      en: '/sectors/[slug]',
      fr: '/secteurs/[slug]',
      ru: '/sektory/[slug]',
    },

    // --- Programmatic SEO (trade knowledge base) ---
    '/trade/import/[slug]': {
      tr: '/ticaret/ithalat/[slug]',
      en: '/trade/import/[slug]',
      fr: '/commerce/importation/[slug]',
      ru: '/torgovlya/import/[slug]',
    },
    '/trade/customs/[slug]': {
      tr: '/ticaret/gumruk/[slug]',
      en: '/trade/customs/[slug]',
      fr: '/commerce/douane/[slug]',
      ru: '/torgovlya/tamozhnya/[slug]',
    },
    '/trade/country/[slug]': {
      tr: '/ticaret/ulke/[slug]',
      en: '/trade/country/[slug]',
      fr: '/commerce/pays/[slug]',
      ru: '/torgovlya/strana/[slug]',
    },
    '/trade/faq/[slug]': {
      tr: '/ticaret/sss/[slug]',
      en: '/trade/faq/[slug]',
      fr: '/commerce/faq/[slug]',
      ru: '/torgovlya/voprosy/[slug]',
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
