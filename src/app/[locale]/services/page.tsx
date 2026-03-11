import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Award,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import { services } from '@/data/services';
import { getPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import { getLocalizedUrl } from '@/lib/i18n-paths';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });

  return getPageMetadata({
    locale,
    path: '/services',
    title: t('seo.title'),
    description: t('seo.description'),
  });
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
};

const colorMap: Record<string, { bg: string; text: string; check: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', check: 'text-blue-500', border: 'border-l-blue-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', check: 'text-emerald-500', border: 'border-l-emerald-500' },
  amber: { bg: 'bg-[#d4613c]/10', text: 'text-[#d4613c]', check: 'text-[#d4613c]', border: 'border-l-[#d4613c]' },
  rose: { bg: 'bg-violet-50', text: 'text-violet-600', check: 'text-violet-500', border: 'border-l-violet-500' },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ServicesPage');

  const whyChooseItems = [
    { key: 'endToEnd', icon: Headphones, color: 'text-primary', bg: 'bg-primary/10', border: 'border-t-primary' },
    { key: 'expertise', icon: Award, color: 'text-[#2d8a6e]', bg: 'bg-[#2d8a6e]/12', border: 'border-t-[#2d8a6e]' },
    { key: 'network', icon: Globe, color: 'text-[#d4613c]', bg: 'bg-[#d4613c]/10', border: 'border-t-[#d4613c]' },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: t('breadcrumb.home'), url: getLocalizedUrl('', locale) },
        { name: t('breadcrumb.services'), url: getLocalizedUrl('/services', locale) },
      ])} />
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/images/hero/global-trade.webp"
        badge={t('hero.badge')}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.home'), href: '/' },
              { label: t('breadcrumb.services') },
            ]}
          />
        </div>
      </div>

      {/* Services Grid */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Ship;
              const isReversed = index % 2 === 1;
              const colors = colorMap[service.color] || colorMap.blue;

              return (
                <ScrollReveal key={service.slug} delay={0.1} direction="up">
                  <div className={`rich-card group overflow-hidden rounded-2xl border-l-4 ${colors.border}`}>
                    <div
                      className={`grid gap-0 lg:grid-cols-12 ${isReversed ? 'lg:grid-flow-dense' : ''}`}
                    >
                      <div
                        className={`relative h-64 overflow-hidden lg:col-span-5 lg:h-auto ${isReversed ? 'lg:col-start-8' : ''}`}
                      >
                        <Image
                          src={service.image}
                          alt={t(`services.${service.slug}.title`)}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>

                      <div className="flex flex-col justify-center p-8 lg:col-span-7 lg:p-12">
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
                          <Icon className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <h2 className="heading-serif text-2xl">
                          {t(`services.${service.slug}.title`)}
                        </h2>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                          {t(`services.${service.slug}.description`)}
                        </p>

                        <ul className="mt-6 space-y-2">
                          {service.featureKeys.map((featureKey) => (
                            <li key={featureKey} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className={`h-4 w-4 shrink-0 ${colors.check}`} />
                              <span>{t(`services.${service.slug}.features.${featureKey}`)}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <Link href={{pathname: '/services/[slug]', params: {slug: service.slug}}}>
                            <Button className="rounded-full bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg">
                              {t('learnMore')}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t('whyChoose.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('whyChoose.subtitle')}
              </p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyChooseItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <ScrollReveal key={item.key} delay={index * 0.1} direction="up">
                  <div className={`rich-card rounded-2xl border-t-4 ${item.border} p-8 text-center`}>
                    <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg}`}>
                      <ItemIcon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">
                      {t(`whyChoose.${item.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`whyChoose.${item.key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
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
