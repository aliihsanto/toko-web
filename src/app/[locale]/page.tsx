import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { WaveDivider } from '@/components/common/wave-divider';
import Image from 'next/image';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';
import { getAlternates, LOCALE_TO_OG, BASE_URL } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    description: t('description'),
    alternates: getAlternates(locale, ''),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}`,
      locale: LOCALE_TO_OG[locale],
      type: 'website',
    },
  };
}
import {
  Ship,
  TrendingUp,
  Globe,
  ArrowRight,
  PackageCheck,
  Clock,
  Users,
  Handshake,
  ShieldCheck,
  BarChart3,
  Factory,
  Search,
  CheckCheck,
  ArrowUpRight,
  ThumbsUp,
  Award,
  MapPin,
} from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
};

const serviceAccents: Record<string, { border: string; bg: string; text: string }> = {
  Ship: { border: 'border-t-blue-500', bg: 'bg-blue-50', text: 'text-blue-600' },
  TrendingUp: { border: 'border-t-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  PackageCheck: { border: 'border-t-[#d4613c]', bg: 'bg-[#d4613c]/10', text: 'text-[#d4613c]' },
  BarChart3: { border: 'border-t-violet-500', bg: 'bg-violet-50', text: 'text-violet-600' },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden mesh-hero">
        {/* Extra vivid decorative elements */}
        <div className="absolute -right-32 top-16 h-[500px] w-[500px] rounded-full bg-[#0d7377]/12 blur-[120px]" />
        <div className="absolute -left-32 bottom-16 h-[400px] w-[400px] rounded-full bg-[#d4613c]/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e8a840]/8 blur-[80px]" />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-grid text-[#0d7377]/[0.02]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 pt-10 pb-24 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:pt-12 lg:pb-32">
          {/* Left content */}
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Toko Global Trade
            </span>

            <h1 className="mt-7 heading-serif text-5xl leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t('title')} <br />
              <span className="gradient-text">{t('titleHighlight')}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t('subtitle')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-13 rounded-full bg-primary px-7 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  {t('cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-full border-border/60 bg-white/70 px-7 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
                >
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Factory, value: '1000+', label: t('stats.clients'), color: 'text-primary', bg: 'bg-primary/8' },
                { icon: Globe, value: '50+', label: t('stats.countries'), color: 'text-[#d4613c]', bg: 'bg-[#d4613c]/8' },
                { icon: Clock, value: '24/7', label: t('stats.support'), color: 'text-[#2d8a6e]', bg: 'bg-[#2d8a6e]/8' },
                { icon: ThumbsUp, value: '100%', label: t('stats.years'), color: 'text-[#e8a840]', bg: 'bg-[#e8a840]/10' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-white/50 p-3 backdrop-blur-sm">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex-1 max-lg:w-full">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#0d7377]/15 via-[#d4613c]/10 to-[#e8a840]/10 blur-xl" />
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#0d7377]/20 via-transparent to-[#d4613c]/15" />
              <Image
                src="/images/hero/trade-hero.webp"
                alt={t('images.hero')}
                width={2070}
                height={1380}
                className="relative h-[500px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50 lg:h-[560px]"
                priority
              />
              {/* Floating badge — glass effect */}
              <div className="glass-card absolute -bottom-6 -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-2xl p-4 shadow-xl">
                <Handshake className="mb-1 h-7 w-7 text-primary" />
                <span className="text-3xl font-bold leading-none text-foreground">50+</span>
                <span className="mt-1 text-center text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t('stats.countries')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <WaveDivider color="#fefcf9" variant="smooth" />
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('services.title')}
              </span>
              <h2 className="mt-3 heading-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                {t('services.subtitle')}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const keyMap: Record<string, string> = {
                'import': 'import',
                'export': 'export',
                'sourcing': 'sourcing',
                'transit-trade': 'transit',
              };
              const tKey = keyMap[service.slug] || service.slug;
              const Icon = serviceIcons[service.iconName] || Ship;
              const accent = serviceAccents[service.iconName] || serviceAccents.Ship;

              return (
                <ScrollReveal key={service.slug} delay={index * 0.1} direction="up">
                  <Link href={{pathname: '/services/[slug]', params: {slug: service.slug}}} className="group block">
                    <div className={`rich-card flex h-full flex-col overflow-hidden rounded-2xl border-t-4 ${accent.border} md:flex-row`}>
                      <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-2/5">
                        <Image
                          src={service.image}
                          alt={t(`services.${tKey}.title`)}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>
                      <div className="relative flex flex-col justify-center p-7 md:w-3/5">
                        <div className="absolute right-5 top-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                          <ArrowUpRight className={`h-5 w-5 ${accent.text}`} />
                        </div>
                        <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg}`}>
                          <Icon className={`h-5 w-5 ${accent.text}`} />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-foreground">{t(`services.${tKey}.title`)}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {t(`services.${tKey}.description`)}
                        </p>
                        <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${accent.text}`}>
                          {t('services.learnMore')}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 mesh-cool" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '1000+', label: t('trust.clients'), icon: Users, color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/20' },
                { value: '50+', label: t('trust.countries'), icon: MapPin, color: 'text-[#d4613c]', bg: 'bg-[#d4613c]/8', border: 'border-[#d4613c]/20' },
                { value: '20+', label: t('trust.years'), icon: Award, color: 'text-[#2d8a6e]', bg: 'bg-[#2d8a6e]/8', border: 'border-[#2d8a6e]/20' },
              ].map((item) => (
                <div key={item.label} className={`flex flex-col items-center rounded-2xl border ${item.border} bg-white/70 p-6 text-center backdrop-blur-sm shadow-sm transition-all hover:shadow-md`}>
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="heading-serif text-3xl tracking-tight text-foreground md:text-4xl">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#d4613c]">
                {t('whyUs.title')}
              </span>
              <h2 className="mt-3 heading-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                {t('whyUs.subtitle')}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: 'experience', icon: Search, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-t-blue-500' },
              { key: 'network', icon: Globe, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-t-emerald-500' },
              { key: 'transparency', icon: ShieldCheck, bg: 'bg-[#d4613c]/10', text: 'text-[#d4613c]', border: 'border-t-[#d4613c]' },
              { key: 'support', icon: CheckCheck, bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-t-violet-500' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.key} delay={index * 0.1} direction="up">
                  <div className={`rich-card rounded-2xl border-t-4 ${item.border} p-7`}>
                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                      <Icon className={`h-6 w-6 ${item.text}`} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{t(`whyUs.${item.key}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`whyUs.${item.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTORS PREVIEW ===== */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#2d8a6e]">
                {t('sectors.title')}
              </span>
              <h2 className="mt-3 heading-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                {t('sectors.subtitle')}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.slice(0, 4).map((sector, index) => (
              <ScrollReveal key={sector.slug} delay={index * 0.1} direction="up">
                <Link href="/sectors" className="group block">
                  <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
                    <Image
                      src={sector.image}
                      alt={t(`sectors.items.${sector.slug}`)}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 h-0.5 w-8 rounded-full bg-white/60 transition-all group-hover:w-14 group-hover:bg-white" />
                      <h3 className="text-lg font-bold text-white">
                        {t(`sectors.items.${sector.slug}`)}
                      </h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link href="/sectors">
                <Button className="rounded-full bg-primary px-6 text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg">
                  {t('sectors.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#2d8a6e]">
                  {t('global.subtitle')}
                </span>
                <h2 className="mt-3 heading-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
                  {t('global.title')}
                </h2>
                <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#2d8a6e] to-primary" />
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {t('global.description')}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { key: 'europe', count: '15+' },
                    { key: 'asia', count: '12+' },
                    { key: 'africa', count: '8+' },
                    { key: 'middleEast', count: '10+' },
                    { key: 'russia', count: '5+' },
                  ].map((region) => (
                    <span
                      key={region.key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                    >
                      {t(`global.regions.${region.key}`)} · <span className="font-bold text-primary">{region.count}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact">
                    <Button className="rounded-full bg-primary px-6 text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg">
                      {t('cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#2d8a6e]/12 via-primary/8 to-[#d4613c]/8 blur-xl" />
                <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-[#2d8a6e]/15 via-transparent to-[#d4613c]/10" />
                <Image
                  src="/images/hero/istanbul-skyline.webp"
                  alt={t('images.istanbul')}
                  width={800}
                  height={600}
                  className="relative h-[480px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a5c5f] via-[#0d7377] to-[#0f8a8e] py-28">
        <WaveDivider flip color="#fefcf9" variant="steep" />
        <div className="absolute inset-0 dot-grid text-white/[0.03]" />
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#d4613c]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="heading-serif text-3xl text-white sm:text-4xl lg:text-5xl">
              {t('ctaSection.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
              {t('ctaSection.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-14 rounded-full bg-white px-8 text-base font-semibold text-[#0a5c5f] shadow-xl shadow-black/15 transition-all hover:-translate-y-1 hover:bg-white/95 hover:shadow-2xl"
                >
                  {t('ctaSection.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/40">
              {t('ctaSection.note')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
