import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import {
  Ship,
  TrendingUp,
  Globe,
  ArrowRight,
  PackageCheck,
  Clock,
  Users,
  Handshake,
  MapPin,
  ShieldCheck,
  Headphones,
  BarChart3,
} from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Globe className="h-4 w-4" />
                {t('badge')}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {t('title')}{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {t('subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                    {t('cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    {t('ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-y bg-muted/30 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {[
              { value: '20+', label: t('stats.years'), icon: Clock },
              { value: '50+', label: t('stats.countries'), icon: Globe },
              { value: '1000+', label: t('stats.clients'), icon: Users },
              { value: '24/7', label: t('stats.support'), icon: Headphones },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-center gap-3 px-4 py-6 sm:py-8">
                <stat.icon className="hidden h-5 w-5 text-primary sm:block" />
                <div>
                  <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                  <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('services.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('services.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {[
              { key: 'import', icon: Ship, gradient: 'from-blue-500/10 to-cyan-500/10', iconColor: 'text-blue-600 dark:text-blue-400' },
              { key: 'export', icon: TrendingUp, gradient: 'from-emerald-500/10 to-teal-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
              { key: 'sourcing', icon: PackageCheck, gradient: 'from-violet-500/10 to-purple-500/10', iconColor: 'text-violet-600 dark:text-violet-400' },
              { key: 'transit', icon: BarChart3, gradient: 'from-amber-500/10 to-orange-500/10', iconColor: 'text-amber-600 dark:text-amber-400' },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.key} delay={index * 0.1} direction="up">
                  <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                    <div className="relative">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${service.iconColor}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold">
                        {t(`services.${service.key}.title`)}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {t(`services.${service.key}.description`)}
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/services"
                          className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          {t('cta')}
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="border-y bg-muted/20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('whyUs.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('whyUs.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: 'experience', icon: BarChart3 },
              { key: 'network', icon: Globe },
              { key: 'transparency', icon: ShieldCheck },
              { key: 'support', icon: Headphones },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.key} delay={index * 0.1} direction="up">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">
                      {t(`whyUs.${item.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {t(`whyUs.${item.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t('global.title')}
                </h2>
                <p className="mt-2 text-lg text-primary font-medium">
                  {t('global.subtitle')}
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {t('global.description')}
                </p>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button size="lg" className="shadow-lg shadow-primary/25">
                      {t('cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { key: 'europe', icon: MapPin, count: '15+' },
                  { key: 'asia', icon: MapPin, count: '12+' },
                  { key: 'africa', icon: MapPin, count: '8+' },
                  { key: 'middleEast', icon: MapPin, count: '10+' },
                  { key: 'russia', icon: Handshake, count: '5+' },
                ].map((region) => {
                  const Icon = region.icon;
                  return (
                    <div
                      key={region.key}
                      className="flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-sm"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="mt-2 text-lg font-bold text-primary">{region.count}</div>
                      <div className="text-xs text-muted-foreground">
                        {t(`global.regions.${region.key}`)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/80" />
        <div className="absolute inset-0 -z-10 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              {t('ctaSection.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
              {t('ctaSection.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base font-semibold shadow-xl"
                >
                  {t('ctaSection.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/60">
                {t('ctaSection.note')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
