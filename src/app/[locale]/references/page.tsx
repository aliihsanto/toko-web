import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import {
  Wheat,
  Shirt,
  Cog,
  FlaskConical,
  Building2,
  Mountain,
  Cpu,
  Car,
  Star,
  Quote,
  Globe,
} from 'lucide-react';

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ReferencesPage');

  const stats = [
    { value: '1000+', key: 'transactions' },
    { value: '50+', key: 'countries' },
    { value: '20+', key: 'experience' },
    { value: '8+', key: 'sectors' },
  ];

  const industries = [
    { key: 'food', icon: Wheat, color: 'text-amber-600' },
    { key: 'textile', icon: Shirt, color: 'text-rose-600' },
    { key: 'machinery', icon: Cog, color: 'text-blue-600' },
    { key: 'chemicals', icon: FlaskConical, color: 'text-emerald-600' },
    { key: 'construction', icon: Building2, color: 'text-orange-600' },
    { key: 'rawMaterials', icon: Mountain, color: 'text-stone-600' },
    { key: 'electronics', icon: Cpu, color: 'text-violet-600' },
    { key: 'automotive', icon: Car, color: 'text-red-600' },
  ];

  const testimonials = ['t1', 't2', 't3'];

  const regions = [
    { key: 'europe', count: '15+' },
    { key: 'middleEast', count: '10+' },
    { key: 'asia', count: '12+' },
    { key: 'africa', count: '8+' },
    { key: 'russiaCis', count: '5+' },
  ];

  const corridors = [
    { key: 'turkeyGermany' },
    { key: 'turkeyRussia' },
    { key: 'turkeyUae' },
    { key: 'turkeyUsaUk' },
  ];

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2070"
        badge={t('hero.badge')}
      />

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.references') },
            ]}
          />
        </div>
      </div>

      {/* ===== KEY STATISTICS ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('stats.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('stats.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.key} delay={index * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="mb-2 text-4xl font-extrabold text-amber-600 sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {t(`stats.${stat.key}`)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SERVED ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500">
                {t('industries.badge')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('industries.title')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <ScrollReveal key={industry.key} delay={index * 0.05}>
                  <div className="group rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg dark:bg-background dark:hover:border-amber-600/30">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-amber-100 dark:bg-muted dark:group-hover:bg-amber-900/30">
                      <Icon className={`h-7 w-7 ${industry.color}`} />
                    </div>
                    <h4 className="mb-1 text-sm font-bold">
                      {t(`industries.${industry.key}.title`)}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t(`industries.${industry.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CLIENT TESTIMONIALS ===== */}
      <section className="bg-amber-50 py-24 dark:bg-amber-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                {t('testimonials.badge')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('testimonials.title')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.1}>
                <div className="relative rounded-2xl border border-amber-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-amber-800/30 dark:bg-card">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-amber-200 dark:text-amber-800/40" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t(`testimonials.${key}.quote`)}&rdquo;
                  </blockquote>
                  <div className="border-t border-amber-100 pt-4 dark:border-amber-800/20">
                    <div className="text-sm font-bold">{t(`testimonials.${key}.company`)}</div>
                    <div className="text-xs text-muted-foreground">
                      {t(`testimonials.${key}.role`)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLOBAL PRESENCE ===== */}
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 text-amber-500" />
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('global.title')}
              </h2>
              <p className="mt-4 text-lg text-brand-dark-text">
                {t('global.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {regions.map((region) => (
                <div
                  key={region.key}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <span className="font-bold">{t(`global.regions.${region.key}`)}</span>
                  <span className="ml-2 text-amber-400">({region.count} {t('global.countriesLabel')})</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark-text-muted">
                {t('global.corridorsTitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {corridors.map((corridor) => (
                  <span
                    key={corridor.key}
                    className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300"
                  >
                    {t(`global.corridors.${corridor.key}`)}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        buttonHref="/contact"
        note={t('cta.note')}
      />
    </>
  );
}
