import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import Image from 'next/image';
import {
  Eye,
  Target,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Layers,
  Globe,
  Users,
  Clock,
  Award,
} from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  const values = [
    { key: 'reliability', icon: ShieldCheck, color: 'text-amber-600' },
    { key: 'transparency', icon: Layers, color: 'text-emerald-600' },
    { key: 'innovation', icon: Lightbulb, color: 'text-blue-600' },
    { key: 'partnership', icon: Handshake, color: 'text-rose-600' },
  ];

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=2070"
        badge={t('hero.badge')}
      />

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.about') },
            ]}
          />
        </div>
      </div>

      {/* ===== COMPANY OVERVIEW ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Text */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
                  {t('hero.title')}
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  {t('overview.heading')}
                </h2>
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t('overview.p1')}</p>
                  <p>{t('overview.p2')}</p>
                  <p>{t('overview.p3')}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Image */}
            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl transition-colors group-hover:bg-amber-100/50 dark:group-hover:bg-amber-900/10" />
                  <Image
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
                    alt="Toko Trading Team"
                    width={800}
                    height={600}
                    className="relative h-[500px] w-full rounded-3xl object-cover shadow-2xl"
                  />
                  {/* Floating stat badge */}
                  <div className="absolute -bottom-8 -left-8 flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-2xl">
                    <Award className="mb-2 h-8 w-8 text-primary" />
                    <span className="text-2xl font-extrabold leading-none text-primary">20+</span>
                    <span className="mt-1 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {t('stats.years')}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Vision */}
            <ScrollReveal direction="left">
              <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg dark:hover:border-amber-600/30">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Eye className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{t('vision.title')}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t('vision.description')}
                </p>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal direction="right">
              <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-lg dark:hover:border-amber-600/30">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <Target className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="mb-4 text-2xl font-bold">{t('mission.title')}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t('mission.description')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== COMPANY VALUES ===== */}
      <section className="bg-amber-50 py-24 dark:bg-amber-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                {t('values.title')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('values.subtitle')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.key} delay={index * 0.1} direction="up">
                  <div className="group rounded-2xl border border-amber-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-amber-800/30 dark:bg-card">
                    <div className="mb-4">
                      <Icon className={`h-10 w-10 ${value.color}`} />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      {t(`values.${value.key}.title`)}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`values.${value.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== KEY ACHIEVEMENTS / STATS ===== */}
      <section className="relative overflow-hidden bg-[#1e3043] py-24 text-white dark:bg-[#14202e]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { icon: Clock, value: '20+', label: t('stats.years') },
                { icon: Globe, value: '50+', label: t('stats.countries') },
                { icon: Users, value: '1000+', label: t('stats.clients') },
                { icon: Award, value: '75+', label: t('stats.team') },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <stat.icon className="mb-4 h-10 w-10 text-amber-500 transition-transform group-hover:scale-110" />
                  <div className="mb-2 text-4xl font-extrabold">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
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
