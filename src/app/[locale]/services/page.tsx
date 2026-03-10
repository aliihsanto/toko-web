import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Ship, TrendingUp, PackageCheck, BarChart3, Briefcase } from 'lucide-react';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ServicesPage');
  const tHome = await getTranslations('HomePage');

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Briefcase className="h-4 w-4" />
            {t('title')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[
          { key: 'import', icon: Ship, gradient: 'from-blue-500/10 to-cyan-500/10', iconColor: 'text-blue-600 dark:text-blue-400' },
          { key: 'export', icon: TrendingUp, gradient: 'from-emerald-500/10 to-teal-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
          { key: 'sourcing', icon: PackageCheck, gradient: 'from-violet-500/10 to-purple-500/10', iconColor: 'text-violet-600 dark:text-violet-400' },
          { key: 'transit', icon: BarChart3, gradient: 'from-amber-500/10 to-orange-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
        ].map((service, index) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.key} delay={index * 0.1} direction="up">
              <div className={`relative overflow-hidden rounded-2xl border bg-card p-8`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`} />
                <div className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${service.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">{tHome(`services.${service.key}.title`)}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{tHome(`services.${service.key}.description`)}</p>
                </div>
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
