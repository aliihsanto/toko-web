import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { CTASection } from '@/components/common/cta-section';
import { Link } from '@/i18n/navigation';
import { sectors } from '@/data/sectors';
import Image from 'next/image';
import {
  Wheat, Shirt, Cog, FlaskConical, Building2, Mountain, Cpu, Car,
  Factory, Globe, Award, Package, type LucideIcon,
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
  const t = await getTranslations({ locale, namespace: 'SectorsPage' });

  return getPageMetadata({
    locale,
    path: '/sectors',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

const iconMap: Record<string, LucideIcon> = { Wheat, Shirt, Cog, FlaskConical, Building2, Mountain, Cpu, Car };

export default async function SectorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SectorsPage');

  const stats = [
    { value: '8+', label: t('stats.sectors'), icon: Factory, color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/20' },
    { value: '200+', label: t('stats.products'), icon: Package, color: 'text-[#d4613c]', bg: 'bg-[#d4613c]/8', border: 'border-[#d4613c]/20' },
    { value: '50+', label: t('stats.countries'), icon: Globe, color: 'text-[#2d8a6e]', bg: 'bg-[#2d8a6e]/8', border: 'border-[#2d8a6e]/20' },
    { value: '100%', label: t('stats.certifications'), icon: Award, color: 'text-[#e8a840]', bg: 'bg-[#e8a840]/10', border: 'border-[#e8a840]/20' },
  ];

  return (
    <div>
      <JsonLd data={getBreadcrumbSchema([
        { name: t('breadcrumb.home'), url: `${BASE_URL}/${locale}` },
        { name: t('breadcrumb.sectors'), url: `${BASE_URL}/${locale}/sectors` },
      ])} />
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/images/hero/warehouse.jpg"
        badge={t('hero.badge')}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: t('breadcrumb.home'), href: '/' }, { label: t('breadcrumb.sectors') }]} />
      </div>

      {/* Sectors Grid */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('grid.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('grid.subtitle')}</p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#2d8a6e]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, i) => {
              const Icon = iconMap[sector.iconName] || Factory;
              return (
                <ScrollReveal key={sector.slug} delay={i * 0.08} direction="up">
                  <Link href={`/sectors/${sector.slug}`}>
                    <div className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
                      <Image src={sector.image} alt={t(`sectors.${sector.slug}.title`)} width={800} height={600}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 group-hover:-translate-y-2">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="h-0.5 w-8 rounded-full bg-white/50 transition-all duration-300 group-hover:w-12 group-hover:bg-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{t(`sectors.${sector.slug}.title`)}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-white/70">{t(`sectors.${sector.slug}.description`)}</p>
                        <span className="mt-3 inline-block translate-y-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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

      {/* Stats */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">{t('stats.title')}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t('stats.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`flex flex-col items-center rounded-2xl border ${stat.border} bg-white/70 p-6 text-center backdrop-blur-sm shadow-sm transition-all hover:shadow-md`}>
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${stat.bg}`}>
                      <StatIcon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    <div className={`heading-serif text-4xl ${stat.color}`}>{stat.value}</div>
                    <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection title={t('cta.title')} description={t('cta.description')} buttonText={t('cta.button')} buttonHref="/contact" note={t('cta.note')} />
    </div>
  );
}
