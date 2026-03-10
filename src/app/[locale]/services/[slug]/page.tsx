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

  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.metaDescription`),
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

  const colorMap: Record<string, { bg: string; text: string; border: string }> =
    {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/30',
      },
      emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/30',
      },
      amber: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/30',
      },
      rose: {
        bg: 'bg-rose-100 dark:bg-rose-900/30',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/30',
      },
    };

  const colors = colorMap[service.color] || colorMap.blue;

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <PageHero
        title={t(`${slug}.title`)}
        subtitle={t(`${slug}.subtitle`)}
        backgroundImage={service.image}
        badge={t(`${slug}.badge`)}
      />

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white dark:bg-background">
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

      {/* ===== OVERVIEW SECTION ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Text */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t(`${slug}.overview.p1`)}</p>
                  <p>{t(`${slug}.overview.p2`)}</p>
                  <p>{t(`${slug}.overview.p3`)}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Image */}
            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl transition-colors group-hover:bg-amber-100/50 dark:group-hover:bg-amber-900/10" />
                  <Image
                    src={service.image}
                    alt={t(`${slug}.title`)}
                    width={800}
                    height={600}
                    className="relative h-[400px] w-full rounded-3xl object-cover shadow-2xl"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.features`)}
              </h2>
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
                  <div
                    className={`group h-full rounded-2xl border ${colors.border} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-background`}
                  >
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                    >
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

      {/* ===== PROCESS SECTION ===== */}
      <section className="bg-amber-50 py-24 dark:bg-amber-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.process`)}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((step, index) => (
              <ScrollReveal key={step} delay={index * 0.15} direction="up">
                <div className="group relative rounded-2xl border border-amber-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-amber-800/30 dark:bg-card">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-lg font-bold text-white">
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

      {/* ===== CTA ===== */}
      <CTASection
        title={t(`${slug}.cta.title`)}
        description={t(`${slug}.cta.description`)}
        buttonText={t(`${slug}.cta.button`)}
        buttonHref="/contact"
      />
    </>
  );
}
