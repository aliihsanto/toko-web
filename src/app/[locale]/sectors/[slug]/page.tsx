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
import { sectors, getSectorBySlug } from '@/data/sectors';
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
const advantageColors = [
  { bg: 'bg-primary/10', text: 'text-primary', border: 'border-t-primary' },
  { bg: 'bg-[#2d8a6e]/12', text: 'text-[#2d8a6e]', border: 'border-t-[#2d8a6e]' },
  { bg: 'bg-[#d4613c]/10', text: 'text-[#d4613c]', border: 'border-t-[#d4613c]' },
  { bg: 'bg-[#e8a840]/10', text: 'text-[#e8a840]', border: 'border-t-[#e8a840]' },
];

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
      <PageHero
        title={t(`${slug}.title`)}
        subtitle={t(`${slug}.subtitle`)}
        backgroundImage={sector.image}
      />

      <div className="bg-background">
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

      {/* Industry Overview */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>{t(`${slug}.overview.p1`)}</p>
                  <p>{t(`${slug}.overview.p2`)}</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-[#d4613c]/8 to-transparent blur-xl" />
                  <Image
                    src={sector.image}
                    alt={t(`${slug}.title`)}
                    width={800}
                    height={600}
                    className="relative h-[400px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/50"
                  />
                  <div className="glass-card absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <SectorIcon className="h-5 w-5 text-primary" />
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

      {/* Products & Capabilities */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t(`${slug}.sectionTitles.products`)}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#2d8a6e]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sector.productKeys.map((productKey, index) => (
              <ScrollReveal key={productKey} delay={index * 0.1} direction="up">
                <div className="rich-card h-full rounded-2xl border-t-4 border-t-primary p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
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

      {/* Sourcing Advantages */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {t(`${slug}.advantages.title`)}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((num, index) => {
              const AdvIcon = advantageIcons[index];
              const advColor = advantageColors[index];
              return (
                <ScrollReveal key={num} delay={index * 0.15} direction="up">
                  <div className={`rich-card group rounded-2xl border-t-4 ${advColor.border} p-6`}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${advColor.bg}`}>
                      <AdvIcon className={`h-6 w-6 ${advColor.text}`} />
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

      <CTASection
        title={t(`${slug}.cta.title`)}
        description={t(`${slug}.cta.description`)}
        buttonText={t(`${slug}.cta.button`)}
        buttonHref="/contact"
      />
    </>
  );
}
