import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Factory, Wheat, Shirt, Cpu, FlaskConical, Hammer, Layers } from 'lucide-react';

export default async function SectorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SectorsPage');

  const sectors = [
    { icon: Wheat, color: 'text-amber-600 dark:text-amber-400' },
    { icon: Shirt, color: 'text-pink-600 dark:text-pink-400' },
    { icon: Cpu, color: 'text-blue-600 dark:text-blue-400' },
    { icon: FlaskConical, color: 'text-emerald-600 dark:text-emerald-400' },
    { icon: Hammer, color: 'text-orange-600 dark:text-orange-400' },
    { icon: Layers, color: 'text-violet-600 dark:text-violet-400' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Factory className="h-4 w-4" />
            {t('title')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
        {sectors.map((sector, i) => {
          const Icon = sector.icon;
          return (
            <ScrollReveal key={i} delay={i * 0.08} direction="up">
              <div className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-md sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className={`h-7 w-7 ${sector.color}`} />
                </div>
                <div className="mt-6 h-2 w-20 rounded-full bg-muted animate-pulse" />
                <div className="mt-3 h-2 w-28 rounded-full bg-muted animate-pulse" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">{t('comingSoon')}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
