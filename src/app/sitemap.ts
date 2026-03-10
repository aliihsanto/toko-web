import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';

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
    url: `${BASE_URL}/tr${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
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

  return [...staticEntries, ...serviceEntries, ...sectorEntries];
}
