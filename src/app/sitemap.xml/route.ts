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
  alternates?: Record<string, string>;
}

function makeEntry(
  path: string,
  priority: number,
  changefreq = 'monthly',
  lastmod?: string,
): SitemapUrl {
  const now = lastmod || new Date().toISOString().split('T')[0];
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = getLocalizedUrl(path, locale);
  }
  return {
    loc: getLocalizedUrl(path, 'tr'),
    lastmod: now,
    changefreq,
    priority,
    alternates,
  };
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildXml(urls: SitemapUrl[]): string {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  for (const url of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(url.loc)}</loc>`);
    if (url.alternates) {
      for (const [lang, href] of Object.entries(url.alternates)) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}" />`);
      }
    }
    lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
    lines.push(`    <priority>${url.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n');
}

export function GET() {
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/sectors', priority: 0.9, changefreq: 'monthly' },
    { path: '/references', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/quote', priority: 0.7, changefreq: 'monthly' },
    { path: '/sourcing', priority: 0.7, changefreq: 'monthly' },
    { path: '/callback', priority: 0.6, changefreq: 'monthly' },
    { path: '/russia-transit', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  ];

  for (const page of staticPages) {
    urls.push(makeEntry(page.path, page.priority, page.changefreq));
  }

  // Services
  for (const service of services) {
    urls.push(makeEntry(`/services/${service.slug}`, 0.8));
  }

  // Sectors
  for (const sector of sectors) {
    urls.push(makeEntry(`/sectors/${sector.slug}`, 0.8));
  }

  // Blog posts
  for (const locale of routing.locales) {
    const posts = getPostsByLocale(locale);
    for (const post of posts) {
      const slug = getPostSlug(post);
      urls.push({
        loc: getLocalizedUrl(`/blog/${slug}`, locale),
        lastmod: new Date(post.date).toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  }

  // PSEO pages
  for (const page of productPages) {
    urls.push(makeEntry(`/trade/import/${page.slug}`, 0.7));
  }
  for (const page of countryPages) {
    urls.push(makeEntry(`/trade/country/${page.slug}`, 0.7));
  }
  for (const page of faqPages) {
    urls.push(makeEntry(`/trade/faq/${page.slug}`, 0.6));
  }
  for (const page of customsPages) {
    urls.push(makeEntry(`/trade/customs/${page.slug}`, 0.6));
  }

  const xml = buildXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
