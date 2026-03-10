import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import Image from 'next/image';
import { services } from '@/data/services';
import { sectors } from '@/data/sectors';
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
  Headphones,
  BarChart3,
  Factory,
  Search,
  CheckCheck,
  ArrowUpRight,
  ThumbsUp,
  Award,
  MapPin,
  BadgeCheck,
} from 'lucide-react';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <>
      {/* ===== HERO - Full Screen ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background image + dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070"
            alt="International Trade Container Port"
            width={2070}
            height={1380}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14202e]/95 via-[#1e3043]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="mb-6 inline-block rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1 backdrop-blur-sm">
                <span className="text-sm font-semibold uppercase tracking-wide text-amber-500">
                  Toko Global Trade
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
                {t('title')} <br />
                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  {t('titleHighlight')}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-blue-100">
                {t('subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-14 bg-amber-600 px-8 text-base font-bold text-white shadow-lg shadow-amber-600/20 transition-all hover:-translate-y-0.5 hover:bg-amber-700"
                  >
                    {t('cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-white/20 bg-white/10 px-8 text-base font-bold text-white backdrop-blur-md hover:bg-white/20"
                  >
                    {t('ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats - glass cards */}
          <ScrollReveal delay={0.4}>
            <div className="mt-24 grid grid-cols-2 gap-4 pb-12 md:grid-cols-4 md:gap-8">
              {[
                { icon: Factory, value: '1000+', label: t('stats.clients') },
                { icon: Globe, value: '50+', label: t('stats.countries') },
                { icon: Clock, value: '24/7', label: t('stats.support') },
                { icon: ThumbsUp, value: '100%', label: t('stats.years') },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <stat.icon className="mb-3 h-8 w-8 text-amber-500 transition-transform group-hover:scale-110" />
                  <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                {t('services.title')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('services.subtitle')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const keyMap: Record<string, string> = {
                'import': 'import',
                'export': 'export',
                'sourcing': 'sourcing',
                'transit-trade': 'transit',
              };
              const tKey = keyMap[service.slug] || service.slug;
              const Icon = serviceIcons[service.iconName] || Ship;

              return (
                <ScrollReveal key={service.slug} delay={index * 0.1} direction="up">
                  <Link href={`/services/${service.slug}`} className="block">
                    <div className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-2xl md:flex-row">
                      {/* Image */}
                      <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-2/5">
                        <Image
                          src={service.image}
                          alt={t(`services.${tKey}.title`)}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#1e3043]/20 transition-colors group-hover:bg-transparent" />
                      </div>

                      {/* Text */}
                      <div className="relative flex flex-col justify-center p-8 md:w-3/5">
                        <div className="absolute right-6 top-6 opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowUpRight className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="mb-3 text-xl font-bold">{t(`services.${tKey}.title`)}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {t(`services.${tKey}.description`)}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          {t('services.learnMore')}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
      <section className="bg-gray-50 py-16 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '1000+', label: t('trust.clients'), icon: Users },
                { value: '50+', label: t('trust.countries'), icon: MapPin },
                { value: '20+', label: t('trust.years'), icon: Award },
                { value: 'ISO 9001', label: t('trust.certification'), icon: BadgeCheck },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <item.icon className="mb-3 h-8 w-8 text-amber-600" />
                  <div className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
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

      {/* ===== WHY US - Dark Section ===== */}
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
            <div className="mb-16 text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-500">
                {t('whyUs.title')}
              </h2>
              <h3 className="text-3xl font-extrabold sm:text-4xl">
                {t('whyUs.subtitle')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { key: 'experience', icon: Search },
              { key: 'network', icon: Globe },
              { key: 'transparency', icon: ShieldCheck },
              { key: 'support', icon: CheckCheck },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.key} delay={index * 0.1} direction="up">
                  <div className="group relative flex flex-col items-center text-center">
                    {/* Connector line (desktop) */}
                    {index < 3 && (
                      <div className="absolute left-1/2 top-8 -z-10 hidden h-1 w-full bg-[#254363] md:block" />
                    )}
                    <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#254363] bg-[#203952] shadow-lg shadow-black/20 transition-colors duration-300 group-hover:border-amber-500">
                      <Icon className="h-8 w-8 text-amber-500" />
                    </div>
                    <div className="w-full rounded-xl border border-[#254363] bg-[#203952]/50 p-6 transition-colors hover:bg-[#203952]">
                      <h4 className="mb-3 text-xl font-bold">{t(`whyUs.${item.key}.title`)}</h4>
                      <p className="text-sm leading-relaxed text-blue-200">
                        {t(`whyUs.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTORS PREVIEW ===== */}
      <section className="bg-amber-50 py-24 dark:bg-amber-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                {t('sectors.title')}
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('sectors.subtitle')}
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.slice(0, 4).map((sector, index) => (
              <ScrollReveal key={sector.slug} delay={index * 0.1} direction="up">
                <Link href="/sectors" className="group block">
                  <div className="relative h-72 overflow-hidden rounded-2xl shadow-md">
                    <Image
                      src={sector.image}
                      alt={t(`sectors.items.${sector.slug}`)}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h4 className="text-lg font-bold text-white">
                        {t(`sectors.items.${sector.slug}`)}
                      </h4>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link href="/sectors">
                <Button className="bg-amber-600 text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700">
                  {t('sectors.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Text */}
              <div className="lg:col-span-7">
                <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
                  {t('global.subtitle')}
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  {t('global.title')}
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {t('global.description')}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { key: 'europe', count: '15+' },
                    { key: 'asia', count: '12+' },
                    { key: 'africa', count: '8+' },
                    { key: 'middleEast', count: '10+' },
                    { key: 'russia', count: '5+' },
                  ].map((region) => (
                    <span
                      key={region.key}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary"
                    >
                      {t(`global.regions.${region.key}`)} · {region.count}
                    </span>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/contact">
                    <Button className="bg-amber-600 text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700">
                      {t('cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative lg:col-span-5">
                <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
                <Image
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800"
                  alt="Istanbul - Trade Gateway"
                  width={800}
                  height={600}
                  className="relative h-[500px] w-full rounded-3xl object-cover shadow-2xl"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-2xl">
                  <Handshake className="mb-2 h-8 w-8 text-primary" />
                  <span className="text-2xl font-extrabold leading-none text-primary">50+</span>
                  <span className="mt-1 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t('stats.countries')}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-[#1e3043] py-24 dark:bg-[#14202e]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t('ctaSection.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-200">
              {t('ctaSection.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-14 bg-amber-600 px-8 text-base font-bold text-white shadow-xl hover:bg-amber-700"
                >
                  {t('ctaSection.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-blue-300/50">
              {t('ctaSection.note')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
