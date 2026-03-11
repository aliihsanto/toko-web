import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';
import { getPostsByLocale, getPostSlug } from '@/lib/blog/utils';
import { productPages } from '@/data/pseo/products';
import { countryPages } from '@/data/pseo/countries';
import { faqPages } from '@/data/pseo/faqs';
import { customsPages } from '@/data/pseo/customs';
import { resolveLocalizedPath, getLocalizedUrl } from '@/lib/i18n-paths';

const BASE_URL = 'https://toko.com.tr';

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

function makeEntry(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry['changeFrequency'] = 'monthly'
): MetadataRoute.Sitemap[number] {
  return {
    url: getLocalizedUrl(path, 'tr'),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getLocalizedUrl(path, locale)])
      ),
    },
  };
}

const staticPages: SitemapEntry[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sectors', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/references', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/sourcing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/callback', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/russia-transit', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((page) =>
    makeEntry(page.path, page.priority, page.changeFrequency)
  );

  const serviceEntries = services.map((service) =>
    makeEntry(`/services/${service.slug}`, 0.8)
  );

  const sectorEntries = sectors.map((sector) =>
    makeEntry(`/sectors/${sector.slug}`, 0.8)
  );

  // Blog post entries -- each locale has unique slugs, so create individual entries
  const blogEntries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    const localePosts = getPostsByLocale(locale);
    for (const post of localePosts) {
      const slug = getPostSlug(post);
      const blogPath = `/blog/${slug}`;
      blogEntries.push({
        url: getLocalizedUrl(blogPath, locale),
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Programmatic SEO entries
  const pseoProductEntries = productPages.map((page) =>
    makeEntry(`/trade/import/${page.slug}`, 0.7)
  );

  const pseoCountryEntries = countryPages.map((page) =>
    makeEntry(`/trade/country/${page.slug}`, 0.7)
  );

  const pseoFAQEntries = faqPages.map((page) =>
    makeEntry(`/trade/faq/${page.slug}`, 0.6)
  );

  const pseoCustomsEntries = customsPages.map((page) =>
    makeEntry(`/trade/customs/${page.slug}`, 0.6)
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...sectorEntries,
    ...blogEntries,
    ...pseoProductEntries,
    ...pseoCountryEntries,
    ...pseoFAQEntries,
    ...pseoCustomsEntries,
  ];
}
