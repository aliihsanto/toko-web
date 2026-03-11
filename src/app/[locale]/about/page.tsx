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
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return getPageMetadata({
    locale,
    path: '/about',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  const values = [
    { key: 'reliability', icon: ShieldCheck, bg: 'bg-primary/10', color: 'text-primary', border: 'border-t-primary' },
    { key: 'transparency', icon: Layers, bg: 'bg-[#2d8a6e]/12', color: 'text-[#2d8a6e]', border: 'border-t-[#2d8a6e]' },
    { key: 'innovation', icon: Lightbulb, bg: 'bg-blue-50', color: 'text-blue-600', border: 'border-t-blue-500' },
    { key: 'partnership', icon: Handshake, bg: 'bg-[#d4613c]/10', color: 'text-[#d4613c]', border: 'border-t-[#d4613c]' },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: t('breadcrumb.home'), url: `${BASE_URL}/${locale}` },
        { name: t('breadcrumb.about'), url: `${BASE_URL}/${locale}/about` },
      ])} />
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/images/hero/istanbul-skyline.webp"
        badge={t('hero.badge')}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.about') },
            ]}
          />
        </div>
      </div>

      {/* Company Overview */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary">
                  {t('hero.title')}
                </span>
                <h2 className="mt-4 heading-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  {t('overview.heading')}
                </h2>
                <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
                <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t('overview.p1')}</p>
                  <p>{t('overview.p2')}</p>
                  <p>{t('overview.p3')}</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/12 via-[#d4613c]/8 to-[#e8a840]/8 blur-xl" />
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-[#d4613c]/10" />
                  <Image
                    src="/images/hero/handshake-deal.webp"
                    alt={t('images.team')}
                    width={800}
                    height={600}
                    className="relative h-[500px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50"
                  />
                  <div className="glass-card absolute -bottom-8 -left-8 flex h-36 w-36 flex-col items-center justify-center rounded-2xl p-6 shadow-xl">
                    <Award className="mb-2 h-8 w-8 text-[#d4613c]" />
                    <span className="heading-serif text-2xl leading-none text-[#d4613c]">20+</span>
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

      {/* Vision & Mission */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="rich-card h-full rounded-2xl border-t-4 border-t-primary p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-4 heading-serif text-2xl">{t('vision.title')}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t('vision.description')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rich-card h-full rounded-2xl border-t-4 border-t-[#d4613c] p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d4613c]/10">
                  <Target className="h-7 w-7 text-[#d4613c]" />
                </div>
                <h3 className="mb-4 heading-serif text-2xl">{t('mission.title')}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t('mission.description')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                {t('values.title')}
              </h2>
              <h3 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t('values.subtitle')}
              </h3>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#2d8a6e]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.key} delay={index * 0.1} direction="up">
                  <div className={`rich-card rounded-2xl border-t-4 ${value.border} p-6`}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${value.bg}`}>
                      <Icon className={`h-6 w-6 ${value.color}`} />
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

      {/* Stats */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { icon: Clock, value: '20+', label: t('stats.years'), color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/20' },
                { icon: Globe, value: '50+', label: t('stats.countries'), color: 'text-[#d4613c]', bg: 'bg-[#d4613c]/8', border: 'border-[#d4613c]/20' },
                { icon: Users, value: '1000+', label: t('stats.clients'), color: 'text-[#2d8a6e]', bg: 'bg-[#2d8a6e]/8', border: 'border-[#2d8a6e]/20' },
                { icon: Award, value: '75+', label: t('stats.team'), color: 'text-[#e8a840]', bg: 'bg-[#e8a840]/10', border: 'border-[#e8a840]/20' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`group flex flex-col items-center rounded-2xl border ${stat.border} bg-white/70 p-8 text-center backdrop-blur-sm shadow-sm transition-all hover:shadow-lg`}
                >
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${stat.bg}`}>
                    <stat.icon className={`h-7 w-7 ${stat.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <div className="heading-serif mb-2 text-4xl">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

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
