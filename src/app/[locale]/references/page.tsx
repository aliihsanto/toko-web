import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Award } from 'lucide-react';

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ReferencesPage');

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Award className="h-4 w-4" />
            {t('title')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">{t('comingSoon')}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
