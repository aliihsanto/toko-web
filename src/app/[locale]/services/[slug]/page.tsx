import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import Image from 'next/image';
import {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { getAlternates, LOCALE_TO_OG, BASE_URL } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'ServiceDetail' });

  const title = t(`${slug}.metaTitle`);
  const description = t(`${slug}.metaDescription`);

  return {
    title,
    description,
    alternates: getAlternates(locale, `/services/${slug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/services/${slug}`,
      locale: LOCALE_TO_OG[locale],
      type: 'website',
    },
  };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  TrendingUp,
  PackageCheck,
  BarChart3,
};

const featureIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  customs: Ship,
  logistics: TrendingUp,
  costOptimization: BarChart3,
  qualityControl: CheckCircle2,
  documentation: PackageCheck,
  marketResearch: BarChart3,
  buyerMatching: TrendingUp,
  compliance: CheckCircle2,
  supplierAudit: PackageCheck,
  priceNegotiation: BarChart3,
  sampleManagement: PackageCheck,
  supplyChain: TrendingUp,
  transitRoutes: Ship,
  cisExpertise: TrendingUp,
  warehousing: PackageCheck,
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const t = await getTranslations('ServiceDetail');
  const tNav = await getTranslations('ServicesPage');

  const colorMap: Record<string, { bg: string; text: string; border: string; topBorder: string }> =
    {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        topBorder: 'border-t-blue-500',
      },
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        topBorder: 'border-t-emerald-500',
      },
      amber: {
        bg: 'bg-[#d4613c]/10',
        text: 'text-[#d4613c]',
        border: 'border-[#d4613c]/20',
        topBorder: 'border-t-[#d4613c]',
      },
      rose: {
        bg: 'bg-violet-50',
        text: 'text-violet-600',
        border: 'border-violet-200',
        topBorder: 'border-t-violet-500',
      },
    };

  const colors = colorMap[service.color] || colorMap.blue;

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: tNav('breadcrumb.home'), url: `${BASE_URL}/${locale}` },
        { name: tNav('breadcrumb.services'), url: `${BASE_URL}/${locale}/services` },
        { name: t(`${slug}.title`), url: `${BASE_URL}/${locale}/services/${slug}` },
      ])} />
      <PageHero
        title={t(`${slug}.title`)}
        subtitle={t(`${slug}.subtitle`)}
        backgroundImage={service.image}
        badge={t(`${slug}.badge`)}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: tNav('breadcrumb.home'), href: '/' },
              { label: tNav('breadcrumb.services'), href: '/services' },
              { label: t(`${slug}.title`) },
            ]}
          />
        </div>
      </div>

      {/* Overview */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t(`${slug}.overview.p1`)}</p>
                  <p>{t(`${slug}.overview.p2`)}</p>
                  <p>{t(`${slug}.overview.p3`)}</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-[#d4613c]/8 to-transparent blur-xl" />
                  <Image
                    src={service.image}
                    alt={t(`${slug}.title`)}
                    width={800}
                    height={600}
                    className="relative h-[400px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.features`)}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.featureKeys.map((featureKey, index) => {
              const FeatureIcon =
                featureIconMap[featureKey] || CheckCircle2;
              return (
                <ScrollReveal
                  key={featureKey}
                  delay={index * 0.1}
                  direction="up"
                >
                  <div className={`rich-card h-full rounded-2xl border-t-4 ${colors.topBorder} p-6`}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
                      <FeatureIcon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">
                      {t(`${slug}.features.${featureKey}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`${slug}.features.${featureKey}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.process`)}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#e8a840] to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((step, index) => (
              <ScrollReveal key={step} delay={index * 0.15} direction="up">
                <div className="rich-card group rounded-2xl p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {t(`${slug}.process.step${step}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`${slug}.process.step${step}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t(`${slug}.cta.title`)}
        description={t(`${slug}.cta.description`)}
        buttonText={t(`${slug}.cta.button`)}
        buttonHref="/contact"
      />
    </>
  );
}
