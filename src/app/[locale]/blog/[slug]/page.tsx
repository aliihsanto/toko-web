import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getPageMetadata, BASE_URL, LOCALE_TO_OG } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import {
  getPostBySlug,
  getPostSlug,
  getPostsByLocale,
} from '@/lib/blog/utils';
import { MDXContent } from '@/components/blog/mdx-content';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = getPostsByLocale(locale);
    for (const post of posts) {
      params.push({ locale, slug: getPostSlug(post) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);

  if (!post) {
    return {};
  }

  const metadata = getPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.date,
      locale: LOCALE_TO_OG[locale] || locale,
      ...(post.image && {
        images: [{ url: post.image, alt: post.imageAlt || post.title }],
      }),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('BlogPage');
  const tNav = await getTranslations('Header.nav');

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.date));

  const categoryLabel = t(
    `categories.${post.category}` as 'categories.general',
    { defaultValue: post.category } as Record<string, string>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: tNav('home'), url: `${BASE_URL}/${locale}` },
          { name: tNav('blog'), url: `${BASE_URL}/${locale}/blog` },
          {
            name: post.title,
            url: `${BASE_URL}/${locale}/blog/${slug}`,
          },
        ])}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: tNav('home'), href: '/' },
          { label: tNav('blog'), href: '/blog' },
          { label: post.title },
        ]}
      />

      <div className="mt-8 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main content */}
        <article>
          {/* Article header */}
          <header className="mb-10">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {categoryLabel}
            </span>
            <h1 className="mt-4 heading-serif text-3xl tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {t('readingTime', {
                  minutes: String(post.metadata.readingTime),
                })}
              </span>
            </div>
            {post.image && (
              <div className="mt-6 overflow-hidden rounded-2xl">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  width={900}
                  height={450}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* MDX content */}
          <div className="prose-wrapper">
            <MDXContent code={post.body} />
          </div>

          {/* Back to blog */}
          <div className="mt-12 border-t border-border/60 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToBlog')}
            </Link>
          </div>
        </article>

        {/* Sidebar - TOC */}
        <div className="hidden lg:block">
          <TableOfContents
            toc={post.toc}
            title={t('tableOfContents')}
          />
        </div>
      </div>

      {/* Mobile TOC - shown above content on small screens */}
      {post.toc && post.toc.length > 0 && (
        <div className="mt-8 rounded-xl border border-border/60 p-4 lg:hidden">
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-foreground">
              {t('tableOfContents')}
            </summary>
            <div className="mt-3">
              <TableOfContents toc={post.toc} />
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
