import { routing } from '@/i18n/routing';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';
import { getPostsByLocale, getPostSlug } from '@/lib/blog/utils';
import { productPages } from '@/data/pseo/products';
import { countryPages } from '@/data/pseo/countries';
import { faqPages } from '@/data/pseo/faqs';
import { customsPages } from '@/data/pseo/customs';
import { getLocalizedUrl } from '@/lib/i18n-paths';

const BASE_URL = 'https://toko.com.tr';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildXml(urls: SitemapUrl[]): string {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const url of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(url.loc)}</loc>`);
    lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
    lines.push(`    <priority>${url.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n');
}

export function GET() {
  const now = new Date().toISOString();
  const urls: SitemapUrl[] = [];

  // Static pages — all locales
  const staticPages = [
    { path: '', priority: 1, changefreq: 'monthly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/sectors', priority: 0.9, changefreq: 'monthly' },
    { path: '/references', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/quote', priority: 0.7, changefreq: 'monthly' },
    { path: '/sourcing', priority: 0.7, changefreq: 'monthly' },
    { path: '/callback', priority: 0.6, changefreq: 'monthly' },
    { path: '/russia-transit', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  ];

  for (const locale of routing.locales) {
    for (const page of staticPages) {
      urls.push({
        loc: getLocalizedUrl(page.path, locale),
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }
  }

  // Services — all locales
  for (const locale of routing.locales) {
    for (const service of services) {
      urls.push({
        loc: getLocalizedUrl(`/services/${service.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Sectors — all locales
  for (const locale of routing.locales) {
    for (const sector of sectors) {
      urls.push({
        loc: getLocalizedUrl(`/sectors/${sector.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Blog posts — per locale
  for (const locale of routing.locales) {
    const posts = getPostsByLocale(locale);
    for (const post of posts) {
      const slug = getPostSlug(post);
      urls.push({
        loc: getLocalizedUrl(`/blog/${slug}`, locale),
        lastmod: new Date(post.date).toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  }

  // PSEO pages — all locales
  for (const locale of routing.locales) {
    for (const page of productPages) {
      urls.push({
        loc: getLocalizedUrl(`/trade/import/${page.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }
    for (const page of countryPages) {
      urls.push({
        loc: getLocalizedUrl(`/trade/country/${page.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }
    for (const page of faqPages) {
      urls.push({
        loc: getLocalizedUrl(`/trade/faq/${page.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
    for (const page of customsPages) {
      urls.push({
        loc: getLocalizedUrl(`/trade/customs/${page.slug}`, locale),
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
