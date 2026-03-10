import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import {
  getPostsByLocale,
  getPaginatedPosts,
  getCategories,
  POSTS_PER_PAGE,
} from '@/lib/blog/utils';
import { BlogListingClient } from '@/components/blog/blog-listing-client';
import { BlogPagination } from '@/components/blog/blog-pagination';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const params: { locale: string; page: string }[] = [];

  for (const locale of routing.locales) {
    const allPosts = getPostsByLocale(locale);
    const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
    for (let page = 1; page <= totalPages; page++) {
      params.push({ locale, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const pageNum = parseInt(page, 10);

  return getPageMetadata({
    locale,
    path: `/blog/page/${page}`,
    title: `${t('seo.title')} - ${t('pagination.page', { current: String(pageNum), total: '' })}`.replace(/\s*$/, ''),
    description: t('seo.description'),
  });
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('BlogPage');
  const tNav = await getTranslations('Header.nav');

  const allPosts = getPostsByLocale(locale);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  if (pageNum > totalPages) {
    notFound();
  }

  const categories = getCategories(locale);
  const { posts: pagePosts } = getPaginatedPosts(locale, pageNum);

  // Prepare category labels
  const categoryLabels: Record<string, string> = {};
  for (const cat of categories) {
    categoryLabels[cat] = t(`categories.${cat}` as 'categories.general', { defaultValue: cat } as Record<string, string>);
  }

  // Serialize posts for client component
  const postsData = pagePosts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    slug: post.slug,
    image: post.image,
    imageAlt: post.imageAlt,
    readingTime: post.metadata.readingTime,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tNav('home'), url: `${BASE_URL}/${locale}` },
          { name: tNav('blog'), url: `${BASE_URL}/${locale}/blog` },
        ])}
      />

      {/* Page header */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t('title')}
        </span>
        <h1 className="mt-4 heading-serif text-4xl tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Client-side listing with category filtering */}
      <BlogListingClient
        posts={postsData}
        categories={categories}
        categoryLabels={categoryLabels}
        allLabel={t('allCategories')}
        locale={locale}
        readMoreLabel={t('readMore')}
        readingTimeTemplate={t('readingTime', { minutes: '{minutes}' })}
        noPostsMessage={t('noPosts')}
        noPostsInCategoryMessage={t('noPostsInCategory')}
      />

      {/* Pagination */}
      <BlogPagination
        currentPage={pageNum}
        totalPages={totalPages}
        basePath="/blog/page"
        locale={locale}
        labels={{
          previous: t('pagination.previous'),
          next: t('pagination.next'),
          page: t('pagination.page', {
            current: String(pageNum),
            total: String(totalPages),
          }),
        }}
      />
    </div>
  );
}
