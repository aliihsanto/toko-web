import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { WaveDivider } from '@/components/common/wave-divider';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Phone, MapPin, FileCheck, ShieldCheck, Truck, Globe, DollarSign, Scale, ChevronRight } from 'lucide-react';
import { getPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/seo/structured-data';
import { getLocalizedUrl } from '@/lib/i18n-paths';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RussiaTransitPage' });

  return getPageMetadata({
    locale,
    path: '/russia-transit',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

export default async function RussiaTransitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('RussiaTransitPage');

  const advantages = [
    { key: 'location', icon: MapPin, bg: 'bg-blue-50', iconColor: 'text-blue-600', border: 'border-t-blue-500' },
    { key: 'customs', icon: FileCheck, bg: 'bg-[#d4613c]/10', iconColor: 'text-[#d4613c]', border: 'border-t-[#d4613c]' },
    { key: 'logistics', icon: Truck, bg: 'bg-[#2d8a6e]/12', iconColor: 'text-[#2d8a6e]', border: 'border-t-[#2d8a6e]' },
    { key: 'market', icon: Globe, bg: 'bg-violet-50', iconColor: 'text-violet-600', border: 'border-t-violet-500' },
    { key: 'cost', icon: DollarSign, bg: 'bg-rose-50', iconColor: 'text-rose-500', border: 'border-t-rose-500' },
    { key: 'compliance', icon: Scale, bg: 'bg-orange-50', iconColor: 'text-orange-500', border: 'border-t-orange-500' },
  ];

  const routes = [
    { key: 'russia', emoji: '\u{1F1F7}\u{1F1FA}' }, { key: 'kazakhstan', emoji: '\u{1F1F0}\u{1F1FF}' },
    { key: 'azerbaijan', emoji: '\u{1F1E6}\u{1F1FF}' }, { key: 'georgia', emoji: '\u{1F1EC}\u{1F1EA}' },
    { key: 'uzbekistan', emoji: '\u{1F1FA}\u{1F1FF}' },
  ];

  const steps = [
    { key: 'inquiry', number: '01' }, { key: 'planning', number: '02' },
    { key: 'documentation', number: '03' }, { key: 'shipment', number: '04' }, { key: 'delivery', number: '05' },
  ];

  const faqs = ['q1', 'q2', 'q3', 'q4', 'q5'];

  const faqItems = faqs.map((faq) => ({
    question: t(`faq.${faq}.question`),
    answer: t(`faq.${faq}.answer`),
  }));

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: t('breadcrumb.home'), url: getLocalizedUrl('', locale) },
        { name: t('breadcrumb.russiaTransit'), url: getLocalizedUrl('/russia-transit', locale) },
      ])} />
      <JsonLd data={getFAQSchema(faqItems)} />
      {/* Hero — mesh gradient */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#d4613c]/8 blur-[100px]" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />

        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden max-lg:hidden">
          <Image src="/images/hero/istanbul-skyline.webp" alt="Istanbul skyline - Toko Trading" width={2070} height={800} className="h-full w-full object-cover opacity-20" priority />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-primary backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t('hero.badge')}
            </span>
            <h1 className="heading-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">{t('hero.title')}</h1>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t('hero.subtitle')}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl">
                  {t('hero.ctaQuote')}<ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-14 rounded-full border-border/60 bg-white/70 px-8 text-base font-semibold backdrop-blur-sm hover:bg-white hover:shadow-md">
                  <Phone className="mr-2 h-5 w-5" />{t('hero.ctaCall')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <WaveDivider color="#fefcf9" variant="gentle" />
      </section>

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: t('breadcrumb.home'), href: '/' }, { label: t('breadcrumb.russiaTransit') }]} />
        </div>
      </div>

      {/* What Is */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary">{t('whatIs.badge')}</span>
                <h2 className="mt-4 heading-serif text-4xl leading-tight tracking-tight sm:text-5xl">{t('whatIs.title')}</h2>
                <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-[#2d8a6e]" />
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t('whatIs.p1')}</p><p>{t('whatIs.p2')}</p><p>{t('whatIs.p3')}</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/12 via-[#2d8a6e]/8 to-[#d4613c]/8 blur-xl" />
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-[#2d8a6e]/10" />
                  <Image src="/images/services/transit-trade.webp" alt={t('images.trade')} width={800} height={600} className="relative h-[450px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50" />
                  <div className="glass-card absolute -bottom-6 -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-2xl p-4 shadow-xl">
                    <ShieldCheck className="mb-2 h-8 w-8 text-[#2d8a6e]" />
                    <span className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('whatIs.floatingBadge')}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#2d8a6e]">{t('advantages.badge')}</h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('advantages.title')}</h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={adv.key} delay={index * 0.08}>
                  <div className={`rich-card h-full rounded-2xl border-t-4 ${adv.border} p-6`}>
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${adv.bg}`}>
                      <Icon className={`h-7 w-7 ${adv.iconColor}`} />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">{t(`advantages.${adv.key}.title`)}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(`advantages.${adv.key}.description`)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trade Routes */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#2d8a6e]">{t('routes.badge')}</h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('routes.title')}</h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-[#e8a840]" />
            </div>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {routes.map((route, index) => (
              <ScrollReveal key={route.key} delay={index * 0.08}>
                <div className="rich-card group rounded-2xl p-6 text-center">
                  <div className="mb-3 text-3xl">{route.emoji}</div>
                  <div className="mb-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{t('routes.from')}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-bold text-foreground">{t(`routes.${route.key}.destination`)}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{t(`routes.${route.key}.goods`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('process.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('process.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <ScrollReveal key={step.key} delay={index * 0.1}>
                <div className="group relative rounded-2xl border border-border/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
                  <div className="mb-4 heading-serif text-3xl text-primary/25">{step.number}</div>
                  <h4 className="mb-2 text-base font-bold">{t(`process.${step.key}.title`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`process.${step.key}.description`)}</p>
                  {index < steps.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary/20 lg:block" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{t('faq.badge')}</h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('faq.title')}</h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq} delay={index * 0.08}>
                <div className="rich-card rounded-2xl border-l-4 border-l-primary p-6">
                  <h4 className="mb-3 text-lg font-bold">{t(`faq.${faq}.question`)}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(`faq.${faq}.answer`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={t('cta.title')} description={t('cta.description')} buttonText={t('cta.button')} buttonHref="/contact" note={t('cta.note')} />
    </>
  );
}
