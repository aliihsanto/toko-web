import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { t, getCountryPage } from '@/lib/pseo/utils';
import { countryPages } from '@/data/pseo/countries';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of countryPages) {
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
  const page = getCountryPage(slug);

  if (!page) {
    return {};
  }

  return getPageMetadata({
    locale,
    path: `/trade/country/${slug}`,
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

const statBgColors = [
  'bg-[#0d7377]/8',
  'bg-[#d4613c]/8',
  'bg-[#2d8a6e]/8',
  'bg-[#e8a840]/8',
  'bg-[#0d7377]/8',
  'bg-[#d4613c]/8',
];

const statTextColors = [
  'text-[#0d7377]',
  'text-[#d4613c]',
  'text-[#2d8a6e]',
  'text-[#e8a840]',
  'text-[#0d7377]',
  'text-[#d4613c]',
];

const breadcrumbLabels: Record<string, { home: string; trade: string; countries: string }> = {
  tr: { home: 'Ana Sayfa', trade: 'Ticaret', countries: 'Ulke Rehberleri' },
  en: { home: 'Home', trade: 'Trade', countries: 'Country Guides' },
  fr: { home: 'Accueil', trade: 'Commerce', countries: 'Guides Pays' },
  ru: { home: 'Главная', trade: 'Торговля', countries: 'Страновые справочники' },
};

export default async function CountryTradePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getCountryPage(slug);
  if (!page) {
    notFound();
  }

  const labels = breadcrumbLabels[locale] || breadcrumbLabels.en;
  const title = t(page.content.title, locale);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: labels.home, url: `${BASE_URL}/${locale}` },
          { name: labels.trade, url: `${BASE_URL}/${locale}/trade` },
          { name: labels.countries, url: `${BASE_URL}/${locale}/trade/country` },
          { name: title, url: `${BASE_URL}/${locale}/trade/country/${slug}` },
        ])}
      />

      <PageHero
        title={title}
        subtitle={t(page.content.subtitle, locale)}
        backgroundImage={page.image}
        badge={page.flag}
      />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: labels.home, href: '/' },
              { label: labels.trade, href: '/trade' },
              { label: labels.countries, href: '/trade/country' },
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
                  <div className="glass-card absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-xl">
                    <span className="text-3xl">{page.flag}</span>
                    <div className="text-sm font-semibold">{title}</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Statistics Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Ticaret Istatistikleri'
                  : locale === 'fr'
                    ? 'Statistiques Commerciales'
                    : locale === 'ru'
                      ? 'Торговая статистика'
                      : 'Trade Statistics'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d7377] to-[#2d8a6e]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.content.tradeStats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <div className={`rich-card h-full rounded-2xl p-6 ${statBgColors[index % statBgColors.length]}`}>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(stat.label, locale)}
                  </div>
                  <div className={`text-xl font-bold ${statTextColors[index % statTextColors.length]}`}>
                    {t(stat.value, locale)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Sectors Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Temel Sektorler'
                  : locale === 'fr'
                    ? 'Secteurs Cles'
                    : locale === 'ru'
                      ? 'Ключевые секторы'
                      : 'Key Sectors'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4613c] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {page.content.keySectors.map((sector, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <div
                  className={`rich-card h-full rounded-2xl border-t-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <h3 className="mb-3 text-lg font-bold">{t(sector.title, locale)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(sector.description, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Agreements Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-l-4 border-l-[#0d7377] bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="heading-serif mb-4 text-2xl tracking-tight sm:text-3xl">
                  {locale === 'tr'
                    ? 'Ticaret Anlasmalari'
                    : locale === 'fr'
                      ? 'Accords Commerciaux'
                      : locale === 'ru'
                        ? 'Торговые соглашения'
                        : 'Trade Agreements'}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t(page.content.agreements, locale)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Logistics Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Lojistik ve Nakliye'
                  : locale === 'fr'
                    ? 'Logistique et Transport'
                    : locale === 'ru'
                      ? 'Логистика и транспортировка'
                      : 'Logistics & Shipping'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {page.content.logistics.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <div
                  className={`rich-card h-full rounded-2xl border-t-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <h3 className="mb-3 text-lg font-bold">{t(item.title, locale)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.description, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
