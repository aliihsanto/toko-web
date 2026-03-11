import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import { getPageMetadata } from '@/lib/seo/metadata';
import { getLocalizedUrl } from '@/lib/i18n-paths';
import { t, getProductPage } from '@/lib/pseo/utils';
import { productPages } from '@/data/pseo/products';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of productPages) {
      params.push({ locale, slug: page.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getProductPage(slug);

  if (!page) {
    return {};
  }

  return getPageMetadata({
    locale,
    path: `/trade/import/${slug}`,
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
  });
}

const borderColors = [
  'border-t-[#0d7377]',
  'border-t-[#d4613c]',
  'border-t-[#2d8a6e]',
  'border-t-[#e8a840]',
];

const iconBgColors = [
  'bg-[#0d7377]/10',
  'bg-[#d4613c]/10',
  'bg-[#2d8a6e]/10',
  'bg-[#e8a840]/10',
];

const textColors = [
  'text-[#0d7377]',
  'text-[#d4613c]',
  'text-[#2d8a6e]',
  'text-[#e8a840]',
];

const breadcrumbLabels: Record<string, { home: string; trade: string; import: string }> = {
  tr: { home: 'Ana Sayfa', trade: 'Ticaret', import: 'Ithalat' },
  en: { home: 'Home', trade: 'Trade', import: 'Import' },
  fr: { home: 'Accueil', trade: 'Commerce', import: 'Importation' },
  ru: { home: 'Главная', trade: 'Торговля', import: 'Импорт' },
};

export default async function ProductImportPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getProductPage(slug);
  if (!page) {
    notFound();
  }

  const labels = breadcrumbLabels[locale] || breadcrumbLabels.en;
  const title = t(page.content.title, locale);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: labels.home, url: getLocalizedUrl('', locale) },
          { name: labels.trade, url: getLocalizedUrl('/trade', locale) },
          { name: labels.import, url: getLocalizedUrl('/trade/import', locale) },
          { name: title, url: getLocalizedUrl(`/trade/import/${slug}`, locale) },
        ])}
      />

      <PageHero
        title={title}
        subtitle={t(page.content.subtitle, locale)}
        backgroundImage={page.image}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: labels.home, href: '/' },
              { label: labels.trade, href: '/trade' },
              { label: labels.import, href: '/trade/import' },
              { label: title },
            ]}
          />
        </div>
      </div>

      {/* Overview Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  {page.content.overview.map((paragraph, index) => (
                    <p key={index}>{t(paragraph, locale)}</p>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="relative lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="group relative">
                  <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-[#d4613c]/8 to-transparent blur-xl" />
                  <Image
                    src={page.image}
                    alt={title}
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

      {/* Key Facts Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Temel Bilgiler'
                  : locale === 'fr'
                    ? 'Informations Essentielles'
                    : locale === 'ru'
                      ? 'Ключевые факты'
                      : 'Key Facts'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d7377] to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.content.keyFacts.map((fact, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <div
                  className={`rich-card h-full rounded-2xl border-t-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(fact.label, locale)}
                  </div>
                  <div className={`text-xl font-bold ${textColors[index % textColors.length]}`}>
                    {t(fact.value, locale)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Advantages Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Ticaret Avantajlari'
                  : locale === 'fr'
                    ? 'Avantages Commerciaux'
                    : locale === 'ru'
                      ? 'Торговые преимущества'
                      : 'Trade Advantages'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {page.content.tradeAdvantages.map((advantage, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <div
                  className={`rich-card group h-full rounded-2xl border-t-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColors[index % iconBgColors.length]}`}
                  >
                    <span className={`text-xl font-bold ${textColors[index % textColors.length]}`}>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {t(advantage.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(advantage.description, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Import Process Section */}
      <section className="relative overflow-hidden bg-amber-50/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Ithalat Sureci'
                  : locale === 'fr'
                    ? "Processus d'Importation"
                    : locale === 'ru'
                      ? 'Процесс импорта'
                      : 'Import Process'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-[#0d7377]" />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {page.content.process.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="rich-card flex items-start gap-6 rounded-2xl p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d7377] to-[#2d8a6e] text-xl font-bold text-white shadow-lg">
                    {t(step.step, locale)}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">{t(step.title, locale)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(step.description, locale)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-l-4 border-l-[#2d8a6e] bg-[#2d8a6e]/5 p-8">
                <h2 className="heading-serif mb-4 text-2xl tracking-tight sm:text-3xl">
                  {locale === 'tr'
                    ? 'Kalite Standartlari'
                    : locale === 'fr'
                      ? 'Normes de Qualite'
                      : locale === 'ru'
                        ? 'Стандарты качества'
                        : 'Quality Standards'}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t(page.content.qualityStandards, locale)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title={t(page.content.cta.title, locale)}
        description={t(page.content.cta.description, locale)}
        buttonText={t(page.content.cta.buttonText, locale)}
        buttonHref="/contact"
      />
    </>
  );
}
