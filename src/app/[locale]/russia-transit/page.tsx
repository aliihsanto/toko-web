import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  MapPin,
  FileCheck,
  ShieldCheck,
  Truck,
  Globe,
  DollarSign,
  Scale,
  Package,
  ChevronRight,
} from 'lucide-react';

export default async function RussiaTransitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('RussiaTransitPage');

  const advantages = [
    { key: 'location', icon: MapPin, color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600' },
    { key: 'customs', icon: FileCheck, color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600' },
    { key: 'logistics', icon: Truck, color: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600' },
    { key: 'market', icon: Globe, color: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600' },
    { key: 'cost', icon: DollarSign, color: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600' },
    { key: 'compliance', icon: Scale, color: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600' },
  ];

  const routes = [
    { key: 'russia', emoji: '🇷🇺' },
    { key: 'kazakhstan', emoji: '🇰🇿' },
    { key: 'azerbaijan', emoji: '🇦🇿' },
    { key: 'georgia', emoji: '🇬🇪' },
    { key: 'uzbekistan', emoji: '🇺🇿' },
  ];

  const steps = [
    { key: 'inquiry', number: '01' },
    { key: 'planning', number: '02' },
    { key: 'documentation', number: '03' },
    { key: 'shipment', number: '04' },
    { key: 'delivery', number: '05' },
  ];

  const faqs = ['q1', 'q2', 'q3', 'q4', 'q5'];

  return (
    <>
      {/* ===== ENHANCED PAGE HERO ===== */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=2070"
            alt=""
            width={2070}
            height={800}
            className="h-full w-full object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark/90" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="mb-6 inline-block rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-amber-500 backdrop-blur-sm">
                {t('hero.badge')}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {t('hero.title')}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-brand-dark-text">
                {t('hero.subtitle')}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-14 bg-amber-600 px-8 text-base font-bold text-white shadow-xl hover:bg-amber-700"
                  >
                    {t('hero.ctaQuote')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 border-white/30 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm hover:bg-white/10"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {t('hero.ctaCall')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.russiaTransit') },
            ]}
          />
        </div>
      </div>

      {/* ===== WHAT IS TRANSIT TRADE ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
                  {t('whatIs.badge')}
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  {t('whatIs.title')}
                </h2>
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t('whatIs.p1')}</p>
                  <p>{t('whatIs.p2')}</p>
                  <p>{t('whatIs.p3')}</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl transition-colors group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/10" />
                  <Image
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?auto=format&fit=crop&q=80&w=800"
                    alt="Turkey-Russia Trade Corridor"
                    width={800}
                    height={600}
                    className="relative h-[450px] w-full rounded-3xl object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-3xl border border-border bg-card p-4 shadow-2xl">
                    <ShieldCheck className="mb-2 h-8 w-8 text-emerald-600" />
                    <span className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {t('whatIs.floatingBadge')}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500">
                {t('advantages.badge')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('advantages.title')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={adv.key} delay={index * 0.08}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg dark:bg-background dark:hover:border-emerald-600/30">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${adv.color}`}>
                      <Icon className={`h-7 w-7 ${adv.iconColor}`} />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      {t(`advantages.${adv.key}.title`)}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`advantages.${adv.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRADE ROUTES ===== */}
      <section className="bg-emerald-50 py-24 dark:bg-emerald-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-500">
                {t('routes.badge')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('routes.title')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {routes.map((route, index) => (
              <ScrollReveal key={route.key} delay={index * 0.08}>
                <div className="group rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg dark:border-emerald-800/30 dark:bg-card">
                  <div className="mb-3 text-3xl">{route.emoji}</div>
                  <div className="mb-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{t('routes.from')}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-bold text-foreground">{t(`routes.${route.key}.destination`)}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t(`routes.${route.key}.goods`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
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
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('process.title')}
              </h2>
              <p className="mt-4 text-lg text-brand-dark-text">
                {t('process.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <ScrollReveal key={step.key} delay={index * 0.1}>
                <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:bg-white/10">
                  <div className="mb-4 text-3xl font-extrabold text-amber-500/60">
                    {step.number}
                  </div>
                  <h4 className="mb-2 text-base font-bold">
                    {t(`process.${step.key}.title`)}
                  </h4>
                  <p className="text-sm text-brand-dark-text">
                    {t(`process.${step.key}.description`)}
                  </p>
                  {index < steps.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-amber-500/40 lg:block" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                {t('faq.badge')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('faq.title')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq} delay={index * 0.08}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h4 className="mb-3 text-lg font-bold">
                    {t(`faq.${faq}.question`)}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`faq.${faq}.answer`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENHANCED CTA ===== */}
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
