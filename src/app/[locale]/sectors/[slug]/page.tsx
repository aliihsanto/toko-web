import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
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
  CheckCircle2,
  Shield,
  DollarSign,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { sectors, getSectorBySlug, getAllSectorSlugs } from '@/data/sectors';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'SectorDetail' });

  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.metaDescription`),
  };
}

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

const advantageIcons: LucideIcon[] = [CheckCircle2, Shield, DollarSign, Truck];

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sector = getSectorBySlug(slug);
  if (!sector) {
    notFound();
  }

  const t = await getTranslations('SectorDetail');
  const tSectors = await getTranslations('SectorsPage');

  const SectorIcon = iconMap[sector.iconName] || Building2;

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <PageHero
        title={t(`${slug}.title`)}
        subtitle={t(`${slug}.subtitle`)}
        backgroundImage={sector.image}
      />

      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: tSectors('breadcrumb.home'), href: '/' },
              { label: tSectors('breadcrumb.sectors'), href: '/sectors' },
              { label: t(`${slug}.title`) },
            ]}
          />
        </div>
      </div>

      {/* ===== INDUSTRY OVERVIEW SECTION ===== */}
      <section className="bg-white py-24 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Text - 7 columns */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t(`${slug}.overview.p1`)}</p>
                  <p>{t(`${slug}.overview.p2`)}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Image - 5 columns */}
            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl transition-colors group-hover:bg-amber-100/50 dark:group-hover:bg-amber-900/10" />
                  <Image
                    src={sector.image}
                    alt={t(`${slug}.title`)}
                    width={800}
                    height={600}
                    className="relative h-[400px] w-full rounded-3xl object-cover shadow-2xl"
                  />
                  {/* Floating stat badge */}
                  <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl dark:bg-card">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <SectorIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{sector.productKeys.length}+</div>
                      <div className="text-xs text-muted-foreground">{t(`${slug}.sectionTitles.products`)}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS & CAPABILITIES SECTION ===== */}
      <section className="bg-gray-50 py-24 dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.products`)}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sector.productKeys.map((productKey, index) => (
              <ScrollReveal key={productKey} delay={index * 0.1} direction="up">
                <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-background">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {t(`${slug}.products.${productKey}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`${slug}.products.${productKey}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOURCING ADVANTAGES SECTION ===== */}
      <section className="bg-amber-50 py-24 dark:bg-amber-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t(`${slug}.advantages.title`)}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((num, index) => {
              const AdvIcon = advantageIcons[index];
              return (
                <ScrollReveal key={num} delay={index * 0.15} direction="up">
                  <div className="group rounded-2xl border border-amber-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-amber-800/30 dark:bg-card">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                      <AdvIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">
                      {t(`${slug}.advantages.a${num}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`${slug}.advantages.a${num}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
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
