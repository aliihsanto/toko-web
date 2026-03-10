import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { Wheat, Shirt, Cog, FlaskConical, Building2, Mountain, Cpu, Car, Star, Quote, Globe } from 'lucide-react';

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
    { key: 'food', icon: Wheat, color: 'text-[#d4613c]' },
    { key: 'textile', icon: Shirt, color: 'text-rose-500' },
    { key: 'machinery', icon: Cog, color: 'text-blue-600' },
    { key: 'chemicals', icon: FlaskConical, color: 'text-[#2d8a6e]' },
    { key: 'construction', icon: Building2, color: 'text-orange-500' },
    { key: 'rawMaterials', icon: Mountain, color: 'text-stone-500' },
    { key: 'electronics', icon: Cpu, color: 'text-violet-600' },
    { key: 'automotive', icon: Car, color: 'text-red-500' },
  ];

  const testimonials = ['t1', 't2', 't3'];
  const regions = [
    { key: 'europe', count: '15+' }, { key: 'middleEast', count: '10+' },
    { key: 'asia', count: '12+' }, { key: 'africa', count: '8+' }, { key: 'russiaCis', count: '5+' },
  ];
  const corridors = [{ key: 'turkeyGermany' }, { key: 'turkeyRussia' }, { key: 'turkeyUae' }, { key: 'turkeyUsaUk' }];

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2070"
        badge={t('hero.badge')} />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: t('breadcrumb.home'), href: '/' }, { label: t('breadcrumb.references') }]} />
        </div>
      </div>

      {/* Key Statistics */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('stats.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('stats.subtitle')}</p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.key} delay={index * 0.1}>
                <div className="rich-card rounded-2xl p-8 text-center">
                  <div className="heading-serif mb-2 text-4xl text-primary sm:text-5xl">{stat.value}</div>
                  <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{t(`stats.${stat.key}`)}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#2d8a6e]">{t('industries.badge')}</h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('industries.title')}</h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <ScrollReveal key={industry.key} delay={index * 0.05}>
                  <div className="rich-card group rounded-2xl p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                      <Icon className={`h-7 w-7 ${industry.color}`} />
                    </div>
                    <h4 className="mb-1 text-sm font-bold">{t(`industries.${industry.key}.title`)}</h4>
                    <p className="text-xs text-muted-foreground">{t(`industries.${industry.key}.description`)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#d4613c]">{t('testimonials.badge')}</h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('testimonials.title')}</h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            </div>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.1}>
                <div className="rich-card relative rounded-2xl border-t-4 border-t-[#e8a840] p-8">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#e8a840] text-[#e8a840]" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t(`testimonials.${key}.quote`)}&rdquo;
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="text-sm font-bold">{t(`testimonials.${key}.company`)}</div>
                    <div className="text-xs text-muted-foreground">{t(`testimonials.${key}.role`)}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('global.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('global.subtitle')}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {regions.map((region) => (
                <div key={region.key} className="rounded-full border border-border/60 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <span className="font-bold">{t(`global.regions.${region.key}`)}</span>
                  <span className="ml-2 font-bold text-primary">({region.count} {t('global.countriesLabel')})</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('global.corridorsTitle')}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {corridors.map((corridor) => (
                  <span key={corridor.key} className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                    {t(`global.corridors.${corridor.key}`)}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection title={t('cta.title')} description={t('cta.description')} buttonText={t('cta.button')} buttonHref="/contact" note={t('cta.note')} />
    </>
  );
}
