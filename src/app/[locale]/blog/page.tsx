import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Calendar, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return getPageMetadata({
    locale,
    path: '/blog',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('BlogPage');
  const tNav = await getTranslations('Header.nav');

  const posts = [
    { image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
    { image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800' },
    { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <JsonLd data={getBreadcrumbSchema([
        { name: tNav('home'), url: `${BASE_URL}/${locale}` },
        { name: tNav('blog'), url: `${BASE_URL}/${locale}/blog` },
      ])} />
      <ScrollReveal>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('title')}
          </span>
          <h1 className="mt-4 heading-serif text-4xl tracking-tight sm:text-5xl">{t('title')}</h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <ScrollReveal key={i} delay={i * 0.1} direction="up">
            <div className="rich-card group overflow-hidden rounded-2xl">
              <div className="relative h-48 overflow-hidden">
                <Image src={post.image} alt={t('images.post')} width={800} height={400}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm shadow-sm">
                  Trade
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /><span>2026</span>
                </div>
                <div className="mt-3 h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded bg-muted animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                  <span>{t('comingSoon')}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-r from-primary/[0.03] via-transparent to-[#d4613c]/[0.03] p-8 text-center shadow-sm">
          <p className="text-muted-foreground">{t('comingSoon')}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
