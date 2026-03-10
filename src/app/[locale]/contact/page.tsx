import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactPage');

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <MessageCircle className="h-4 w-4" />
            {t('title')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: MapPin, value: t('info.address'), color: 'text-blue-600 dark:text-blue-400' },
            { icon: Phone, value: t('info.phone'), color: 'text-emerald-600 dark:text-emerald-400' },
            { icon: Mail, value: t('info.email'), color: 'text-violet-600 dark:text-violet-400' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center rounded-2xl border bg-card p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className={`h-7 w-7 ${item.color}`} />
                </div>
                <p className="mt-4 font-medium">{item.value}</p>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">{t('comingSoon')}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
