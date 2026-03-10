import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { Globe, Ship, TrendingUp, Shield, ArrowRight } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  const features = [
    { key: 'import', icon: Ship },
    { key: 'export', icon: TrendingUp },
    { key: 'sourcing', icon: Globe },
    { key: 'trust', icon: Shield },
  ] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            {t('subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t('description')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-3 text-base">
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="px-8 py-3 text-base">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              {t('features.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.key} delay={index * 0.1} direction="up">
                  <div className="flex flex-col items-center rounded-xl border bg-background p-8 text-center shadow-sm transition-shadow duration-200 hover:shadow-md">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('ctaSection.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t('ctaSection.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="px-8 py-3 text-base">
                  {t('ctaSection.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
