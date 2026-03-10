import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FileCheck, AlertTriangle } from 'lucide-react';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { PageHero } from '@/components/common/page-hero';
import { CTASection } from '@/components/common/cta-section';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { JsonLd } from '@/lib/seo/json-ld';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import { getPageMetadata, BASE_URL } from '@/lib/seo/metadata';
import { t, getCustomsPage } from '@/lib/pseo/utils';
import { customsPages } from '@/data/pseo/customs';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const page of customsPages) {
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
  const page = getCustomsPage(slug);

  if (!page) {
    return {};
  }

  return getPageMetadata({
    locale,
    path: `/trade/customs/${slug}`,
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

const breadcrumbLabels: Record<string, { home: string; trade: string; customs: string }> = {
  tr: { home: 'Ana Sayfa', trade: 'Ticaret', customs: 'Gumruk' },
  en: { home: 'Home', trade: 'Trade', customs: 'Customs' },
  fr: { home: 'Accueil', trade: 'Commerce', customs: 'Douanes' },
  ru: { home: 'Главная', trade: 'Торговля', customs: 'Таможня' },
};

export default async function CustomsTemplatePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getCustomsPage(slug);
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
          { name: labels.customs, url: `${BASE_URL}/${locale}/trade/customs` },
          { name: title, url: `${BASE_URL}/${locale}/trade/customs/${slug}` },
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
              { label: labels.customs, href: '/trade/customs' },
              { label: title },
            ]}
          />
        </div>
      </div>

      {/* Overview Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-muted-foreground">
              {page.content.overview.map((paragraph, index) => (
                <p key={index}>{t(paragraph, locale)}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Customs Procedures Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Gumruk Prosederleri'
                  : locale === 'fr'
                    ? 'Procedures Douanieres'
                    : locale === 'ru'
                      ? 'Таможенные процедуры'
                      : 'Customs Procedures'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d7377] to-[#d4613c]" />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {page.content.procedures.map((procedure, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="rich-card flex items-start gap-6 rounded-2xl p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d7377] to-[#2d8a6e] text-xl font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">{t(procedure.title, locale)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(procedure.description, locale)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'Gerekli Belgeler'
                  : locale === 'fr'
                    ? 'Documents Requis'
                    : locale === 'ru'
                      ? 'Необходимые документы'
                      : 'Required Documents'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2d8a6e] to-[#e8a840]" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.content.requiredDocuments.map((doc, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <div
                  className={`rich-card h-full rounded-2xl border-t-4 ${borderColors[index % borderColors.length]} p-6`}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2d8a6e]/10">
                    <FileCheck className="h-5 w-5 text-[#2d8a6e]" />
                  </div>
                  <h3 className="mb-2 text-base font-bold">{t(doc.name, locale)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(doc.description, locale)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HS Codes & Duty Rates Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-cool" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="heading-serif text-3xl tracking-tight sm:text-4xl">
                {locale === 'tr'
                  ? 'HS Kodlari ve Gumruk Vergileri'
                  : locale === 'fr'
                    ? 'Codes SH et Droits de Douane'
                    : locale === 'ru'
                      ? 'Коды HS и таможенные пошлины'
                      : 'HS Codes & Duty Rates'}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0d7377] to-[#2d8a6e]" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-[#0d7377]/5">
                      <th className="px-6 py-4 font-semibold text-foreground">
                        {locale === 'tr'
                          ? 'HS Kodu'
                          : locale === 'fr'
                            ? 'Code SH'
                            : locale === 'ru'
                              ? 'Код HS'
                              : 'HS Code'}
                      </th>
                      <th className="px-6 py-4 font-semibold text-foreground">
                        {locale === 'tr'
                          ? 'Urun Aciklamasi'
                          : locale === 'fr'
                            ? 'Description du Produit'
                            : locale === 'ru'
                              ? 'Описание товара'
                              : 'Product Description'}
                      </th>
                      <th className="px-6 py-4 font-semibold text-foreground">
                        {locale === 'tr'
                          ? 'Vergi Orani'
                          : locale === 'fr'
                            ? 'Taux de Droit'
                            : locale === 'ru'
                              ? 'Ставка пошлины'
                              : 'Duty Rate'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.content.hsCodes.map((entry, index) => (
                      <tr
                        key={index}
                        className={`border-b border-border/40 ${index % 2 === 0 ? 'bg-white' : 'bg-[#fefcf9]'}`}
                      >
                        <td className="px-6 py-3 font-mono text-sm font-medium text-[#0d7377]">
                          {entry.code}
                        </td>
                        <td className="px-6 py-3 text-muted-foreground">
                          {t(entry.description, locale)}
                        </td>
                        <td className="px-6 py-3 font-semibold text-foreground">
                          {t(entry.dutyRate, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Restrictions Section */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-l-4 border-l-amber-500 bg-amber-50/80 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <h2 className="heading-serif text-2xl tracking-tight sm:text-3xl">
                    {locale === 'tr'
                      ? 'Kisitlamalar ve Yasaklar'
                      : locale === 'fr'
                        ? 'Restrictions et Interdictions'
                        : locale === 'ru'
                          ? 'Ограничения и запреты'
                          : 'Restrictions & Prohibitions'}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t(page.content.restrictions, locale)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Toko Support Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-warm" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-l-4 border-l-[#0d7377] bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <h2 className="heading-serif mb-4 text-2xl tracking-tight sm:text-3xl">
                  {locale === 'tr'
                    ? 'Toko Trading Destegi'
                    : locale === 'fr'
                      ? 'Accompagnement Toko Trading'
                      : locale === 'ru'
                        ? 'Поддержка Toko Trading'
                        : 'Toko Trading Support'}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t(page.content.tokoSupport, locale)}
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
