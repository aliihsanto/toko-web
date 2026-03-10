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
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070"
            alt="International Trade Container Port"
            width={2070}
            height={1380}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-sm">
                Toko Global Trade
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {t('title')} <br />
                <span className="text-amber-400">{t('titleHighlight')}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {t('subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-13 rounded-xl bg-amber-500 px-7 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 hover:bg-amber-600"
                  >
                    {t('cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 rounded-xl border-white/20 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    {t('ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats strip */}
          <ScrollReveal delay={0.4}>
            <div className="mt-20 grid grid-cols-2 gap-3 pb-10 md:grid-cols-4 md:gap-6">
              {[
                { icon: Factory, value: '1000+', label: t('stats.clients') },
                { icon: Globe, value: '50+', label: t('stats.countries') },
                { icon: Clock, value: '24/7', label: t('stats.support') },
                { icon: ThumbsUp, value: '100%', label: t('stats.years') },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
                >
                  <stat.icon className="mb-2 h-6 w-6 text-amber-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
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
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                {t('services.title')}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t('services.subtitle')}
              </h2>
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

              return (
                <ScrollReveal key={service.slug} delay={index * 0.1} direction="up">
                  <Link href={`/services/${service.slug}`} className="group block">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-card md:flex-row">
                      <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-2/5">
                        <Image
                          src={service.image}
                          alt={t(`services.${tKey}.title`)}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative flex flex-col justify-center p-7 md:w-3/5">
                        <div className="absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowUpRight className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{t(`services.${tKey}.title`)}</h3>
                        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3 dark:text-slate-400">
                          {t(`services.${tKey}.description`)}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
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
      <section className="border-y border-slate-100 bg-slate-50 py-14 dark:border-slate-800 dark:bg-card">
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
                  <item.icon className="mb-3 h-7 w-7 text-amber-500" />
                  <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                {t('whyUs.title')}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t('whyUs.subtitle')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: 'experience', icon: Search, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
              { key: 'network', icon: Globe, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' },
              { key: 'transparency', icon: ShieldCheck, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
              { key: 'support', icon: CheckCheck, color: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.key} delay={index * 0.1} direction="up">
                  <div className="group rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:border-slate-200 hover:shadow-lg dark:border-slate-800 dark:bg-card dark:hover:border-slate-700">
                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{t(`whyUs.${item.key}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
      <section className="bg-slate-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                {t('sectors.title')}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t('sectors.subtitle')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.slice(0, 4).map((sector, index) => (
              <ScrollReveal key={sector.slug} delay={index * 0.1} direction="up">
                <Link href="/sectors" className="group block">
                  <div className="relative h-72 overflow-hidden rounded-2xl">
                    <Image
                      src={sector.image}
                      alt={t(`sectors.items.${sector.slug}`)}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
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
                <Button className="rounded-xl bg-amber-600 px-6 text-white shadow-sm hover:bg-amber-700">
                  {t('sectors.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== GLOBAL REACH ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
                  {t('global.subtitle')}
                </span>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {t('global.title')}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {t(`global.regions.${region.key}`)} · {region.count}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact">
                    <Button className="rounded-xl bg-amber-600 px-6 text-white shadow-sm hover:bg-amber-700">
                      {t('cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <Image
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800"
                  alt="Istanbul - Trade Gateway"
                  width={800}
                  height={600}
                  className="h-[480px] w-full rounded-2xl object-cover shadow-xl"
                />
                <div className="absolute -bottom-5 -left-5 flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-card">
                  <Handshake className="mb-1.5 h-7 w-7 text-amber-500" />
                  <span className="text-2xl font-extrabold leading-none text-slate-900 dark:text-white">50+</span>
                  <span className="mt-1 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {t('stats.countries')}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 py-24">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t('ctaSection.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-amber-100">
              {t('ctaSection.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-14 rounded-xl bg-white px-8 text-base font-bold text-amber-700 shadow-xl shadow-amber-900/20 transition-all hover:-translate-y-0.5 hover:bg-amber-50"
                >
                  {t('ctaSection.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-amber-200/70">
              {t('ctaSection.note')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
