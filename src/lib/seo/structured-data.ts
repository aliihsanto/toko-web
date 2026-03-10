import type {
  WithContext,
  Organization,
  LocalBusiness,
  BreadcrumbList,
  FAQPage,
} from 'schema-dts';
import { COMPANY_INFO } from './company-info';

const LOCALE_NAMES: Record<string, string> = {
  tr: 'Toko Trading - Uluslararası Ticaret',
  en: 'Toko Trading - International Trade',
  fr: 'Toko Trading - Commerce International',
  ru: 'Toko Trading - Международная Торговля',
};

export function getOrganizationSchema(
  locale: string
): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: LOCALE_NAMES[locale] || COMPANY_INFO.name,
    url: COMPANY_INFO.url,
    logo: `${COMPANY_INFO.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_INFO.phone,
      contactType: 'customer service',
      availableLanguage: [...COMPANY_INFO.availableLanguages],
    },
    sameAs: [...COMPANY_INFO.social],
  };
}

export function getLocalBusinessSchema(
  locale: string
): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: LOCALE_NAMES[locale] || COMPANY_INFO.name,
    url: COMPANY_INFO.url,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.region,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    openingHours: COMPANY_INFO.openingHours,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(
  questions: { question: string; answer: string }[]
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question' as const,
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer,
      },
    })),
  };
}
