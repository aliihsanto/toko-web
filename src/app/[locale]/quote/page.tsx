import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import { QuoteForm } from '@/components/forms/quote-form';
import { getPageMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'QuotePage' });

  return getPageMetadata({
    locale,
    path: '/quote',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('QuotePage');
  const tForm = await getTranslations('Forms.quote');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pb-32 pt-24 mesh-hero">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#e8a840]/8 blur-[100px]" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('badge')}
            </span>
            <h1 className="mt-4 heading-serif text-4xl text-foreground sm:text-5xl">{t('title')}</h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-[#e8a840]" />
            <p className="mt-6 text-lg text-muted-foreground">{t('subtitle')}</p>
          </ScrollReveal>
        </div>

        <WaveDivider color="#fefcf9" variant="gentle" />
      </section>

      {/* Content */}
      <section className="mx-auto -mt-20 max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rich-card rounded-2xl border-t-4 border-t-primary p-8 lg:p-10">
            <h2 className="heading-serif text-xl">{tForm('title')}</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-[#e8a840]" />
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
