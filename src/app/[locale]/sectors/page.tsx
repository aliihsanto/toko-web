import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { CTASection } from '@/components/common/cta-section';
import { Link } from '@/i18n/navigation';
import { sectors } from '@/data/sectors';
import Image from 'next/image';
import {
  Wheat,
  Shirt,
  Cog,
  FlaskConical,
  Building2,
  Mountain,
  Cpu,
  Car,
  Factory,
  Globe,
  Award,
  Package,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Wheat,
  Shirt,
  Cog,
  FlaskConical,
  Building2,
  Mountain,
  Cpu,
  Car,
};

export default async function SectorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SectorsPage');

  const stats = [
    { value: '8+', label: t('stats.sectors'), icon: Factory },
    { value: '200+', label: t('stats.products'), icon: Package },
    { value: '50+', label: t('stats.countries'), icon: Globe },
    { value: '100%', label: t('stats.certifications'), icon: Award },
  ];

  return (
    <div>
      {/* Hero */}
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
        badge={t('hero.badge')}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.sectors') },
          ]}
        />
      </div>

      {/* Sectors Grid */}
      <section className="bg-white py-16 dark:bg-background sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('grid.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('grid.subtitle')}</p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-600" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, i) => {
              const Icon = iconMap[sector.iconName] || Factory;
              return (
                <ScrollReveal key={sector.slug} delay={i * 0.08} direction="up">
                  <Link href={`/sectors/${sector.slug}`}>
                    <div className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl">
                      <Image
                        src={sector.image}
                        alt={t(`sectors.${sector.slug}.title`)}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent transition-colors duration-300 group-hover:from-brand-dark/80" />

                      {/* Content - slides up on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 group-hover:-translate-y-2">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 backdrop-blur-sm">
                            <Icon className="h-4 w-4 text-amber-400" />
                          </div>
                          <div className="h-1 w-8 rounded-full bg-amber-500 transition-all duration-300 group-hover:w-12" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {t(`sectors.${sector.slug}.title`)}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-blue-100/80 transition-opacity duration-300">
                          {t(`sectors.${sector.slug}.description`)}
                        </p>
                        <span className="mt-3 inline-block translate-y-4 text-sm font-semibold text-amber-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {t('explore')} &rarr;
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

      {/* Industry Stats Section */}
      <section className="bg-emerald-50 py-16 dark:bg-emerald-950/20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('stats.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('stats.subtitle')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <StatIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        buttonHref="/contact"
        note={t('cta.note')}
      />
    </div>
  );
}
